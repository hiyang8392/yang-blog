import { getPosts, PostsList } from "@/components/posts-list";

export default async function Posts() {
  const { posts, totalPages } = await getPosts(1);

  return <PostsList posts={posts} currentPage={1} totalPages={totalPages} />;
}
