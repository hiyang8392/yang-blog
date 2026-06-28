import { notFound } from "next/navigation";
import { getPhotoWithNavigation } from "@/lib/db/data/photos";
import { PhotoDetail } from "@/app/photos/_components/photo-detail";
import { PhotoModal } from "@/app/photos/_components/photo-modal";

export default async function PhotoModalPage({
  params,
}: {
  params: Promise<{ albumSlug: string; photoId: string }>;
}) {
  const { albumSlug, photoId } = await params;
  const result = await getPhotoWithNavigation(albumSlug, photoId);

  if (!result) {
    notFound();
  }

  const prevHref = result.prev
    ? `/photos/${result.album.slug}/photo/${result.prev.id}`
    : undefined;
  const nextHref = result.next
    ? `/photos/${result.album.slug}/photo/${result.next.id}`
    : undefined;

  return (
    <PhotoModal
      albumHref={`/photos/${result.album.slug}`}
      prevHref={prevHref}
      nextHref={nextHref}
    >
      <PhotoDetail
        albumTitle={result.album.title}
        photo={result.photo}
        prevHref={prevHref}
        nextHref={nextHref}
        replaceNav
        maxImageHeightVh={85}
        className="pb-12 sm:pb-10"
      />
    </PhotoModal>
  );
}
