"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useMemo, useRef } from "react";
import type { AlbumPhoto } from "@/lib/db/data/photos";

const DEFAULT_VISIBLE_COUNT = 18;

export function PhotoGrid({
  albumSlug,
  photos,
}: {
  albumSlug: string;
  photos: AlbumPhoto[];
}) {
  const [visibleCount, setVisibleCount] = useState(
    Math.min(DEFAULT_VISIBLE_COUNT, photos.length),
  );

  const visiblePhotos = useMemo(
    () => photos.slice(0, visibleCount),
    [photos, visibleCount],
  );

  const observerRef = useRef<HTMLDivElement | null>(null);
  const hasMore = visibleCount < photos.length;

  useEffect(() => {
    if (!hasMore) {
      return;
    }

    if (!observerRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((current) =>
            Math.min(current + DEFAULT_VISIBLE_COUNT, photos.length),
          );
        }
      },
      { rootMargin: "480px" },
    );

    observer.observe(observerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, photos.length]);

  if (photos.length === 0) {
    return (
      <p className="p-6 bg-card rounded-xl border border-border text-sm text-muted-foreground">
        目前還沒有照片
      </p>
    );
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-1 sm:gap-2">
        {visiblePhotos.map((photo) => (
          <Link
            key={photo.id}
            href={`/photos/${albumSlug}/photo/${photo.id}`}
            scroll={false}
            className="group relative overflow-hidden bg-muted aspect-square"
            aria-label={`open ${photo.alt}`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 768px) 240px, 33vw"
              unoptimized
              className="object-cover transition duration-300 group-hover:scale-105 group-hover:brightness-90"
            />
          </Link>
        ))}
      </div>
      <div ref={observerRef} className="h-12" aria-hidden />
    </>
  );
}
