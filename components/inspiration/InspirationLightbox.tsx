"use client";

import { useEffect, useRef } from "react";
import type { InspirationMedia } from "@/lib/inspiration";

type InspirationLightboxProps = {
  posts: InspirationMedia[];
  index: number;
  onIndex: (index: number) => void;
  onClose: () => void;
};

export function InspirationLightbox({
  posts,
  index,
  onIndex,
  onClose,
}: InspirationLightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const post = posts[index];
  const total = posts.length;

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onIndex((index + 1) % total);
      if (event.key === "ArrowLeft") onIndex((index - 1 + total) % total);
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [index, onClose, onIndex, total]);

  if (!post) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Vergrote weergave"
      tabIndex={-1}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-[oklch(0.13_0.006_60/0.88)] p-4 outline-none"
      onClick={onClose}
    >
      <button
        type="button"
        className="absolute top-4 right-4 z-[2] rounded-full border border-[oklch(0.9_0.004_75)] px-4 py-2 text-[13px] text-[oklch(0.96_0.004_75)]"
        onClick={onClose}
      >
        Sluiten
      </button>
      <button
        type="button"
        className="absolute top-1/2 left-3 z-[2] -translate-y-1/2 rounded-full border border-[oklch(0.9_0.004_75)] px-4 py-2 text-[13px] text-[oklch(0.96_0.004_75)]"
        onClick={(event) => {
          event.stopPropagation();
          onIndex((index - 1 + total) % total);
        }}
      >
        Vorige
      </button>
      <div
        className="flex max-h-[85vh] max-w-[min(1100px,calc(100vw-7rem))] items-center justify-center"
        onClick={(event) => event.stopPropagation()}
      >
        {post.kind === "image" ? (
          <img
            src={post.src}
            alt="Instagram post van Meisterworks"
            className="max-h-[85vh] max-w-full object-contain"
          />
        ) : (
          <video
            key={post.src}
            src={post.src}
            controls
            autoPlay
            playsInline
            className="max-h-[85vh] max-w-full"
            aria-label="Instagram video van Meisterworks"
          />
        )}
      </div>
      <button
        type="button"
        className="absolute top-1/2 right-3 z-[2] -translate-y-1/2 rounded-full border border-[oklch(0.9_0.004_75)] px-4 py-2 text-[13px] text-[oklch(0.96_0.004_75)]"
        onClick={(event) => {
          event.stopPropagation();
          onIndex((index + 1) % total);
        }}
      >
        Volgende
      </button>
    </div>
  );
}
