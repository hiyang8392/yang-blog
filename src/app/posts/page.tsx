import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const POSTS = [
  {
    title: "第三篇第三篇第三篇第三篇第三篇第三篇第三篇第三篇",
    date: "2026 年 3 月 8 日",
    slug: "/posts/post3",
    category: "前端",
  },
  {
    title: "第二篇第二篇",
    date: "2026 年 3 月 1 日",
    slug: "/posts/post2",
    category: "前端",
  },
  {
    title: "第一篇第一篇第一篇第一篇",
    date: "2026 年 2 月 20 日",
    slug: "/posts/post1",
    category: "前端",
  },
];

export default function Posts() {
  return (
    <div className="py-12 sm:py-16">
      <h1 className="mb-12 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        所有文章
      </h1>
      <div className="flex flex-col">
        {POSTS.map((post, index) => (
          <article
            key={post.slug}
            className={`${index !== POSTS.length - 1 && "border-b border-border"} ${index === 0 && "pt-0"} ${index !== 0 && "pt-8"}`}
          >
            <div className="mb-2 flex items-center gap-3 text-sm text-muted-foreground">
              <Badge variant="secondary" className="font-medium">
                {post.category}
              </Badge>
              <span>{post.date}</span>
            </div>
            <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              <Link
                href={post.slug}
                className="transition-colors hover:text-primary"
              >
                {post.title}
              </Link>
            </h2>
          </article>
        ))}
      </div>
    </div>
  );
}
