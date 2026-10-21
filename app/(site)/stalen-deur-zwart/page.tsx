import type { Metadata } from "next";
import Link from "next/link";
import {
  LandingActions,
  LandingBreadcrumbs,
  LandingCtaBand,
  LandingDoorCard,
  LandingHero,
} from "@/components/landing/LandingParts";
import { Reveal } from "@/components/motion/Reveal";
import { CoverImage } from "@/components/ui";
import { CONTACT, ROUTES, productPath } from "@/lib/site";

const TITLE = "Zwarte stalen binnendeur op maat | Meisterworks";
const DESCRIPTION =
  "Zwarte stalen binnendeur op maat laten maken? Ontdek taatsdeuren, schuifdeuren en scharnierdeuren in staal en glas, gemaakt en gemonteerd door Meisterworks.";
const HERO_ALT = "Zwarte stalen binnendeur met glas, open naar de woonkamer";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: ROUTES.stalenDeurZwart },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: ROUTES.stalenDeurZwart,
    images: [{ url: "/assets/hero/portrait-3.jpg", alt: HERO_ALT }],
  },
  twitter: {
    title: TITLE,
    description: DESCRIPTION,
    images: ["/assets/hero/portrait-3.jpg"],
  },
};

export default function StalenDeurZwartPage() {
  return (
    <main>
      <LandingBreadcrumbs
        items={[
          { name: "Home", path: ROUTES.home },
          { name: "Stalen deuren", path: ROUTES.stalenDeuren },
          { name: "Zwarte stalen deur", path: ROUTES.stalenDeurZwart },
        ]}
      />
      <LandingHero
        kicker="Mat zwart"
        title="Zwarte stalen binnendeur op maat"
        image="/assets/hero/portrait-3.jpg"
        alt={HERO_ALT}
      />

      <section className="mx-auto max-w-[760px] px-7 pt-16 pb-6">
        <Reveal>
          <p className="m-0 mb-5 text-[clamp(18px,2.1vw,22px)] font-light leading-[1.7] text-[oklch(0.25_0.008_60)]">
            Een zwarte stalen binnendeur tekent de opening met een dun, donker kader. Het glas houdt het licht
            tussen de kamers. Meisterworks maakt die deur op maat: profiel, vakverdeling, glas en handgreep volgen
            de ruimte waarin hij komt te staan.
          </p>
          <p className="m-0 text-[16px] leading-[1.75] text-[oklch(0.42_0.008_60)]">
            De standaardafwerking is mat zwart, RAL 9005. In de werkplaats in Weert poedercoaten we het staal,
            plaatsen we het glas en maken we de deur klaar voor montage in Limburg en omgeving.
          </p>
          <LandingActions
            actions={[
              { label: "Bekijk de deurtypen", href: "#deurtypen", tone: "dark" },
              { label: "Vraag een offerte aan", href: ROUTES.offerte, tone: "accent" },
            ]}
          />
        </Reveal>
      </section>

      <section id="deurtypen" aria-labelledby="deurtypen-title" className="mx-auto max-w-[var(--max-width)] px-7 py-16">
        <Reveal className="mb-10 max-w-[720px]">
          <h2 id="deurtypen-title" className="font-serif-display m-0 mb-4 text-[clamp(28px,3.4vw,40px)] font-normal">
            Zwarte stalen deuren per type
          </h2>
          <p className="m-0 text-[16px] leading-[1.7] text-[oklch(0.42_0.008_60)]">
            Mat zwart werkt op een taatsdeur, een scharnierdeur en een schuifdeur. Het type kies je op hoe de deur
            beweegt en hoeveel ruimte je ernaast vrijhoudt.
          </p>
        </Reveal>
        <div className="home-product-grid landing-door-grid">
          <LandingDoorCard
            href={productPath("taatsdeur")}
            image="/assets/doors/taatsdeur-portrait.jpg"
            alt="Stalen taatsdeur met donker profiel en glas, in een lichte hal"
            title="Zwarte taatsdeur"
            body="De taatsdeur draait om een as in de vloer en kan naar twee kanten open. In mat zwart blijft het profiel een smal kader rond het glas, met de as verzonken in de vloer."
          />
          <LandingDoorCard
            href={productPath("scharnierdeur-kozijn")}
            image="/assets/doors/scharnierdeur-portrait.jpg"
            alt="Zwarte stalen scharnierdeur met helder glas in een lichte hal"
            title="Zwarte scharnierdeur"
            body="De scharnierdeur hangt in een stalen kozijn en draait aan scharnieren. Kozijn en deur in dezelfde zwarte coating geven de opening één rustig vlak. Draairichting, glas en maat stem je af op de kamer."
          />
          <LandingDoorCard
            href={productPath("schuifdeur")}
            image="/assets/doors/schuifdeur-hero.jpg"
            alt="Zwarte stalen schuifdeur met helder en mat glas langs een rail"
            title="Zwarte schuifdeur"
            body="De schuifdeur loopt langs een rail en houdt de vloer voor de opening vrij. Het zwarte frame maakt de scheiding duidelijk, terwijl het glas het zicht tussen de ruimtes open laat."
          />
        </div>
      </section>

      <section aria-labelledby="afwerking-title" className="bg-[oklch(0.96_0.004_75)] px-7 py-20">
        <div
          data-split-row="true"
          className="mx-auto grid max-w-[var(--max-width)] items-center gap-12"
          style={{ gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 0.95fr)" }}
        >
          <Reveal>
            <h2 id="afwerking-title" className="font-serif-display m-0 mb-4 text-[clamp(28px,3.4vw,40px)] font-normal">
              Glas, greep en RAL 9005
            </h2>
            <p className="m-0 mb-4 text-[16px] leading-[1.75] text-[oklch(0.42_0.008_60)]">
              Helder glas laat het meeste daglicht door. Matglas geeft privacy waar twee kamers direct op elkaar
              uitkijken. De handgreep kan in dezelfde zwarte afwerking, van een rechte greep tot een deurklink.
            </p>
            <p className="m-0 mb-4 text-[16px] leading-[1.75] text-[oklch(0.42_0.008_60)]">
              RAL 9005 is het uitgangspunt voor een zwarte stalen binnendeur. Een afwijkende RAL-kleur of een
              designkleur sluit de deur aan op een ander palet in huis.
            </p>
            <p className="m-0 text-[16px] leading-[1.75] text-[oklch(0.42_0.008_60)]">
              <Link
                href={ROUTES.stalenDeuren}
                className="text-[oklch(0.32_0.008_60)] underline decoration-[oklch(0.78_0.006_75)] underline-offset-[3px]"
              >
                Bekijk alle stalen deuren
              </Link>{" "}
              voor de volledige reeks taatsdeuren, scharnierdeuren en schuifdeuren.
            </p>
          </Reveal>
          <div className="grid grid-cols-2 gap-4">
            <CoverImage
              src="/assets/glas/mat.jpg"
              alt="Matglas in een zwarte stalen deur met deurklink"
              className="aspect-[3/4]"
              sizes="(min-width: 900px) 20vw, 45vw"
            />
            <CoverImage
              src="/assets/handgrepen/recht_hoekgreep.jpg"
              alt="Zwarte rechte hoekgreep op een stalen deurprofiel"
              className="mt-8 aspect-[3/4]"
              sizes="(min-width: 900px) 20vw, 45vw"
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="plaatsing-title" className="mx-auto max-w-[760px] px-7 py-20">
        <Reveal>
          <h2 id="plaatsing-title" className="font-serif-display m-0 mb-4 text-[clamp(28px,3.4vw,40px)] font-normal">
            Gemaakt in Weert, geplaatst in Limburg
          </h2>
          <p className="m-0 mb-4 text-[16px] leading-[1.75] text-[oklch(0.42_0.008_60)]">
            Na je aanvraag bekijken we de opening en meten we in waar de maat dat vraagt. De zwarte stalen deur
            wordt daarna in de werkplaats in Weert gezaagd, gelast en gepoedercoat.
          </p>
          <p className="m-0 text-[16px] leading-[1.75] text-[oklch(0.42_0.008_60)]">
            We plaatsen in Weert, Nederweert en de regio Eindhoven en Tilburg, in nieuwbouw, renovatie en bestaande
            kamers. Van het eerste voorstel tot de montage blijft hetzelfde team bij je project betrokken.
          </p>
          <LandingActions actions={[{ label: "Bekijk onze werkwijze", href: ROUTES.vakmanschap, tone: "dark" }]} />
        </Reveal>
      </section>

      <LandingCtaBand
        title="Offerte voor een zwarte stalen binnendeur"
        actions={[
          { label: "Vraag een offerte aan", href: ROUTES.offerte, tone: "accent" },
          { label: "Stel je deur samen", href: ROUTES.configurator, tone: "ghost" },
        ]}
      >
        <p className="m-0">
          Vertel welk type je zoekt, hoe groot de opening is en of je helder glas of matglas wilt. Je ontvangt een
          voorstel dat de maat, het deurtype, de afwerking en de montage meeneemt.
        </p>
        <p className="m-0 mt-6">
          Liever eerst het hele aanbod?{" "}
          <Link href={ROUTES.stalenDeuren} className="underline">
            Ga naar stalen deuren
          </Link>
          . Bel{" "}
          <a href={CONTACT.phoneHref} className="underline">
            {CONTACT.phoneDisplay}
          </a>{" "}
          of mail{" "}
          <a href={`mailto:${CONTACT.email}`} className="underline">
            {CONTACT.email}
          </a>
          .
        </p>
      </LandingCtaBand>
    </main>
  );
}
