import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getPostList, getTotalPages } from "@/lib/db/data/posts";
import { PostsList } from "@/components/posts-list";

export const metadata: Metadata = {
  title: "所有文章",
};

export async function generateStaticParams() {
  const totalPages = await getTotalPages();
  return Array.from({ length: totalPages - 1 }, (_, index) => ({
    page: String(index + 2),
  }));
}

export default async function PostsPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page: pageParam } = await params;
  const currentPage = Number(pageParam);

  if (isNaN(currentPage) || currentPage < 1) {
    notFound();
  }

  if (currentPage === 1) {
    redirect("/posts");
  }

  const { posts, totalPages } = await getPostList(currentPage);

  if (currentPage > totalPages) {
    notFound();
  }

  return (
    <PostsList
      posts={posts}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  );
}
