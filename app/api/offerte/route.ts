import { NextResponse } from "next/server";
import {
  readAttachmentBytes,
  submitWebsiteQuote,
} from "@/lib/quotes/website-quote";

const INVALID = "De aanvraag is ongeldig.";
const GENERIC = "Verzenden is mislukt. Probeer het later opnieuw.";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

async function readSubmission(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("multipart/form-data")) {
    let form: FormData;
    try {
      form = await request.formData();
    } catch {
      return { error: INVALID, status: 400 as const };
    }

    const raw = form.get("payload");
    if (typeof raw !== "string") return { error: INVALID, status: 400 as const };

    let body: unknown;
    try {
      body = JSON.parse(raw);
    } catch {
      return { error: INVALID, status: 400 as const };
    }
    if (!isRecord(body)) return { error: INVALID, status: 400 as const };

    const filePart = form.get("file");
    if (!(filePart instanceof File) || filePart.name === "") {
      return { body };
    }

    const attachment = await readAttachmentBytes(filePart);
    if ("error" in attachment) {
      return { error: attachment.error, status: 400 as const };
    }
    return { body, file: attachment };
  }

  const body = await request.json().catch(() => null);
  if (!isRecord(body)) return { error: INVALID, status: 400 as const };
  return { body };
}

export async function POST(request: Request) {
  try {
    const submission = await readSubmission(request);
    if ("error" in submission) {
      return NextResponse.json(
        { ok: false, error: submission.error },
        { status: submission.status },
      );
    }

    const result = await submitWebsiteQuote(submission.body, submission.file);
    return NextResponse.json(result.body, { status: result.status });
  } catch {
    return NextResponse.json({ ok: false, error: GENERIC }, { status: 500 });
  }
}
