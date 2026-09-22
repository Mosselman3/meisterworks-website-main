import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";

const BUCKET = "meisterworks-private";
const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
]);
const CONTACT_FIELDS = [
  "aanhef",
  "voornaam",
  "achternaam",
  "email",
  "telefoon",
  "adres",
  "opmerkingen",
] as const;

const GENERIC_ERROR = "Verzenden is mislukt. Probeer het later opnieuw.";
const UPLOAD_ERROR =
  "Het bestand kon niet worden opgeslagen. Verstuur de aanvraag opnieuw.";
const UNAVAILABLE_ERROR = "De offerte-service is tijdelijk niet beschikbaar.";

export type WebsiteAttachment = {
  fileName: string;
  contentType: string;
  sizeBytes: number;
  bytes: Uint8Array;
};

type QuoteResponse =
  | {
      status: 200;
      body: {
        ok: true;
        quoteId: string;
        quoteNumber: string;
        duplicate: boolean;
      };
    }
  | { status: 400 | 500 | 503; body: { ok: false; error: string } };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function attachmentFromFile(
  file: File,
): { file: WebsiteAttachment } | { error: string } {
  if (file.size <= 0) return { error: "De bijlage is leeg." };
  if (file.size > MAX_ATTACHMENT_BYTES) {
    return {
      error: "attachment.sizeBytes overschrijdt de limiet van 10 MiB.",
    };
  }

  const fileName = file.name.split(/[/\\]/).pop()?.trim() ?? "";
  if (!fileName || fileName === "." || fileName === "..") {
    return { error: "attachment.fileName is verplicht." };
  }

  const contentType = contentTypeFor(file);
  if (!contentType) {
    return { error: "attachment.contentType moet een afbeelding of PDF zijn." };
  }

  return {
    file: {
      fileName,
      contentType,
      sizeBytes: file.size,
      bytes: new Uint8Array(),
    },
  };
}

export async function readAttachmentBytes(
  file: File,
): Promise<WebsiteAttachment | { error: string }> {
  const checked = attachmentFromFile(file);
  if ("error" in checked) return checked;
  checked.file.bytes = new Uint8Array(await file.arrayBuffer());
  return checked.file;
}

function contentTypeFor(file: File) {
  const declared = file.type === "image/jpg" ? "image/jpeg" : file.type;
  if (ALLOWED_TYPES.has(declared)) return declared;

  const name = file.name.toLowerCase();
  if (name.endsWith(".jpg") || name.endsWith(".jpeg")) return "image/jpeg";
  if (name.endsWith(".png")) return "image/png";
  if (name.endsWith(".webp")) return "image/webp";
  if (name.endsWith(".pdf")) return "application/pdf";
  return null;
}

export function prepareWebsitePayload(
  body: Record<string, unknown>,
  attachment?: Pick<WebsiteAttachment, "fileName" | "contentType" | "sizeBytes">,
) {
  const contact = isRecord(body.contact)
    ? body.contact
    : Object.fromEntries(
        CONTACT_FIELDS.map((key) => [key, body[key] ?? ""]),
      );

  const payload: Record<string, unknown> = { ...body, contact };
  delete payload.attachment;
  if (typeof payload.productId === "string" && payload.productId.trim() === "") {
    payload.productId = null;
  }
  if (attachment) {
    payload.attachment = {
      fileName: attachment.fileName,
      contentType: attachment.contentType,
      sizeBytes: attachment.sizeBytes,
    };
  }
  return payload;
}

export async function submitWebsiteQuote(
  body: Record<string, unknown>,
  attachment?: WebsiteAttachment,
): Promise<QuoteResponse> {
  const supabase = createAdminClient();
  if (!supabase) {
    return { status: 503, body: { ok: false, error: UNAVAILABLE_ERROR } };
  }

  const payload = prepareWebsitePayload(body, attachment);
  const { data, error } = await supabase.rpc("submit_website_quote", {
    p_payload: payload,
  });

  if (error) {
    if (error.code === "22P02" || error.code === "23514") {
      return {
        status: 400,
        body: { ok: false, error: error.message || "De aanvraag is ongeldig." },
      };
    }
    return { status: 500, body: { ok: false, error: GENERIC_ERROR } };
  }

  const quote = readQuote(data);
  if (!quote) return { status: 500, body: { ok: false, error: GENERIC_ERROR } };

  if (quote.uploadPath) {
    const stored = await finishUpload(supabase, quote.uploadPath, attachment);
    if (!stored) return { status: 500, body: { ok: false, error: UPLOAD_ERROR } };
  } else if (attachment) {
    return { status: 500, body: { ok: false, error: UPLOAD_ERROR } };
  }

  return {
    status: 200,
    body: {
      ok: true,
      quoteId: quote.quoteId,
      quoteNumber: quote.quoteNumber,
      duplicate: quote.duplicate,
    },
  };
}

function readQuote(data: unknown) {
  if (!isRecord(data)) return null;
  const { quoteId, quoteNumber, uploadPath } = data;
  if (typeof quoteId !== "string" || quoteId.length === 0) return null;
  if (typeof quoteNumber !== "string" || quoteNumber.length === 0) return null;
  return {
    quoteId,
    quoteNumber,
    duplicate: data.duplicate === true,
    uploadPath: typeof uploadPath === "string" && uploadPath ? uploadPath : null,
  };
}

async function finishUpload(
  supabase: NonNullable<ReturnType<typeof createAdminClient>>,
  uploadPath: string,
  attachment?: WebsiteAttachment,
) {
  if (!attachment) {
    const { data, error } = await supabase
      .from("stored_files")
      .select("status")
      .eq("bucket_id", BUCKET)
      .eq("storage_path", uploadPath)
      .maybeSingle();
    return !error && data?.status === "ready";
  }

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(uploadPath, attachment.bytes, {
      contentType: attachment.contentType,
      upsert: true,
    });
  if (uploadError) return false;

  const { data, error } = await supabase
    .from("stored_files")
    .update({ status: "ready" })
    .eq("bucket_id", BUCKET)
    .eq("storage_path", uploadPath)
    .select("id");

  return !error && Array.isArray(data) && data.length > 0;
}
