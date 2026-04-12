import Link from "next/link";
import type { getPostList } from "@/lib/db/data/posts";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PostHeader } from "@/components/post-header";

const getPageUrl = (page: number) => {
  return page === 1 ? "/posts" : `/posts/page/${page}`;
};

export function PostsList({
  posts,
  currentPage,
  totalPages,
}: {
  posts: Awaited<ReturnType<typeof getPostList>>["posts"];
  currentPage: number;
  totalPages: number;
}) {
  return (
    <div className="py-8 sm:py-12 flex flex-1 flex-col">
      <h1 className="mb-12 text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
        所有文章
      </h1>
      <div className="flex flex-col divide-y divide-border">
        {posts.map((post) => (
          <article key={post.slug} className="py-4 first:pt-0 last:pb-0">
            <PostHeader
              categorySlug={post.category?.slug}
              categoryName={post.category?.name}
              publishedAt={post.publishedAt ?? undefined}
            />
            <h2 className="flex flex-col flex-1 gap-1">
              <Link
                href={`/posts/${post.slug}`}
                className="text-lg sm:text-xl font-medium tracking-tight text-foreground transition-colors hover:text-primary line-clamp-2"
              >
                {post.title}
              </Link>
              {post.excerpt && (
                <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
                  {post.excerpt}
                </p>
              )}
            </h2>
          </article>
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination className="mt-auto pt-12">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={getPageUrl(currentPage - 1)}
                disabled={currentPage <= 1}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }).map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href={getPageUrl(index + 1)}
                  isActive={index + 1 === currentPage}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href={getPageUrl(currentPage + 1)}
                disabled={currentPage >= totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
