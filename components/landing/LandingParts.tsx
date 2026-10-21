import Link from "next/link";
import type { ReactNode } from "react";
import { HeroLoad, Reveal } from "@/components/motion/Reveal";
import { ArrowIcon, CoverImage } from "@/components/ui";
import { breadcrumbJsonLd, type BreadcrumbItem } from "@/lib/seo";

const ACTION_CLASS = {
  accent: "btn-accent btn-accent-lg gap-2",
  dark: "btn-dark gap-2",
  outline: "btn-outline gap-2",
  light: "btn-outline-light gap-2",
  ghost: "btn-ghost gap-2 px-[30px] py-[15px] text-[14px] font-medium",
} as const;

export type LandingAction = {
  label: string;
  href: string;
  tone?: keyof typeof ACTION_CLASS;
};

export function LandingBreadcrumbs({ items }: { items: readonly BreadcrumbItem[] }) {
  const jsonLd = breadcrumbJsonLd(items);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Broodkruimelpad" className="mx-auto w-full max-w-[var(--max-width)] px-7 pt-[22px]">
        <ol className="m-0 flex list-none flex-wrap items-center gap-x-2 gap-y-1 p-0 text-[13px] text-[oklch(0.5_0.008_60)]">
          {items.map((item, index) => {
            const current = index === items.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-2">
                {index > 0 ? <span aria-hidden="true">/</span> : null}
                {current ? (
                  <span aria-current="page">{item.name}</span>
                ) : (
                  <Link href={item.path} className="border-b border-[oklch(0.75_0.006_75)] pb-px">
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

export function LandingHero({
  kicker,
  title,
  image,
  alt,
}: {
  kicker: string;
  title: string;
  image: string;
  alt: string;
}) {
  return (
    <section className="relative mx-7 mt-4 flex min-h-[68vh] items-end overflow-hidden rounded-[18px]">
      <div className="absolute inset-0">
        <CoverImage src={image} alt={alt} className="h-full w-full" radius={18} priority sizes="100vw" />
      </div>
      <div className="absolute inset-0 z-[1] rounded-[18px] bg-[linear-gradient(180deg,oklch(0.14_0.006_60_/_0.05)_0%,oklch(0.12_0.006_60_/_0.3)_55%,oklch(0.1_0.006_60_/_0.78)_100%)]" />
      <div className="relative z-[2] max-w-[760px] px-7 pb-12 sm:px-11 sm:pb-14">
        <HeroLoad>
          <div className="mb-4 text-[13px] font-medium tracking-[0.18em] text-[var(--accent)] uppercase">
            {kicker}
          </div>
        </HeroLoad>
        <HeroLoad stagger={1}>
          <h1 className="font-serif-display m-0 text-[clamp(34px,5vw,58px)] font-normal text-[oklch(0.98_0.004_75)]">
            {title}
          </h1>
        </HeroLoad>
      </div>
    </section>
  );
}

export function LandingActions({ actions }: { actions: readonly LandingAction[] }) {
  return (
    <div className="mt-8 flex flex-wrap gap-4">
      {actions.map((action) => (
        <Link key={`${action.href}-${action.label}`} href={action.href} className={ACTION_CLASS[action.tone ?? "dark"]}>
          {action.label}
          <ArrowIcon />
        </Link>
      ))}
    </div>
  );
}

export function LandingDoorCard({
  href,
  image,
  alt,
  title,
  body,
}: {
  href: string;
  image: string;
  alt: string;
  title: string;
  body: string;
}) {
  return (
    <Reveal className="h-full">
      <Link href={href} className="home-product-card h-full">
        <Reveal variant="image" className="home-product-image">
          <CoverImage
            src={image}
            alt={alt}
            className="aspect-[4/5]"
            sizes="(min-width: 1100px) 33vw, 50vw"
          />
        </Reveal>
        <div className="home-product-card-body px-6 py-[26px]">
          <div className="mb-2 flex items-center justify-between gap-2.5">
            <h3 className="home-product-card-title font-serif-display m-0 text-[22px] font-normal">{title}</h3>
            <ArrowIcon size={18} />
          </div>
          <p className="home-product-card-blurb m-0 text-[14px] leading-[1.55] text-[oklch(0.45_0.008_60)]">{body}</p>
        </div>
      </Link>
    </Reveal>
  );
}

export function LandingCtaBand({
  title,
  children,
  actions,
}: {
  title: string;
  children: ReactNode;
  actions: readonly LandingAction[];
}) {
  return (
    <section className="bg-[oklch(0.16_0.006_60)] px-7 py-20 text-center">
      <Reveal className="mx-auto max-w-[680px]">
        <h2 className="font-serif-display m-0 mb-[18px] text-[clamp(26px,3.4vw,36px)] font-normal text-[oklch(0.97_0.004_75)]">
          {title}
        </h2>
        <div className="text-[15px] leading-[1.7] text-[oklch(0.72_0.008_75)]">{children}</div>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {actions.map((action) => (
            <Link key={`${action.href}-${action.label}`} href={action.href} className={ACTION_CLASS[action.tone ?? "accent"]}>
              {action.label}
              <ArrowIcon />
            </Link>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
