"use client";

import { useState, type FormEvent } from "react";

export function FinalCTA() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name"),
      whatsapp: form.get("whatsapp"),
      project: form.get("project"),
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Something went wrong");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <section id="contact-form" className="relative py-24 md:py-32 bg-paper overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-6">
        <div className="max-w-lg">
          <p className="mono-label text-signal mb-3">↩ THE LOOP CLOSES HERE</p>
          <h2 className="text-h2 font-display font-bold mb-8">Book a 30-minute call.</h2>

          {status === "success" ? (
            <div className="border border-mist rounded-2xl p-8 bg-paper-2">
              <p className="text-lg font-medium mb-2">Got it — thanks.</p>
              <p className="text-graphite">
                We reply on WhatsApp inside one working hour. Usually much less.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Field label="Name" name="name" autoComplete="name" required />
              <Field
                label="WhatsApp number"
                name="whatsapp"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                required
              />
              <Field label="Project name" name="project" autoComplete="off" required />

              {status === "error" && <p className="text-flag text-sm">{error}</p>}

              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-2 inline-flex items-center justify-center h-12 rounded-full bg-signal text-paper font-medium hover:opacity-90 transition-opacity disabled:opacity-60"
              >
                {status === "loading" ? "Sending…" : "Book a 30-min call"}
              </button>
              <p className="text-xs text-graphite">
                We reply on WhatsApp inside one working hour. Usually much less.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  ...rest
}: {
  label: string;
  name: string;
  type?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="mono-label text-graphite">{label}</span>
      <input
        name={name}
        type={type}
        className="h-12 px-4 rounded-lg border border-mist bg-paper-2 focus-visible:border-signal outline-none"
        {...rest}
      />
    </label>
  );
}
