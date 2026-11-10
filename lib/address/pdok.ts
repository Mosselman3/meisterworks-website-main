export type AddressParts = {
  postcode: string;
  huisnummer: string;
  straatnaam: string;
  woonplaats: string;
};

export type AddressSuggestion = {
  id: string;
  label: string;
};

export const EMPTY_ADDRESS: AddressParts = {
  postcode: "",
  huisnummer: "",
  straatnaam: "",
  woonplaats: "",
};

const PDOK_BASE = "https://api.pdok.nl/bzk/locatieserver/search/v3_1";
const ADDRESS_ID = /^adr-[a-f0-9]{32}$/i;

export function suggestUrl(query: string): string | null {
  const q = query.trim().replace(/\s+/g, " ");
  if (q.length < 3 || q.length > 80) return null;

  const url = new URL(`${PDOK_BASE}/suggest`);
  url.searchParams.set("q", q);
  url.searchParams.set("fq", "type:adres");
  url.searchParams.set("rows", "6");
  return url.toString();
}

export function lookupUrl(id: string): string | null {
  const trimmed = id.trim();
  if (!ADDRESS_ID.test(trimmed)) return null;

  const url = new URL(`${PDOK_BASE}/lookup`);
  url.searchParams.set("id", trimmed);
  url.searchParams.set(
    "fl",
    "id,straatnaam,huis_nlt,huisnummer,huisletter,huisnummertoevoeging,postcode,woonplaatsnaam",
  );
  return url.toString();
}

export function formatPostcode(value: string): string {
  const compact = value.replace(/\s+/g, "").toUpperCase();
  const match = /^(\d{4})([A-Z]{2})$/.exec(compact);
  return match ? `${match[1]} ${match[2]}` : value.trim();
}

export function formatAddress(parts: AddressParts): string {
  const street = [parts.straatnaam.trim(), parts.huisnummer.trim()]
    .filter(Boolean)
    .join(" ");
  const locality = [formatPostcode(parts.postcode), parts.woonplaats.trim()]
    .filter(Boolean)
    .join(" ");
  return [street, locality].filter(Boolean).join(", ");
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function text(value: unknown): string {
  if (typeof value === "string") return value.trim();
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return "";
}

function docs(payload: unknown): Record<string, unknown>[] {
  if (!isRecord(payload) || !isRecord(payload.response)) return [];
  const list = payload.response.docs;
  if (!Array.isArray(list)) return [];
  return list.filter(isRecord);
}

function houseNumber(doc: Record<string, unknown>): string {
  const full = text(doc.huis_nlt);
  if (full) return full;

  const number = text(doc.huisnummer);
  const letter = text(doc.huisletter);
  const addition = text(doc.huisnummertoevoeging);
  if (letter) return `${number}${letter}`;
  if (addition) return number ? `${number}-${addition}` : addition;
  return number;
}

export function parseSuggestions(payload: unknown): AddressSuggestion[] {
  const suggestions: AddressSuggestion[] = [];

  for (const doc of docs(payload)) {
    const id = text(doc.id);
    const label = text(doc.weergavenaam);
    const type = text(doc.type);
    if (!ADDRESS_ID.test(id) || !label || (type && type !== "adres")) continue;
    suggestions.push({ id, label });
    if (suggestions.length === 6) break;
  }

  return suggestions;
}

export function parseLookup(payload: unknown): AddressParts | null {
  const doc = docs(payload)[0];
  if (!doc) return null;

  const address: AddressParts = {
    postcode: formatPostcode(text(doc.postcode)),
    huisnummer: houseNumber(doc),
    straatnaam: text(doc.straatnaam),
    woonplaats: text(doc.woonplaatsnaam),
  };

  return formatAddress(address) ? address : null;
}
