import { getPostList } from "@/lib/db/data/posts";
import { PostsList } from "@/components/posts-list";

export default async function Posts() {
  const { posts, totalPages } = await getPostList(1);

  return <PostsList posts={posts} currentPage={1} totalPages={totalPages} />;
}
