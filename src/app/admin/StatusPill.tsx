import { LEAD_STATUS, type LeadStatus } from "@/lib/supabase/types";

export function StatusPill({ status }: { status: LeadStatus }) {
  const { label, tone } = LEAD_STATUS[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap"
      style={{ color: tone, backgroundColor: `color-mix(in srgb, ${tone} 10%, transparent)` }}
    >
      <span
        aria-hidden="true"
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: tone }}
      />
      {label}
    </span>
  );
}
