import Image from "next/image";
import Link from "next/link";
import { ConfiguratorProcess } from "@/components/home/ConfiguratorProcess";
import { HeroSlideshow } from "@/components/home/HeroSlideshow";
import { TrustBar } from "@/components/home/TrustBar";
import { WhyCustom } from "@/components/home/WhyCustom";
import { ReviewMarquee } from "@/components/home/ReviewMarquee";
import { HeroLoad, Reveal } from "@/components/motion/Reveal";
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
      <section className="relative flex min-h-[88vh] items-end overflow-hidden">
        <HeroSlideshow />
        <div className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,oklch(0.14_0.006_60_/_0.15)_0%,oklch(0.12_0.006_60_/_0.35)_55%,oklch(0.1_0.006_60_/_0.82)_100%)]" />
        <div className="relative z-[2] max-w-[780px] px-7 pt-10 pb-[72px] lg:pt-0">
          <HeroLoad>
            <div className="mb-[18px] text-[13px] font-medium tracking-[0.18em] text-[oklch(0.86_0.05_75)] uppercase [text-shadow:0_1px_2px_oklch(0.1_0.006_60_/_0.55),0_0_18px_oklch(0.1_0.006_60_/_0.35)]">
              Vakmanschap in stalen deuren
            </div>
          </HeroLoad>
          <HeroLoad stagger={1}>
            <h1 className="font-serif-display m-0 mb-[22px] text-[clamp(38px,5.4vw,65px)] font-normal text-[oklch(0.98_0.004_75)]">
              Deuren op maat,
              <br />
              gemaakt om te blijven.
            </h1>
          </HeroLoad>
          <HeroLoad stagger={2}>
            <p className="mb-[34px] max-w-[520px] text-[clamp(15px,2vw,18px)] leading-[1.6] text-[oklch(0.88_0.004_75)]">
              Elke deur wordt volledig naar uw wensen ontworpen en met de hand
              vervaardigd — van eerste schets tot montage.
            </p>
          </HeroLoad>
          <HeroLoad stagger={3}>
            <div className="flex flex-wrap gap-4">
              <Link href={ROUTES.configurator} className="btn-accent btn-accent-lg">
                Ontwerp uw deur
              </Link>
              <Link href={ROUTES.offerte} className="btn-outline-light">
                Snelle Offerte
              </Link>
            </div>
          </HeroLoad>
        </div>
      </section>

      <TrustBar />

      <section
        id="deuren"
        className="mx-auto max-w-[var(--max-width)] px-7 pt-[100px] pb-[60px]"
      >
        <Reveal className="mx-auto mb-14 max-w-[620px] text-center">
          <div className="mb-[14px] text-[13px] tracking-[0.16em] text-[oklch(0.5_0.01_60)] uppercase">
            Ons aanbod
          </div>
          <h2 className="font-serif-display m-0 mb-4 text-[clamp(30px,4vw,44px)] font-normal">
            Stalen deuren voor elke ruimte. Eindeloos maatwerk.
          </h2>
          <p className="m-0 text-[16px] leading-[1.6] text-[oklch(0.42_0.008_60)]">
            Elk model met de hand vervaardigd op basis van uw wensen.
          </p>
        </Reveal>
        <div className="home-product-grid">
          {HOME_PRODUCTS.map((product, index) => (
            <Reveal key={product.slug} stagger={index} className="h-full">
            <Link
              href={product.href}
              className="home-product-card h-full"
            >
              <Reveal variant="image" stagger={index} className="home-product-image">
                <CoverImage
                  src={product.image}
                  alt={product.alt}
                  className="aspect-[4/5]"
                  sizes="(min-width: 1100px) 25vw, 50vw"
                />
              </Reveal>
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
            </Reveal>
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

      <section className="px-7 py-[100px] text-center">
        <Reveal className="mx-auto max-w-[720px]">
          <div className="mb-[14px] text-[13px] tracking-[0.16em] text-[oklch(0.5_0.01_60)] uppercase">
            Kies uw type deur
          </div>
          <h2 className="font-serif-display m-0 mb-4 text-[clamp(30px,4vw,44px)] font-normal">
            Welke stalen deur past bij uw ruimte?
          </h2>
          <p className="m-0 text-[16px] leading-[1.6] text-[oklch(0.42_0.008_60)]">
            Elk type deur beweegt anders en past bij een andere ruimte. Een
            taatsdeur draait in beide richtingen, een scharnierdeur sluit in een
            kozijn en een schuifdeur bespaart ruimte. Wilt u alleen licht en
            openheid toevoegen, dan kiest u een vast paneel.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href={ROUTES.configurator} className="btn-dark gap-2">
              Stel uw deur samen
              <ArrowIcon />
            </Link>
          </div>
        </Reveal>
      </section>

      <ReviewMarquee rowA={MARQUEE_REVIEWS_A} rowB={MARQUEE_REVIEWS_B} />

      <section id="projecten">
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
                <Reveal
                  variant={story.imageFirst ? "from-end" : "from-start"}
                  style={{ order: story.imageFirst ? 2 : 0 }}
                >
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
                </Reveal>
                <Reveal variant={story.imageFirst ? "from-start" : "from-end"}>
                  <Reveal variant="image">
                    <CoverImage
                      src={product.imageLandscape}
                      alt={product.title}
                      className="aspect-[4/3]"
                      sizes="(min-width: 860px) 50vw, 100vw"
                    />
                  </Reveal>
                </Reveal>
              </div>
            </div>
          );
        })}
        <div className="bg-[oklch(0.93_0.006_75)] px-7 py-[90px]">
          <Reveal className="mx-auto max-w-[640px] text-center">
            <div className="mb-[14px] text-[13px] tracking-[0.16em] text-[oklch(0.5_0.01_60)] uppercase">
              Configurator
            </div>
            <h2 className="font-serif-display m-0 mb-4 text-[clamp(28px,3.6vw,40px)] font-normal">
              Zelf een deur samenstellen
            </h2>
            <p className="m-0 mb-8 text-[16px] leading-[1.7] text-[oklch(0.42_0.008_60)]">
              Kies het type, de afmeting, het glas en de kleur. U ziet direct
              hoe de deur eruitziet en vraagt daarna een offerte aan.
            </p>
            <Link href={ROUTES.configurator} className="btn-dark gap-2">
              Open de configurator
              <ArrowIcon />
            </Link>
          </Reveal>
        </div>
      </section>

      <section
        id="vakmanschap"
        className="border-t border-[oklch(0.82_0.008_75)] bg-white px-7 py-[100px]"
      >
        <div
          data-split-row="true"
          className="mx-auto grid max-w-[var(--max-width)] items-center gap-16"
          style={{ gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)" }}
        >
          <Reveal variant="from-start">
            <div className="grid grid-cols-2 gap-4">
              <Reveal variant="image">
                <CoverImage
                  src="/assets/welding-detail.jpg"
                  alt="Lassen aan een stalen kader"
                  className="aspect-square"
                />
              </Reveal>
              <Reveal variant="image" stagger={1} className="self-end">
                <CoverImage
                  src="/assets/detail-maroon.jpg"
                  alt="Detail lasnaad, bordeaux"
                  className="aspect-square"
                />
              </Reveal>
            </div>
          </Reveal>
          <Reveal variant="from-end">
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
          </Reveal>
        </div>
        <div className="mt-12 flex justify-center">
          <Link href={ROUTES.afspraak} className="btn-dark gap-2">
            Afspraak maken
            <ArrowIcon />
          </Link>
        </div>
      </section>

      <section className="bg-[oklch(0.93_0.006_75)] px-7 py-[100px]">
        <div className="mx-auto max-w-[var(--max-width)]">
        <Reveal className="mb-12 max-w-[640px]">
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
        </Reveal>
        <div
          data-split-row="true"
          className="grid items-center gap-14"
          style={{ gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)" }}
        >
          <Reveal variant="from-start">
            <Reveal variant="image">
              <CoverImage
                src="/assets/hero-open-door.jpg"
                alt="Stalen taatsdeur bij Anouk Hamelink"
                className="aspect-[4/5]"
                sizes="(min-width: 860px) 40vw, 100vw"
              />
            </Reveal>
          </Reveal>
          <Reveal variant="from-end">
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
          </Reveal>
        </div>
        </div>
      </section>

      <ConfiguratorProcess />

      <section
        id="offerte"
        className="bg-[var(--accent)] px-7 py-[90px] text-center"
      >
        <Reveal>
        <h2 className="font-serif-display m-0 mb-5 text-[clamp(30px,4.2vw,48px)] font-normal text-[oklch(0.14_0.006_60)]">
          Creëer de stalen deur van uw dromen
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
        </Reveal>
      </section>
    </main>
  );
}
