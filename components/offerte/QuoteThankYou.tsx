"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  readQuoteThanks,
  type QuoteThanksSource,
} from "@/lib/quotes/thank-you";

export function QuoteThankYou({
  source,
  fallbackHref,
}: {
  source: QuoteThanksSource;
  fallbackHref: string;
}) {
  const router = useRouter();
  const [thanks, setThanks] = useState<{ quoteNumber: string; doorCount: number } | null>(null);

  useEffect(() => {
    const stored = readQuoteThanks(source);
    if (!stored) {
      router.replace(fallbackHref);
      return;
    }
    setThanks({ quoteNumber: stored.quoteNumber, doorCount: stored.doorCount });
  }, [fallbackHref, router, source]);

  if (!thanks) return null;

  return (
    <div className="cfg-quote-success">
      <div className="cfg-quote-success-icon" aria-hidden>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 13l4 4L19 7"
            stroke="var(--accent)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="font-serif-display cfg-quote-success-title">Bedankt voor uw aanvraag</div>
      <p>{thankYouMessage(source, thanks.quoteNumber, thanks.doorCount)}</p>
    </div>
  );
}

function thankYouMessage(source: QuoteThanksSource, quoteNumber: string, doorCount: number) {
  if (source === "website_configurator") {
    const noun = doorCount > 1 ? "samenstellingen" : "samenstelling";
    return `We hebben uw gegevens en ${noun} ontvangen. Uw aanvraagnummer is ${quoteNumber}. We nemen binnen één werkdag contact met u op met een passende offerte.`;
  }
  return `We hebben uw gegevens ontvangen. Uw aanvraagnummer is ${quoteNumber}. We nemen binnen één werkdag contact met u op.`;
}
