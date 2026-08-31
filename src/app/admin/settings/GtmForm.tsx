"use client";

import { useState, useTransition } from "react";
import { saveGtmContainerId } from "./actions";

export function GtmForm({
  initialId,
  updatedAt,
}: {
  initialId: string;
  updatedAt: string | null;
}) {
  const [id, setId] = useState(initialId);
  const [saved, setSaved] = useState(initialId);
  const [result, setResult] = useState<{ tone: "ok" | "error"; message: string } | null>(null);
  const [pending, startTransition] = useTransition();

  const dirty = id.trim().toUpperCase() !== saved.trim().toUpperCase();
  const turningOn = !saved && id.trim().length > 0;

  return (
    <div className="flex flex-col gap-4">
      <label className="flex flex-col gap-2">
        <span className="mono-label">Container ID</span>
        <input
          value={id}
          onChange={(e) => {
            setId(e.target.value);
            setResult(null);
          }}
          placeholder="GTM-ABC1234"
          spellCheck={false}
          autoComplete="off"
          className="field-input h-11 font-mono text-sm text-ink"
        />
      </label>

      <p className="text-sm text-graphite">
        The ID only, not the script. Everything else — GA4, the Meta pixel, Google Ads,
        conversion tags — goes inside the container in the GTM interface, where you can
        change it without a deploy.
      </p>

      {/* Switching tracking on has consequences beyond the site, and this is
          the moment to say so — not in a doc nobody opens. */}
      {turningOn && (
        <div className="rounded-2xl border border-pulse/40 bg-pulse/[0.06] p-4 text-sm">
          <p className="font-medium text-ink mb-1">Before you turn this on</p>
          <p className="text-graphite">
            There is no cookie banner on the site yet. Consent Mode v2 is set to denied by
            default, so tags will load in a cookieless mode and will not set marketing
            cookies until consent is granted — but you need a banner before running
            anything that relies on consent. The privacy policy updates itself to declare
            analytics the moment a container is saved.
          </p>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          disabled={pending || !dirty}
          onClick={() =>
            startTransition(async () => {
              const form = new FormData();
              form.set("containerId", id.trim().toUpperCase());
              const res = await saveGtmContainerId(form);
              if (res?.error) setResult({ tone: "error", message: res.error });
              else {
                const next = id.trim().toUpperCase();
                setId(next);
                setSaved(next);
                setResult({
                  tone: "ok",
                  message: next
                    ? "Saved. The container is live on the site now."
                    : "Cleared. No tracking scripts load.",
                });
              }
            })
          }
          className="primary-cta rounded-full bg-signal-bright text-ink px-5 py-2.5 text-xs font-medium uppercase tracking-widest disabled:opacity-50"
        >
          {pending ? "Working…" : dirty ? "Save" : "Saved"}
        </button>

        <span className="mono-label text-graphite">
          {saved ? `Active: ${saved}` : "No tracking active"}
        </span>

        {updatedAt && !dirty && (
          <span className="mono-label text-graphite">
            Updated{" "}
            {new Date(updatedAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        )}
      </div>

      {result && (
        <div
          role="alert"
          className={`rounded-2xl p-4 text-sm ${
            result.tone === "ok"
              ? "border border-signal/30 bg-signal/[0.05] text-signal"
              : "border border-flag/30 bg-flag/[0.04] text-flag"
          }`}
        >
          {result.message}
        </div>
      )}
    </div>
  );
}
