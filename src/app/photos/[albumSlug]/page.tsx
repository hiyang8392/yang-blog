import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeftIcon } from "lucide-react";
import { getAlbum, getAlbumSlugs } from "@/lib/db/data/photos";
import { PhotoGrid } from "@/components/photo-grid";

export async function generateStaticParams() {
  const albumSlugs = await getAlbumSlugs();
  return albumSlugs.map((albumSlug) => ({ albumSlug: albumSlug.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ albumSlug: string }>;
}): Promise<Metadata> {
  const { albumSlug } = await params;
  const album = await getAlbum(albumSlug);

  if (!album) {
    return {
      title: "相簿不存在",
    };
  }

  return {
    title: album.title,
    description: album.description,
  };
}

export default async function AlbumPage({
  params,
}: {
  params: Promise<{ albumSlug: string }>;
}) {
  const { albumSlug } = await params;
  const album = await getAlbum(albumSlug);

  if (!album) {
    notFound();
  }

  return (
    <div className="py-8 sm:py-12">
      <header className="mb-10 flex flex-col gap-5">
        <Link
          href="/photos"
          className="w-fit inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronLeftIcon className="size-4" />
          返回所有相簿
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {album.title}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            {album.description}
          </p>
        </div>
      </header>
      <PhotoGrid
        key={album.slug}
        albumSlug={album.slug}
        photos={album.photos}
      />
    </div>
  );
}
