import { prisma } from "@/lib/db/prisma";

export async function getCategoryPost(slug: string) {
  return await prisma.category.findUnique({
    where: { slug },
    select: {
      slug: true,
      name: true,
      description: true,
      posts: {
        where: { published: true },
        orderBy: { publishedAt: "desc" },
        select: {
          slug: true,
          title: true,
          excerpt: true,
          publishedAt: true,
        },
      },
    },
  });
}

export async function getAllCategories() {
  const categories = await prisma.category.findMany({
    where: {
      posts: { some: { published: true } },
    },
    select: { slug: true },
  });

  return categories.map((category) => ({ slug: category.slug }));
}
