"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { CoverImage } from "@/components/ui";
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
    <div>
      {image ? (
        <CoverImage
          src={image}
          alt={name}
          className="mb-2 aspect-[560/920] bg-[oklch(0.97_0.004_75)]"
          radius={12}
          sizes="(min-width: 900px) 220px, 33vw"
          fit="contain"
        />
      ) : (
        thumb
      )}
      <div className="text-[13px] text-[oklch(0.25_0.008_60)] min-[900px]:text-[15px]">{name}</div>
      {subtitle ? (
        <p className="m-0 mt-1 text-[12px] leading-[1.4] text-[oklch(0.45_0.008_60)] min-[900px]:text-[14px]">
          {subtitle}
        </p>
      ) : null}
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

export function DesignMoreCarousel() {
  const designs = DESIGN_SURCHARGES;
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
    const card = node?.querySelector<HTMLElement>("[data-design-card]");
    if (!node || !card) return;
    const styles = window.getComputedStyle(node);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "0") || 0;
    node.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: "smooth" });
  }

  return (
    <div className="relative mt-4">
      <div
        ref={scroller}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth min-[900px]:gap-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {designs.map((design) => (
          <div
            key={design.code}
            data-design-card
            className="w-[72%] shrink-0 snap-start min-[900px]:w-[calc((100%-3rem)/4)]"
          >
            <DesignCard name={design.name} subtitle={design.subtitle} image={design.image} />
          </div>
        ))}
      </div>
      <button
        type="button"
        aria-label="Vorige ontwerpen"
        disabled={edges.start}
        onClick={() => step(-1)}
        className="absolute top-[18%] left-0 hidden h-9 w-9 -translate-x-1/2 place-items-center rounded-full border border-[oklch(0.82_0.006_75)] bg-white text-[oklch(0.25_0.008_60)] shadow-sm min-[900px]:grid disabled:pointer-events-none disabled:opacity-0"
      >
        <Chevron direction="left" />
      </button>
      <button
        type="button"
        aria-label="Volgende ontwerpen"
        disabled={edges.end}
        onClick={() => step(1)}
        className="absolute top-[18%] right-0 hidden h-9 w-9 translate-x-1/2 place-items-center rounded-full border border-[oklch(0.82_0.006_75)] bg-white text-[oklch(0.25_0.008_60)] shadow-sm min-[900px]:grid disabled:pointer-events-none disabled:opacity-0"
      >
        <Chevron direction="right" />
      </button>
    </div>
  );
}
