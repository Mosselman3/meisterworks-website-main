import Link from "next/link";
import { ArrowIcon, CoverImage } from "@/components/ui";
import { relatedProducts, type ProductPageCopy } from "@/lib/products";
import { DesignMoreCarousel } from "@/components/product/DesignMoreCarousel";
import {
  COLORS,
  GLASS_LOOK_GROUPS,
  HARDWARE,
  SLUITWERK,
  colorThumbBackground,
  designPriceMark,
} from "@/components/configurator/catalog";
import {
  directionOptions,
  dirThumbStyle,
  panelLayoutThumb,
  type PanelLayout,
} from "@/components/configurator/logic";
import { ROUTES, getProduct } from "@/lib/site";

const PANEL_CHOICES: {
  label: string;
  desc: string;
  kind: PanelLayout;
  side?: "links" | "rechts";
}[] = [
  { label: "Geen vast paneel", desc: "Alleen de deur.", kind: "geen" },
  {
    label: "Paneel links",
    desc: "Een vast vlak links van de deur.",
    kind: "een",
    side: "links",
  },
  {
    label: "Paneel rechts",
    desc: "Een vast vlak rechts van de deur.",
    kind: "een",
    side: "rechts",
  },
  {
    label: "Twee vaste panelen",
    desc: "Een paneel links én rechts.",
    kind: "beide",
  },
];

const GRID_IMAGE_SIZES = "(min-width: 900px) 33vw, 50vw";
const RELATED_IMAGE_SIZES = "(min-width: 900px) 33vw, 50vw";

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
        className={`font-serif-display m-0 mb-4 text-[clamp(26px,3.2vw,36px)] font-normal ${dark ? "text-[oklch(0.97_0.004_75)]" : ""}`}
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

