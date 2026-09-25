import type { Metadata } from "next";
import { InspirationGrid } from "@/components/inspiration/InspirationGrid";
import { listInspirationMedia } from "@/lib/inspiration";
import { CONTACT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Inspiratie — Meisterworks",
};

export default function InspiratiePage() {
  const posts = listInspirationMedia();

  return (
    <main>
      <header className="mx-auto max-w-[var(--max-width)] px-7 pt-[72px] pb-12 text-center">
        <div className="mb-4 text-[13px] tracking-[0.16em] text-[oklch(0.5_0.01_60)] uppercase">
          Inspiratie
        </div>
        <h1 className="font-serif-display m-0 mb-[18px] text-[clamp(30px,4.4vw,46px)] font-normal">
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

      <section className="mx-auto max-w-[var(--max-width)] px-0 pb-[100px] min-[720px]:px-7">
        <InspirationGrid posts={posts} />
      </section>
    </main>
  );
}
