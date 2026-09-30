import "server-only";
import { createHmac } from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import type { QuotePortal } from "@/lib/quotes/portal-types";

export type { PortalDecision, QuotePortal } from "@/lib/quotes/portal-types";

function env(name: string) {
  return process.env[name]?.trim() ?? "";
}

function createPortalClient() {
  const url = env("SUPABASE_URL") || env("NEXT_PUBLIC_SUPABASE_URL") || env("VITE_SUPABASE_URL");
  const anonKey =
    env("SUPABASE_ANON_KEY") ||
    env("NEXT_PUBLIC_SUPABASE_ANON_KEY") ||
    env("VITE_SUPABASE_ANON_KEY");
  if (!url || !anonKey) return null;

  return createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export function isPortalToken(token: string) {
  return /^[0-9a-f]{64}$/.test(token);
}

export function portalIpHash(request: Request) {
  const salt = env("PORTAL_AUDIT_SALT");
  if (!salt) return null;
  const forwarded = request.headers.get("x-forwarded-for") ?? "";
  const ip = forwarded.split(",")[0]?.trim() || request.headers.get("x-real-ip")?.trim() || "";
  if (!ip) return null;
  return createHmac("sha256", salt).update(ip).digest("hex");
}

function clientOrThrow() {
  const client = createPortalClient();
  if (!client) throw new Error("Het offerteportaal is niet geconfigureerd.");
  return client;
}

export async function getQuotePortal(token: string, ipHash: string) {
  const { data, error } = await clientOrThrow().rpc("get_quote_portal", {
    p_token: token,
    p_ip_hash: ipHash,
  });
  if (error || !data) return null;
  return data as QuotePortal;
}

export async function recordQuotePortalView(token: string, ipHash: string) {
  const { error } = await clientOrThrow().rpc("record_quote_portal_view", {
    p_token: token,
    p_ip_hash: ipHash,
  });
  return !error;
}

export async function decideQuotePortal(
  token: string,
  ipHash: string,
  input: {
    decision: "approved" | "rejected";
    signerName?: string;
    termsAccepted?: boolean;
    rejectionReason?: string;
  },
) {
  const { data, error } = await clientOrThrow().rpc("decide_quote_portal", {
    p_token: token,
    p_ip_hash: ipHash,
    p_decision: input.decision,
    p_signer_name: input.signerName?.trim() || null,
    p_terms_accepted: Boolean(input.termsAccepted),
    p_rejection_reason: input.rejectionReason?.trim() || null,
  });
  if (error || !data) {
    throw new Error(error?.message || "De keuze kon niet worden opgeslagen.");
  }
  return data as QuotePortal;
}
