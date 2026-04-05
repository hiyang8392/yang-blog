import { prisma } from "@/lib/db/prisma";

const POSTS_PER_PAGE = 10;

export async function getPost(slug: string) {
  return prisma.post.findUnique({
    where: { slug, published: true },
    include: { category: true, tags: true },
  });
}

export async function getAllPosts() {
  return prisma.post.findMany({
    where: { published: true },
    select: { slug: true, publishedAt: true, updatedAt: true },
    orderBy: { publishedAt: "desc" },
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
      select: {
        slug: true,
        title: true,
        excerpt: true,
        publishedAt: true,
        category: { select: { slug: true, name: true } },
      },
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

export async function getLatestPosts(count = 5) {
  return prisma.post.findMany({
    where: { published: true },
    select: { slug: true, title: true, excerpt: true, publishedAt: true },
    orderBy: { publishedAt: "desc" },
    take: count,
  });
}

export async function getPostTitleExcerpt(slug: string) {
  return prisma.post.findUnique({
    where: { slug },
    select: { title: true, excerpt: true },
  });
}
