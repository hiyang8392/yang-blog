import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import { ChevronLeftIcon } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

async function getPost(slug: string) {
  return prisma.post.findUnique({
    where: { slug, published: true },
    include: { category: true, tags: true },
  });
}

async function getPosts() {
  return prisma.post.findMany({
    where: { published: true },
    include: { category: true, tags: true },
  });
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) {
    return {
      title: "文章不存在",
    };
  }

  return {
    title: `${post.title} - Hi Yang`,
    description: post.excerpt ?? post.title,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  return (
    <article className="py-8 sm:py-12">
      <Link
        href="/posts"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ChevronLeftIcon className="size-4" />
        返回文章列表
      </Link>

      <header className="mb-12">
        <div className="mb-4 flex items-center gap-3 text-sm text-muted-foreground">
          {post.category && (
            <Badge variant="secondary" className="font-medium">
              {post.category.name}
            </Badge>
          )}
          {post.publishedAt && (
            <span>{formatDate(post.publishedAt, { withTime: true })}</span>
          )}
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          {post.title}
        </h1>
      </header>

      <div className="prose dark:prose-invert max-w-none">
        <MDXRemote
          source={post.content}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [
                [
                  rehypePrettyCode,
                  {
                    theme: { dark: "github-dark", light: "github-light" },
                    keepBackground: true,
                  },
                ],
              ],
            },
          }}
        />
      </div>
    </article>
  );
}
