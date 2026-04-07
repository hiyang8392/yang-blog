import "dotenv/config";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { prisma } from "@/lib/db/prisma";

const CONTENT_DIR = path.join(process.cwd(), "src", "_content");

const getMarkdownPath = (input: string): string => {
  const trimmed = input.trim().replace(/^\.\//, "");
  const fromCwd = path.resolve(process.cwd(), trimmed);
  if (fs.existsSync(fromCwd)) {
    return fromCwd;
  }

  return path.resolve(CONTENT_DIR, trimmed);
};

const getCategoryId = async (categorySlug: string): Promise<string | null> => {
  if (categorySlug == null || categorySlug === "") {
    return null;
  }

  const category = await prisma.category.findUnique({
    where: { slug: categorySlug },
  });
  if (!category) {
    console.warn(`warn: 找不到該分類, 將分類設定為 null - ${categorySlug}`);
    return null;
  }
  return category.id;
};

async function main() {
  const url = process.env.DIRECT_URL ?? process.env.DATABASE_URL;
  if (!url) {
    console.error("error: DATABASE_URL or DIRECT_URL is not set.");
    process.exit(1);
  }

  const filePath = process.argv[2];
  if (!filePath) {
    console.error("error: file path not found.");
    console.error("ex: npm run sync:post -- test.md");
    process.exit(1);
  }

  const fullPath = getMarkdownPath(filePath);
  if (!fs.existsSync(fullPath)) {
    console.error(`error: file not found: ${fullPath}.`);
    process.exit(1);
  }

  const fileContent = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContent);
  if (!data.slug || !data.title) {
    console.error("error: 文章至少要有 slug 和 title 欄位");
    process.exit(1);
  }

  const hasCategoryKey = Object.prototype.hasOwnProperty.call(data, "category");
  const categoryId = hasCategoryKey ? await getCategoryId(data.category) : null;
  const basePayload = {
    title: data.title,
    content: content,
    published: data.published ?? false,
    excerpt: data.excerpt ?? null,
    publishedAt: data.publishedAt,
  };

  try {
    console.log(`開始同步文章至 db - ${data.title}...`);

    const existingPost = await prisma.post.findUnique({
      where: { slug: data.slug },
      select: { id: true },
    });

    const post = existingPost
      ? await prisma.post.update({
          where: { slug: data.slug },
          data: {
            ...basePayload,
            ...(hasCategoryKey ? { categoryId } : {}),
          },
        })
      : await prisma.post.create({
          data: {
            ...basePayload,
            slug: data.slug,
            categoryId: hasCategoryKey ? categoryId : null,
          },
        });

    console.log(
      `success: ${post.id} (${existingPost ? "更新成功" : "新增成功"})`,
    );
  } catch (error) {
    console.error("error: ", error);
  } finally {
    await prisma.$disconnect();
    console.log("finish");
  }
}

main();
