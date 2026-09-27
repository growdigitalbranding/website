"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { whatsappUrlWith } from "@/lib/contact";

type Option = { value: string; label: string };

/**
 * Training enquiry. Posts to the same /api/lead intake as the agency forms,
 * so training enquiries land in the same dashboard; `source` and the
 * `project` line are what tell them apart.
 *
 * The batch options arrive from the server with the next start date already
 * in the label, so the form and the schedule above it always agree.
 */
export function TrainingEnquiry({
  source,
  audience,
  options,
}: {
  /** e.g. "training-students". The API caps this at 64 characters. */
  source: string;
  /** Human label for the enquiry, e.g. "Students". */
  audience: string;
  options: Option[];
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const errorRef = useRef<HTMLDivElement>(null);

  // Move focus to the alert so keyboard users reach the explanation and the
  // WhatsApp fallback next, rather than being left on the submit button.
  useEffect(() => {
    if (status === "error") errorRef.current?.focus();
  }, [status]);

  const fallback = whatsappUrlWith(
    `Hi, I tried the training enquiry form on your site and it did not go through. I am interested in the AI digital marketing course (${audience}).`
  );

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const f = new FormData(e.currentTarget);
    const batch = options.find((o) => o.value === f.get("batch"))?.label ?? "Not sure yet";
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: f.get("name"),
          whatsapp: f.get("whatsapp"),
          project: `Training enquiry (${audience}): ${batch}`.slice(0, 200),
          source: source.slice(0, 64),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(
          data.error === "delivery_failed" ? "delivery_failed" : data.error ?? "Something went wrong"
        );
      }
      setStatus("done");
    } catch (err) {
      setStatus("error");
      const message = err instanceof Error ? err.message : "";
      // A network failure never reaches the server either, so it is treated
      // the same as a delivery failure.
      setError(message === "Something went wrong" || message === "" ? "delivery_failed" : message);
    }
  }

  if (status === "done") {
    return (
      <div className="surface rounded-card p-6 md:p-8" role="status">
        <p className="mono-label text-signal mb-3">Enquiry received</p>
        <p className="text-lg font-medium">
          Thank you. We will message you on WhatsApp with the class timings, the location and the
          seats left in your batch.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="surface rounded-card p-6 md:p-8 flex flex-col gap-6">
      <label className="flex flex-col gap-2">
        <span className="mono-label">Name</span>
        <input name="name" required maxLength={120} autoComplete="name" className="field-input h-12 text-lg" />
      </label>
      <label className="flex flex-col gap-2">
        <span className="mono-label">WhatsApp number</span>
        <input
          name="whatsapp"
          type="tel"
          inputMode="numeric"
          required
          autoComplete="tel"
          className="field-input h-12 text-lg"
        />
      </label>
      <label className="flex flex-col gap-2">
        <span className="mono-label">Batch</span>
        <select name="batch" defaultValue={options[0]?.value} className="field-input h-12 text-base bg-transparent">
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
          <option value="unsure">Not sure yet</option>
        </select>
      </label>

      {status === "error" && (
        <div
          ref={errorRef}
          role="alert"
          tabIndex={-1}
          className="rounded-card border border-flag/40 bg-flag/[0.10] p-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-flag/40"
        >
          {error === "delivery_failed" ? (
            <>
              <p className="text-flag font-medium mb-1">
                We could not submit that. Your enquiry has not reached us.
              </p>
              <p className="text-graphite">
                Message us on WhatsApp instead and we will reply straight away:{" "}
                <a href={fallback} className="text-signal underline underline-offset-2">
                  open WhatsApp
                </a>
              </p>
            </>
          ) : (
            <p className="text-flag">{error}</p>
          )}
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <button
          type="submit"
          disabled={status === "loading"}
          aria-busy={status === "loading"}
          className="press inline-flex items-center justify-center h-12 px-7 rounded-full bg-signal-bright text-ink font-medium hover:brightness-[0.94] transition-[filter] disabled:opacity-60 w-fit"
        >
          {status === "loading" ? "Sending…" : "Enquire now"}
        </button>
        <p className="text-sm text-graphite">We reply on WhatsApp with timings, location and seats left.</p>
      </div>
    </form>
  );
}
