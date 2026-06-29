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
      className="px-4 py-6 sm:px-6 sm:py-10 fixed inset-0 z-100 overflow-y-auto bg-background/95 backdrop-blur-md [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      onClick={onClose}
    >
      <Button
        type="button"
        variant="ghost"
        size="icon-lg"
        className="fixed right-4 top-4 z-10 rounded-full bg-background/80 shadow-sm cursor-pointer size-6 sm:size-12 opacity-60 sm:opacity-100"
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
          className="fixed left-6 sm:left-4 top-1/2 z-10 inline-flex size-5 sm:size-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-background/80 text-foreground/60 shadow-sm backdrop-blur-sm transition before:absolute before:-inset-3 before:content-[''] hover:bg-background/60 hover:text-foreground/90 opacity-60 sm:opacity-100"
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
          className="fixed right-6 sm:right-4 top-1/2 z-10 inline-flex size-5 sm:size-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-background/80 text-foreground/60 shadow-sm backdrop-blur-sm transition before:absolute before:-inset-3 before:content-[''] hover:bg-background/60 hover:text-foreground/90 opacity-60 sm:opacity-100"
        >
          <ChevronRightIcon className="size-5 sm:size-6" />
        </button>
      )}
    </div>
  );
}
