"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { ROUTES } from "@/lib/site";

type NavLink = {
  href: string;
  label: string;
  match?: string;
  hideInCompact?: boolean;
};

const NAV_LINKS: NavLink[] = [
  { href: ROUTES.deuren, label: "Deuren" },
  { href: ROUTES.projecten, label: "Projecten", hideInCompact: true },
  { href: ROUTES.inspiratie, label: "Inspiratie", match: ROUTES.inspiratie },
  { href: ROUTES.vakmanschap, label: "Vakmanschap", hideInCompact: true },
  { href: ROUTES.reviews, label: "Reviews", match: ROUTES.reviews },
  { href: ROUTES.offerte, label: "Snelle offerte", match: ROUTES.offerte },
];

function isCurrent(pathname: string, match?: string) {
  return Boolean(match) && pathname === match;
}

export function SiteHeader() {
  const pathname = usePathname();
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const compact = pathname === ROUTES.configurator;
  const links = NAV_LINKS.filter((link) => !compact || !link.hideInCompact);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 1080) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[var(--line-dark)] bg-[var(--nav)] px-7 py-[14px] backdrop-blur-[10px]">
        <Link href={ROUTES.home} className="flex items-center gap-3">
          <Image
            src="/assets/logo.jpg"
            alt="Meisterworks"
            width={44}
            height={44}
            className="rounded-full object-cover"
            priority
          />
          <span className="text-[15px] font-medium tracking-[0.14em] text-[var(--nav-text-strong)]">
            MEISTERWORKS
          </span>
        </Link>

        <nav
          className="hidden items-center gap-6 min-[1080px]:flex"
          aria-label="Hoofdnavigatie"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`btn-nav-link${isCurrent(pathname, link.match) ? " btn-nav-link-active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-2.5">
            <Link
              href={ROUTES.afspraak}
              className={`btn-ghost${pathname === ROUTES.afspraak ? " btn-ghost-active" : ""}`}
            >
              Afspraak maken
            </Link>
            {!compact ? (
              <Link href={ROUTES.configurator} className="btn-accent">
                Deur samenstellen
              </Link>
            ) : null}
          </div>
        </nav>

        <button
          type="button"
          className="p-1.5 text-[var(--nav-text-strong)] min-[1080px]:hidden"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={open ? "Menu sluiten" : "Menu openen"}
          onClick={() => setOpen((value) => !value)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <line
              x1="3"
              y1="6"
              x2="21"
              y2="6"
              stroke="currentColor"
              strokeWidth="1.6"
              style={{
                transformBox: "fill-box",
                transformOrigin: "center",
                transition: "transform 0.3s ease",
                transform: open ? "translateY(6px) rotate(45deg)" : "none",
              }}
            />
            <line
              x1="3"
              y1="12"
              x2="21"
              y2="12"
              stroke="currentColor"
              strokeWidth="1.6"
              style={{
                transition: "opacity 0.2s ease",
                opacity: open ? 0 : 1,
              }}
            />
            <line
              x1="3"
              y1="18"
              x2="21"
              y2="18"
              stroke="currentColor"
              strokeWidth="1.6"
              style={{
                transformBox: "fill-box",
                transformOrigin: "center",
                transition: "transform 0.3s ease",
                transform: open ? "translateY(-6px) rotate(-45deg)" : "none",
              }}
            />
          </svg>
        </button>
      </header>

      <div
        id={panelId}
        className="fixed inset-x-0 top-[73px] bottom-0 z-[55] flex flex-col justify-center gap-5 bg-[var(--nav-panel)] px-8 py-10 backdrop-blur-[16px] min-[1080px]:hidden"
        style={{
          visibility: open ? "visible" : "hidden",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.3s ease, visibility 0.3s ease",
        }}
      >
        {links.map((link, index) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className={`text-[15px] ${isCurrent(pathname, link.match) ? "text-[var(--accent)]" : "text-[oklch(0.92_0.004_75)]"}`}
            style={{
              opacity: open ? 1 : 0,
              transform: open ? "none" : "translateY(-10px)",
              transition:
                "opacity 0.3s cubic-bezier(.22,1,.36,1), transform 0.3s cubic-bezier(.22,1,.36,1)",
              transitionDelay: `${index * 40}ms`,
            }}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href={ROUTES.afspraak}
          onClick={() => setOpen(false)}
          className={`btn-ghost text-center text-[14px]${pathname === ROUTES.afspraak ? " btn-ghost-active" : ""}`}
        >
          Afspraak maken
        </Link>
        {!compact ? (
          <Link
            href={ROUTES.configurator}
            onClick={() => setOpen(false)}
            className="btn-accent text-center text-[14px]"
          >
            Deur samenstellen
          </Link>
        ) : null}
      </div>
    </>
  );
}
