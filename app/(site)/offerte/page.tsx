import type { Metadata } from "next";
import Link from "next/link";
import { OfferteForm } from "@/components/offerte/OfferteForm";
import { ROUTES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Snelle offerte — Meisterworks",
};

export default function OffertePage() {
  return (
    <main>
      <header className="mx-auto max-w-[760px] px-7 pt-12">
        <div className="mb-5 text-[13px] text-[oklch(0.5_0.008_60)]">
          <Link
            href={ROUTES.home}
            className="border-b border-[oklch(0.75_0.006_75)] pb-px"
          >
            Home
          </Link>
          &nbsp;/&nbsp; Snelle offerte
        </div>
        <div className="mb-[14px] text-[13px] tracking-[0.16em] text-[oklch(0.5_0.01_60)] uppercase">
          Snelle offerte
        </div>
        <h1 className="font-serif-display m-0 mb-3.5 text-[clamp(28px,4vw,40px)] leading-[1.15] font-medium">
          Vertel ons wat u nodig heeft.
        </h1>
        <p className="mb-9 max-w-[520px] text-[15px] leading-[1.6] text-[oklch(0.42_0.008_60)]">
          Liever geen configurator doorlopen? Vul dit korte formulier in en we
          nemen binnen één werkdag contact met u op met een vrijblijvende
          offerte.
        </p>
      </header>
      <div className="mx-auto max-w-[760px] px-7 pb-20">
        <OfferteForm />
      </div>
    </main>
  );
}
