import { NextResponse } from "next/server";
import { z } from "zod";

/**
 * Lead intake.
 *
 * The contract this endpoint has to honour: the form tells the visitor "we
 * reply on WhatsApp inside one working hour". So a 200 here is a promise that
 * a human will see this lead. It must never be returned unless the lead
 * actually left this server.
 *
 * The previous version logged to the console and returned ok:true regardless,
 * which meant every submission showed a success message while the lead went
 * nowhere. On a lead generation agency's own site that is the worst possible
 * failure, because it is silent on both ends: the visitor believes they are
 * booked, and nobody is told they are not.
 */

const leadSchema = z.object({
  name: z.string().trim().min(1).max(120),
  whatsapp: z
    .string()
    .trim()
    .regex(/^[0-9+\s-]{7,16}$/, "Enter a valid phone number"),
  project: z.string().trim().min(1).max(200),
  // Which form this came from, so Make can route homepage and contact-page
  // leads differently. Optional: an older client that does not send it still
  // works.
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
    // visitor's error message.
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

  const webhook = process.env.MAKE_WEBHOOK_URL;

  const payload = {
    ...parsed.data,
    source: parsed.data.source ?? "unknown",
    submittedAt: new Date().toISOString(),
  };

  // A missing webhook is a deployment error, not a visitor error. Fail loudly
  // rather than accepting a lead there is nowhere to put.
  if (!webhook) {
    console.error("[lead] MAKE_WEBHOOK_URL is not set. Lead not delivered:", payload);
    return NextResponse.json(
      { ok: false, error: "delivery_failed" },
      { status: 502 }
    );
  }

  try {
    const res = await postToMake(webhook, payload);

    if (!res.ok) {
      // Log the whole lead, not just the status. This log is the only copy
      // that exists once delivery has failed, so it is what lets someone
      // recover the enquiry by hand.
      console.error(
        `[lead] Make webhook returned ${res.status}. Lead not delivered:`,
        payload
      );
      return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[lead] Make webhook unreachable. Lead not delivered:", payload, err);
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }
}
