"use client";

import { useState, useTransition } from "react";
import { saveWebhookUrl, testWebhook } from "./actions";

type Result = { tone: "ok" | "error"; message: string } | null;

export function WebhookForm({
  initialUrl,
  updatedAt,
}: {
  initialUrl: string;
  updatedAt: string | null;
}) {
  const [url, setUrl] = useState(initialUrl);
  const [saved, setSaved] = useState(initialUrl);
  const [result, setResult] = useState<Result>(null);
  const [pending, startTransition] = useTransition();

  const dirty = url.trim() !== saved.trim();

  return (
    <div className="flex flex-col gap-4">
      <label className="flex flex-col gap-2">
        <span className="mono-label">Webhook URL</span>
        <input
          type="url"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            setResult(null);
          }}
          placeholder="https://hook.eu2.make.com/…"
          spellCheck={false}
          autoComplete="off"
          className="field-input h-11 font-mono text-sm text-ink"
        />
      </label>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          disabled={pending || !dirty}
          onClick={() =>
            startTransition(async () => {
              const form = new FormData();
              form.set("url", url.trim());
              const res = await saveWebhookUrl(form);
              if (res?.error) setResult({ tone: "error", message: res.error });
              else {
                setSaved(url.trim());
                setResult({ tone: "ok", message: "Saved. New leads will go here." });
              }
            })
          }
          className="primary-cta rounded-full bg-signal-bright text-ink px-5 py-2.5 text-xs font-medium uppercase tracking-widest disabled:opacity-50"
        >
          {pending ? "Working…" : dirty ? "Save" : "Saved"}
        </button>

        {/* Tests what is stored, not what is in the box, so a test can never
            report success for a URL that was never saved. */}
        <button
          type="button"
          disabled={pending || dirty || !saved}
          onClick={() =>
            startTransition(async () => {
              const res = await testWebhook();
              setResult(
                res?.error
                  ? { tone: "error", message: res.error }
                  : { tone: "ok", message: res?.message ?? "Sent." }
              );
            })
          }
          className="ghost-cta rounded-full px-5 py-2.5 text-xs font-medium uppercase tracking-widest disabled:opacity-50"
        >
          Send test lead
        </button>

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

      {dirty && saved && (
        <p className="text-sm text-graphite">
          Unsaved change. Leads are still going to the previously saved URL.
        </p>
      )}

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
