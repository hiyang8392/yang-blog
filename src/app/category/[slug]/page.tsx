import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategoryPost, getAllCategories } from "@/lib/db/data/category";
import { PostHeader } from "@/components/post-header";

export async function generateStaticParams() {
  return getAllCategories();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategoryPost(slug);
  if (!category) {
    return {
      title: "分類不存在",
    };
  }

  return {
    title: category.name,
    description: category.description ?? category.name,
  };
}
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategoryPost(slug);

  if (!category) notFound();

  return (
    <div className="py-8 sm:py-12 flex flex-1 flex-col">
      <h1 className="mb-12 text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
        {category.name}
      </h1>
      <div className="flex flex-col divide-y divide-border">
        {category.posts.map((post) => (
          <article key={post.slug} className="py-4 first:pt-0 last:pb-0">
            <PostHeader
              categorySlug={category.slug}
              categoryName={category.name}
              publishedAt={post.publishedAt ?? undefined}
            />
            <h2 className="flex flex-col gap-1">
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
    </div>
  );
}
