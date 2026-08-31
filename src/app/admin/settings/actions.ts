"use server";

import { revalidatePath, updateTag } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { SETTINGS_TAG } from "@/lib/settings";

const schema = z.object({
  // A Make webhook is always https. Accepting http would let a
  // misconfiguration send names and phone numbers in clear text.
  url: z
    .string()
    .trim()
    .url("That is not a valid URL")
    .refine((u) => u.startsWith("https://"), "The URL must start with https://")
    .or(z.literal("")),
});

export async function saveWebhookUrl(formData: FormData) {
  const parsed = schema.safeParse({ url: formData.get("url") });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid URL" };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not signed in" };

  // Checked here as well as in RLS. The policy is the boundary that actually
  // holds; this is what turns a denied write into a sentence someone can read.
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profile?.role !== "admin") {
    return { error: "Only an admin can change the webhook URL" };
  }

  const { error } = await supabase.from("settings").upsert(
    {
      key: "make_webhook_url",
      value: parsed.data.url,
      updated_at: new Date().toISOString(),
      updated_by: user.id,
    },
    { onConflict: "key" }
  );

  if (error) return { error: error.message };

  revalidatePath("/admin/settings");
  return { ok: true };
}

/**
 * Send a test payload to the saved URL and report what came back.
 *
 * Without this, the only way to find out the URL is wrong is a real enquiry
 * failing — which is exactly the situation this whole change exists to
 * prevent.
 */
export async function testWebhook() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not signed in" };

  const { data: setting } = await supabase
    .from("settings")
    .select("value")
    .eq("key", "make_webhook_url")
    .maybeSingle();

  const url = setting?.value?.trim();
  if (!url) return { error: "Save a webhook URL first" };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test lead",
        whatsapp: "+910000000000",
        project: "Webhook test",
        source: "admin-test",
        test: true,
        submitted_at: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });
    return res.ok
      ? { ok: true, message: `Make accepted it (HTTP ${res.status}). Check your scenario.` }
      : { error: `Make returned HTTP ${res.status}. The scenario may be off or the URL wrong.` };
  } catch (err) {
    return {
      error: err instanceof Error ? `Could not reach it: ${err.message}` : "Could not reach it",
    };
  }
}


/**
 * A GTM container ID, and deliberately nothing else.
 *
 * The obvious version of this feature is a textarea you paste script tags
 * into. That is stored XSS on every page of a site that collects phone
 * numbers: one compromised admin account, and every visitor's browser runs
 * whatever was pasted. GTM exists precisely so that every other tag — GA4,
 * the Meta pixel, Google Ads, conversion tracking — lives inside the
 * container instead, editable without a deploy and without this field ever
 * carrying code.
 */
const gtmSchema = z.object({
  containerId: z
    .string()
    .trim()
    .toUpperCase()
    .regex(
      /^GTM-[A-Z0-9]{4,10}$/,
      "That is not a container ID. It looks like GTM-ABC1234 — paste the ID, not the script."
    )
    .or(z.literal("")),
});

export async function saveGtmContainerId(formData: FormData) {
  const parsed = gtmSchema.safeParse({ containerId: formData.get("containerId") });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid container ID" };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not signed in" };

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profile?.role !== "admin") {
    return { error: "Only an admin can change tracking" };
  }

  const { error } = await supabase.from("settings").upsert(
    {
      key: "gtm_container_id",
      value: parsed.data.containerId,
      updated_at: new Date().toISOString(),
      updated_by: user.id,
    },
    { onConflict: "key" }
  );

  if (error) return { error: error.message };

  // The marketing pages are statically cached, so without this the container
  // would not appear until the next deploy or the hourly revalidate.
  //
  // updateTag rather than revalidateTag: this is a Server Action, and it
  // expires the entry immediately instead of serving stale content while it
  // refreshes. An admin who just saved a container ID and then checks whether
  // it is live needs to see their own write, not the previous value.
  updateTag(SETTINGS_TAG);
  revalidatePath("/admin/settings");
  revalidatePath("/privacy");
  return { ok: true };
}
