"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { InspirationLightbox } from "@/components/inspiration/InspirationLightbox";
import type { InspirationMedia } from "@/lib/inspiration";
import { ROUTES } from "@/lib/site";

const EAGER_COUNT = 6;
const FIRST_ROW = 3;

type InspirationGridProps = {
  posts: InspirationMedia[];
};

function finePointer() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export function InspirationGrid({ posts }: InspirationGridProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  function closeLightbox() {
    setLightboxIndex(null);
    returnFocus.current?.focus();
  }

  return (
    <>
    <div className="grid grid-cols-3 gap-px min-[720px]:gap-1">
      {posts.map((post, index) => {
        const eager = index < EAGER_COUNT;
        const open = openId === post.id;
        return (
          <div
            key={post.id}
            className={`group relative aspect-square overflow-hidden bg-[oklch(0.9_0.006_75)] ${
              eager ? "" : "content-visibility-auto [contain-intrinsic-size:auto_33vw]"
            }`}
            onClick={(event) => {
              if (finePointer()) return;
              const target = event.target as HTMLElement;
              if (target.closest("a, button")) return;
              setOpenId((current) => (current === post.id ? null : post.id));
            }}
          >
            {post.kind === "image" ? (
              <img
                src={post.src}
                alt="Instagram post van Meisterworks"
                loading={eager ? "eager" : "lazy"}
                fetchPriority={index < FIRST_ROW ? "high" : "auto"}
                decoding="async"
                className="h-full w-full object-cover"
              />
            ) : (
              <InspirationVideo src={post.src} eager={eager} />
            )}
            {post.kind === "video" ? <PlayIcon /> : null}
            <div
              className={`absolute inset-0 z-[3] flex flex-col items-center justify-center gap-2 bg-[oklch(0.13_0.006_60/0.72)] p-2 transition-opacity duration-150 ${
                open
                  ? "pointer-events-auto opacity-100"
                  : "pointer-events-none opacity-0 [@media(hover:hover)_and_(pointer:fine)]:group-hover:pointer-events-auto [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-100 [@media(hover:hover)_and_(pointer:fine)]:group-focus-within:pointer-events-auto [@media(hover:hover)_and_(pointer:fine)]:group-focus-within:opacity-100"
              }`}
            >
              <button
                type="button"
                className="btn-accent max-w-full px-3 py-2 text-center text-[11px] leading-tight min-[720px]:text-[13px]"
                onClick={(event) => {
                  event.stopPropagation();
                  returnFocus.current = event.currentTarget;
                  setLightboxIndex(index);
                }}
              >
                Groter bekijken
              </button>
              <Link
                href={ROUTES.configurator}
                className="inline-flex max-w-full items-center justify-center rounded-full border border-[oklch(0.9_0.004_75)] px-3 py-2 text-center text-[11px] leading-tight text-[oklch(0.96_0.004_75)] min-[720px]:text-[13px]"
              >
                Ontwerp een deur
              </Link>
            </div>
          </div>
        );
      })}
    </div>
      {lightboxIndex !== null ? (
        <InspirationLightbox
          posts={posts}
          index={lightboxIndex}
          onIndex={setLightboxIndex}
          onClose={closeLightbox}
        />
      ) : null}
    </>
  );
}

function InspirationVideo({ src, eager }: { src: string; eager: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(eager);

  useEffect(() => {
    if (active) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setActive(true);
        observer.disconnect();
      },
      { rootMargin: "600px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [active]);

  return (
    <video
      ref={ref}
      src={active ? src : undefined}
      muted
      playsInline
      preload={active ? "metadata" : "none"}
      className="h-full w-full object-cover"
      aria-label="Instagram video van Meisterworks"
    />
  );
}

function PlayIcon() {
  return (
    <div className="pointer-events-none absolute top-2.5 right-2.5 z-[2]">
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="white"
        style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.5))" }}
      >
        <path d="M8 5v14l11-7z" />
      </svg>
    </div>
  );
}
