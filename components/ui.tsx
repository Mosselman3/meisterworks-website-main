import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export function CoverImage({
  src,
  alt,
  className = "",
  radius = 14,
  priority = false,
  sizes = "(min-width: 1280px) 640px, 100vw",
}: {
  src: string;
  alt: string;
  className?: string;
  radius?: number;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ borderRadius: radius }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes={sizes}
        priority={priority}
      />
    </div>
  );
}

export function LockIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      style={{ display: "block", flexShrink: 0 }}
    >
      <rect
        x="4.25"
        y="7.25"
        width="7.5"
        height="5.75"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path
        d="M5.5 7.25V5.75a2.5 2.5 0 0 1 5 0V7.25"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function FoldIcon({ open = false, size = 16 }: { open?: boolean; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      style={{
        display: "block",
        flexShrink: 0,
        transform: open ? "rotate(180deg)" : undefined,
        transition: "transform 0.2s ease",
      }}
    >
      <path
        d="M4 6 8 10 12 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 19L19 5M19 5H9M19 5V15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AccentLink({
  href,
  children,
  className = "btn-accent",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={`${className} gap-2`}>
      {children}
    </Link>
  );
}

export function SectionKicker({
  children,
  className = "text-[oklch(0.5_0.01_60)]",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mb-[14px] text-[13px] tracking-[0.16em] uppercase ${className}`}
    >
      {children}
    </div>
  );
}
