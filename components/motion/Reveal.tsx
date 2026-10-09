"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

export type RevealVariant = "rise" | "fade" | "image" | "from-start" | "from-end";

type RevealProps = {
  as?: ElementType;
  variant?: RevealVariant;
  stagger?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

type RevealFn = () => void;

const listeners = new WeakMap<Element, RevealFn>();
let observer: IntersectionObserver | null = null;

function getObserver() {
  if (observer) return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const reveal = listeners.get(entry.target);
        if (!reveal) continue;
        reveal();
        observer?.unobserve(entry.target);
        listeners.delete(entry.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0 },
  );
  return observer;
}

function registerReveal(node: HTMLElement, reveal: RevealFn) {
  listeners.set(node, reveal);
  getObserver().observe(node);
}

function unregisterReveal(node: HTMLElement) {
  listeners.delete(node);
  observer?.unobserve(node);
}

function classNames(...parts: Array<string | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function Reveal({
  as: Tag = "div",
  variant = "rise",
  stagger = 0,
  className,
  style,
  children,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!document.documentElement.classList.contains("motion")) {
      node.classList.add("is-in");
      return;
    }

    const show = () => {
      node.classList.add("is-in");
      unregisterReveal(node);
    };
    registerReveal(node, show);

    const frame = requestAnimationFrame(() => {
      if (node.classList.contains("is-in")) return;
      const rect = node.getBoundingClientRect();
      const height = window.innerHeight || 0;
      if (rect.bottom > height * 0.12 && rect.top < height * 0.92) show();
    });

    return () => {
      cancelAnimationFrame(frame);
      unregisterReveal(node);
    };
  }, []);

  return (
    <Tag
      ref={ref}
      className={classNames("reveal", `reveal-${variant}`, className)}
      style={{ ...style, "--reveal-i": stagger } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

export function HeroLoad({
  stagger = 0,
  className,
  children,
}: {
  stagger?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={classNames("hero-load", className)}
      style={{ "--hero-i": stagger } as CSSProperties}
    >
      {children}
    </div>
  );
}
