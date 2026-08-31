"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { LoopGlyph } from "@/components/loop/LoopGlyph";
import { FadeIn, PrimaryCta } from "@/components/loop/ui";

export function FinalCtaSection() {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const glyphRef = useRef<HTMLDivElement>(null);
  const [pulsed, setPulsed] = useState(false);

  // One node pulses once when the closed loop enters view. This is the payoff
  // for the open circuit in the hero.
  useEffect(() => {
    const el = glyphRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setPulsed(true);
          io.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const f = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: f.get("name"),
          whatsapp: f.get("whatsapp"),
          project: f.get("project"),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Something went wrong");
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <section className="bg-paper py-24 sm:py-32 md:py-40 px-5 sm:px-8 md:px-10">
      <div className="max-w-[720px] mx-auto flex flex-col items-center text-center">
        <FadeIn y={24}>
          <div ref={glyphRef} className={`w-[180px] mb-10 ${pulsed ? "loop-closed-pulse" : ""}`}>
            <LoopGlyph closed className="w-full h-auto" />
          </div>
        </FadeIn>

        <FadeIn y={40} delay={0.05}>
          <h2
            className="display-grad font-display font-extrabold lowercase leading-none tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 8vw, 96px)" }}
          >
            let&apos;s close the loop
          </h2>
        </FadeIn>

        <FadeIn y={20} delay={0.12}>
          <p
            className="text-graphite font-light max-w-[480px] mt-6"
            style={{ fontSize: "clamp(1rem, 1.8vw, 1.2rem)" }}
          >
            Thirty minutes. We&apos;ll audit your account live and tell you where the leak is,
            whether or not you work with us.
          </p>
        </FadeIn>

        <div className="w-full mt-12 sm:mt-14">
          <AnimatePresence mode="wait">
            {status === "done" ? (
              <motion.div
                key="done"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.32 }}
                className="rounded-2xl border border-mist bg-paper-2 p-8 text-left"
              >
                <p className="mono-label mb-3">Booked</p>
                <p className="text-lg font-medium mb-6">
                  Got it. We reply on WhatsApp inside one working hour.
                </p>
                <ul className="flex flex-col gap-3">
                  <li>
                    <Link href="/tools/tracking-health-check" className="text-signal hover:underline">
                      Run the tracking health check while you wait →
                    </Link>
                  </li>
                  <li>
                    <Link href="/the-loop" className="text-signal hover:underline">
                      Read the methodology →
                    </Link>
                  </li>
                  <li>
                    <a href="https://wa.me/910000000000" className="text-signal hover:underline">
                      Message us on WhatsApp now →
                    </a>
                  </li>
                </ul>
                <p className="mono-label mt-6">
                  Calendar embed and audit checklist download land here once provisioned
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={onSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.32 }}
                className="flex flex-col gap-6 text-left"
              >
                <Field label="Name" name="name" autoComplete="name" />
                <Field
                  label="WhatsApp number"
                  name="whatsapp"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                />
                <Field label="Project name" name="project" autoComplete="off" />

                {status === "error" && <p className="text-flag text-sm">{error}</p>}

                <div className="flex flex-col items-center gap-4 mt-4">
                  <PrimaryCta
                    type="submit"
                    label={status === "loading" ? "Sending…" : "Book the call"}
                    disabled={status === "loading"}
                  />
                  <p className="mono-label">We reply on WhatsApp inside one working hour</p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
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
}: { label: string; name: string; type?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex flex-col gap-2">
      <span className="mono-label">{label}</span>
      <input name={name} type={type} required className="field-input h-12 text-lg text-ink" {...rest} />
    </label>
  );
}
