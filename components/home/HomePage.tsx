import Image from "next/image";
import Link from "next/link";
import { ConfiguratorProcess } from "@/components/home/ConfiguratorProcess";
import { TrustBar } from "@/components/home/TrustBar";
import { WhyCustom } from "@/components/home/WhyCustom";
import { ReviewMarquee } from "@/components/home/ReviewMarquee";
import { ArrowIcon, CoverImage } from "@/components/ui";
import {
  HOME_PRODUCTS,
  MARQUEE_REVIEWS_A,
  MARQUEE_REVIEWS_B,
  PRODUCT_STORIES,
} from "@/lib/content";
import { PRODUCTS, ROUTES, productPath } from "@/lib/site";

function storyProduct(slug: string) {
  return PRODUCTS.find((product) => product.slug === slug)!;
}

export function HomePage() {
  return (
    <main>
      <section className="relative flex min-h-[88vh] items-end">
        <Image
          src="/assets/hero-open-door.jpg"
          alt="Stalen taatsdeur, geopend"
          fill
          priority
          loading="eager"
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,oklch(0.14_0.006_60_/_0.15)_0%,oklch(0.12_0.006_60_/_0.35)_55%,oklch(0.1_0.006_60_/_0.82)_100%)]" />
        <div className="relative z-[2] max-w-[780px] px-7 pt-10 pb-[72px] lg:pt-0">
          <div className="mb-[18px] text-[13px] font-medium tracking-[0.18em] text-[var(--accent)] uppercase">
            Vakmanschap in stalen deuren
          </div>
          <h1 className="font-serif-display m-0 mb-[22px] text-[clamp(38px,5.4vw,65px)] font-normal text-[oklch(0.98_0.004_75)]">
            Deuren op maat,
            <br />
            gemaakt om te blijven.
          </h1>
          <p className="mb-[34px] max-w-[520px] text-[clamp(15px,2vw,18px)] leading-[1.6] text-[oklch(0.88_0.004_75)]">
            Elke deur wordt volledig naar uw wensen ontworpen en met de hand
            vervaardigd — van eerste schets tot montage.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href={ROUTES.afspraak} className="btn-accent btn-accent-lg">
              Ontwerp uw deur
            </Link>
            <Link href={ROUTES.projecten} className="btn-outline-light">
              Bekijk projecten
            </Link>
          </div>
        </div>
      </section>

      <TrustBar />

      <section
        id="deuren"
        className="mx-auto max-w-[var(--max-width)] px-7 pt-[100px] pb-[60px]"
      >
        <div className="mx-auto mb-14 max-w-[620px] text-center">
          <div className="mb-[14px] text-[13px] tracking-[0.16em] text-[oklch(0.5_0.01_60)] uppercase">
            Ons aanbod
          </div>
          <h2 className="font-serif-display m-0 mb-4 text-[clamp(30px,4vw,44px)] font-normal">
            Stalen deuren voor elke ruimte. Eindeloos maatwerk.
          </h2>
          <p className="m-0 text-[16px] leading-[1.6] text-[oklch(0.42_0.008_60)]">
            Elk model met de hand vervaardigd op basis van uw wensen.
          </p>
        </div>
        <div className="home-product-grid">
          {HOME_PRODUCTS.map((product) => (
            <Link
              key={product.slug}
              href={product.href}
              className="home-product-card"
            >
              <CoverImage
                src={product.image}
                alt={product.alt}
                className="home-product-image aspect-[4/5]"
                sizes="(min-width: 1100px) 25vw, 50vw"
              />
              <div className="home-product-card-body px-6 py-[26px]">
                <div className="mb-2 flex items-center justify-between gap-2.5">
                  <div className="home-product-card-title font-serif-display text-[22px]">
                    {product.title}
                  </div>
                  <ArrowIcon size={18} />
                </div>
                <div className="home-product-card-blurb text-[14px] leading-[1.55] text-[oklch(0.45_0.008_60)]">
                  {product.blurb}
                </div>
              </div>
            </Link>
          ))}
        </div>
        <p className="m-0 mt-10 text-center text-[13px] leading-[1.6] text-[oklch(0.52_0.008_60)]">
          Staat uw project er niet tussen?{" "}
          <Link
            href={ROUTES.offerte}
            className="text-[oklch(0.38_0.008_60)] underline decoration-[oklch(0.78_0.006_75)] underline-offset-[3px] hover:text-[oklch(0.22_0.008_60)]"
          >
            Vraag een offerte voor maatwerk
          </Link>
          .
        </p>
      </section>

      <WhyCustom />

      <section className="mx-auto max-w-[var(--max-width)] px-7 py-[100px]">
        <div className="mb-12 max-w-[640px]">
          <div className="mb-[14px] text-[13px] tracking-[0.16em] text-[oklch(0.5_0.01_60)] uppercase">
            Reviews
          </div>
          <h2 className="font-serif-display m-0 mb-4 text-[clamp(28px,3.6vw,40px)] font-normal">
            Uitgelicht verhaal
          </h2>
          <p className="m-0 text-[16px] leading-[1.7] text-[oklch(0.42_0.008_60)]">
            Een Google-review van een geplaatste taatsdeur: hoe de afspraken,
            de communicatie en het resultaat in de praktijk uitpakten.
          </p>
        </div>
        <div
          data-split-row="true"
          className="grid items-center gap-12"
          style={{ gridTemplateColumns: "minmax(0, 280px) minmax(0, 1fr)" }}
        >
          <CoverImage
            src="/assets/hero-open-door.jpg"
            alt="Stalen taatsdeur bij Anouk Hamelink"
            className="mx-auto aspect-[4/5] w-full max-w-[280px] min-[860px]:mx-0"
            sizes="280px"
          />
          <div>
          <div className="mb-[18px] text-[13px] tracking-[0.1em] text-[var(--accent)]">
            ★★★★★
          </div>
          <p className="m-0 mb-7 text-[clamp(22px,2.6vw,30px)] font-light leading-[1.55] text-[oklch(0.2_0.008_60)] italic">
            “Na 2 jaar verbouwen de eerste vakman die zijn afspraken volledig
            nakomt, goed communiceert, alles netjes op tijd levert, niets
            beschadigt bij het plaatsen en bovendien een prachtige taatsdeur
            heeft gemaakt volledig naar onze wensen. Top!”
          </p>
          <div className="flex items-center gap-3.5">
            <div className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-[16px] font-semibold text-[oklch(0.14_0.006_60)]">
              L
            </div>
            <div>
              <div className="text-[15px] font-semibold text-[oklch(0.18_0.006_60)]">
                Lucinda Coumans
              </div>
              <div className="text-[13px] text-[oklch(0.5_0.008_60)]">
                Taatsdeur &nbsp;·&nbsp; Google review &nbsp;·&nbsp; 9 maanden
                geleden
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      <section id="projecten">
        <div className="mx-auto max-w-[var(--max-width)] px-7 pt-[100px]">
          <div className="max-w-[640px]">
            <div className="mb-[14px] text-[13px] tracking-[0.16em] text-[oklch(0.5_0.01_60)] uppercase">
              De modellen
            </div>
            <h2 className="font-serif-display m-0 mb-4 text-[clamp(28px,3.6vw,40px)] font-normal">
              Stalen deur, met verschillende eigenschappen.
            </h2>
            <p className="m-0 text-[16px] leading-[1.7] text-[oklch(0.42_0.008_60)]">
            Laat u verder inspireren met hoe de deuren bewegen en voor welke toepassingen ze geschikt zijn. Bekijk een deur, of stel hem direct samen in de configurator. 
            </p>
          </div>
        </div>
        {PRODUCT_STORIES.map((story) => {
          const product = storyProduct(story.slug);
          const dark = story.dark;
          const bg = story.dark
            ? "oklch(0.16 0.006 60)"
            : story.tinted
              ? "oklch(0.93 0.006 75)"
              : "var(--background)";
          const ctaClass = dark ? "btn-accent" : "btn-dark";

          return (
            <div key={story.slug} className="px-7 py-[90px]" style={{ background: bg }}>
              <div
                data-split-row="true"
                className="mx-auto grid max-w-[var(--max-width)] items-center gap-14"
                style={{
                  gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
                }}
              >
                <div style={{ order: story.imageFirst ? 2 : 0 }}>
                  <Image
                    src={
                      story.mark === "white"
                        ? "/assets/mw-mark-white.png"
                        : "/assets/mw-mark-black.png"
                    }
                    alt=""
                    width={20}
                    height={20}
                    className="mb-3.5 opacity-85"
                  />
                  <div
                    className={`mb-[14px] text-[13px] tracking-[0.16em] uppercase ${dark ? "text-[oklch(0.55_0.008_75)]" : "text-[oklch(0.5_0.01_60)]"}`}
                  >
                    {story.kicker}
                  </div>
                  <h2
                    className={`font-serif-display m-0 mb-5 text-[clamp(28px,3.6vw,40px)] font-normal ${dark ? "text-[oklch(0.97_0.004_75)]" : ""}`}
                  >
                    {product.title}
                  </h2>
                  <p
                    className={`m-0 mb-8 text-[16px] leading-[1.7] ${dark ? "text-[oklch(0.65_0.008_75)]" : "text-[oklch(0.42_0.008_60)]"}`}
                  >
                    {story.body}
                  </p>
                  <Link
                    href={productPath(story.slug)}
                    className={`${ctaClass} gap-2`}
                  >
                    {story.cta}
                    <ArrowIcon />
                  </Link>
                </div>
                <CoverImage
                  src={product.image}
                  alt={product.title}
                  className="aspect-[4/3]"
                  sizes="(min-width: 860px) 50vw, 100vw"
                />
              </div>
            </div>
          );
        })}
      </section>

      <section
        id="vakmanschap"
        className="mx-auto max-w-[var(--max-width)] px-7 py-[100px]"
      >
        <div
          data-split-row="true"
          className="grid items-center gap-16"
          style={{ gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)" }}
        >
          <div className="grid grid-cols-2 gap-4">
            <CoverImage
              src="/assets/welding-detail.jpg"
              alt="Lassen aan een stalen kader"
              className="aspect-square"
            />
            <CoverImage
              src="/assets/detail-maroon.jpg"
              alt="Detail lasnaad, bordeaux"
              className="aspect-square self-end"
            />
          </div>
          <div>
            <div className="mb-[14px] text-[13px] tracking-[0.16em] text-[oklch(0.5_0.01_60)] uppercase">
              Vakmanschap
            </div>
            <h2 className="font-serif-display m-0 mb-[22px] text-[clamp(28px,3.6vw,40px)] font-normal">
              Handgemaakte deuren uit het atelier.
            </h2>
            <p className="m-0 mb-[18px] text-[16px] leading-[1.7] text-[oklch(0.4_0.008_60)]">
              Staal wordt op maat gezaagd, gelast en met de hand nagewerkt tot
              elke naad recht en glad is. Pas daarna gaat een deur in de
              poedercoating — in een kleur die specifiek voor uw project wordt
              gemengd.
            </p>
            <p className="m-0 text-[16px] leading-[1.7] text-[oklch(0.4_0.008_60)]">
              Dat proces kost meer tijd dan een deur van de plank. Het resultaat
              is een deur die decennia meegaat, in een afwerking die nergens
              anders te vinden is.
            </p>
          </div>
        </div>
      </section>

      <ReviewMarquee rowA={MARQUEE_REVIEWS_A} rowB={MARQUEE_REVIEWS_B} />

      <ConfiguratorProcess />

      <section
        id="offerte"
        className="bg-[var(--accent)] px-7 py-[90px] text-center"
      >
        <h2 className="font-serif-display m-0 mb-5 text-[clamp(30px,4.2vw,48px)] font-normal text-[oklch(0.14_0.006_60)]">
          Klaar om te beginnen?
        </h2>
        <p className="m-0 mb-9 text-[16px] text-[oklch(0.22_0.03_60)]">
          Vraag een vrijblijvende offerte aan, of plan een adviesgesprek in het
          atelier.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href={ROUTES.offerte} className="btn-dark px-[34px] py-4">
            Offerte aanvragen
          </Link>
          <Link href={ROUTES.afspraak} className="btn-outline-on-accent">
            Adviesgesprek plannen
          </Link>
        </div>
      </section>
    </main>
  );
}
