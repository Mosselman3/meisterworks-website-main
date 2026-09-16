"use client";

import { useEffect, useRef } from "react";
import type { MARQUEE_REVIEWS_A } from "@/lib/content";
import { REVIEW_COUNT, REVIEW_SCORE } from "@/lib/content";

type Review = (typeof MARQUEE_REVIEWS_A)[number];

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="flex w-[320px] shrink-0 flex-col gap-3 rounded-2xl bg-[oklch(0.97_0.004_75)] p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-[14px] font-semibold text-[oklch(0.14_0.006_60)]">
          {review.initial}
        </div>
        <div>
          <div className="text-[14px] font-semibold text-[oklch(0.18_0.006_60)]">
            {review.name}
          </div>
          <div className="text-[12px] text-[oklch(0.5_0.008_60)]">
            {review.context}
          </div>
        </div>
      </div>
      <div className="text-[13px] tracking-[0.1em] text-[var(--accent)]">
        ★★★★★
      </div>
      <p className="font-serif-display m-0 text-[15px] leading-[1.55] text-[oklch(0.28_0.008_60)] italic">
        “{review.quote}”
      </p>
      <div className="text-[11px] text-[oklch(0.55_0.008_60)]">
        Google review · {review.time}
      </div>
    </div>
  );
}

export function ReviewMarquee({
  rowA,
  rowB,
}: {
  rowA: Review[];
  rowB: Review[];
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const loop = () => {
      const el = sectionRef.current;
      if (el) {
        const vh = window.innerHeight || 900;
        const rect = el.getBoundingClientRect();
        const progress = Math.max(
          -1,
          Math.min(1, ((vh - rect.top) / (vh + rect.height)) * 2 - 1),
        );
        if (row1Ref.current) {
          row1Ref.current.style.transform = `translateY(${progress * -22}px)`;
        }
        if (row2Ref.current) {
          row2Ref.current.style.transform = `translateY(${progress * 22}px)`;
        }
      }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      id="reviews"
      ref={sectionRef}
      className="overflow-hidden bg-[oklch(0.16_0.006_60)] py-[100px]"
    >
      <div className="mx-auto max-w-[var(--max-width)] px-7">
        <div className="mx-auto mb-14 max-w-[620px] text-center">
          <div className="mb-[14px] text-[13px] tracking-[0.16em] text-[oklch(0.55_0.008_75)] uppercase">
            Reviews
          </div>
          <h2 className="font-serif-display m-0 mb-4 text-[clamp(30px,4vw,44px)] leading-[1.15] font-medium text-[oklch(0.97_0.004_75)]">
            Wat klanten zeggen
          </h2>
          <div className="flex items-center justify-center gap-3">
            <span className="text-[18px] tracking-[0.1em] text-[var(--accent)]">
              ★★★★★
            </span>
            <span className="text-[14px] text-[oklch(0.65_0.008_75)]">
              {REVIEW_SCORE} · {REVIEW_COUNT} reviews op Google
            </span>
          </div>
        </div>
      </div>

      <div
        ref={row1Ref}
        className="marquee-track mb-[22px] w-full overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)",
        }}
      >
        <div className="marquee-left flex w-max gap-5">
          {[...rowA, ...rowA].map((review, index) => (
            <ReviewCard key={`a-${review.name}-${index}`} review={review} />
          ))}
        </div>
      </div>

      <div
        ref={row2Ref}
        className="marquee-track w-full overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)",
        }}
      >
        <div className="marquee-right flex w-max gap-5">
          {[...rowB, ...rowB].map((review, index) => (
            <ReviewCard key={`b-${review.name}-${index}`} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
}
