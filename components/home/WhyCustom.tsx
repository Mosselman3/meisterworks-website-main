"use client";

import { useEffect, useRef, useState } from "react";
import { WHY_CUSTOM_TEXT } from "@/lib/content";
import { CoverImage } from "@/components/ui";

const WORDS = WHY_CUSTOM_TEXT.split(" ");

export function WhyCustom() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCount, setActiveCount] = useState(0);

  useEffect(() => {
    let frame = 0;
    const loop = () => {
      const el = sectionRef.current;
      if (el) {
        const vh = window.innerHeight || 900;
        const rect = el.getBoundingClientRect();
        const reveal = Math.max(
          0,
          Math.min(1, (vh * 0.8 - rect.top) / (rect.height * 0.75)),
        );
        const next = Math.round(reveal * WORDS.length);
        setActiveCount((current) => (current === next ? current : next));
      }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      ref={sectionRef}
      className="bg-[oklch(0.14_0.006_60)] px-7 pt-[110px] pb-[90px]"
    >
      <div className="mx-auto max-w-[var(--max-width)]">
        <div className="mb-7 text-[13px] tracking-[0.16em] text-[oklch(0.5_0.008_75)] uppercase">
          — Waarom maatwerk
        </div>
        <p className="font-serif-display m-0 max-w-[920px] text-[clamp(24px,3.4vw,38px)] leading-[1.55] tracking-[0.04em]">
          {WORDS.map((word, index) => (
            <span
              key={`${word}-${index}`}
              className="transition-colors duration-[250ms] ease-in-out"
              style={{
                color:
                  index < activeCount
                    ? "oklch(0.95 0.004 75)"
                    : "oklch(0.4 0.008 60)",
              }}
            >
              {word}{" "}
            </span>
          ))}
        </p>
        <div className="mt-16 grid grid-cols-2 gap-5 min-[900px]:grid-cols-3">
          <CoverImage
            src="/assets/double-doors-black.jpg"
            alt="Stalen glaswand op maat"
            className="aspect-[3/4]"
            sizes="(min-width: 900px) 33vw, 50vw"
          />
          <CoverImage
            src="/assets/detail-green.jpg"
            alt="Detail poedercoating"
            className="aspect-[3/4]"
            sizes="(min-width: 900px) 33vw, 50vw"
          />
          <CoverImage
            src="/assets/arched-bronze-door.jpg"
            alt="Stalen draaideur op maat"
            className="hidden aspect-[3/4] min-[900px]:block"
            sizes="(min-width: 900px) 33vw, 50vw"
          />
        </div>
      </div>
    </div>
  );
}
