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

export function createAdminClient(): SupabaseClient | null {
  const url = env("SUPABASE_URL") || env("VITE_SUPABASE_URL");
  const serviceRole = env("SUPABASE_SERVICE_ROLE_KEY");
  const key = isServiceRoleKey(serviceRole)
    ? serviceRole
    : env("VITE_SUPABASE_ANON_KEY");
  if (!url || !key) return null;

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
