"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { PRODUCTS, ROUTES, productPath } from "@/lib/site";

type NavChild = {
  href: string;
  label: string;
};

type NavLink = {
  href: string;
  label: string;
  match?: string;
  hideInCompact?: boolean;
  children?: NavChild[];
};

const NAV_LINKS: NavLink[] = [
  {
    href: ROUTES.deuren,
    label: "Deuren",
    children: PRODUCTS.map((product) => ({
      href: productPath(product.slug),
      label: product.title,
    })),
  },
  { href: ROUTES.projecten, label: "Projecten", hideInCompact: true },
  { href: ROUTES.inspiratie, label: "Inspiratie", match: ROUTES.inspiratie },
  { href: ROUTES.vakmanschap, label: "Vakmanschap", hideInCompact: true },
  { href: ROUTES.reviews, label: "Reviews", match: ROUTES.reviews },
  { href: ROUTES.offerte, label: "Snelle offerte", match: ROUTES.offerte },
];

function hasChildren(link: NavLink): link is NavLink & { children: NavChild[] } {
  return Boolean(link.children?.length);
}

function isCurrent(pathname: string, link: NavLink) {
  if (link.match && pathname === link.match) return true;
  return (
    link.children?.some(
      (child) => pathname === child.href || pathname.startsWith(`${child.href}/`),
    ) ?? false
  );
}

function NavChevron({ open }: { open: boolean }) {
  return (
    <span className="inline-flex h-[11px] w-[14px] items-center justify-center" aria-hidden="true">
      <svg
        width="10"
        height="10"
        viewBox="0 0 12 12"
        fill="none"
        className="origin-center transition-transform duration-200"
        style={{ transform: open ? "rotate(180deg)" : "none" }}
      >
        <path
          d="M2.25 4.25 6 8l3.75-3.75"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [desktopMenu, setDesktopMenu] = useState<string | null>(null);
  const [mobileMenu, setMobileMenu] = useState<string | null>(null);
  const compact = pathname === ROUTES.configurator;
  const links = NAV_LINKS.filter((link) => !compact || !link.hideInCompact);

  useEffect(() => {
    setOpen(false);
    setDesktopMenu(null);
    setMobileMenu(null);
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
          <span className="font-serif-display text-[15px] font-normal tracking-[0.18em] text-[var(--nav-text-strong)]">
            MEISTERWORKS
          </span>
        </Link>

        <nav
          className="hidden items-center gap-6 min-[1080px]:flex"
          aria-label="Hoofdnavigatie"
        >
          {links.map((link) =>
            hasChildren(link) ? (
              <div
                key={link.href}
                className="relative flex items-center py-2"
                onMouseEnter={() => setDesktopMenu(link.href)}
                onMouseLeave={() => setDesktopMenu(null)}
                onFocus={() => setDesktopMenu(link.href)}
                onBlur={(event) => {
                  const next = event.relatedTarget;
                  if (!(next instanceof Node) || !event.currentTarget.contains(next)) {
                    setDesktopMenu(null);
                  }
                }}
              >
                <Link
                  href={link.href}
                  className={`btn-nav-link inline-flex items-center gap-2.5${isCurrent(pathname, link) ? " btn-nav-link-active" : ""}`}
                  aria-haspopup="true"
                  aria-expanded={desktopMenu === link.href}
                >
                  <span>{link.label}</span>
                  <NavChevron open={desktopMenu === link.href} />
                </Link>
                <div
                  className="nav-dropdown"
                  style={{
                    visibility: desktopMenu === link.href ? "visible" : "hidden",
                    opacity: desktopMenu === link.href ? 1 : 0,
                    pointerEvents: desktopMenu === link.href ? "auto" : "none",
                    transition: "opacity 0.18s ease, visibility 0.18s ease",
                  }}
                >
                  <div className="nav-dropdown-panel" role="menu">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        role="menuitem"
                        className={`nav-dropdown-link${pathname === child.href ? " nav-dropdown-link-active" : ""}`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`btn-nav-link${isCurrent(pathname, link) ? " btn-nav-link-active" : ""}`}
              >
                {link.label}
              </Link>
            ),
          )}
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
        {links.map((link, index) => {
          const itemStyle = {
            opacity: open ? 1 : 0,
            transform: open ? "none" : "translateY(-10px)",
            transition:
              "opacity 0.3s cubic-bezier(.22,1,.36,1), transform 0.3s cubic-bezier(.22,1,.36,1)",
            transitionDelay: `${index * 40}ms`,
          };
          const expanded = mobileMenu === link.href;

          if (!hasChildren(link)) {
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`text-[15px] ${isCurrent(pathname, link) ? "text-[var(--accent)]" : "text-[oklch(0.92_0.004_75)]"}`}
                style={itemStyle}
              >
                {link.label}
              </Link>
            );
          }

          return (
            <div key={link.href} style={itemStyle}>
              <button
                type="button"
                className={`flex w-full items-center justify-between gap-4 text-left text-[15px] ${isCurrent(pathname, link) ? "text-[var(--accent)]" : "text-[oklch(0.92_0.004_75)]"}`}
                aria-expanded={expanded}
                onClick={() => setMobileMenu(expanded ? null : link.href)}
              >
                {link.label}
                <NavChevron open={expanded} />
              </button>
              <div
                className="grid transition-[grid-template-rows] duration-300 ease-out"
                style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <div className="flex flex-col gap-3 pt-4 pl-4">
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="text-[14px] text-[oklch(0.82_0.004_75)]"
                    >
                      Alle {link.label.toLowerCase()}
                    </Link>
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setOpen(false)}
                        className={`text-[14px] ${pathname === child.href ? "text-[var(--accent)]" : "text-[oklch(0.82_0.004_75)]"}`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
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
