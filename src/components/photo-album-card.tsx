import Image from "next/image";
import Link from "next/link";
import type { AlbumSummary } from "@/lib/db/data/photos";

export function PhotoAlbumCard({ album }: { album: AlbumSummary }) {
  return (
    <Link
      href={`/photos/${album.slug}`}
      className="group bg-card hover:bg-accent transition-colors overflow-hidden rounded-xl border border-border"
    >
      <div className="bg-muted relative aspect-4/3 overflow-hidden">
        <Image
          src={album.coverImage}
          alt={`${album.title} cover image`}
          fill
          sizes="(min-width: 640px) 384px, 100vw"
          unoptimized
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <div className="mb-2 flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            {album.title}
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {album.description}
        </p>
      </div>
    </Link>
  );
}
