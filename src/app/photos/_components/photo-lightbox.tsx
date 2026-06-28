"use client";

import { useCallback, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PhotoDetail } from "@/app/photos/_components/photo-detail";
import type { AlbumPhoto } from "@/lib/db/data/photos";

export function PhotoLightbox({
  albumTitle,
  photos,
  index,
  onIndexChange,
  onClose,
}: {
  albumTitle: string;
  photos: AlbumPhoto[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}) {
  const photo = photos[index];
  const hasPrev = index > 0;
  const hasNext = index < photos.length - 1;

  const goPrev = useCallback(() => {
    onIndexChange(Math.max(0, index - 1));
  }, [index, onIndexChange]);

  const goNext = useCallback(() => {
    onIndexChange(Math.min(photos.length - 1, index + 1));
  }, [index, photos.length, onIndexChange]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowLeft" && index > 0) {
        goPrev();
      } else if (event.key === "ArrowRight" && index < photos.length - 1) {
        goNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [goPrev, goNext, onClose, index, photos.length]);

  if (!photo) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="px-4 py-6 sm:px-6 sm:py-10 fixed inset-0 z-100 overflow-y-auto bg-background/95 backdrop-blur-md"
      onClick={onClose}
    >
      <Button
        type="button"
        variant="ghost"
        size="icon-lg"
        className="fixed right-4 top-4 z-10 rounded-full bg-background/80 shadow-sm cursor-pointer"
        onClick={(event) => {
          event.stopPropagation();
          onClose();
        }}
        aria-label="close photo"
      >
        <XIcon className="size-5" />
      </Button>

      <div
        className="mx-auto flex min-h-full w-full max-w-7xl flex-col justify-center"
        onClick={(event) => event.stopPropagation()}
      >
        <PhotoDetail
          albumTitle={albumTitle}
          photo={photo}
          maxImageHeightVh={85}
          className="pb-12 sm:pb-10"
        />
      </div>

      {hasPrev && (
        <button
          type="button"
          aria-label="上一張"
          onClick={(event) => {
            event.stopPropagation();
            goPrev();
          }}
          className="fixed bottom-28 left-2 z-10 inline-flex size-10 cursor-pointer items-center justify-center rounded-full bg-background/80 text-foreground shadow-sm backdrop-blur-sm transition hover:bg-background sm:bottom-auto sm:left-4 sm:top-1/2 sm:size-12 sm:-translate-y-1/2"
        >
          <ChevronLeftIcon className="size-5 sm:size-6" />
        </button>
      )}

      {hasNext && (
        <button
          type="button"
          aria-label="下一張"
          onClick={(event) => {
            event.stopPropagation();
            goNext();
          }}
          className="fixed bottom-28 right-2 z-10 inline-flex size-10 cursor-pointer items-center justify-center rounded-full bg-background/80 text-foreground shadow-sm backdrop-blur-sm transition hover:bg-background sm:bottom-auto sm:right-4 sm:top-1/2 sm:size-12 sm:-translate-y-1/2"
        >
          <ChevronRightIcon className="size-5 sm:size-6" />
        </button>
      )}
    </div>
  );
}
