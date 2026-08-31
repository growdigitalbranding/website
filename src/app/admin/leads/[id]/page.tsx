import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { StatusPill } from "../../StatusPill";
import { StatusSelect } from "./StatusSelect";
import { NoteForm } from "./NoteForm";
import type { Lead, LeadNote, Profile } from "@/lib/supabase/types";
import { WHATSAPP_NUMBER } from "@/lib/contact";

export const dynamic = "force-dynamic";

function waLink(whatsapp: string) {
  const digits = whatsapp.replace(/\D/g, "");
  const full = digits.length === 10 ? `91${digits}` : digits;
  return `https://wa.me/${full || WHATSAPP_NUMBER}`;
}

function fmt(iso: string) {
  return new Date(iso).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  });
}

export default async function LeadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: lead } = await supabase.from("leads").select("*").eq("id", id).maybeSingle();
  if (!lead) notFound();
  const l = lead as Lead;

  const { data: notesData } = await supabase
    .from("lead_notes")
    .select("*")
    .eq("lead_id", id)
    .order("created_at", { ascending: false });
  const notes = (notesData ?? []) as LeadNote[];

  // Names for the note bylines. Fetched in one query rather than per note.
  const authorIds = [...new Set(notes.map((n) => n.author_id).filter(Boolean))] as string[];
  const { data: authorsData } = authorIds.length
    ? await supabase.from("profiles").select("id, full_name, email").in("id", authorIds)
    : { data: [] };
  const authors = new Map(
    ((authorsData ?? []) as Pick<Profile, "id" | "full_name" | "email">[]).map((a) => [
      a.id,
      a.full_name ?? a.email,
    ])
  );

  return (
    <div className="max-w-3xl">
      <Link href="/admin" className="nav-link mono-label text-graphite mb-6 inline-block">
        ← All leads
      </Link>

      <div className="surface rounded-3xl p-6 sm:p-8 mb-6">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="font-display font-bold text-2xl">{l.name}</h1>
              <StatusPill status={l.status} />
            </div>
            <p className="text-graphite">{l.project}</p>
          </div>
          <a
            href={waLink(l.whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            className="primary-cta rounded-full bg-signal-bright text-ink px-5 py-2.5 text-xs font-medium uppercase tracking-widest"
          >
            Open WhatsApp
          </a>
        </div>

        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-mist pt-5">
          {[
            ["WhatsApp", l.whatsapp],
            ["Source", l.source],
            ["Received", fmt(l.submitted_at)],
            [
              "Sent to Make",
              l.delivery_status === "delivered"
                ? "Yes"
                : l.delivery_status === "failed"
                ? "Failed"
                : "Pending",
            ],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="mono-label text-graphite mb-1">{label}</dt>
              <dd className="text-sm break-words">{value}</dd>
            </div>
          ))}
        </dl>

        {l.delivery_status === "failed" && l.delivery_error && (
          <p className="mt-4 text-sm text-flag">
            Delivery error: {l.delivery_error}. The lead is stored here regardless.
          </p>
        )}
      </div>

      <div className="surface rounded-3xl p-6 sm:p-8 mb-6">
        <h2 className="mono-label text-graphite mb-3">Status</h2>
        <StatusSelect leadId={l.id} current={l.status} />
      </div>

      <div className="surface rounded-3xl p-6 sm:p-8">
        <h2 className="mono-label text-graphite mb-4">Follow-up</h2>
        <NoteForm leadId={l.id} />

        {notes.length === 0 ? (
          <p className="text-sm text-graphite mt-6">
            No notes yet. Record what was said on the call, so the next person picking
            this up is not starting from nothing.
          </p>
        ) : (
          <ul className="flex flex-col gap-4 mt-6">
            {notes.map((n) => (
              <li key={n.id} className="border-l-2 border-mist pl-4">
                <p className="text-sm whitespace-pre-wrap">{n.body}</p>
                <p className="mono-label text-graphite mt-1.5">
                  {(n.author_id && authors.get(n.author_id)) ?? "Unknown"} · {fmt(n.created_at)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
