"use client";

import { useState, useTransition } from "react";
import { updateStatus } from "./actions";
import { LEAD_STATUS, LEAD_STATUS_ORDER, type LeadStatus } from "@/lib/supabase/types";

export function StatusSelect({ leadId, current }: { leadId: string; current: LeadStatus }) {
  // Optimistic, because the click is the user's decision and there is nothing
  // to wait for: the round trip only confirms it. On failure it reverts and
  // says why, rather than silently disagreeing with what is on screen.
  const [shown, setShown] = useState<LeadStatus>(current);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  function pick(next: LeadStatus) {
    if (next === shown || pending) return;
    const previous = shown;
    setShown(next);
    setError("");

    startTransition(async () => {
      const form = new FormData();
      form.set("leadId", leadId);
      form.set("status", next);
      const res = await updateStatus(form);
      if (res?.error) {
        setShown(previous);
        setError(res.error);
      }
    });
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Lead status">
        {LEAD_STATUS_ORDER.map((s) => {
          const active = shown === s;
          return (
            <button
              key={s}
              type="button"
              onClick={() => pick(s)}
              aria-pressed={active}
              disabled={pending}
              className={`press rounded-full px-3.5 py-2 text-xs font-medium uppercase tracking-widest transition-colors disabled:opacity-70 ${
                active ? "text-paper" : "bg-paper-2 text-graphite hover:text-ink"
              }`}
              style={active ? { backgroundColor: LEAD_STATUS[s].tone } : undefined}
            >
              {LEAD_STATUS[s].label}
            </button>
          );
        })}
      </div>
      {error && (
        <p role="alert" className="text-flag text-sm mt-3">
          Could not save: {error}
        </p>
      )}
    </div>
  );
}
