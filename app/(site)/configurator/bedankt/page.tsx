import type { Metadata } from "next";
import { QuoteThankYou } from "@/components/offerte/QuoteThankYou";
import { ROUTES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Bedankt voor uw aanvraag",
  robots: { index: false, follow: false },
  alternates: { canonical: "/configurator/bedankt" },
};

export default function ConfiguratorBedanktPage() {
  return (
    <main>
      <div className="mx-auto max-w-[760px] px-7 py-16">
        <QuoteThankYou source="website_configurator" fallbackHref={ROUTES.configurator} />
      </div>
    </main>
  );
}
