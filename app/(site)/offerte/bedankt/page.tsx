import type { Metadata } from "next";
import { QuoteThankYou } from "@/components/offerte/QuoteThankYou";
import { ROUTES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Bedankt voor uw aanvraag — Meisterworks",
  robots: { index: false, follow: false },
};

export default function OfferteBedanktPage() {
  return (
    <main>
      <div className="mx-auto max-w-[760px] px-7 py-16">
        <QuoteThankYou source="website_snelle_offerte" fallbackHref={ROUTES.offerte} />
      </div>
    </main>
  );
}
