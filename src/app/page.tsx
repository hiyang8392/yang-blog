import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";
import { getLatestPosts } from "@/lib/db/data/posts";
import { getProjects } from "@/lib/db/data/projects";
import { formatDate } from "@/lib/utils";
import { ProjectCard } from "@/components/project-card";

export default async function Home() {
  const [latestPosts, projects] = await Promise.all([
    getLatestPosts(),
    getProjects(),
  ]);

  return (
    <div className="py-8 sm:py-12">
      <section className="mb-20">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Hi！ I&apos;m Yang
        </h1>
        <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
          寫寫程式、彈彈吉他、過過生活
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
            更多文章
            <ChevronRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
        <div className="flex flex-col divide-y divide-border">
          {latestPosts.map((post) => (
            <div
              key={post.slug}
              className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-6"
            >
              <div className="min-w-0 flex flex-col flex-1 gap-1">
                <Link
                  href={`/posts/${post.slug}`}
                  className="text-lg sm:text-xl text-foreground font-medium transition-colors line-clamp-2 sm:line-clamp-1 hover:text-primary"
                >
                  {post.title}
                </Link>
                {post.excerpt && (
                  <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2 ">
                    {post.excerpt}
                  </p>
                )}
              </div>
              <span className="shrink-0 text-sm text-muted-foreground">
                {post.publishedAt && formatDate(post.publishedAt)}
              </span>
            </div>
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
            更多專案
            <ChevronRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
