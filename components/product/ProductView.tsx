import Link from "next/link";
import { ArrowIcon, CoverImage } from "@/components/ui";
import {
  COLOR_OPTIONS,
  GLASS_CATEGORIES,
  HARDWARE_OPTIONS,
  VLAK_OPTIONS,
  relatedProducts,
  type ProductPageCopy,
} from "@/lib/products";
import { ROUTES, getProduct } from "@/lib/site";

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
  const panelStep = page.hasFixedPanel ? step++ : null;
  const maatStep = step++;
  const vlakStep = step++;
  const glassStep = step++;
  const colorStep = step++;
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

      {panelStep ? (
        <section className="mx-auto max-w-[var(--max-width)] px-7 py-20">
          <StepIntro
            kicker={`Stap ${panelStep} — Vast paneel`}
            title="Een vast vlak naast de deur."
            body="Kies geen paneel, één paneel links of rechts, of twee panelen aan beide zijden. Zelfde staal, zelfde glas, zonder mechaniek."
          />
          <ComposeLink href={configureHref}>Paneel toevoegen</ComposeLink>
        </section>
      ) : null}

      <section className="mx-auto max-w-[var(--max-width)] px-7 py-[60px]">
        <StepIntro
          kicker={`Stap ${maatStep} — Afmeting`}
          title="Breedte en hoogte van de opening."
          body="U vult breedte en hoogte in millimeters in. Heeft u een vast paneel, dan vult u ook die breedte in. Wij meten de opening zelf in voordat we in productie gaan."
        />
        <ComposeLink href={configureHref}>{page.composeCta}</ComposeLink>
      </section>

      <section className="bg-[oklch(0.93_0.006_75)] px-7 py-20">
        <div className="mx-auto max-w-[var(--max-width)]">
          <StepIntro
            kicker={`Stap ${vlakStep} — Liggers en staanders`}
            title="Het ritme van het glas."
            body="Liggers en staanders verdelen het vlak. Heeft u vaste panelen, dan stelt u die verdeling apart in voor de deur en de panelen."
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
          <ComposeLink href={configureHref}>Kies indeling</ComposeLink>
        </div>
      </section>

      <section className="mx-auto max-w-[var(--max-width)] px-7 py-20">
        <StepIntro
          kicker={`Stap ${glassStep} — Glas`}
          title="Hoe wil je dat het glas eruitziet?"
          body="Eerst kiest u de uitstraling. De passende varianten volgen in de configurator."
        />
        <div className="grid grid-cols-2 gap-4 min-[900px]:grid-cols-3 min-[900px]:gap-6">
          {GLASS_CATEGORIES.map((option) => (
            <div key={option.title}>
              <div
                className="mb-3.5 aspect-[4/3] rounded-[14px]"
                style={{ background: option.sample }}
              />
              <div className="font-serif-display mb-1.5 text-[16px] min-[560px]:text-[19px]">
                {option.title}
              </div>
              <p className="m-0 text-[14px] leading-[1.6] text-[oklch(0.45_0.008_60)]">
                {option.body}
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
            body="Standaard is mat zwart. Een afwijkende RAL-kleur of een designkleur, zoals brons, is ook mogelijk."
            dark
          />
          <div className="grid grid-cols-2 gap-4 min-[900px]:grid-cols-3 min-[900px]:gap-6">
            {COLOR_OPTIONS.map((color) => (
              <div key={color.title}>
                <CoverImage
                  src={color.image}
                  alt={color.alt}
                  className="mb-3 aspect-square"
                  radius={12}
                  sizes={GRID_IMAGE_SIZES}
                />
                <div className="mb-1 text-[15px] text-[oklch(0.94_0.004_75)]">
                  {color.title}
                </div>
                <div className="text-[13px] text-[oklch(0.55_0.008_75)]">
                  {color.note}
                </div>
              </div>
            ))}
          </div>
          <ComposeLink href={configureHref}>Kies kleur</ComposeLink>
        </div>
      </section>

      {hardwareStep ? (
        <section className="bg-[oklch(0.93_0.006_75)] px-7 py-20">
          <div className="mx-auto max-w-[var(--max-width)]">
            <StepIntro
              kicker={`Stap ${hardwareStep} — Beslag`}
              title="Kruk, slot en afwerking."
              body="Drie pakketten. Het beslag wordt in dezelfde lijn als het staal gekozen."
            />
            <div className="grid grid-cols-2 gap-4 min-[900px]:grid-cols-3 min-[900px]:gap-7">
              {HARDWARE_OPTIONS.map((option) => (
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
                  <p className="m-0 text-[14px] leading-[1.6] text-[oklch(0.45_0.008_60)]">
                    {option.body}
                  </p>
                </div>
              ))}
            </div>
            <ComposeLink href={configureHref}>Kies beslag</ComposeLink>
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
