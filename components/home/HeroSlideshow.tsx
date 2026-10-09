"use client";

import { getImageProps } from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";

const SLIDES = [
  {
    portrait: {
      src: "/assets/hero/portrait-1.jpg",
      alt: "Stalen deur met boog, naast een palm in een lichte kamer",
      width: 768,
      height: 1024,
    },
    landscape: {
      src: "/assets/hero/landscape-1.jpg",
      alt: "Bruine stalen deuren in een lichte hal, open naar de eetkamer",
      width: 1024,
      height: 683,
    },
  },
  {
    portrait: {
      src: "/assets/hero/portrait-2.jpg",
      alt: "Bronzen stalen deuren met uitzicht op het terras",
      width: 768,
      height: 1024,
    },
    landscape: {
      src: "/assets/hero/landscape-2.jpg",
      alt: "Hand op het bruine stalen deurprofiel",
      width: 1024,
      height: 683,
    },
  },
  {
    portrait: {
      src: "/assets/hero/portrait-3.jpg",
      alt: "Zwarte stalen deur, open naar de woonkamer",
      width: 768,
      height: 1024,
    },
    landscape: {
      src: "/assets/hero/landscape-3.jpg",
      alt: "Stalen deur met boog in een hal naast de trap",
      width: 1024,
      height: 680,
    },
  },
] as const;

const INTERVAL_MS = 3000;
const LANDSCAPE_MEDIA = "(orientation: landscape)";

function subscribeToOrientation(onChange: () => void) {
  const media = window.matchMedia(LANDSCAPE_MEDIA);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

export function HeroSlideshow() {
  const landscapeScreen = useSyncExternalStore(
    subscribeToOrientation,
    () => window.matchMedia(LANDSCAPE_MEDIA).matches,
    () => false,
  );
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
        const portrait = getImageProps({
          src: slide.portrait.src,
          alt: slide.portrait.alt,
          width: slide.portrait.width,
          height: slide.portrait.height,
          priority: i === 0,
          sizes: "100vw",
        });
        const landscape = getImageProps({
          src: slide.landscape.src,
          alt: slide.landscape.alt,
          width: slide.landscape.width,
          height: slide.landscape.height,
          priority: i === 0,
          sizes: "100vw",
        });

        return (
          <picture
            key={slide.portrait.src}
            aria-hidden={!active}
            className={`absolute inset-0 transition-opacity duration-[1400ms] ease-in-out motion-reduce:transition-none ${
              active ? "opacity-100" : "opacity-0"
            }`}
          >
            <source media={LANDSCAPE_MEDIA} srcSet={landscape.props.srcSet} />
            <img
              {...portrait.props}
              alt={landscapeScreen ? slide.landscape.alt : slide.portrait.alt}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </picture>
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
