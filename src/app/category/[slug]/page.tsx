import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategoryPost, getAllCategories } from "@/lib/db/data/category";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

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
    title: `${category.name} - Hi Yang`,
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
      <div className="flex flex-col">
        {category.posts.map((post, index) => (
          <article
            key={post.slug}
            className={`${index !== category.posts.length - 1 && "border-b border-border"} ${index === 0 && "pt-0"} ${index !== 0 && "pt-8"}`}
          >
            <div className="mb-2 flex items-center gap-3 text-sm text-muted-foreground">
              <Link href={`/category/${category.slug}`}>
                <Badge
                  variant="secondary"
                  className="font-medium transition-colors hover:text-primary"
                >
                  {category.name}
                </Badge>
              </Link>
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
    </div>
  );
}
