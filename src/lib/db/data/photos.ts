import { cache } from "react";
import { prisma } from "@/lib/db/prisma";

type PhotoRecord = {
  id: string;
  src: string;
  alt: string;
  caption: string | null;
  width: number;
  height: number;
};

function mapPhoto(photo: PhotoRecord) {
  return {
    id: photo.id,
    src: photo.src,
    alt: photo.alt,
    caption: photo.caption ?? "",
    width: photo.width,
    height: photo.height,
  };
}

export async function getAlbums() {
  const albums = await prisma.album.findMany({
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

  return albums.map((album) => ({
    slug: album.slug,
    title: album.title,
    description: album.description ?? "",
    coverImage: album.coverImage ?? album.photos[0]?.src ?? "",
    photoCount: album._count.photos,
  }));
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

  const photos = album.photos.map(mapPhoto);

  return {
    slug: album.slug,
    title: album.title,
    description: album.description ?? "",
    coverImage: album.coverImage ?? photos[0]?.src ?? "",
    photos,
  };
});

export const getPhoto = cache(
  async (albumSlug: string, photoId: string) => {
    const album = await getAlbum(albumSlug);

    if (!album) {
      return null;
    }

    const index = album.photos.findIndex((item) => item.id === photoId);

    if (index === -1) {
      return null;
    }

    const photo = album.photos[index];
    const prev = index > 0 ? album.photos[index - 1] : null;
    const next =
      index < album.photos.length - 1 ? album.photos[index + 1] : null;

    return { album, photo, prev, next };
  },
);

export async function getAlbumSlugs() {
  const albums = await prisma.album.findMany({
    where: { published: true },
    select: { slug: true },
  });

  return albums.map((album) => ({ albumSlug: album.slug }));
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
