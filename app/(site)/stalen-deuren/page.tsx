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

const TITLE = "Stalen binnendeuren op maat in Limburg | Meisterworks";
const DESCRIPTION =
  "Stalen binnendeuren op maat laten maken? Ontdek de taatsdeuren, schuifdeuren en scharnierdeuren van Meisterworks. Eigen productie en montage in Limburg.";
const HERO_ALT = "Stalen taatsdeur met glas in een lichte hal, met zicht op de trap";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: ROUTES.stalenDeuren },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: ROUTES.stalenDeuren,
    images: [{ url: "/assets/doors/taatsdeur-landscape.jpg", alt: HERO_ALT }],
  },
  twitter: {
    title: TITLE,
    description: DESCRIPTION,
    images: ["/assets/doors/taatsdeur-landscape.jpg"],
  },
};

const BENEFITS = [
  {
    title: "Duurzaam en onderhoudsvriendelijk",
    body: "Staal is robuust, slijtvast en gaat bij normaal gebruik jarenlang mee. Hierdoor geniet je langdurig van een hoogwaardige binnendeur met relatief weinig onderhoud.",
  },
  {
    title: "Tijdloos design",
    body: "Van een industriële uitstraling tot een strak en minimalistisch ontwerp: stalen deuren passen bij uiteenlopende interieurstijlen en geven iedere ruimte extra karakter.",
  },
  {
    title: "Licht en ruimtelijkheid",
    body: "Stalen deuren met glas laten natuurlijk licht door en creëren een open verbinding tussen ruimtes, zonder dat je hoeft in te leveren op een duidelijke afscheiding.",
  },
  {
    title: "Volledig maatwerk",
    body: "Van de exacte afmetingen en vakverdeling tot de kleur, glassoort en handgrepen: iedere stalen deur wordt afgestemd op jouw persoonlijke wensen.",
  },
] as const;

