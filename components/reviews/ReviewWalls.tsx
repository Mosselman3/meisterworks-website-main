"use client";

import { useEffect, useRef } from "react";
import { ALL_REVIEWS, reviewColumns } from "@/lib/content";

const SPEEDS = [1, -1, 1.3, -1.3];

function Wall({ reviews }: { reviews: typeof ALL_REVIEWS }) {
  const wallRef = useRef<HTMLDivElement>(null);
  const colRefs = useRef<(HTMLDivElement | null)[]>([]);
  const columns = reviewColumns(reviews, 4);

  useEffect(() => {
    let frame = 0;
    const loop = () => {
      const el = wallRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || 900;
        const progress = Math.max(
          -1,
          Math.min(1, ((vh - rect.top) / (vh + rect.height)) * 2 - 1),
        );
        colRefs.current.forEach((col, index) => {
          if (col) {
            col.style.transform = `translateY(${progress * -60 * SPEEDS[index % SPEEDS.length]}px)`;
          }
        });
      }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      ref={wallRef}
      className="relative mx-auto h-[900px] max-w-[var(--max-width)] overflow-hidden px-7 py-10"
    >
      <div
        data-wall-cols="true"
        className="grid h-full grid-cols-4 gap-5"
      >
        {columns.map((column, colIndex) => (
          <div
            key={colIndex}
            ref={(node) => {
              colRefs.current[colIndex] = node;
            }}
            className="relative flex flex-col gap-5"
          >
            {column.map((review) => (
              <div
                key={`${review.name}-${review.time}`}
                className="rounded-2xl bg-white p-6 shadow-[0_1px_3px_oklch(0_0_0_/_0.05)]"
              >
                <div className="mb-3 text-[13px] tracking-[0.1em] text-[var(--accent)]">
                  {review.stars}
                </div>
                <p className="m-0 mb-4 text-[15px] font-light leading-[1.65] text-[oklch(0.25_0.008_60)]">
                  “{review.quote}”
                </p>
                <div className="text-[13px] font-semibold text-[oklch(0.2_0.008_60)]">
                  {review.name}
                </div>
                <div className="text-[12px] text-[oklch(0.55_0.008_60)]">
                  Google review · {review.time}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[60px] bg-[linear-gradient(180deg,var(--background),transparent)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[60px] bg-[linear-gradient(0deg,var(--background),transparent)]" />
    </div>
  );
}

export function ReviewWalls() {
  return (
    <>
      <Wall reviews={ALL_REVIEWS.slice(0, 20)} />
    </>
  );
}

export function ReviewWallB() {
  return <Wall reviews={ALL_REVIEWS.slice(20)} />;
}
