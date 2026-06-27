import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPhoto, getPhotoParams } from "@/lib/db/data/photos";
import { PhotoDetail } from "@/app/photos/_components/photo-detail";

export async function generateStaticParams() {
  return getPhotoParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ albumSlug: string; photoId: string }>;
}): Promise<Metadata> {
  const { albumSlug, photoId } = await params;
  const photo = await getPhoto(albumSlug, photoId);

  if (!photo) {
    return {
      title: "照片不存在",
    };
  }

  return {
    title: photo.album.title,
    description: photo.caption,
    openGraph: {
      images: [photo.src],
    },
  };
}

export default async function PhotoPage({
  params,
}: {
  params: Promise<{ albumSlug: string; photoId: string }>;
}) {
  const { albumSlug, photoId } = await params;
  const photo = await getPhoto(albumSlug, photoId);

  if (!photo) {
    notFound();
  }

  return (
    <article className="py-8 sm:py-12">
      <PhotoDetail
        albumTitle={photo.album.title}
        photo={photo}
        backHref={`/photos/${albumSlug}`}
      />
    </article>
  );
}
