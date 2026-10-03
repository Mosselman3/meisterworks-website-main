import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

function env(name: string) {
  const value = process.env[name];
  return typeof value === "string" ? value.trim() : "";
}

function isServiceRoleKey(value: string) {
  if (value.startsWith("sb_secret_") && value.length > 20) return true;
  const parts = value.split(".");
  return value.startsWith("eyJ") && parts.length === 3 && parts.every((part) => part.length > 0);
}

export function serviceRoleAuth(): { url: string; key: string } | null {
  const url = (env("SUPABASE_URL") || env("VITE_SUPABASE_URL")).replace(/\/$/, "");
  const key = env("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !isServiceRoleKey(key)) return null;
  return { url, key };
}

export function createAdminClient(): SupabaseClient | null {
  const auth = serviceRoleAuth();
  const url = auth?.url ?? (env("SUPABASE_URL") || env("VITE_SUPABASE_URL"));
  const key = auth?.key || env("VITE_SUPABASE_ANON_KEY");
  if (!url || !key) return null;

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
