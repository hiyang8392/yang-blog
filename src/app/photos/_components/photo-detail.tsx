import Image from "next/image";
import Link from "next/link";
import { ChevronLeftIcon } from "lucide-react";
import type { AlbumPhoto } from "@/lib/db/data/photos";
import { cn } from "@/lib/utils";

export function PhotoDetail({
  albumTitle,
  photo,
  backHref,
  maxImageHeightVh = 72,
  className,
}: {
  albumTitle: string;
  photo: AlbumPhoto;
  backHref?: string;
  maxImageHeightVh?: number;
  className?: string;
}) {
  const aspectRatio = photo.width / photo.height;
  const maxViewportWidth =
    Math.round(aspectRatio * maxImageHeightVh * 1000) / 1000;

  return (
    <div className={cn("flex flex-col gap-5", className)}>
      {backHref && (
        <Link
          href={backHref}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronLeftIcon className="size-4" />
          返回 {albumTitle}
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
      <p className="leading-relaxed text-lg text-muted-foreground">
        {photo.caption}
      </p>
    </div>
  );
}
