import Link from "next/link";
import { ArrowIcon, CoverImage } from "@/components/ui";
import {
  COLOR_CATALOG,
  COLOR_STANDARD,
  GLASS_OPTIONS,
  HANDLE_OPTIONS,
  VLAK_OPTIONS,
  relatedProducts,
  type ProductPageCopy,
} from "@/lib/products";
import { ROUTES, getProduct } from "@/lib/site";

const GRID_IMAGE_SIZES = "(min-width: 900px) 33vw, 50vw";
const RELATED_IMAGE_SIZES =
  "(min-width: 1100px) 20vw, (min-width: 900px) 33vw, 50vw";

function StepIntro({
  kicker,
  title,
  body,
  dark = false,
}: {
  kicker: string;
  title: string;
  body: string;
  dark?: boolean;
}) {
  return (
    <div className="mb-10 max-w-[640px]">
      <div
        className={`mb-[14px] text-[13px] tracking-[0.16em] uppercase ${dark ? "text-[oklch(0.55_0.008_75)]" : "text-[oklch(0.5_0.01_60)]"}`}
      >
        {kicker}
      </div>
      <h2
        className={`font-serif-display m-0 mb-4 text-[clamp(26px,3.2vw,36px)] leading-[1.15] font-medium ${dark ? "text-[oklch(0.97_0.004_75)]" : ""}`}
      >
        {title}
      </h2>
      <p
        className={`m-0 text-[16px] leading-[1.7] ${dark ? "text-[oklch(0.65_0.008_75)]" : "text-[oklch(0.42_0.008_60)]"}`}
      >
        {body}
      </p>
    </div>
  );
}

function ComposeLink({ href, children }: { href: string; children: string }) {
  return (
    <Link href={href} className="btn-accent mt-10 inline-flex gap-2 px-[26px] py-3.5 text-[14px] tracking-[0.03em]">
      {children}
      <ArrowIcon />
    </Link>
  );
}

