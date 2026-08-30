import { NextResponse } from "next/server";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().trim().min(1).max(120),
  whatsapp: z
    .string()
    .trim()
    .regex(/^[0-9+\s-]{7,16}$/, "Enter a valid phone number"),
  project: z.string().trim().min(1).max(200),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = leadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid submission" },
      { status: 400 }
    );
  }

  // TODO: wire to n8n webhook (WhatsApp ack + Slack ping) and Postgres once
  // NODE_INFRA is provisioned — see spec §7 "Speed-to-lead". Logging for now
  // so the form is functionally complete end-to-end.
  console.log("[lead]", parsed.data);

  return NextResponse.json({ ok: true });
}
