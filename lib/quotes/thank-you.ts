export const QUOTE_THANKS_STORAGE_KEY = "mw-quote-thanks";

export type QuoteThanksSource = "website_snelle_offerte" | "website_configurator";

export type QuoteThanksRecord = {
  source: QuoteThanksSource;
  quoteNumber: string;
  doorCount: number;
};

export function storeQuoteThanks(record: QuoteThanksRecord) {
  sessionStorage.setItem(QUOTE_THANKS_STORAGE_KEY, JSON.stringify(record));
}

export function readQuoteThanks(source: QuoteThanksSource): QuoteThanksRecord | null {
  try {
    const raw = sessionStorage.getItem(QUOTE_THANKS_STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed) || parsed.source !== source) return null;
    if (typeof parsed.quoteNumber !== "string" || parsed.quoteNumber.length === 0) return null;
    const doorCount =
      typeof parsed.doorCount === "number" && parsed.doorCount > 0 ? parsed.doorCount : 1;
    return { source, quoteNumber: parsed.quoteNumber, doorCount };
  } catch {
    return null;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