export default function StalenDeurenPage() {
  return (
    <main>
      <LandingBreadcrumbs
        items={[
          { name: "Home", path: ROUTES.home },
          { name: "Stalen deuren", path: ROUTES.stalenDeuren },
        ]}
      />
      <LandingHero
        kicker="Stalen deuren"
        title="Stalen binnendeuren op maat"
        image="/assets/doors/taatsdeur-landscape.jpg"
        alt={HERO_ALT}
      />

      <section className="mx-auto max-w-[760px] px-7 pt-16 pb-6">
        <Reveal>
          <p className="m-0 mb-5 text-[clamp(18px,2.1vw,22px)] font-light leading-[1.7] text-[oklch(0.25_0.008_60)]">
            Op zoek naar een stijlvolle stalen deur die perfect aansluit bij jouw interieur? Bij Meisterworks
            ontwerpen en vervaardigen we stalen binnendeuren volledig op maat. Van moderne taatsdeuren tot
            klassieke scharnierdeuren en ruimtebesparende schuifdeuren.
          </p>
          <p className="m-0 text-[16px] leading-[1.75] text-[oklch(0.42_0.008_60)]">
            Vanuit onze eigen werkplaats in Weert combineren we vakmanschap, duurzame materialen en een
            hoogwaardige afwerking. Zo creëren we stalen deuren die niet alleen mooi zijn, maar ook jarenlang
            meegaan.
          </p>
          <LandingActions
            actions={[
              { label: "Bekijk onze stalen deuren", href: "#soorten", tone: "dark" },
              { label: "Offerte aanvragen", href: ROUTES.offerte, tone: "accent" },
            ]}
          />
        </Reveal>
      </section>

      <section id="soorten" aria-labelledby="soorten-title" className="mx-auto max-w-[var(--max-width)] px-7 py-16">
        <Reveal className="mb-10 max-w-[720px]">
          <h2 id="soorten-title" className="font-serif-display m-0 mb-4 text-[clamp(28px,3.4vw,40px)] font-normal">
            Ontdek onze stalen deuren
          </h2>
          <p className="m-0 text-[16px] leading-[1.7] text-[oklch(0.42_0.008_60)]">
            Iedere ruimte vraagt om een andere oplossing. Daarom bieden we verschillende soorten stalen
            binnendeuren, volledig afgestemd op jouw wensen en interieur.
          </p>
        </Reveal>
        <div className="home-product-grid landing-door-grid">
          <LandingDoorCard
            href={productPath("taatsdeur")}
            image="/assets/doors/taatsdeur-portrait.jpg"
            alt="Stalen taatsdeur met glas in een lichte hal, met zicht op de trap"
            title="Stalen taatsdeuren"
            body="Een stalen taatsdeur draait soepel om een draaipunt en kan naar beide kanten worden geopend. De combinatie van slanke stalen profielen en glas zorgt voor een moderne uitstraling en een ruimtelijk gevoel."
          />
          <LandingDoorCard
            href={productPath("scharnierdeur-kozijn")}
            image="/assets/doors/scharnierdeur-portrait.jpg"
            alt="Zwarte stalen scharnierdeur met helder glas in een lichte hal"
            title="Stalen scharnierdeuren"
            body="Een stalen scharnierdeur combineert een tijdloos ontwerp met praktisch gebruiksgemak. Geschikt voor zowel moderne als klassieke interieurs en leverbaar in verschillende kleuren, glasuitvoeringen en afmetingen."
          />
          <LandingDoorCard
            href={productPath("schuifdeur")}
            image="/assets/doors/schuifdeur-hero.jpg"
            alt="Zwarte stalen schuifdeur met helder en mat glas langs een rail"
            title="Stalen schuifdeuren"
            body="Wil je ruimtes stijlvol scheiden zonder extra draairuimte te verliezen? Een stalen schuifdeur biedt een praktische oplossing en behoudt dankzij het glas de open uitstraling van jouw interieur."
          />
        </div>
      </section>

      <section aria-labelledby="voordelen-title" className="bg-[oklch(0.96_0.004_75)] px-7 py-20">
        <div className="mx-auto max-w-[var(--max-width)]">
          <Reveal className="mb-10 max-w-[720px]">
            <h2 id="voordelen-title" className="font-serif-display m-0 mb-4 text-[clamp(28px,3.4vw,40px)] font-normal">
              De voordelen van een stalen binnendeur
            </h2>
            <p className="m-0 text-[16px] leading-[1.7] text-[oklch(0.42_0.008_60)]">
              Stalen binnendeuren op maat zijn een duurzame en stijlvolle toevoeging aan vrijwel ieder interieur.
              Het sterke materiaal, de slanke profielen en de uitgebreide ontwerpmogelijkheden maken staal
              bijzonder geschikt voor binnendeuren.
            </p>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {BENEFITS.map((benefit) => (
              <Reveal key={benefit.title}>
                <article className="h-full rounded-[16px] bg-white px-6 py-7">
                  <h3 className="font-serif-display m-0 mb-3 text-[24px] font-normal">{benefit.title}</h3>
                  <p className="m-0 text-[15px] leading-[1.7] text-[oklch(0.42_0.008_60)]">{benefit.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="zwart-title" className="mx-auto max-w-[var(--max-width)] px-7 py-20">
        <div data-split-row="true" className="grid items-center gap-12" style={{ gridTemplateColumns: "minmax(0,0.9fr) minmax(0,1.1fr)" }}>
          <Reveal variant="image">
            <CoverImage
              src="/assets/hero/portrait-3.jpg"
              alt="Zwarte stalen binnendeur met glas, open naar de woonkamer"
              className="aspect-[4/5]"
              sizes="(min-width: 900px) 40vw, 100vw"
            />
          </Reveal>
          <Reveal>
            <h2 id="zwart-title" className="font-serif-display m-0 mb-4 text-[clamp(28px,3.4vw,40px)] font-normal">
              Zwarte stalen binnendeuren: tijdloos en stijlvol
            </h2>
            <p className="m-0 mb-4 text-[16px] leading-[1.75] text-[oklch(0.42_0.008_60)]">
              Een zwarte stalen binnendeur is een populaire keuze voor zowel moderne als industriële interieurs.
              De combinatie van zwarte stalen profielen en glas zorgt voor een strak contrast en geeft iedere
              ruimte een luxe, tijdloze uitstraling.
            </p>
            <p className="m-0 mb-4 text-[16px] leading-[1.75] text-[oklch(0.42_0.008_60)]">
              Bij Meisterworks maken we zwarte stalen deuren volledig op maat. Of je nu kiest voor een enkele
              scharnierdeur, dubbele taatsdeuren of een stalen schuifdeur met glas, het ontwerp wordt afgestemd
              op jouw woning.
            </p>
            <p className="m-0 text-[16px] leading-[1.75] text-[oklch(0.42_0.008_60)]">
              Naast klassiek zwart zijn ook andere kleuren en afwerkingen mogelijk, zodat je de deur perfect kunt
              laten aansluiten op jouw interieur.
            </p>
            <LandingActions actions={[{ label: "Ontdek onze zwarte stalen deuren", href: ROUTES.stalenDeurZwart, tone: "dark" }]} />
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="maatwerk-title" className="bg-[oklch(0.96_0.004_75)] px-7 py-20">
        <div className="mx-auto max-w-[var(--max-width)]">
          <Reveal className="mb-10 max-w-[760px]">
            <h2 id="maatwerk-title" className="font-serif-display m-0 mb-4 text-[clamp(28px,3.4vw,40px)] font-normal">
              Jouw stalen deur, volledig op maat gemaakt
            </h2>
            <p className="m-0 mb-4 text-[16px] leading-[1.75] text-[oklch(0.42_0.008_60)]">
              Bij Meisterworks geloven we dat een stalen binnendeur perfect moet passen bij de ruimte waarin deze
              wordt geplaatst. Daarom produceren we geen standaarddeuren, maar maken we ieder ontwerp op maat in
              onze eigen werkplaats.
            </p>
            <p className="m-0 text-[16px] leading-[1.75] text-[oklch(0.42_0.008_60)]">
              Je hebt de vrijheid om verschillende onderdelen zelf samen te stellen.
            </p>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 min-[1100px]:grid-cols-3">
            <article>
              <CoverImage
                src="/assets/glas/helder.jpg"
                alt="Detail van helder glas in een zwart stalen deurprofiel"
                className="mb-5 aspect-[4/5]"
                sizes="(min-width: 900px) 30vw, 100vw"
              />
              <h3 className="font-serif-display m-0 mb-3 text-[24px] font-normal">Verschillende glassoorten</h3>
              <p className="m-0 text-[15px] leading-[1.7] text-[oklch(0.42_0.008_60)]">
                Kies voor helder glas om zoveel mogelijk licht door te laten, matglas of melkglas voor extra
                privacy, of een andere glassoort die bij jouw interieur past.
              </p>
            </article>
            <article>
              <CoverImage
                src="/assets/doors/scharnierdeur-landscape.jpg"
                alt="Zwarte stalen scharnierdeur in RAL-zwart, geplaatst in een lichte hal"
                className="mb-5 aspect-[4/5]"
                sizes="(min-width: 900px) 30vw, 100vw"
              />
              <h3 className="font-serif-display m-0 mb-3 text-[24px] font-normal">Kleuren en afwerkingen</h3>
              <p className="m-0 text-[15px] leading-[1.7] text-[oklch(0.42_0.008_60)]">
                Van een zwarte stalen deur in RAL 9005 tot warme bruintinten, wit of een opvallende kleur zoals
                olijfgroen. Met de juiste afwerking sluit jouw stalen binnendeur aan op de rest van je interieur.
              </p>
            </article>
            <article>
              <CoverImage
                src="/assets/handgrepen/recht_hoekgreep.jpg"
                alt="Zwarte rechte hoekgreep op een stalen deurprofiel"
                className="mb-5 aspect-[4/5]"
                sizes="(min-width: 900px) 30vw, 100vw"
              />
              <h3 className="font-serif-display m-0 mb-3 text-[24px] font-normal">Profielen en handgrepen</h3>
              <p className="m-0 text-[15px] leading-[1.7] text-[oklch(0.42_0.008_60)]">
                Ook de vakverdeling, stalen profielen en handgrepen bepalen de uitstraling van jouw deur. Kies
                voor een minimalistisch ontwerp met strakke lijnen of juist een opvallender design.
              </p>
            </article>
          </div>
          <Reveal>
            <p className="m-0 mt-10 max-w-[760px] text-[16px] leading-[1.75] text-[oklch(0.42_0.008_60)]">
              Met deze maatwerkopties creëren we een unieke stalen binnendeur die volledig aansluit bij jouw woning.
            </p>
            <LandingActions actions={[{ label: "Bekijk onze projecten", href: ROUTES.inspiratie, tone: "dark" }]} />
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="limburg-title" className="mx-auto max-w-[760px] px-7 py-20">
        <Reveal>
          <h2 id="limburg-title" className="font-serif-display m-0 mb-4 text-[clamp(28px,3.4vw,40px)] font-normal">
            Stalen deuren op maat in Limburg
          </h2>
          <p className="m-0 mb-4 text-[16px] leading-[1.75] text-[oklch(0.42_0.008_60)]">
            Meisterworks is gevestigd in Weert en gespecialiseerd in het maken en plaatsen van stalen binnendeuren
            in Limburg en omgeving.
          </p>
          <p className="m-0 mb-4 text-[16px] leading-[1.75] text-[oklch(0.42_0.008_60)]">
            We zijn onder andere actief in Weert, Nederweert en de regio Eindhoven en Tilburg. Of je nu een stalen
            deur zoekt voor een nieuwbouwwoning, renovatie of bestaande leefruimte, wij begeleiden je persoonlijk
            van het eerste ontwerp tot de uiteindelijke montage.
          </p>
          <p className="m-0 text-[16px] leading-[1.75] text-[oklch(0.42_0.008_60)]">
            Dankzij onze eigen productie en aandacht voor detail leveren we maatwerk dat aansluit op jouw interieur
            en wensen.
          </p>
        </Reveal>
      </section>

      <section aria-labelledby="proces-title" className="bg-[oklch(0.96_0.004_75)] px-7 py-20">
        <Reveal className="mx-auto max-w-[760px]">
          <h2 id="proces-title" className="font-serif-display m-0 mb-4 text-[clamp(28px,3.4vw,40px)] font-normal">
            Van offerte tot montage
          </h2>
          <p className="m-0 mb-4 text-[16px] leading-[1.75] text-[oklch(0.42_0.008_60)]">
            Bij Meisterworks houden we het proces persoonlijk en overzichtelijk. Na jouw offerteaanvraag bespreken
            we de wensen, komen we indien nodig op locatie inmeten en stellen we een passend voorstel op.
          </p>
          <p className="m-0 mb-4 text-[16px] leading-[1.75] text-[oklch(0.42_0.008_60)]">
            Na akkoord wordt jouw stalen binnendeur met zorg vervaardigd in onze eigen werkplaats. Zodra de deur
            klaar is, verzorgen we de levering en professionele plaatsing.
          </p>
          <p className="m-0 text-[16px] leading-[1.75] text-[oklch(0.42_0.008_60)]">
            Zo ben je verzekerd van een deur die niet alleen perfect past, maar ook zorgvuldig is afgewerkt.
          </p>
          <LandingActions actions={[{ label: "Bekijk onze werkwijze", href: ROUTES.vakmanschap, tone: "dark" }]} />
        </Reveal>
      </section>

      <section aria-labelledby="prijs-title" className="mx-auto max-w-[760px] px-7 py-20">
        <Reveal>
          <h2 id="prijs-title" className="font-serif-display m-0 mb-4 text-[clamp(28px,3.4vw,40px)] font-normal">
            Wat kost een stalen binnendeur op maat?
          </h2>
          <p className="m-0 mb-4 text-[16px] leading-[1.75] text-[oklch(0.42_0.008_60)]">
            De prijs van een stalen binnendeur is afhankelijk van verschillende factoren, zoals de afmetingen, het
            type deur, de glassoort, de afwerking en de montage.
          </p>
          <p className="m-0 mb-4 text-[16px] leading-[1.75] text-[oklch(0.42_0.008_60)]">
            Omdat we iedere stalen deur volledig op maat maken, ontvang je bij Meisterworks een offerte die
            aansluit op jouw specifieke wensen.
          </p>
          <p className="m-0 text-[16px] leading-[1.75] text-[oklch(0.42_0.008_60)]">
            Benieuwd naar de mogelijkheden en kosten voor jouw stalen deur?{" "}
            <Link
              href={ROUTES.offerte}
              className="text-[oklch(0.32_0.008_60)] underline decoration-[oklch(0.78_0.006_75)] underline-offset-[3px]"
            >
              Vraag vrijblijvend een offerte aan.
            </Link>
          </p>
        </Reveal>
      </section>

      <LandingCtaBand
        title="Vraag een vrijblijvende offerte aan"
        actions={[
          { label: "Vraag een offerte aan", href: ROUTES.offerte, tone: "accent" },
          { label: "Neem contact op", href: ROUTES.afspraak, tone: "ghost" },
        ]}
      >
        <p className="m-0">
          Wil je een stalen binnendeur laten maken die volledig past bij jouw interieur? Bij Meisterworks combineren
          we persoonlijk advies, vakmanschap en maatwerk om jouw wensen werkelijkheid te maken.
        </p>
        <p className="m-0 mt-3">Vertel ons jouw ideeën en ontdek wat we voor je kunnen betekenen.</p>
        <p className="m-0 mt-6">
          Of{" "}
          <Link href={ROUTES.configurator} className="underline">
            stel je stalen deur samen
          </Link>{" "}
          in de configurator. Bel{" "}
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
