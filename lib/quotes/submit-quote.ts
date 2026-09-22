const NETWORK_ERROR = "Verzenden is mislukt. Probeer het later opnieuw.";

export type QuoteSubmission =
  | { ok: true; quoteNumber: string }
  | { ok: false; error: string };

export function readQuoteResponse(
  responseOk: boolean,
  data: unknown,
): QuoteSubmission {
  if (isRecord(data) && data.ok === true && typeof data.quoteNumber === "string" && data.quoteNumber) {
    return responseOk
      ? { ok: true, quoteNumber: data.quoteNumber }
      : { ok: false, error: NETWORK_ERROR };
  }

  if (!responseOk && isRecord(data) && data.ok === false && typeof data.error === "string" && data.error) {
    return { ok: false, error: data.error };
  }

  return { ok: false, error: NETWORK_ERROR };
}

export async function submitQuoteRequest(
  payload: unknown,
  file?: File | null,
): Promise<QuoteSubmission> {
  try {
    const body = new FormData();
    body.set("payload", JSON.stringify(payload));
    if (file && file.size > 0 && file.name) body.set("file", file);

    const response = await fetch("/api/offerte", { method: "POST", body });
    const data = await response.json().catch(() => null);
    return readQuoteResponse(response.ok, data);
  } catch {
    return { ok: false, error: NETWORK_ERROR };
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