function MaatDiagram({ withPanel }: { withPanel: boolean }) {
  return (
    <svg
      viewBox="0 0 360 200"
      className="h-[160px] w-full max-w-[460px]"
      role="img"
      aria-label={
        withPanel
          ? "Schets van deur en vast paneel met breedte en hoogte"
          : "Schets van een deur met breedte en hoogte"
      }
    >
      <rect width="360" height="200" fill="#f4f2ef" rx="12" />
      {withPanel ? (
        <>
          <rect x="78" y="28" width="92" height="128" fill="#ffffff" stroke="#2f4a63" strokeWidth="3" />
          <rect x="176" y="28" width="58" height="128" fill="#e3e9e8" stroke="#2f4a63" strokeWidth="2.5" />
          <text x="107" y="176" textAnchor="middle" fill="#5c574f" fontSize="11">
            Breedte deur
          </text>
          <text x="205" y="176" textAnchor="middle" fill="#5c574f" fontSize="11">
            Paneel
          </text>
        </>
      ) : (
        <>
          <rect x="118" y="28" width="78" height="128" fill="#ffffff" stroke="#2f4a63" strokeWidth="3" />
          <text x="157" y="176" textAnchor="middle" fill="#5c574f" fontSize="12">
            Breedte
          </text>
        </>
      )}
      <line x1="268" y1="28" x2="268" y2="156" stroke="#2f4a63" strokeWidth="1.4" />
      <path d="M268 28 l-4 7 h8 z" fill="#2f4a63" />
      <path d="M268 156 l-4 -7 h8 z" fill="#2f4a63" />
      <text x="278" y="96" fill="#5c574f" fontSize="12">
        Hoogte
      </text>
    </svg>
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
  const configureHref = `${ROUTES.configurator}?product=${page.slug}`;
  let step = 1;
  const asksDirection =
    product?.doorTypeCode === "scharnierdeur_kozijn" || product?.doorTypeCode === "schuifdeur";
  const directionStep = asksDirection ? step++ : null;
  const panelStep = page.hasFixedPanel ? step++ : null;
  const maatStep = step++;
  const vlakStep = step++;
  const glassStep = step++;
  const colorStep = step++;
  const gripStep = page.hasHardware ? step++ : null;
  const hardwareStep = page.hasHardware ? step++ : null;

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
          <h1 className="font-serif-display m-0 mb-5 text-[clamp(32px,5vw,56px)] font-normal text-[oklch(0.98_0.004_75)]">
            {page.heroTitle}
          </h1>
          <p className="m-0 max-w-[500px] text-[clamp(15px,1.8vw,17px)] leading-[1.6] text-[oklch(0.88_0.004_75)]">
            {page.heroLead}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[760px] px-7 pt-20 pb-10 text-left">
        <p className="m-0 mb-5 text-[clamp(19px,2.2vw,23px)] font-light leading-[1.7] text-[oklch(0.25_0.008_60)]">
          {page.introLead}
        </p>
        <p className="m-0 text-[16px] leading-[1.75] text-[oklch(0.42_0.008_60)]">
          {page.introBody}
        </p>
      </section>

      {directionStep ? (
        <section className="mx-auto max-w-[var(--max-width)] px-7 py-20">
          <StepIntro
            kicker={`Stap ${directionStep} — ${page.slug === "schuifdeur" ? "Schuifrichting" : "Draairichting"}`}
            title={
              page.slug === "schuifdeur"
                ? "De deur schuift naar links of naar rechts."
                : "De deur draait naar links of naar rechts."
            }
            body={
              page.slug === "schuifdeur"
                ? "Kies de kant waar de deur naartoe schuift."
                : "Linksdraaiend heeft het scharnier links en de greep rechts. Rechtsdraaiend is dat omgekeerd."
            }
          />
          <div className="grid max-w-[640px] grid-cols-2 gap-4">
            {directionOptions(page.slug === "schuifdeur" ? "schuif" : "draai").map((option) => (
              <div key={option.id}>
                <div className="mb-3 overflow-hidden rounded-[12px]" style={dirThumbStyle(option.dia)} />
                <div className="text-[15px] text-[oklch(0.25_0.008_60)]">{option.label}</div>
                <p className="m-0 mt-1 text-[14px] leading-[1.5] text-[oklch(0.45_0.008_60)]">
                  {option.desc}
                </p>
              </div>
            ))}
          </div>
          <ComposeLink href={configureHref}>Kies richting</ComposeLink>
        </section>
      ) : null}

      {panelStep ? (
        <section className="mx-auto max-w-[var(--max-width)] px-7 py-20">
          <StepIntro
            kicker={`Stap ${panelStep} — Vast paneel`}
            title="Een vast vlak naast de deur."
            body="Kies geen paneel, één paneel links of rechts, of twee panelen aan beide zijden. Zelfde staal, zelfde glas, zonder mechaniek."
          />
          <div className="grid grid-cols-2 gap-4 min-[900px]:grid-cols-4 min-[900px]:gap-5">
            {PANEL_CHOICES.map((option) => (
              <div key={option.label}>
                <div
                  className="mb-3 overflow-hidden rounded-[12px]"
                  style={panelLayoutThumb(option.kind, option.side)}
                />
                <div className="text-[15px] text-[oklch(0.25_0.008_60)]">{option.label}</div>
                <p className="m-0 mt-1 text-[14px] leading-[1.5] text-[oklch(0.45_0.008_60)]">
                  {option.desc}
                </p>
              </div>
            ))}
          </div>
          <ComposeLink href={configureHref}>Paneel toevoegen</ComposeLink>
        </section>
      ) : null}

      <section className="mx-auto max-w-[var(--max-width)] px-7 py-[60px]">
        <StepIntro
          kicker={`Stap ${maatStep} — Afmeting`}
          title="Breedte en hoogte van de opening."
          body={
            page.hasFixedPanel
              ? "U vult breedte en hoogte in millimeters in, en de breedte van een vast paneel als u dat kiest. Wij meten de opening zelf in voordat we in productie gaan."
              : "U vult breedte en hoogte in millimeters in. Wij meten de opening zelf in voordat we in productie gaan."
          }
        />
        <MaatDiagram withPanel={page.hasFixedPanel} />
        <ComposeLink href={configureHref}>{page.composeCta}</ComposeLink>
      </section>

      <section className="bg-[oklch(0.93_0.006_75)] px-7 py-20">
        <div className="mx-auto max-w-[var(--max-width)]">
          <StepIntro
            kicker={`Stap ${vlakStep} — Vlakverdeling`}
            title="Kies een ontwerp, of stel het zelf samen."
            body="Zo kan het glas verdeeld worden. In de configurator bepaalt u ook zelf het aantal liggers en staanders."
          />
          <DesignMoreCarousel />
          <ComposeLink href={configureHref}>Kies indeling</ComposeLink>
        </div>
      </section>

      <section className="mx-auto max-w-[var(--max-width)] px-7 py-20">
        <StepIntro
          kicker={`Stap ${glassStep} — Glas`}
          title="Hoe wil je dat het glas eruitziet?"
          body="Kies de uitstraling. In de configurator kiest u daarna nog gelaagd of gehard, of het patroon bij figuren."
        />
        <div className="grid grid-cols-2 gap-4 min-[900px]:grid-cols-3 min-[900px]:gap-6">
          {GLASS_LOOK_GROUPS.map((option) => (
            <div key={option.id}>
              <CoverImage
                src={option.image}
                alt={option.title}
                className="mb-3.5 aspect-[4/3]"
                radius={14}
                sizes={GRID_IMAGE_SIZES}
              />
              <div className="font-serif-display mb-1.5 text-[16px] min-[560px]:text-[19px]">
                {option.title}
              </div>
              <p className="m-0 text-[14px] leading-[1.6] text-[oklch(0.45_0.008_60)]">
                {option.text}
              </p>
            </div>
          ))}
        </div>
        <ComposeLink href={configureHref}>Kies glas</ComposeLink>
      </section>

      <section className="bg-[oklch(0.16_0.006_60)] px-7 py-20">
        <div className="mx-auto max-w-[var(--max-width)]">
          <StepIntro
            kicker={`Stap ${colorStep} — Kleur`}
            title="De afwerking van het staal."
            body="Standaard is mat zwart. Bij een afwijkende RAL-kleur kiest u in de configurator een kleur; de kleurcode vult zichzelf in en kunt u nog aanpassen."
            dark
          />
          <div className="grid max-w-[640px] grid-cols-2 gap-4">
            {COLORS.map((color) => (
              <div key={color.code}>
                <div
                  className="mb-3 aspect-[4/3] rounded-[12px]"
                  style={{ background: colorThumbBackground(color.code, color.hex) }}
                />
                <div className="mb-1 text-[15px] text-[oklch(0.94_0.004_75)]">{color.label}</div>
                <p className="m-0 text-[14px] leading-[1.5] text-[oklch(0.65_0.008_75)]">
                  {color.desc}
                </p>
              </div>
            ))}
          </div>
          <ComposeLink href={configureHref}>Kies kleur</ComposeLink>
        </div>
      </section>

      {gripStep ? (
        <section className="bg-[oklch(0.93_0.006_75)] px-7 py-20">
          <div className="mx-auto max-w-[var(--max-width)]">
            <StepIntro
              kicker={`Stap ${gripStep} — Handgreep`}
              title="Kies je handgreep."
              body="Kies de handgreep die het beste bij jouw deur past. De lengte en uitvoering kunnen worden afgestemd op de deur en de gewenste uitstraling."
            />
            <div className="grid grid-cols-2 gap-4 min-[900px]:grid-cols-3 min-[900px]:gap-7">
              {SLUITWERK.map((option) => (
                <div key={option.code}>
                  <CoverImage
                    src={option.image}
                    alt={option.label}
                    className="mb-3.5 aspect-[4/5]"
                    sizes={GRID_IMAGE_SIZES}
                  />
                  <div className="font-serif-display mb-1.5 text-[16px] min-[560px]:text-[19px]">
                    {option.label}
                  </div>
                  <p className="m-0 text-[14px] leading-[1.6] text-[oklch(0.45_0.008_60)]">
                    {option.desc}
                  </p>
                </div>
              ))}
            </div>
            <ComposeLink href={configureHref}>Kies handgreep</ComposeLink>
          </div>
        </section>
      ) : null}

      {hardwareStep ? (
        <section className="bg-[oklch(0.16_0.006_60)] px-7 py-20">
          <div className="mx-auto max-w-[var(--max-width)]">
            <StepIntro
              kicker={`Stap ${hardwareStep} — Sluitwerk`}
              title="Sluitwerk."
              body="Drie sloten, alleen bij een deurklink."
              dark
            />
            <div className="grid grid-cols-2 gap-4 min-[900px]:grid-cols-3 min-[900px]:gap-7">
              {HARDWARE.map((option) => (
                <div key={option.code}>
                  <div className="mb-3.5 aspect-[4/5] rounded-[12px] bg-[oklch(0.22_0.006_60)]" />
                  <div className="font-serif-display mb-1.5 text-[16px] text-[oklch(0.94_0.004_75)] min-[560px]:text-[19px]">
                    {option.label}
                  </div>
                  <p className="m-0 text-[14px] leading-[1.6] text-[oklch(0.72_0.008_75)]">
                    {option.desc}
                  </p>
                  <p className="m-0 mt-2 text-[14px] text-[oklch(0.72_0.008_75)]">
                    {designPriceMark(option.indication)}
                  </p>
                </div>
              ))}
            </div>
            <ComposeLink href={configureHref}>Kies sluitwerk</ComposeLink>
          </div>
        </section>
      ) : null}

      <section className="bg-[oklch(0.93_0.006_75)] px-7 py-20">
        <div className="mx-auto max-w-[var(--max-width)]">
          <div className="mb-2.5 text-[13px] tracking-[0.16em] text-[oklch(0.5_0.01_60)] uppercase">
            Andere producten
          </div>
          <h2 className="font-serif-display m-0 mb-8 text-[clamp(24px,3vw,32px)] font-normal">
            Bekijk ook onze andere modellen.
          </h2>
          <div className="grid grid-cols-2 gap-4 min-[900px]:grid-cols-3 min-[900px]:gap-5">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={item.href}
                className="flex flex-col overflow-hidden rounded-[14px] bg-white"
              >
                <CoverImage
                  src={item.image}
                  alt={item.title}
                  className="aspect-[4/3]"
                  radius={0}
                  sizes={RELATED_IMAGE_SIZES}
                />
                <div className="flex items-center justify-between gap-2.5 px-[18px] py-4">
                  <div className="font-serif-display text-[14px] min-[560px]:text-[16px] text-[oklch(0.2_0.008_60)]">
                    {item.title}
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
        <h2 className="font-serif-display m-0 mb-[18px] text-[clamp(26px,3.6vw,38px)] font-normal">
          Stel deze samenstelling samen in de configurator.
        </h2>
        <p className="m-0 mb-9 text-[16px] leading-[1.7] text-[oklch(0.42_0.008_60)]">
          Liever eerst persoonlijk meedenken? Plan een vrijblijvend adviesgesprek.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href={configureHref} className="btn-accent btn-accent-lg">
            {page.composeCta}
          </Link>
          <Link href={ROUTES.afspraak} className="btn-outline">
            Adviesgesprek plannen
          </Link>
        </div>
      </section>
    </main>
  );
}
