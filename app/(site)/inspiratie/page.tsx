import type { Metadata } from "next";
import Image from "next/image";
import { CONTACT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Inspiratie — Meisterworks",
};

const POSTS = Array.from({ length: 12 }, (_, index) => ({
  id: `ig-post-${index + 1}`,
  isVideo: index === 6,
  src: index < 8 ? `/assets/ig-post-${index + 1}.jpg` : undefined,
}));

export default function InspiratiePage() {
  return (
    <main>
      <header className="mx-auto max-w-[var(--max-width)] px-7 pt-[72px] pb-12 text-center">
        <div className="mb-4 text-[13px] tracking-[0.16em] text-[oklch(0.5_0.01_60)] uppercase">
          Inspiratie
        </div>
        <h1 className="font-serif-display m-0 mb-[18px] text-[clamp(30px,4.4vw,46px)] leading-[1.15] font-medium">
          Ons werk, dagelijks bijgehouden.
        </h1>
        <p className="mx-auto mb-7 max-w-[560px] text-[16px] leading-[1.7] text-[oklch(0.42_0.008_60)]">
          Een doorlopend overzicht van projecten, details en werk in uitvoering
          — rechtstreeks van onze Instagram.
        </p>
        <a
          href={CONTACT.instagram}
          target="_blank"
          rel="noreferrer"
          className="btn-outline gap-2 px-[26px] py-[13px]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <rect
              x="3"
              y="3"
              width="18"
              height="18"
              rx="5"
              stroke="currentColor"
              strokeWidth="1.6"
            />
            <circle
              cx="12"
              cy="12"
              r="4"
              stroke="currentColor"
              strokeWidth="1.6"
            />
            <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
          </svg>
          {CONTACT.instagramHandle} volgen
        </a>
      </header>

      <section className="mx-auto max-w-[var(--max-width)] px-7 pb-[100px]">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-1">
          {POSTS.map((post) => (
            <a
              key={post.id}
              href={CONTACT.instagram}
              target="_blank"
              rel="noreferrer"
              className="relative block aspect-[4/5] overflow-hidden bg-[oklch(0.9_0.006_75)]"
            >
              {post.src ? (
                <Image
                  src={post.src}
                  alt="Instagram post van Meisterworks"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1280px) 300px, 50vw"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-[12px] tracking-[0.08em] text-[oklch(0.55_0.008_60)] uppercase">
                  Instagram post
                </div>
              )}
              {post.isVideo ? (
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
              ) : null}
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
