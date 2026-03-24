import { prisma } from "@/lib/prisma";

const POSTS_PER_PAGE = 10;

export async function getPost(slug: string) {
  return prisma.post.findUnique({
    where: { slug, published: true },
    include: { category: true, tags: true },
  });
}

export async function getAllPublishedSlugs() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true },
  });
  return posts.map((post) => ({ slug: post.slug }));
}

export async function getPostList(page: number) {
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

