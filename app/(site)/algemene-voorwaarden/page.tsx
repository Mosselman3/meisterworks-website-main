import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import {
  GENERAL_TERMS_EFFECTIVE_DATE,
  GENERAL_TERMS_LABEL,
  GENERAL_TERMS_PDF,
} from "@/lib/legal/terms";

export const metadata: Metadata = {
  title: "Algemene voorwaarden",
  description: "De algemene voorwaarden van Meisterworks.",
  alternates: { canonical: "/algemene-voorwaarden" },
};

function termsText() {
  return readFileSync(join(process.cwd(), "public", "algemene-voorwaarden.txt"), "utf8");
}

export default function AlgemeneVoorwaardenPage() {
  return (
    <main className="bg-[var(--paper)] px-7 py-20 sm:py-28">
      <article className="mx-auto max-w-3xl">
        <header className="mb-10 border-b border-[oklch(0.84_0.006_75)] pb-8">
          <p className="eyebrow">Meisterworks</p>
          <h1 className="mt-4 font-[var(--font-display)] text-4xl leading-tight text-[var(--ink)] sm:text-5xl">
            Algemene voorwaarden
          </h1>
          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
            Versie: {GENERAL_TERMS_LABEL}. Van toepassing vanaf{" "}
            {GENERAL_TERMS_EFFECTIVE_DATE}.
          </p>
          <a
            href={GENERAL_TERMS_PDF}
            download
            className="btn-dark mt-7 inline-flex"
          >
            Download de algemene voorwaarden (PDF)
          </a>
        </header>
        <pre className="whitespace-pre-wrap font-[var(--font-body)] text-[15px] leading-8 text-[var(--ink)]">
          {termsText()}
        </pre>
        <p className="mt-12 border-t border-[oklch(0.84_0.006_75)] pt-6 text-sm leading-7 text-[var(--muted)]">
          Deze conceptvoorwaarden moeten vóór publicatie worden gecontroleerd
          door een Nederlandse jurist met ervaring in consumentenrecht,
          maatwerk en aanneming/plaatsing. De tekst is een werkdocument en geen
          juridisch advies.
        </p>
      </article>
    </main>
  );
}
