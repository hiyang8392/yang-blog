import { Metadata } from "next";
import { getPostList } from "@/lib/db/data/posts";
import { PostsList } from "@/components/posts-list";

export const metadata: Metadata = {
  title: "所有文章",
};

export default async function Posts() {
  const { posts, totalPages } = await getPostList(1);

  return <PostsList posts={posts} currentPage={1} totalPages={totalPages} />;
}
