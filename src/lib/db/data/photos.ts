import { cache } from "react";
import { prisma } from "@/lib/db/prisma";

export async function getAlbums() {
  return await prisma.album.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    select: {
      slug: true,
      title: true,
      description: true,
      coverImage: true,
      _count: { select: { photos: true } },
      photos: {
        take: 1,
        orderBy: { sortOrder: "asc" },
        select: { src: true },
      },
    },
  });
}

export const getAlbum = cache(async (slug: string) => {
  const album = await prisma.album.findFirst({
    where: { slug, published: true },
    include: {
      photos: { orderBy: { sortOrder: "asc" } },
    },
  });

  if (!album) {
    return null;
  }

  return {
    slug: album.slug,
    title: album.title,
    description: album.description ?? "",
    coverImage: album.coverImage ?? album.photos[0]?.src ?? "",
    photos: album.photos,
  };
});

export const getPhoto = cache(
  async (albumSlug: string, photoId: string) => {
    const photo = await prisma.photo.findFirst({
      where: { id: photoId, album: { slug: albumSlug, published: true } },
      include: { album: { select: { title: true } } },
    });

    if (!photo) {
      return null;
    }

    return photo;
  },
);

export async function getAlbumSlugs() {
  return await prisma.album.findMany({
    where: { published: true },
    select: { slug: true },
  });
}

export async function getPhotoParams() {
  const albums = await prisma.album.findMany({
    where: { published: true },
    select: {
      slug: true,
      photos: { select: { id: true } },
    },
  });

  return albums.flatMap((album) =>
    album.photos.map((photo) => ({
      albumSlug: album.slug,
      photoId: photo.id,
    })),
  );
}

export type AlbumSummary = Awaited<ReturnType<typeof getAlbums>>[number];
export type Album = NonNullable<Awaited<ReturnType<typeof getAlbum>>>;
export type AlbumPhoto = Album["photos"][number];
