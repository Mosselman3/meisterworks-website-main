import { NextResponse } from "next/server";
import {
  lookupUrl,
  parseLookup,
  parseSuggestions,
  suggestUrl,
} from "@/lib/address/pdok";

const FAILED = "Adres opzoeken lukt nu niet. Vul het adres handmatig in.";
const INVALID = "Ongeldige zoekopdracht.";

async function readPdok(url: string): Promise<unknown> {
  const response = await fetch(url, {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(8000),
    cache: "no-store",
  });
  if (!response.ok) throw new Error("pdok");
  return response.json() as Promise<unknown>;
}

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const query = params.get("q");
  const id = params.get("id");

  if ((query === null) === (id === null)) {
    return NextResponse.json({ error: INVALID }, { status: 400 });
  }

  try {
    if (query !== null) {
      const url = suggestUrl(query);
      if (!url) return NextResponse.json({ error: INVALID }, { status: 400 });
      const payload = await readPdok(url);
      return NextResponse.json({ suggestions: parseSuggestions(payload) });
    }

    const url = lookupUrl(id ?? "");
    if (!url) return NextResponse.json({ error: INVALID }, { status: 400 });
    const address = parseLookup(await readPdok(url));
    if (!address) return NextResponse.json({ error: FAILED }, { status: 502 });
    return NextResponse.json({ address });
  } catch {
    return NextResponse.json({ error: FAILED }, { status: 502 });
  }
}
