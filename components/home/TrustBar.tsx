"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { REVIEW_COUNT, REVIEW_SCORE, TRUST_QUOTES } from "@/lib/content";
import { ROUTES } from "@/lib/site";

export function TrustBar() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((index) => (index + 1) % TRUST_QUOTES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[oklch(0.16_0.006_60)] px-7 py-12">
      <div
        data-trust-grid="true"
        className="mx-auto grid max-w-[var(--max-width)] items-center gap-9"
        style={{
          gridTemplateColumns: "auto 1px minmax(0,1fr) auto",
        }}
      >
        <div className="flex items-center gap-[18px]">
          <div className="font-serif-display text-[48px] leading-none text-[oklch(0.98_0.004_75)]">
            {REVIEW_SCORE}
          </div>
          <div>
            <div className="mb-1 text-[16px] tracking-[0.1em] text-[var(--accent)]">
              ★★★★★
            </div>
            <div className="text-[13px] text-[oklch(0.75_0.004_75)]">
              {REVIEW_COUNT} beoordelingen op Google
            </div>
          </div>
        </div>
        <div
          data-trust-divider="true"
          className="h-14 w-px bg-[oklch(0.32_0.006_60)]"
        />
        <div className="relative min-h-[84px]">
          {TRUST_QUOTES.map((slide, index) => (
            <div
              key={slide.name}
              className="absolute inset-0 transition-[opacity,transform] duration-700 ease-in-out"
              style={{
                opacity: index === active ? 1 : 0,
                transform: `translateY(${index === active ? 0 : 6}px)`,
                pointerEvents: index === active ? "auto" : "none",
              }}
            >
              <p className="font-serif-display m-0 mb-2.5 text-[18px] leading-[1.5] text-[oklch(0.92_0.004_75)] italic">
                “{slide.quote}”
              </p>
              <div className="text-[13px] text-[oklch(0.58_0.008_75)]">
                — {slide.name}, {slide.context}
              </div>
            </div>
          ))}
        </div>
        <Link
          href={ROUTES.reviews}
          className="mt-1 self-start border-b border-[oklch(0.4_0.006_60)] pb-1 text-[13px] tracking-[0.05em] whitespace-nowrap text-[oklch(0.85_0.004_75)] uppercase"
        >
          Alle reviews →
        </Link>
      </div>
    </div>
  );
}
