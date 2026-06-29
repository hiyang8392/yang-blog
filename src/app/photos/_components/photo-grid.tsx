"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import type { AlbumPhoto } from "@/lib/db/data/photos";
import { PhotoLightbox } from "@/app/photos/_components/photo-lightbox";

const DEFAULT_VISIBLE_COUNT = 18;

export function PhotoGrid({
  albumSlug,
  albumTitle,
  photos,
}: {
  albumSlug: string;
  albumTitle: string;
  photos: AlbumPhoto[];
}) {
  const [visibleCount, setVisibleCount] = useState(
    Math.min(DEFAULT_VISIBLE_COUNT, photos.length),
  );
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const visiblePhotos = useMemo(
    () => photos.slice(0, visibleCount),
    [photos, visibleCount],
  );

  const observerRef = useRef<HTMLDivElement | null>(null);
  const hasMore = visibleCount < photos.length;

  const photoHref = useCallback(
    (index: number) => `/photos/${albumSlug}/photo/${photos[index].id}`,
    [albumSlug, photos],
  );

  const openPhoto = useCallback(
    (index: number) => {
      setActiveIndex(index);
      window.history.pushState({}, "", photoHref(index));
    },
    [photoHref],
  );

  const selectPhoto = useCallback(
    (index: number) => {
      setActiveIndex(index);
      window.history.replaceState({}, "", photoHref(index));
    },
    [photoHref],
  );

  const close = useCallback(() => {
    window.history.back();
  }, []);

  useEffect(() => {
    const handlePopState = () => setActiveIndex(null);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

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
        {visiblePhotos.map((photo, index) => (
          <Link
            key={photo.id}
            href={photoHref(index)}
            scroll={false}
            prefetch={false}
            onClick={(event) => {
              if (
                event.metaKey ||
                event.ctrlKey ||
                event.shiftKey ||
                event.altKey ||
                event.button !== 0
              ) {
                return;
              }
              event.preventDefault();
              openPhoto(index);
            }}
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

      {activeIndex !== null && (
        <PhotoLightbox
          albumTitle={albumTitle}
          photos={photos}
          index={activeIndex}
          onIndexChange={selectPhoto}
          onClose={close}
        />
      )}
    </>
  );
}
