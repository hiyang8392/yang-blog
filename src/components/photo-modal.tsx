"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, type ReactNode } from "react";
import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PhotoModal({
  albumHref,
  prevHref,
  nextHref,
  children,
}: {
  albumHref: string;
  prevHref?: string;
  nextHref?: string;
  children: ReactNode;
}) {
  const router = useRouter();

  const close = useCallback(() => {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push(albumHref, { scroll: false });
  }, [albumHref, router]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      } else if (event.key === "ArrowLeft" && prevHref) {
        router.replace(prevHref, { scroll: false });
      } else if (event.key === "ArrowRight" && nextHref) {
        router.replace(nextHref, { scroll: false });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [close, prevHref, nextHref, router]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="px-4 py-6 sm:px-6 sm:py-10 fixed inset-0 z-100 overflow-y-auto bg-background/95 backdrop-blur-md"
      onClick={close}
    >
      <Button
        type="button"
        variant="ghost"
        size="icon-lg"
        className="fixed right-4 top-4 z-10 rounded-full bg-background/80 shadow-sm cursor-pointer"
        onClick={(event) => {
          event.stopPropagation();
          close();
        }}
        aria-label="close photo"
      >
        <XIcon className="size-5" />
      </Button>

      <div
        className="mx-auto flex min-h-full w-full max-w-3xl flex-col justify-center"
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
