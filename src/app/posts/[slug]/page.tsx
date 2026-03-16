import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getPost, MOCK_POSTS } from "@/app/data/mock-posts";

export function generateStaticParams() {
  return MOCK_POSTS.map((post) => ({
    slug: post.slug
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) {
    return {
      title: "文章不存在",
    };
  }

  return {
    title: `${post.title} - Hi Yang`,
    description: post.title,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) notFound();

  return (
    <article className="py-16 sm:py-24">
      <Link
        href="/posts"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        返回文章列表
      </Link>

      <header className="mb-12">
        <div className="mb-4 flex items-center gap-3 text-sm text-muted-foreground">
          <Badge variant="secondary" className="font-medium">
            {post.category}
          </Badge>
          <span>{post.date}</span>
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
