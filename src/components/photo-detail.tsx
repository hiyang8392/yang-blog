import Image from "next/image";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import type { Album, AlbumPhoto } from "@/lib/db/data/photos";
import { cn } from "@/lib/utils";

export function PhotoDetail({
  album,
  photo,
  backHref,
  prevHref,
  nextHref,
  replaceNav = false,
  className,
}: {
  album: Album;
  photo: AlbumPhoto;
  backHref?: string;
  prevHref?: string;
  nextHref?: string;
  replaceNav?: boolean;
  className?: string;
}) {
  const aspectRatio = photo.width / photo.height;
  const maxViewportWidth = Math.round(aspectRatio * 72 * 1000) / 1000;

  return (
    <div className={cn("flex flex-col gap-5", className)}>
      {backHref && (
        <Link
          href={backHref}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronLeftIcon className="size-4" />
          返回 {album.title}
        </Link>
      )}

      <figure
        className="mx-auto w-full overflow-hidden bg-muted"
        style={{
          aspectRatio: `${photo.width} / ${photo.height}`,
          maxWidth: `min(100%, ${maxViewportWidth}vh)`,
        }}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          sizes="(min-width: 1024px) 768px, 100vw"
          priority
          unoptimized
          className="h-auto w-full object-contain"
        />
      </figure>

      {prevHref && (
        <Link
          href={prevHref}
          scroll={false}
          replace={replaceNav}
          aria-label="上一張"
          className="fixed left-2 top-1/2 z-10 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground shadow-sm backdrop-blur-sm transition hover:bg-background sm:left-4 sm:size-12"
        >
          <ChevronLeftIcon className="size-5 sm:size-6" />
        </Link>
      )}

      {nextHref && (
        <Link
          href={nextHref}
          scroll={false}
          replace={replaceNav}
          aria-label="下一張"
          className="fixed right-2 top-1/2 z-10 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground shadow-sm backdrop-blur-sm transition hover:bg-background sm:right-4 sm:size-12"
        >
          <ChevronRightIcon className="size-5 sm:size-6" />
        </Link>
      )}

      <p className="text-base leading-relaxed text-foreground">
        {photo.caption}
      </p>
    </div>
  );
}
