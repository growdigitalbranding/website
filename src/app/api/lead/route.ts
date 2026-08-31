import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Lead intake.
 *
 * Order matters here. The lead is written to the database FIRST, then
 * forwarded to Make. Previously Make was the only destination, so any outage
 * on their side lost the enquiry permanently. Now the database is the system
 * of record and Make is a notification: the scenario can fail, be
 * misconfigured, or be swapped out, and the lead is still in the dashboard for
 * someone to work.
 *
 * That also changes what a 200 means. It is returned once the lead is stored
 * durably, because at that point the promise the form makes — that a human
 * will see this — is one we can keep. Only a failure to store is a 502.
 */

const leadSchema = z.object({
  name: z.string().trim().min(1).max(120),
  whatsapp: z
    .string()
    .trim()
    .regex(/^[0-9+\s-]{7,16}$/, "Enter a valid phone number"),
  project: z.string().trim().min(1).max(200),
  source: z.string().trim().max(64).optional(),
});

const WEBHOOK_TIMEOUT_MS = 8000;

/** One retry, and only for failures that are plausibly transient. */
async function postToMake(url: string, payload: unknown, attempt = 1): Promise<Response> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
      cache: "no-store",
    });
    // 4xx means the scenario rejected the shape of the payload. Retrying sends
    // the identical body and gets the identical answer, so it only delays the
    // visitor's response.
    if (!res.ok && res.status >= 500 && attempt === 1) {
      return postToMake(url, payload, 2);
    }
    return res;
  } catch (err) {
    if (attempt === 1) return postToMake(url, payload, 2);
    throw err;
  }
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = leadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid submission" },
      { status: 400 }
    );
  }

  const lead = {
    ...parsed.data,
    source: parsed.data.source ?? "unknown",
    submitted_at: new Date().toISOString(),
  };

  const db = createAdminClient();

  if (!db) {
    console.error("[lead] Supabase is not configured. Lead not stored:", lead);
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }

  const { data: stored, error: insertError } = await db
    .from("leads")
    .insert(lead)
    .select("id")
    .single();

  if (insertError || !stored) {
    // This log is the only remaining copy of the enquiry, so it carries the
    // whole lead rather than just the error.
    console.error("[lead] Insert failed. Lead not stored:", lead, insertError);
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }

  // Stored. From here the visitor is answered regardless of what Make does.
  await forwardToMake(db, stored.id, lead);

  return NextResponse.json({ ok: true });
}

type Db = NonNullable<ReturnType<typeof createAdminClient>>;

/**
 * Notify Make and record the outcome on the lead, so the dashboard can show
 * which enquiries reached the automation and which are sitting there needing a
 * manual nudge.
 *
 * The URL comes from the settings table, which an admin edits in the
 * dashboard, and falls back to the env var so an existing deployment keeps
 * working with nothing changed.
 */
async function forwardToMake(
  db: Db,
  leadId: string,
  lead: Record<string, unknown>
) {
  const { data: setting } = await db
    .from("settings")
    .select("value")
    .eq("key", "make_webhook_url")
    .maybeSingle();

  const webhook = setting?.value?.trim() || process.env.MAKE_WEBHOOK_URL?.trim();

  const fail = async (message: string) => {
    console.error(`[lead] ${leadId}: ${message}`);
    await db
      .from("leads")
      .update({ delivery_status: "failed", delivery_error: message })
      .eq("id", leadId);
  };

  if (!webhook) {
    await fail("No Make webhook configured");
    return;
  }

  try {
    const res = await postToMake(webhook, { ...lead, leadId });
    if (!res.ok) {
      await fail(`Make returned ${res.status}`);
      return;
    }
    await db
      .from("leads")
      .update({ delivery_status: "delivered", delivery_error: null })
      .eq("id", leadId);
  } catch (err) {
    await fail(err instanceof Error ? err.message : "Webhook unreachable");
  }
}
