import { NextResponse } from "next/server";
import {
  decideQuotePortal,
  getQuotePortal,
  isPortalToken,
  portalIpHash,
  recordQuotePortalView,
} from "@/lib/quotes/portal";

function requestIpHash(request: Request) {
  const hash = portalIpHash(request);
  if (!hash) {
    throw new Error("Het offerteportaal is tijdelijk niet beschikbaar.");
  }
  return hash;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;
  if (!isPortalToken(token)) {
    return NextResponse.json({ ok: false, error: "Offerte niet gevonden." }, { status: 404 });
  }

  try {
    const portal = await getQuotePortal(token, requestIpHash(request));
    if (!portal) {
      return NextResponse.json({ ok: false, error: "Offerte niet gevonden." }, { status: 404 });
    }
    return NextResponse.json({ ok: true, portal });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Het offerteportaal is tijdelijk niet beschikbaar." },
      { status: 503 },
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;
  if (!isPortalToken(token)) {
    return NextResponse.json({ ok: false, error: "Offerte niet gevonden." }, { status: 404 });
  }

  try {
    const payload = (await request.json()) as Record<string, unknown>;
    const ipHash = requestIpHash(request);

    if (payload.action === "view") {
      await recordQuotePortalView(token, ipHash);
      return NextResponse.json({ ok: true });
    }

    if (
      payload.action === "decision" &&
      (payload.decision === "approved" || payload.decision === "rejected")
    ) {
      const portal = await decideQuotePortal(token, ipHash, {
        decision: payload.decision,
        signerName: typeof payload.signerName === "string" ? payload.signerName : undefined,
        termsAccepted: payload.termsAccepted === true,
        rejectionReason:
          typeof payload.rejectionReason === "string" ? payload.rejectionReason : undefined,
      });
      return NextResponse.json({ ok: true, portal });
    }

    return NextResponse.json({ ok: false, error: "Ongeldige aanvraag." }, { status: 400 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "De actie kon niet worden verwerkt.";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
