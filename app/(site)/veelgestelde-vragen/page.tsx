import type { Metadata } from "next";
import Link from "next/link";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { HeroLoad, Reveal } from "@/components/motion/Reveal";
import { ArrowIcon } from "@/components/ui";
import {
  DOOR_TYPE_CODES,
  FAQ_CATEGORIES,
  FAQ_ITEMS,
  faqsForDoor,
  faqPageJsonLd,
  generalFaqs,
  PRODUCT_FAQ_COPY,
} from "@/lib/faq";
import { PRODUCTS, ROUTES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Veelgestelde vragen",
  description:
    "Antwoorden over taatsdeuren, scharnierdeuren, schuifdeuren en vaste panelen: maatwerk, inmeten, glas, kleur en een vrijblijvend adviesgesprek.",
  alternates: { canonical: ROUTES.faq },
};

export default function FaqPage() {
  const jsonLd = faqPageJsonLd(FAQ_ITEMS);

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="mx-auto max-w-[760px] px-7 pt-[72px] pb-6 text-center">
        <HeroLoad>
          <div className="mb-4 text-[13px] tracking-[0.16em] text-[oklch(0.5_0.01_60)] uppercase">
            Veelgestelde vragen
          </div>
        </HeroLoad>
        <HeroLoad stagger={1}>
          <h1 className="font-serif-display m-0 mb-5 text-[clamp(30px,4.4vw,46px)] font-normal">
            Antwoord voordat u kiest.
          </h1>
        </HeroLoad>
        <HeroLoad stagger={2}>
          <p className="m-0 text-[16px] leading-[1.7] text-[oklch(0.42_0.008_60)]">
            Over het mechanisme, de maat, het glas en wat er gebeurt nadat u een deur
            samenstelt. Staat uw situatie er niet bij, dan kijken we daar samen naar.
          </p>
        </HeroLoad>
      </header>

      {FAQ_CATEGORIES.map((category) => {
        const items = generalFaqs(category.id);
        if (items.length === 0) return null;
        return (
          <section key={category.id} className="mx-auto max-w-[860px] px-7 py-10" aria-labelledby={category.id}>
            <Reveal>
              <h2
                id={category.id}
                className="font-serif-display m-0 mb-3 text-[clamp(26px,3.2vw,34px)] font-normal"
              >
                {category.title}
              </h2>
              <p className="m-0 mb-6 max-w-[62ch] text-[16px] leading-[1.7] text-[oklch(0.42_0.008_60)]">
                {category.lead}
              </p>
            </Reveal>
            <Reveal>
              <FaqAccordion items={items} />
            </Reveal>
          </section>
        );
      })}

      <section className="mx-auto max-w-[860px] px-7 pt-6 pb-16" aria-labelledby="per-deur">
        <Reveal>
          <h2 id="per-deur" className="font-serif-display m-0 mb-3 text-[clamp(26px,3.2vw,34px)] font-normal">
            Per deur
          </h2>
          <p className="m-0 mb-6 max-w-[62ch] text-[16px] leading-[1.7] text-[oklch(0.42_0.008_60)]">
            De vragen die bij één product horen. Op de productpagina staat dezelfde selectie,
            samen met de vragen die voor elke deur gelden.
          </p>
          <div className="mb-10 flex flex-wrap gap-x-5 gap-y-2">
            {DOOR_TYPE_CODES.map((code) => (
              <a key={code} href={`#${code}`} className="text-[14px] text-[oklch(0.32_0.008_60)] underline-offset-4 hover:underline">
                {PRODUCTS.find((product) => product.doorTypeCode === code)?.title}
              </a>
            ))}
          </div>
        </Reveal>
        <div className="grid gap-12">
          {DOOR_TYPE_CODES.map((code) => (
            <div key={code} id={code}>
              <Reveal>
                <h3 className="font-serif-display m-0 mb-3 text-[clamp(22px,2.6vw,28px)] font-normal">
                  {PRODUCTS.find((product) => product.doorTypeCode === code)?.title}
                </h3>
                <p className="m-0 mb-5 text-[15px] leading-[1.7] text-[oklch(0.42_0.008_60)]">
                  {PRODUCT_FAQ_COPY[code].body}
                </p>
              </Reveal>
              <Reveal>
                <FaqAccordion items={faqsForDoor(code)} />
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[oklch(0.16_0.006_60)] px-7 py-20 text-center">
        <Reveal className="mx-auto max-w-[640px]">
          <h2 className="font-serif-display m-0 mb-[18px] text-[clamp(26px,3.4vw,36px)] font-normal text-[oklch(0.97_0.004_75)]">
            De volgende stap kiest u zelf.
          </h2>
          <p className="m-0 mb-8 text-[15px] leading-[1.6] text-[oklch(0.65_0.008_75)]">
            Stel uw deur samen in de configurator, of plan een vrijblijvend adviesgesprek
            van 30 minuten. Telefonisch of op het atelier.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={ROUTES.configurator} className="btn-accent btn-accent-lg gap-2">
              Deur samenstellen
              <ArrowIcon />
            </Link>
            <Link href={ROUTES.afspraak} className="btn-ghost gap-2 px-[30px] py-[15px] text-[14px] font-medium">
              Adviesgesprek plannen
              <ArrowIcon />
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
