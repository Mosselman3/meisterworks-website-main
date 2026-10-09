"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const SLIDES = [
  {
    src: "/assets/hero/slide-1.jpg",
    alt: "Bruine stalen deuren in een lichte hal, open naar de eetkamer",
    position: "center 42%",
  },
  {
    src: "/assets/hero/slide-2.jpg",
    alt: "Hand op het bruine stalen deurprofiel",
    position: "center 50%",
  },
  {
    src: "/assets/hero/slide-3.jpg",
    alt: "Stalen deur met boog in een hal naast de trap",
    position: "center 40%",
  },
] as const;

const INTERVAL_MS = 3000;

export function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const paused = reducedMotion || userPaused;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (paused) return;

    const tick = () => {
      setIndex((current) => (current + 1) % SLIDES.length);
    };
    let timer = window.setInterval(tick, INTERVAL_MS);

    const onVisibility = () => {
      window.clearInterval(timer);
      if (!document.hidden) timer = window.setInterval(tick, INTERVAL_MS);
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [paused]);

  return (
    <div className="absolute inset-0">
      {SLIDES.map((slide, i) => {
        const active = i === index;
        return (
          <Image
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            aria-hidden={!active}
            style={{ objectPosition: slide.position }}
            className={`object-cover transition-opacity duration-[1400ms] ease-in-out motion-reduce:transition-none ${
              active ? "opacity-100" : "opacity-0"
            }`}
          />
        );
      })}
      {reducedMotion ? null : (
        <button
          type="button"
          onClick={() => setUserPaused((value) => !value)}
          className="sr-only focus:not-sr-only focus:absolute focus:right-7 focus:bottom-6 focus:z-[3] focus:rounded-full focus:bg-[oklch(0.14_0.006_60_/_0.72)] focus:px-3.5 focus:py-2 focus:text-[13px] focus:text-white"
        >
          {userPaused ? "Slideshow afspelen" : "Slideshow pauzeren"}
        </button>
      )}
    </div>
  );
}
