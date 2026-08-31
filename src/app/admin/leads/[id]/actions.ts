"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { LEAD_STATUS_ORDER } from "@/lib/supabase/types";

/**
 * Server actions for working a lead.
 *
 * Both go through the request-scoped client, not the service role, so RLS
 * still applies: an action is a public HTTP endpoint, and one that used the
 * admin client would let anyone who can reach it edit any lead.
 */

const statusSchema = z.object({
  leadId: z.string().uuid(),
  status: z.enum(LEAD_STATUS_ORDER as [string, ...string[]]),
});

export async function updateStatus(formData: FormData) {
  const parsed = statusSchema.safeParse({
    leadId: formData.get("leadId"),
    status: formData.get("status"),
  });
  if (!parsed.success) return { error: "Invalid status" };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not signed in" };

  const { error } = await supabase
    .from("leads")
    .update({ status: parsed.data.status })
    .eq("id", parsed.data.leadId);

  if (error) return { error: error.message };

  revalidatePath(`/admin/leads/${parsed.data.leadId}`);
  revalidatePath("/admin");
  return { ok: true };
}

const noteSchema = z.object({
  leadId: z.string().uuid(),
  body: z.string().trim().min(1, "Write something first").max(4000),
});

export async function addNote(formData: FormData) {
  const parsed = noteSchema.safeParse({
    leadId: formData.get("leadId"),
    body: formData.get("body"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid note" };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not signed in" };

  // author_id is taken from the session, never from the form. The RLS policy
  // enforces the same thing, so a forged field fails at the database too.
  const { error } = await supabase.from("lead_notes").insert({
    lead_id: parsed.data.leadId,
    author_id: user.id,
    body: parsed.data.body,
  });

  if (error) return { error: error.message };

  revalidatePath(`/admin/leads/${parsed.data.leadId}`);
  return { ok: true };
}
