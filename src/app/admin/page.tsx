import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { StatusPill } from "./StatusPill";
import { LEAD_STATUS_ORDER, type Lead, type LeadStatus } from "@/lib/supabase/types";
import { WHATSAPP_NUMBER } from "@/lib/contact";

// Leads arrive continuously, so a cached inbox would show a stale one.
export const dynamic = "force-dynamic";

function timeAgo(iso: string) {
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return days === 1 ? "yesterday" : `${days}d ago`;
}

/** Digits only, so the wa.me link works whatever format was typed in. */
function waLink(whatsapp: string) {
  const digits = whatsapp.replace(/\D/g, "");
  // A 10-digit Indian number typed without its country code still has to
  // reach the right phone.
  const full = digits.length === 10 ? `91${digits}` : digits;
  return `https://wa.me/${full || WHATSAPP_NUMBER}`;
}

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status: statusFilter } = await searchParams;
  const supabase = await createClient();

  let query = supabase.from("leads").select("*").order("created_at", { ascending: false });
  if (statusFilter && LEAD_STATUS_ORDER.includes(statusFilter as LeadStatus)) {
    query = query.eq("status", statusFilter);
  }

  const { data: leads, error } = await query.limit(200);
  const rows = (leads ?? []) as Lead[];

  const newCount = rows.filter((l) => l.status === "new").length;
  const undelivered = rows.filter((l) => l.delivery_status === "failed").length;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <p className="mono-label text-graphite mb-1">Enquiries</p>
          <h1 className="font-display font-bold text-2xl">
            {rows.length} lead{rows.length === 1 ? "" : "s"}
            {newCount > 0 && (
              <span className="text-graphite font-normal text-lg"> · {newCount} new</span>
            )}
          </h1>
        </div>

        <div className="flex flex-wrap gap-2">
          <FilterChip active={!statusFilter} href="/admin" label="All" />
          {LEAD_STATUS_ORDER.map((s) => (
            <FilterChip
              key={s}
              active={statusFilter === s}
              href={`/admin?status=${s}`}
              label={s === "site_visit" ? "Site visit" : s[0].toUpperCase() + s.slice(1)}
            />
          ))}
        </div>
      </div>

      {/* Delivery is our plumbing, not the buyer's problem, so it is surfaced
          as a banner rather than mixed into the status column. */}
      {undelivered > 0 && (
        <div className="rounded-2xl border border-flag/30 bg-flag/[0.04] p-4 mb-6">
          <p className="text-flag font-medium text-sm mb-1">
            {undelivered} lead{undelivered === 1 ? "" : "s"} did not reach Make
          </p>
          <p className="text-sm text-graphite">
            They are stored here and safe to work. Check the webhook URL under Settings.
          </p>
        </div>
      )}

      {error && (
        <div role="alert" className="rounded-2xl border border-flag/30 bg-flag/[0.04] p-4 mb-6">
          <p className="text-flag text-sm">
            Could not load leads: {error.message}. If the schema has not been run yet, see{" "}
            <span className="font-mono">supabase/schema.sql</span>.
          </p>
        </div>
      )}

      {rows.length === 0 && !error ? (
        <div className="surface rounded-3xl p-10 text-center">
          <p className="font-medium mb-1">Nothing here yet</p>
          <p className="text-graphite text-sm">
            {statusFilter
              ? "No leads with that status."
              : "New enquiries from the site will appear here the moment they are submitted."}
          </p>
        </div>
      ) : (
        <div className="surface rounded-3xl overflow-hidden">
          <ul className="divide-y divide-mist">
            {rows.map((lead) => (
              <li key={lead.id}>
                <div className="flex items-center gap-4 px-4 sm:px-5 py-4 hover:bg-paper-2/60 transition-colors">
                  <Link href={`/admin/leads/${lead.id}`} className="flex-1 min-w-0 group">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="font-medium group-hover:text-signal transition-colors">
                        {lead.name}
                      </span>
                      <StatusPill status={lead.status} />
                      {lead.delivery_status === "failed" && (
                        <span className="mono-label text-flag">not sent</span>
                      )}
                    </div>
                    <p className="text-sm text-graphite mt-1 truncate">
                      {lead.project} · {lead.whatsapp} · {lead.source}
                    </p>
                  </Link>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="mono-label text-graphite hidden sm:inline">
                      {timeAgo(lead.created_at)}
                    </span>
                    {/* One tap to the actual follow-up. The whole promise on
                        the site is a WhatsApp reply inside an hour, so this is
                        the action the inbox exists to make fast. */}
                    <a
                      href={waLink(lead.whatsapp)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ghost-cta rounded-full px-3 py-1.5 text-xs font-medium uppercase tracking-widest"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function FilterChip({ active, href, label }: { active: boolean; href: string; label: string }) {
  return (
    <Link
      href={href}
      className={`press rounded-full px-3 py-1.5 text-xs font-medium uppercase tracking-widest transition-colors ${
        active ? "bg-ink text-paper" : "bg-paper text-graphite hover:text-ink"
      }`}
    >
      {label}
    </Link>
  );
}
