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

type CtaTone = "ink" | "bronze" | "paper" | "stone";

type CtaVariant = {
  id: string;
  eyebrow: string;
  title: string;
  action: string;
  href: string;
  tone: CtaTone;
};

const CTA_VARIANTS: CtaVariant[] = [
  {
    id: "configurator",
    eyebrow: "Configurator",
    title: "Ontwerp uw deur",
    action: "Starten",
    href: ROUTES.configurator,
    tone: "ink",
  },
  {
    id: "offerte",
    eyebrow: "Offerte",
    title: "Vraag een prijs",
    action: "Aanvragen",
    href: ROUTES.offerte,
    tone: "bronze",
  },
  {
    id: "afspraak",
    eyebrow: "Showroom",
    title: "Plan een bezoek",
    action: "Afspraak",
    href: ROUTES.afspraak,
    tone: "paper",
  },
  {
    id: "reviews",
    eyebrow: "Klanten",
    title: "Lees de reviews",
    action: "Bekijken",
    href: ROUTES.reviews,
    tone: "stone",
  },
];

const TONE_CLASS: Record<CtaTone, string> = {
  ink: "bg-[oklch(0.16_0.006_60)] text-[oklch(0.96_0.004_75)]",
  bronze: "bg-[var(--accent)] text-[var(--ink-dark)]",
  paper: "bg-[oklch(0.96_0.008_80)] text-[var(--ink)]",
  stone: "bg-[oklch(0.28_0.012_55)] text-[oklch(0.96_0.004_75)]",
};

const ACTION_CLASS: Record<CtaTone, string> = {
  ink: "bg-[var(--accent)] text-[var(--ink-dark)]",
  bronze: "bg-[var(--ink-dark)] text-[oklch(0.96_0.004_75)]",
  paper: "border border-[oklch(0.28_0.012_55)] text-[var(--ink)]",
  stone: "border border-[oklch(0.9_0.004_75)] text-[oklch(0.96_0.004_75)]",
};

type GridCell =
  | { kind: "media"; post: InspirationMedia; mediaIndex: number }
  | { kind: "cta"; variant: CtaVariant; id: string };

/** A card roughly every 12 photos, always the center cell of its row. */
function composeGrid(posts: InspirationMedia[]): GridCell[] {
  const rand = mulberry32(0x4d4557);
  const cells: GridCell[] = [];
  let since = 0;
  let lastVariant = -1;
  let nextAt = 11 + Math.floor(rand() * 3);

  posts.forEach((post, mediaIndex) => {
    const centerSlot = cells.length % 3 === 1;
    if (centerSlot && since >= nextAt) {
      let pick = Math.floor(rand() * CTA_VARIANTS.length);
      if (pick === lastVariant) pick = (pick + 1) % CTA_VARIANTS.length;
      lastVariant = pick;
      const variant = CTA_VARIANTS[pick]!;
      cells.push({ kind: "cta", variant, id: `cta-${post.id}` });
      since = 0;
      nextAt = 11 + Math.floor(rand() * 3);
    }
    cells.push({ kind: "media", post, mediaIndex });
    since += 1;
  });

  return cells;
}

function mulberry32(seed: number) {
  let state = seed;
  return () => {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function finePointer() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export function InspirationGrid({ posts }: InspirationGridProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const cells = composeGrid(posts);

  function closeLightbox() {
    setLightboxIndex(null);
    returnFocus.current?.focus();
  }

  return (
    <>
    <div className="grid grid-cols-3 gap-px min-[720px]:gap-1">
      {cells.map((cell) => {
        if (cell.kind === "cta") {
          return <InspirationCta key={cell.id} variant={cell.variant} />;
        }
        const { post, mediaIndex } = cell;
        const eager = mediaIndex < EAGER_COUNT;
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
                fetchPriority={mediaIndex < FIRST_ROW ? "high" : "auto"}
                decoding="async"
                className="h-full w-full object-cover"
              />
            ) : (
              <InspirationVideo src={post.src} eager={eager} />
            )}
            {post.kind === "video" ? <PlayIcon /> : null}
            <div
              className={`absolute inset-0 z-[3] flex items-center justify-center gap-2 bg-[oklch(0.13_0.006_60/0.72)] p-2 transition-opacity duration-150 ${
                open
                  ? "pointer-events-auto opacity-100"
                  : "pointer-events-none opacity-0 [@media(hover:hover)_and_(pointer:fine)]:group-hover:pointer-events-auto [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-100 [@media(hover:hover)_and_(pointer:fine)]:group-focus-within:pointer-events-auto [@media(hover:hover)_and_(pointer:fine)]:group-focus-within:opacity-100"
              }`}
            >
              <button
                type="button"
                aria-label="Groter bekijken"
                className={iconButtonClass}
                onClick={(event) => {
                  event.stopPropagation();
                  returnFocus.current = event.currentTarget;
                  setLightboxIndex(mediaIndex);
                }}
              >
                <EyeIcon />
              </button>
              <Link
                href={ROUTES.configurator}
                aria-label="Ontwerp een deur"
                className={iconButtonClass}
              >
                <ConfigureIcon />
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

const iconButtonClass =
  "inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-[oklch(0.9_0.004_75)] bg-[oklch(0.16_0.006_60/0.55)] text-[oklch(0.96_0.004_75)] transition duration-150 hover:bg-[var(--accent)] hover:text-[var(--ink-dark)] hover:border-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-current active:scale-[0.97]";

function InspirationCta({ variant }: { variant: CtaVariant }) {
  return (
    <Link
      href={variant.href}
      className={`@container flex aspect-square flex-col justify-between p-2.5 min-[720px]:p-6 ${TONE_CLASS[variant.tone]}`}
    >
      <span className="text-[9px] tracking-[0.16em] uppercase opacity-70 @[150px]:text-[11px] @[220px]:text-[12px]">
        {variant.eyebrow}
      </span>
      <span className="font-serif-display text-[14px] leading-[1.15] tracking-[0.04em] uppercase @[150px]:text-[20px] @[220px]:text-[28px] @[320px]:text-[34px]">
        {variant.title}
      </span>
      <span
        className={`inline-flex w-fit items-center rounded-full px-2.5 py-1 text-[10px] tracking-[0.04em] @[150px]:px-3.5 @[150px]:py-1.5 @[150px]:text-[12px] @[220px]:text-[13px] ${ACTION_CLASS[variant.tone]}`}
      >
        {variant.action}
      </span>
    </Link>
  );
}

function EyeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M2.5 12s3.5-6.5 9.5-6.5S21.5 12 21.5 12s-3.5 6.5-9.5 6.5S2.5 12 2.5 12Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="12" r="2.6" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function ConfigureIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="9" cy="7" r="2.1" fill="currentColor" />
      <circle cx="15" cy="12" r="2.1" fill="currentColor" />
      <circle cx="8" cy="17" r="2.1" fill="currentColor" />
    </svg>
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
