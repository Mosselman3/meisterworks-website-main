import type { Metadata } from "next";
import Link from "next/link";
import { REVIEW_COUNT, REVIEW_SCORE } from "@/lib/content";
import { CONTACT, ROUTES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Adviesgesprek plannen — Meisterworks",
};

const REASONS = [
  "Persoonlijk advies over mechanisme, materiaal en glassoort — passend bij uw ruimte en budget",
  "Geen verplichtingen — u beslist pas na het gesprek of en hoe u verder gaat",
  "30 minuten, telefonisch of op ons atelier — u kiest wat u het beste uitkomt",
  "Na afloop ontvangt u een offerte op maat, volledig gebaseerd op wat er is besproken",
];

const STEPS = [
  "U kiest een moment dat past, direct in de agenda",
  "Een vakspecialist belt u op of ontvangt u op het atelier",
  "U ontvangt binnen enkele dagen een passende offerte",
];

export default function AfspraakPage() {
  return (
    <main>
      <header className="mx-auto max-w-[900px] px-7 pt-12">
        <div className="mb-5 text-[13px] text-[oklch(0.5_0.008_60)]">
          <Link
            href={ROUTES.home}
            className="border-b border-[oklch(0.75_0.006_75)] pb-px"
          >
            Home
          </Link>
          &nbsp;/&nbsp; Adviesgesprek plannen
        </div>
        <div className="mb-[14px] text-[13px] tracking-[0.16em] text-[oklch(0.5_0.01_60)] uppercase">
          Adviesgesprek plannen
        </div>
        <h1 className="font-serif-display m-0 mb-3.5 text-[clamp(28px,4vw,40px)] font-normal">
          Kies een moment dat u past.
        </h1>
        <p className="mb-3 max-w-[560px] text-[15px] leading-[1.6] text-[oklch(0.42_0.008_60)]">
          Nog niet zeker wat u precies wilt bestellen? Een adviesgesprek is er
          juist voor bedoeld — vrijblijvend, zonder verplichtingen, en met een
          deskundig antwoord op al uw vragen.
        </p>
        <div className="mb-9 flex items-center gap-2">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, index) => (
              <svg
                key={index}
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="var(--accent)"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
          <span className="text-[13px] text-[oklch(0.4_0.008_60)]">
            {REVIEW_SCORE.toLocaleString("nl-NL")} uit {REVIEW_COUNT} beoordelingen
          </span>
        </div>
      </header>

      <section
        data-advies-grid="true"
        className="mx-auto grid max-w-[1180px] items-start gap-10 px-7 pb-20"
        style={{ gridTemplateColumns: "minmax(0, 1.5fr) minmax(0, 1fr)" }}
      >
        <div>
          <div className="flex min-h-[640px] items-center justify-center rounded-[18px] border-[1.5px] border-dashed border-[oklch(0.8_0.006_75)] bg-white p-12">
            <div className="max-w-[380px] text-center">
              <div className="mx-auto mb-[18px] flex h-12 w-12 items-center justify-center rounded-full bg-[oklch(0.95_0.004_75)]">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <rect
                    x="3"
                    y="5"
                    width="18"
                    height="16"
                    rx="2"
                    stroke="oklch(0.45 0.008 60)"
                    strokeWidth="1.6"
                  />
                  <path
                    d="M3 9h18M8 3v4M16 3v4"
                    stroke="oklch(0.45 0.008 60)"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="font-serif-display mb-2.5 text-[19px]">
                Agenda nog niet gekoppeld
              </div>
              <p className="m-0 text-[14px] leading-[1.6] text-[oklch(0.45_0.008_60)]">
                Zodra Calendly is gekoppeld, verschijnt hier de live
                planningsagenda. Tot die tijd kunt u mailen naar{" "}
                <a href={`mailto:${CONTACT.email}`} className="underline">
                  {CONTACT.email}
                </a>
                .
              </p>
            </div>
          </div>
          <p className="mt-4 mb-0 text-[12px] leading-[1.5] text-[oklch(0.55_0.008_60)]">
            Deze sectie is voorbereid op een Calendly-embed. Zodra de link is
            ingesteld, verschijnt hier de volledige planningsagenda.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          <div className="rounded-2xl border border-[oklch(0.9_0.006_75)] bg-white p-[26px]">
            <div className="mb-4 text-[12px] tracking-[0.1em] text-[oklch(0.5_0.008_60)] uppercase">
              Waarom een adviesgesprek
            </div>
            <div className="flex flex-col gap-4">
              {REASONS.map((reason) => (
                <div key={reason} className="flex gap-3">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="mt-0.5 shrink-0"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="var(--accent)"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="text-[14px] leading-[1.5] text-[oklch(0.3_0.008_60)]">
                    {reason}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-[oklch(0.13_0.006_60)] p-[26px]">
            <div className="mb-3.5 text-[12px] tracking-[0.1em] text-[oklch(0.6_0.008_75)] uppercase">
              Wat u kunt verwachten
            </div>
            <div className="flex flex-col gap-3">
              {STEPS.map((step, index) => (
                <div key={step} className="flex items-baseline gap-2.5">
                  <span className="font-serif-display shrink-0 text-[15px] text-[var(--accent)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[13px] leading-[1.5] text-[oklch(0.85_0.004_75)]">
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-l-2 border-[var(--accent)] pl-4">
            <p className="m-0 mb-2 text-[14px] font-light leading-[1.65] text-[oklch(0.3_0.008_60)] italic">
              “Het adviesgesprek gaf ons precies de duidelijkheid die we nodig
              hadden voordat we gingen bestellen.”
            </p>
            <div className="text-[12px] text-[oklch(0.5_0.008_60)]">
              — Melissa Vijgen, Google review
            </div>
          </div>

          <p className="m-0 text-[12px] leading-[1.5] text-[oklch(0.55_0.008_60)]">
            Weet u al precies wat u wilt?{" "}
            <Link
              href={ROUTES.configurator}
              className="text-[oklch(0.4_0.008_60)] underline"
            >
              Stel direct uw deur samen
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
