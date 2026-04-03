import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import { ChevronLeftIcon } from "lucide-react";
import { getPost, getAllPublishedSlugs } from "@/lib/db/data/posts";
import { MdxImage } from "@/components/mdx-image";
import { MdxUrl } from "@/components/mdx-url";
import { PostHeader } from "@/components/post-header";

export async function generateStaticParams() {
  return getAllPublishedSlugs();
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
    title: post.title,
    description: post.excerpt ?? post.title,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt ?? post.title,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.createdAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: [process.env.PUBLIC_TITLE || "Hi Yang"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt ?? post.title,
    },
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
        <PostHeader
          categorySlug={post.category?.slug}
          categoryName={post.category?.name}
          publishedAt={post.publishedAt ?? undefined}
        />
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          {post.title}
        </h1>
      </header>

      <div className="prose sm:prose-lg dark:prose-invert max-w-none">
        <MDXRemote
          source={post.content}
          components={{ img: MdxImage, a: MdxUrl }}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [[rehypePrettyCode]],
            },
          }}
        />
      </div>
    </article>
  );
}
