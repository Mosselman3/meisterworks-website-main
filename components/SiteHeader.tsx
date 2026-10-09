"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useId, useRef, useState, type FocusEvent } from "react";
import { FoldIcon } from "@/components/ui";
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
  /** Folds into “Meer” when the desktop row cannot fit beside the logo. */
  foldWhenTight?: boolean;
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
  { href: ROUTES.projecten, label: "Projecten", hideInCompact: true, foldWhenTight: true },
  { href: ROUTES.inspiratie, label: "Inspiratie", match: ROUTES.inspiratie, foldWhenTight: true },
  { href: ROUTES.vakmanschap, label: "Vakmanschap", hideInCompact: true, foldWhenTight: true },
  { href: ROUTES.reviews, label: "Reviews", match: ROUTES.reviews, foldWhenTight: true },
  { href: ROUTES.offerte, label: "Snelle offerte", match: ROUTES.offerte },
];

const MEER_MENU = "meer";

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

function linkTone(active: boolean) {
  return active ? "text-[var(--accent)]" : "text-[var(--nav-text-strong)]";
}

export function SiteHeader() {
  const pathname = usePathname();
  const panelId = useId();
  const headerRef = useRef<HTMLElement>(null);
  const mobileScrollRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [desktopMenu, setDesktopMenu] = useState<string | null>(null);
  const [mobileMenu, setMobileMenu] = useState<string | null>(null);
  const compact = pathname === ROUTES.configurator;
  const links = NAV_LINKS.filter((link) => !compact || !link.hideInCompact);
  const foldedLinks = links.filter((link) => link.foldWhenTight);
  const foldIndex = links.findIndex((link) => link.foldWhenTight);

  useEffect(() => {
    setOpen(false);
    setDesktopMenu(null);
    setMobileMenu(null);
  }, [pathname]);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const sync = () => {
      document.documentElement.style.setProperty(
        "--site-header-h",
        `${header.getBoundingClientRect().height}px`,
      );
    };
    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(header);
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty("--site-header-h");
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) {
      document.body.dataset.navOpen = "true";
      mobileScrollRef.current?.scrollTo({ top: 0 });
    } else {
      delete document.body.dataset.navOpen;
    }
    return () => {
      document.body.style.overflow = "";
      delete document.body.dataset.navOpen;
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

  function toggleMobile() {
    const next = !open;
    if (next) {
      const parent = links.find((link) => hasChildren(link) && isCurrent(pathname, link));
      setMobileMenu(parent?.href ?? null);
    }
    setOpen(next);
  }

  function closeDesktopIfLeft(event: FocusEvent<HTMLElement>) {
    const next = event.relatedTarget;
    if (!(next instanceof Node) || !event.currentTarget.contains(next)) {
      setDesktopMenu(null);
    }
  }

  return (
    <>
      <header
        ref={headerRef}
        className="sticky top-0 z-[60] grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 border-b border-[var(--line-dark)] bg-[var(--nav)] px-4 py-[14px] backdrop-blur-[10px] min-[720px]:gap-x-6 min-[720px]:px-7"
      >
        <Link href={ROUTES.home} className="relative z-10 flex shrink-0 items-center gap-3">
          <Image
            src="/assets/logo.jpg"
            alt="Meisterworks"
            width={44}
            height={44}
            className="size-11 shrink-0 rounded-full object-cover"
            priority
          />
          <span className="font-serif-display text-[15px] font-normal tracking-[0.18em] whitespace-nowrap text-[var(--nav-text-strong)]">
            MEISTERWORKS
          </span>
        </Link>

        <div className="flex min-w-0 items-center justify-end">
          <nav
            className="@container/nav hidden w-full min-w-0 items-center justify-end min-[1080px]:flex"
            aria-label="Hoofdnavigatie"
          >
            <div className="ml-auto flex max-w-full flex-nowrap items-center gap-4 @min-[1100px]/nav:gap-6">
              {links.map((link, index) => (
                <Fragment key={link.href}>
                  {index === foldIndex && foldedLinks.length > 0 ? (
                    <div
                      className="relative flex shrink-0 items-center py-2 @min-[960px]/nav:hidden"
                      onMouseEnter={() => setDesktopMenu(MEER_MENU)}
                      onMouseLeave={() => setDesktopMenu(null)}
                      onFocus={() => setDesktopMenu(MEER_MENU)}
                      onBlur={closeDesktopIfLeft}
                    >
                      <button
                        type="button"
                        className={`btn-nav-link inline-flex items-center gap-2.5 border-0 bg-transparent p-0${
                          foldedLinks.some((item) => isCurrent(pathname, item))
                            ? " btn-nav-link-active"
                            : ""
                        }`}
                        aria-haspopup="true"
                        aria-expanded={desktopMenu === MEER_MENU}
                      >
                        <span>Meer</span>
                        <FoldIcon open={desktopMenu === MEER_MENU} size={14} />
                      </button>
                      <div
                        className="nav-dropdown nav-dropdown-end"
                        style={{
                          visibility: desktopMenu === MEER_MENU ? "visible" : "hidden",
                          opacity: desktopMenu === MEER_MENU ? 1 : 0,
                          pointerEvents: desktopMenu === MEER_MENU ? "auto" : "none",
                          transition: "opacity 0.18s ease, visibility 0.18s ease",
                        }}
                      >
                        <div className="nav-dropdown-panel" role="menu">
                          {foldedLinks.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              role="menuitem"
                              className={`nav-dropdown-link${
                                isCurrent(pathname, item) ? " nav-dropdown-link-active" : ""
                              }`}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : null}
                  {hasChildren(link) ? (
                    <div
                      className="relative flex shrink-0 items-center py-2"
                      onMouseEnter={() => setDesktopMenu(link.href)}
                      onMouseLeave={() => setDesktopMenu(null)}
                      onFocus={() => setDesktopMenu(link.href)}
                      onBlur={closeDesktopIfLeft}
                    >
                      <Link
                        href={link.href}
                        className={`btn-nav-link inline-flex items-center gap-2.5${
                          isCurrent(pathname, link) ? " btn-nav-link-active" : ""
                        }`}
                        aria-haspopup="true"
                        aria-expanded={desktopMenu === link.href}
                      >
                        <span>{link.label}</span>
                        <FoldIcon open={desktopMenu === link.href} size={14} />
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
                              className={`nav-dropdown-link${
                                pathname === child.href ? " nav-dropdown-link-active" : ""
                              }`}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className={`btn-nav-link shrink-0${
                        link.foldWhenTight ? " @max-[959px]/nav:hidden" : ""
                      }${isCurrent(pathname, link) ? " btn-nav-link-active" : ""}`}
                    >
                      {link.label}
                    </Link>
                  )}
                </Fragment>
              ))}
              <div className="flex shrink-0 items-center gap-2.5 pl-1">
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
            </div>
          </nav>

          <button
            type="button"
            className="grid size-11 shrink-0 place-items-center text-[var(--nav-text-strong)] min-[1080px]:hidden"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? "Menu sluiten" : "Menu openen"}
            onClick={toggleMobile}
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
        </div>
      </header>

      <div
        id={panelId}
        className="fixed inset-x-0 bottom-0 z-[55] flex flex-col bg-[oklch(0.145_0.006_60)] min-[1080px]:hidden"
        style={{
          top: "var(--site-header-h, 73px)",
          visibility: open ? "visible" : "hidden",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.3s ease, visibility 0.3s ease",
        }}
        aria-hidden={!open}
      >
        <nav
          ref={mobileScrollRef}
          className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-6 pt-4 pb-4 min-[720px]:px-8"
          aria-label="Mobiel menu"
        >
          {links.map((link, index) => {
            const itemStyle = {
              opacity: open ? 1 : 0,
              transform: open ? "none" : "translateY(-8px)",
              transition:
                "opacity 0.3s cubic-bezier(.22,1,.36,1), transform 0.3s cubic-bezier(.22,1,.36,1)",
              transitionDelay: `${index * 35}ms`,
            };
            const expanded = mobileMenu === link.href;
            const active = isCurrent(pathname, link);

            if (!hasChildren(link)) {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`flex min-h-12 items-center border-b border-[var(--line-dark)] text-[16px] tracking-[0.03em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] ${linkTone(active)}`}
                  style={itemStyle}
                >
                  {link.label}
                </Link>
              );
            }

            return (
              <div key={link.href} className="border-b border-[var(--line-dark)]" style={itemStyle}>
                <button
                  type="button"
                  className={`flex min-h-12 w-full items-center justify-between gap-4 bg-transparent p-0 text-left text-[16px] tracking-[0.03em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] ${linkTone(active)}`}
                  aria-expanded={expanded}
                  onClick={() => setMobileMenu(expanded ? null : link.href)}
                >
                  {link.label}
                  <FoldIcon open={expanded} size={16} />
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-out"
                  style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div className="flex flex-col gap-0.5 border-l border-[var(--line-dark)] pt-1 pb-3 pl-4">
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="flex min-h-11 items-center text-[15px] text-[var(--nav-text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
                      >
                        Alle {link.label.toLowerCase()}
                      </Link>
                      {link.children.map((child) => {
                        const childActive = pathname === child.href;
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setOpen(false)}
                            aria-current={childActive ? "page" : undefined}
                            className={`flex min-h-11 items-center text-[15px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] ${
                              childActive ? "text-[var(--accent)]" : "text-[var(--nav-text)]"
                            }`}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        <div className="flex shrink-0 flex-col gap-2.5 border-t border-[var(--line-dark)] px-6 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] min-[720px]:px-8">
          <Link
            href={ROUTES.afspraak}
            onClick={() => setOpen(false)}
            className={`btn-ghost w-full text-[14px]${pathname === ROUTES.afspraak ? " btn-ghost-active" : ""}`}
          >
            Afspraak maken
          </Link>
          {!compact ? (
            <Link
              href={ROUTES.configurator}
              onClick={() => setOpen(false)}
              className="btn-accent w-full text-[14px]"
            >
              Deur samenstellen
            </Link>
          ) : null}
        </div>
      </div>
    </>
  );
}
