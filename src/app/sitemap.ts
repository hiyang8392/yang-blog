import { MetadataRoute } from "next";
import { getAllPosts, getTotalPages } from "@/lib/db/data/posts";
import { getAllCategories } from "@/lib/db/data/category";

const BASE_URL = process.env.PUBLIC_BASE_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, totalPages, categories] = await Promise.all([
    getAllPosts(),
    getTotalPages(),
    getAllCategories(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/posts`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const paginationRoutes: MetadataRoute.Sitemap = Array.from(
    { length: Math.max(totalPages - 1, 0) },
    (_, index) => ({
      url: `${BASE_URL}/posts/page/${index + 2}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.6,
    }),
  );

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/posts/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${BASE_URL}/category/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...paginationRoutes,
    ...postRoutes,
    ...categoryRoutes,
  ];
}
