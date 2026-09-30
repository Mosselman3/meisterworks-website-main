"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { DESIGN_SURCHARGES } from "@/components/configurator/catalog";

export function DesignCard({
  name,
  subtitle,
  image,
  thumb,
}: {
  name: string;
  subtitle?: string;
  image?: string;
  thumb?: ReactNode;
}) {
  return (
    <div className="flex h-full flex-col items-center overflow-hidden rounded-xl border border-[oklch(0.86_0.006_75)] bg-[oklch(0.985_0.002_75)] pt-1.5 min-[720px]:rounded-2xl min-[720px]:pt-3">
      {image ? (
        <img src={image} alt="" className="block h-auto w-[78%]" />
      ) : (
        thumb
      )}
      <div className="mt-1.5 w-full bg-[oklch(0.94_0.004_75)] px-1 py-1.5 text-center text-[10px] leading-[1.15] font-semibold tracking-[0.04em] text-[oklch(0.32_0.008_60)] uppercase min-[720px]:mt-2 min-[720px]:px-1.5 min-[720px]:py-2 min-[720px]:text-[12px] min-[720px]:tracking-[0.08em]">
        {name}
        {subtitle ? (
          <span className="mt-0.5 block text-[10px] leading-[1.2] font-medium tracking-normal text-[oklch(0.42_0.008_60)] normal-case min-[720px]:text-[11px]">
            {subtitle}
          </span>
        ) : null}
      </div>
    </div>
  );
}

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d={direction === "left" ? "M11 4 6 9l5 5" : "M7 4l5 5-5 5"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function rowsOfTwo<T>(items: readonly T[]) {
  const half = Math.ceil(items.length / 2);
  const ordered: T[] = [];
  for (let index = 0; index < half; index += 1) {
    ordered.push(items[index]);
    if (half + index < items.length) ordered.push(items[half + index]);
  }
  return ordered;
}

export function DesignMoreCarousel() {
  const designs = rowsOfTwo(DESIGN_SURCHARGES);
  const scroller = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const syncEdges = useCallback(() => {
    const node = scroller.current;
    if (!node) return;
    const max = node.scrollWidth - node.clientWidth;
    setEdges({
      start: node.scrollLeft <= 2,
      end: node.scrollLeft >= max - 2,
    });
  }, []);

  useEffect(() => {
    const node = scroller.current;
    if (!node) return;
    syncEdges();
    const observer = new ResizeObserver(syncEdges);
    observer.observe(node);
    node.addEventListener("scroll", syncEdges, { passive: true });
    return () => {
      observer.disconnect();
      node.removeEventListener("scroll", syncEdges);
    };
  }, [syncEdges]);

  function step(direction: -1 | 1) {
    const node = scroller.current;
    const grid = node?.querySelector<HTMLElement>("[data-design-grid]");
    const card = node?.querySelector<HTMLElement>("[data-design-card]");
    if (!node || !grid || !card) return;
    const styles = window.getComputedStyle(grid);
    const gap = Number.parseFloat(styles.columnGap || "0") || 0;
    node.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: "smooth" });
  }

  return (
    <div className="relative mt-4 @container">
      <div
        ref={scroller}
        className="overflow-x-auto scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div
          data-design-grid
          className="grid w-max grid-flow-col grid-rows-2 gap-2 [grid-auto-columns:calc((100cqw-1rem)/3)] @min-[28rem]:gap-3 @min-[28rem]:[grid-auto-columns:9rem]"
        >
          {designs.map((design) => (
            <div key={design.code} data-design-card className="snap-start">
              <DesignCard name={design.name} subtitle={design.subtitle} image={design.image} />
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        aria-label="Vorige ontwerpen"
        disabled={edges.start}
        onClick={() => step(-1)}
        className="absolute top-1/2 left-0 z-10 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[oklch(0.82_0.006_75)] bg-white text-[oklch(0.25_0.008_60)] shadow-sm disabled:pointer-events-none disabled:opacity-0"
      >
        <Chevron direction="left" />
      </button>
      <button
        type="button"
        aria-label="Volgende ontwerpen"
        disabled={edges.end}
        onClick={() => step(1)}
        className="absolute top-1/2 right-0 z-10 grid h-9 w-9 translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[oklch(0.82_0.006_75)] bg-white text-[oklch(0.25_0.008_60)] shadow-sm disabled:pointer-events-none disabled:opacity-0"
      >
        <Chevron direction="right" />
      </button>
    </div>
  );
}
