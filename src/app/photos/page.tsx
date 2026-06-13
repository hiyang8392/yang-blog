import type { Metadata } from "next";
import { getAlbums } from "@/lib/db/data/photos";
import { PhotoAlbumCard } from "@/components/photo-album-card";

export const metadata: Metadata = {
  title: "所有相簿",
};

export default async function PhotosPage() {
  const albums = await getAlbums();

  return (
    <div className="py-8 sm:py-12">
      <h1 className="mb-12 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        所有相簿
      </h1>
      <div className="grid gap-4 sm:grid-cols-2">
        {albums.map(
          (album) =>
            album.photoCount > 0 && (
              <PhotoAlbumCard key={album.slug} album={album} />
            ),
        )}
      </div>
    </div>
  );
}
