import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";

const POSTS_PER_PAGE = 10;

const getPageUrl = (page: number) => {
  return page === 1 ? "/posts" : `/posts/page/${page}`;
};

export async function getPosts(page: number) {
  const skip = (page - 1) * POSTS_PER_PAGE;

  const [posts, totalCount] = await Promise.all([
    prisma.post.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      include: { category: true },
      skip,
      take: POSTS_PER_PAGE,
    }),
    prisma.post.count({ where: { published: true } }),
  ]);

  return {
    posts,
    totalPages: Math.ceil(totalCount / POSTS_PER_PAGE),
  };
}

export async function getTotalPages() {
  const totalCount = await prisma.post.count({ where: { published: true } });
  return Math.ceil(totalCount / POSTS_PER_PAGE);
}

export function PostsList({
  posts,
  currentPage,
  totalPages,
}: {
  posts: Awaited<ReturnType<typeof getPosts>>["posts"];
  currentPage: number;
  totalPages: number;
}) {
  return (
    <div className="py-8 sm:py-12 flex flex-1 flex-col">
      <h1 className="mb-12 text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
        所有文章
      </h1>
      <div className="flex flex-col">
        {posts.map((post, index) => (
          <article
            key={post.slug}
            className={`${index !== posts.length - 1 && "border-b border-border"} ${index === 0 && "pt-0"} ${index !== 0 && "pt-8"}`}
          >
            <div className="mb-2 flex items-center gap-3 text-sm text-muted-foreground">
              {post.category && (
                <Badge variant="secondary" className="font-medium">
                  {post.category.name}
                </Badge>
              )}
              {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
            </div>
            <h2 className="mb-4 text-xl sm:text-2xl font-semibold tracking-tight text-foreground line-clamp-1">
              <Link
                href={`/posts/${post.slug}`}
                className="transition-colors hover:text-primary"
              >
                {post.title}
              </Link>
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
