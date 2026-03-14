import Link from "next/link";
import { MoveRight } from "lucide-react";
import { GitHubIcon } from "@/components/icons";

const LATEST_POSTS = [
  {
    title: "第三篇第三篇第三篇第三篇第三篇第三篇第三篇第三篇",
    date: "2026 年 3 月 8 日",
    slug: "/blog/example-post",
  },
  {
    title: "第二篇第二篇",
    date: "2026 年 3 月 1 日",
    slug: "/blog/nextjs-blog",
  },
  {
    title: "第一篇第一篇第一篇第一篇",
    date: "2026 年 2 月 20 日",
    slug: "/blog/tailwindcss-v4",
  },
];

const PROJECTS = [
  {
    name: "Threads 影片控制器 - Chrome 擴充工具",
    description: "Threads 影片控制器 - Chrome 擴充工具",
    url: "https://github.com/hiyang8392/threads-video-controls",
  },
  {
    name: "租屋推播通知",
    description: "租屋推播通知",
    url: "https://github.com/hiyang8392/house-notify",
  },
  {
    name: "文字轉 GIF 動態表情符號",
    description: "文字轉 GIF 動態表情符號",
    url: "https://github.com/hiyang8392/texttogif",
  },
  {
    name: "音樂播放器",
    description: "音樂播放器",
    url: "https://github.com/hiyang8392/react-spotify",
  },
  {
    name: "蕃茄鐘",
    description: "蕃茄鐘",
    url: "https://github.com/hiyang8392/react-pomodoro",
  },
];

export default function Home() {
  return (
    <div className="py-16 sm:py-24">
      <section className="mb-20">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Hi！ I&apos;m Yang
          </h1>
          <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
            你好！
          </p>
        </section>
        <section className="mb-20">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              最新文章
            </h2>
            <Link
              href="/posts"
              className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              查看全部
              <MoveRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="flex flex-col divide-y divide-border">
            {LATEST_POSTS.map((post) => (
              <Link
                key={post.slug}
                href={post.slug}
                className="py-4 flex flex-col gap-1 transition-colors first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="font-medium text-foreground transition-colors group-hover:text-primary">
                  {post.title}
                </span>
                <span className="shrink-0 text-sm text-muted-foreground">
                  {post.date}
                </span>
              </Link>
            ))}
          </div>
        </section>
        <section>
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              專案
            </h2>
            <Link
              href="/projects"
              className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              查看全部
              <MoveRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {PROJECTS.map((project) => (
              <div
                key={project.name}
                className="p-5 rounded-xl border border-border bg-card transition-colors hover:bg-accent"
              >
                <h3 className="mb-2 font-semibold text-foreground">
                  {project.name}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <GitHubIcon className="size-4" />
                  GitHub
                </a>
              </div>
            ))}
          </div>
        </section>
    </div>
  );
}
