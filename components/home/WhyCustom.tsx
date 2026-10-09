"use client";

import { useEffect, useRef, useState } from "react";
import { WHY_CUSTOM_TEXT } from "@/lib/content";

const WORDS = WHY_CUSTOM_TEXT.split(" ");
const LIT = "oklch(0.97 0.004 75)";
const DIM = "oklch(0.5 0.008 70)";

function revealFor(rect: DOMRect, viewportHeight: number) {
  const start = viewportHeight * 0.82;
  const end = viewportHeight * 0.55;
  const finish = end - rect.height;
  const span = start - finish;
  if (span <= 0) return 1;
  return Math.max(0, Math.min(1, (start - rect.top) / span));
}

export function WhyCustom() {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [activeCount, setActiveCount] = useState(0);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) {
      setActiveCount(WORDS.length);
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const el = textRef.current;
      if (!el) return;
      const viewportHeight = window.innerHeight || 900;
      const reveal = revealFor(el.getBoundingClientRect(), viewportHeight);
      const next = Math.round(reveal * WORDS.length);
      setActiveCount((current) => (current === next ? current : next));
    };
    const requestUpdate = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <section className="bg-[oklch(0.14_0.006_60)] px-7 py-[120px] min-[900px]:py-[150px]">
      <div className="mx-auto max-w-[860px]">
        <h2 className="m-0 mb-8 flex items-center gap-4 text-[15px] font-medium tracking-[0.18em] text-[oklch(0.9_0.012_75)] uppercase">
          <span className="h-px w-10 shrink-0 bg-[var(--accent)]" aria-hidden="true" />
          Waarom maatwerk
        </h2>
        <p
          ref={textRef}
          className="font-serif-display m-0 text-[clamp(26px,3.6vw,42px)] leading-[1.45]"
        >
          {WORDS.map((word, index) => (
            <span
              key={`${word}-${index}`}
              className="transition-colors duration-500 ease-out"
              style={{ color: index < activeCount ? LIT : DIM }}
            >
              {word}{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
