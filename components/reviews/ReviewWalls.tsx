"use client";

import { useEffect, useRef } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { ALL_REVIEWS, reviewColumns } from "@/lib/content";

const PARALLAX_DISTANCE = 64;
const SPEEDS = [1.8, -1.8, 2.4, -2.4];

function Wall({ reviews }: { reviews: typeof ALL_REVIEWS }) {
  const wallRef = useRef<HTMLDivElement>(null);
  const colRefs = useRef<(HTMLDivElement | null)[]>([]);
  const columns = reviewColumns(reviews, 4);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const wall = wallRef.current;
      if (wall) {
        const rect = wall.getBoundingClientRect();
        const viewportHeight = window.innerHeight || 900;
        const progress = Math.max(
          -1,
          Math.min(1, ((viewportHeight - rect.top) / (viewportHeight + rect.height)) * 2 - 1),
        );

        colRefs.current.forEach((column, index) => {
          if (column) {
            column.style.transform = `translateY(${progress * -PARALLAX_DISTANCE * SPEEDS[index % SPEEDS.length]}px)`;
          }
        });
      }

      frame = requestAnimationFrame(update);
    };

    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div ref={wallRef} className="mx-auto max-w-[var(--max-width)] px-7 py-40">
      <div
        data-wall-cols="true"
        className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {columns.map((column, colIndex) => (
          <div
            key={colIndex}
            ref={(node) => {
              colRefs.current[colIndex] = node;
            }}
            className="flex flex-col gap-3.5 will-change-transform"
          >
            {column.map((review, index) => (
              <Reveal
                key={`${review.name}-${review.time}`}
                variant="fade"
                stagger={Math.min(index, 3)}
              >
              <div
                className="rounded-2xl bg-white p-4 shadow-[0_1px_3px_oklch(0_0_0_/_0.05)]"
              >
                <div className="mb-2 text-[12px] tracking-[0.1em] text-[var(--accent)]">
                  {review.stars}
                </div>
                <p className="m-0 mb-3 text-[14px] font-light leading-[1.55] text-[oklch(0.25_0.008_60)]">
                  “{review.quote}”
                </p>
                <div className="text-[13px] font-semibold text-[oklch(0.2_0.008_60)]">
                  {review.name}
                </div>
                <div className="text-[12px] text-[oklch(0.55_0.008_60)]">
                  Google review · {review.time}
                </div>
              </div>
              </Reveal>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ReviewWalls() {
  return <Wall reviews={ALL_REVIEWS.slice(0, 20)} />;
}

export function ReviewWallB() {
  return <Wall reviews={ALL_REVIEWS.slice(20)} />;
}
