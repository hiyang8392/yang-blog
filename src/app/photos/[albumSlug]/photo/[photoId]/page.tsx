import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPhoto, getPhotoParams } from "@/lib/db/data/photos";
import { PhotoDetail } from "@/components/photo-detail";

export async function generateStaticParams() {
  return getPhotoParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ albumSlug: string; photoId: string }>;
}): Promise<Metadata> {
  const { albumSlug, photoId } = await params;
  const result = await getPhoto(albumSlug, photoId);

  if (!result) {
    return {
      title: "照片不存在",
    };
  }

  return {
    title: `${result.album.title} - ${result.photo.alt}`,
    description: result.photo.caption,
    openGraph: {
      images: [result.photo.src],
    },
  };
}

export default async function PhotoPage({
  params,
}: {
  params: Promise<{ albumSlug: string; photoId: string }>;
}) {
  const { albumSlug, photoId } = await params;
  const result = await getPhoto(albumSlug, photoId);

  if (!result) {
    notFound();
  }

  return (
    <article className="py-8 sm:py-12">
      <PhotoDetail
        album={result.album}
        photo={result.photo}
        backHref={`/photos/${result.album.slug}`}
      />
    </article>
  );
}
