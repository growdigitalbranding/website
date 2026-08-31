import { createClient } from "@supabase/supabase-js";

/**
 * Service-role client. Bypasses RLS entirely, so it is only ever used from
 * server code the browser cannot reach — currently just the lead intake route,
 * which has to insert a lead for a visitor who is not signed in.
 *
 * Never import this into a client component. The key it uses grants full read
 * and write over every table, including the settings row that holds the Make
 * webhook credential.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
