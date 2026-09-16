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