export function ProductView({ page }: { page: ProductPageCopy }) {
  const related = relatedProducts(page.slug);
  const product = getProduct(page.slug);
  const colorStep = "Stap 4";
  const glassStep = "Stap 5";
  const handleStep = "Stap 6";

  return (
    <main>
      <section className="relative mx-7 mt-[22px] flex min-h-[72vh] items-end overflow-hidden rounded-[18px]">
        <CoverImage
          src={page.heroImage}
          alt={page.heroAlt}
          className="absolute inset-0 h-full w-full"
          radius={18}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 z-[1] rounded-[18px] bg-[linear-gradient(180deg,oklch(0.14_0.006_60_/_0.05)_0%,oklch(0.12_0.006_60_/_0.3)_55%,oklch(0.1_0.006_60_/_0.78)_100%)]" />
        <div className="relative z-[2] max-w-[720px] px-11 pb-14">
          <div className="mb-4 text-[13px] font-medium tracking-[0.18em] text-[var(--accent)] uppercase">
            {product?.title}
          </div>
          <h1 className="font-serif-display m-0 mb-5 text-[clamp(32px,5vw,56px)] leading-[1.08] font-medium text-[oklch(0.98_0.004_75)]">
            {page.heroTitle}
          </h1>
          <p className="m-0 max-w-[500px] text-[clamp(15px,1.8vw,17px)] leading-[1.6] text-[oklch(0.88_0.004_75)]">
            {page.heroLead}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[760px] px-7 pt-20 pb-10 text-left">
        <p className="font-serif-display m-0 mb-5 text-[clamp(19px,2.2vw,23px)] leading-[1.6] text-[oklch(0.25_0.008_60)]">
          {page.introLead}
        </p>
        <p className="m-0 text-[16px] leading-[1.75] text-[oklch(0.42_0.008_60)]">
          {page.introBody}
        </p>
      </section>

      {page.productStep ? (
        <section className="mx-auto max-w-[var(--max-width)] px-7 py-[60px]">
          <StepIntro
            kicker={page.productStep.kicker}
            title={page.productStep.title}
            body={page.productStep.body}
          />
          <CoverImage
            src={page.productStep.image}
            alt={page.productStep.alt}
            className="aspect-video"
            sizes="(min-width: 1280px) 1280px, 100vw"
          />
          <ComposeLink href={ROUTES.configurator}>{page.composeCta}</ComposeLink>
        </section>
      ) : null}

      {page.mechanism ? (
        <section className="mx-auto max-w-[var(--max-width)] px-7 py-[60px]">
          <StepIntro
            kicker={page.mechanism.kicker}
            title={page.mechanism.title}
            body={page.mechanism.body}
          />
          <div className="grid grid-cols-2 gap-4 min-[900px]:grid-cols-3 min-[900px]:gap-7">
            {page.mechanism.options.map((option) => (
              <div key={option.title}>
                <CoverImage
                  src={option.image}
                  alt={option.alt}
                  className="mb-[18px] aspect-[4/5]"
                  sizes={GRID_IMAGE_SIZES}
                />
                <div className="font-serif-display mb-2 text-[16px] min-[560px]:text-[20px]">
                  {option.title}
                </div>
                <p className="m-0 text-[14px] leading-[1.6] text-[oklch(0.45_0.008_60)]">
                  {option.body}
                </p>
              </div>
            ))}
          </div>
          <ComposeLink href={ROUTES.configurator}>{page.composeCta}</ComposeLink>
        </section>
      ) : null}

      <section className="mx-auto max-w-[var(--max-width)] px-7 py-20">
        <StepIntro
          kicker={page.sides.kicker}
          title={page.sides.title}
          body={page.sides.body}
        />
        <div className="grid grid-cols-2 gap-4 min-[900px]:grid-cols-[repeat(auto-fit,minmax(180px,1fr))] min-[900px]:gap-5">
          {page.sides.options.map((option) => (
            <div key={option.title}>
              <CoverImage
                src={option.image}
                alt={option.alt}
                className="mb-3 aspect-[4/3]"
                radius={12}
                sizes={GRID_IMAGE_SIZES}
              />
              <div className="text-[14px] text-[oklch(0.25_0.008_60)]">
                {option.title}
              </div>
            </div>
          ))}
        </div>
        <ComposeLink href={ROUTES.configurator}>Kies panelen</ComposeLink>
      </section>

      <section className="bg-[oklch(0.93_0.006_75)] px-7 py-20">
        <div className="mx-auto max-w-[var(--max-width)]">
          <StepIntro
            kicker="Stap 3 — Vlakverdeling"
            title="Het ritme van liggers en staanders."
            body={page.vlakBody}
          />
          <div className="grid grid-cols-2 gap-4 min-[900px]:grid-cols-4 min-[900px]:gap-5">
            {VLAK_OPTIONS.map((option) => (
              <div key={option.title}>
                <CoverImage
                  src={option.image}
                  alt={option.alt}
                  className="mb-3 aspect-[4/3]"
                  radius={12}
                  sizes={GRID_IMAGE_SIZES}
                />
                <div className="text-[14px] text-[oklch(0.25_0.008_60)]">
                  {option.title}
                </div>
              </div>
            ))}
          </div>
          <ComposeLink href={ROUTES.configurator}>Kies indeling</ComposeLink>
        </div>
      </section>

      <section className="bg-[oklch(0.16_0.006_60)] px-7 py-20">
        <div className="mx-auto max-w-[var(--max-width)]">
          <StepIntro
            kicker={`${colorStep} — Kleur coating`}
            title="De kleur die bij uw interieur past."
            body="Standaard leveren we in mat zwart. Wilt u iets specifieker, dan kiest u uit onze kleurencatalogus met designkleuren — elke kleur wordt per project gemengd en met de hand gespoten."
            dark
          />
          <div
            data-kleur-grid="true"
            className="grid items-start gap-10"
            style={{ gridTemplateColumns: "minmax(220px, 320px) 1fr" }}
          >
            <div>
              <CoverImage
                src={COLOR_STANDARD.image}
                alt={COLOR_STANDARD.alt}
                className="mb-3.5 aspect-square"
              />
              <div className="mb-1 text-[15px] text-[oklch(0.94_0.004_75)]">
                {COLOR_STANDARD.title}
              </div>
              <div className="text-[13px] text-[oklch(0.55_0.008_75)]">
                {COLOR_STANDARD.note}
              </div>
            </div>
            <div>
              <div className="mb-4 text-[13px] tracking-[0.08em] text-[oklch(0.55_0.008_75)] uppercase">
                Designkleuren uit de catalogus
              </div>
              <div className="grid grid-cols-2 gap-4 min-[900px]:grid-cols-3">
                {COLOR_CATALOG.map((color) => (
                  <div key={color.title}>
                    <CoverImage
                      src={color.image}
                      alt={color.alt}
                      className="mb-2.5 aspect-square"
                      radius={12}
                      sizes={GRID_IMAGE_SIZES}
                    />
                    <div className="text-[13px] text-[oklch(0.9_0.004_75)]">
                      {color.title}
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 mb-0 text-[13px] text-[oklch(0.5_0.008_75)]">
                En vele andere kleuren op aanvraag — we adviseren u graag bij de
                keuze.
              </p>
            </div>
          </div>
          <ComposeLink href={ROUTES.configurator}>Kies kleur</ComposeLink>
        </div>
      </section>

      <section className="mx-auto max-w-[var(--max-width)] px-7 py-20">
        <StepIntro
          kicker={`${glassStep} — Glassoort`}
          title="Hoeveel de deur laat zien."
          body="Van volledig doorzicht tot een vlak dat vooral licht doorlaat. Al ons glas is veiligheidsglas."
        />
        <div className="grid grid-cols-2 gap-4 min-[900px]:grid-cols-3 min-[900px]:gap-6">
          {GLASS_OPTIONS.map((option) => (
            <div key={option.title}>
              <div
                className="relative mb-3.5 aspect-[4/3] overflow-hidden rounded-[14px]"
                style={{ background: option.sample }}
              >
                <div
                  className="absolute bottom-2.5 left-3 font-mono text-[11px]"
                  style={{ color: option.labelColor }}
                >
                  {option.label}
                </div>
              </div>
              <div className="font-serif-display mb-1.5 text-[16px] min-[560px]:text-[19px]">
                {option.title}
              </div>
              <p className="m-0 text-[14px] leading-[1.6] text-[oklch(0.45_0.008_60)]">
                {option.body}
              </p>
            </div>
          ))}
        </div>
        <ComposeLink href={ROUTES.configurator}>Kies glassoort</ComposeLink>
      </section>

      {page.hasHandle ? (
        <section className="bg-[oklch(0.93_0.006_75)] px-7 py-20">
          <div className="mx-auto max-w-[var(--max-width)]">
            <StepIntro
              kicker={`${handleStep} — Handgreep`}
              title="Het detail dat u dagelijks vastpakt."
              body="Elke greep wordt in dezelfde afwerking als het kader geleverd."
            />
            <div className="grid grid-cols-2 gap-4 min-[900px]:grid-cols-3 min-[900px]:gap-7">
              {HANDLE_OPTIONS.map((option) => (
                <div key={option.title}>
                  <CoverImage
                    src={option.image}
                    alt={option.alt}
                    className="mb-3.5 aspect-[4/5]"
                    sizes={GRID_IMAGE_SIZES}
                  />
                  <div className="font-serif-display mb-1.5 text-[16px] min-[560px]:text-[19px]">
                    {option.title}
                  </div>
                  <div className="mb-2 text-[13px] text-[oklch(0.5_0.008_60)]">
                    {option.note}
                  </div>
                  <p className="m-0 text-[14px] leading-[1.6] text-[oklch(0.45_0.008_60)]">
                    {option.body}
                  </p>
                </div>
              ))}
            </div>
            <ComposeLink href={ROUTES.configurator}>Kies handgreep</ComposeLink>
          </div>
        </section>
      ) : null}

      <section className="bg-[oklch(0.93_0.006_75)] px-7 py-20">
        <div className="mx-auto max-w-[var(--max-width)]">
          <div className="mb-2.5 text-[13px] tracking-[0.16em] text-[oklch(0.5_0.01_60)] uppercase">
            Andere producten
          </div>
          <h2 className="font-serif-display m-0 mb-8 text-[clamp(24px,3vw,32px)] leading-[1.2] font-medium">
            Bekijk ook onze andere modellen.
          </h2>
          <div className="grid grid-cols-2 gap-4 min-[900px]:grid-cols-3 min-[1100px]:grid-cols-5 min-[900px]:gap-5">
            {related.map((product) => (
              <Link
                key={product.slug}
                href={product.href}
                className="flex flex-col overflow-hidden rounded-[14px] bg-[oklch(0.97_0.004_75)]"
              >
                <CoverImage
                  src={product.image}
                  alt={product.title}
                  className="aspect-[4/3]"
                  radius={0}
                  sizes={RELATED_IMAGE_SIZES}
                />
                <div className="flex items-center justify-between gap-2.5 px-[18px] py-4">
                  <div className="font-serif-display text-[14px] min-[560px]:text-[16px] text-[oklch(0.2_0.008_60)]">
                    {product.title}
                  </div>
                  <ArrowIcon />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[700px] px-7 py-[90px] text-center">
        <div className="mb-[14px] text-[13px] tracking-[0.16em] text-[oklch(0.5_0.01_60)] uppercase">
          Volgende stap
        </div>
        <h2 className="font-serif-display m-0 mb-[18px] text-[clamp(26px,3.6vw,38px)] leading-[1.2] font-medium">
          Afmetingen en de definitieve samenstelling volgen in de configurator.
        </h2>
        <p className="m-0 mb-9 text-[16px] leading-[1.7] text-[oklch(0.42_0.008_60)]">
          Tot die tijd stellen we uw deur graag met u samen in een persoonlijk
          gesprek.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href={ROUTES.afspraak} className="btn-accent btn-accent-lg">
            Offerte aanvragen
          </Link>
          <Link href={ROUTES.deuren} className="btn-outline">
            Andere deuren bekijken
          </Link>
        </div>
      </section>
    </main>
  );
}
