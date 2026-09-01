"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { FadeIn } from "@/components/loop/ui";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import {
  POSITIONS,
  PROPERTY_TYPES,
  STAGES,
  type PositionId,
  type PropertyTypeId,
  type StageId,
} from "@/data/capability";
import { STATIONS, resolveLine } from "@/data/loopLines";

/**
 * Turns the taxonomy into a self-identification tool: the visitor says what
 * they are selling and the page composes the loop it would run for that
 * project.
 *
 * It is also a research instrument. Every chip fires configurator_change, so
 * after a quarter the dataLayer says which property types and stages the
 * traffic actually represents — which should decide what gets built next.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

/** dataLayer only. No-ops until a GTM container is configured. */
function track(event: string, detail: Record<string, string>) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...detail });
}

export function ConfiguratorSection() {
  // A real, common combination, so the section is never empty on arrival.
  const [type, setType] = useState<PropertyTypeId>("villas");
  const [position, setPosition] = useState<PositionId>("luxury");
  const [stage, setStage] = useState<StageId>("launch");
  const reduced = useReducedMotion();

  const typeLabel = PROPERTY_TYPES.find((t) => t.id === type)!.label;
  const positionLabel = POSITIONS.find((p) => p.id === position)!.label;
  const stageLabel = STAGES.find((s) => s.id === stage)!.label;

  function choose(axis: "type" | "position" | "stage", value: string) {
    if (axis === "type") setType(value as PropertyTypeId);
    if (axis === "position") setPosition(value as PositionId);
    if (axis === "stage") setStage(value as StageId);
    track("configurator_change", {
      axis,
      value,
      type: axis === "type" ? value : type,
      position: axis === "position" ? value : position,
      stage: axis === "stage" ? value : stage,
    });
  }

  // Carries the selection into the contact form.
  const contactHref =
    `/contact?project_profile=${encodeURIComponent(`${positionLabel} ${typeLabel} · ${stageLabel}`)}`;

  return (
    <section
      id="configurator"
      className="relative bg-paper-2 py-24 sm:py-32 md:py-40 px-5 sm:px-8 md:px-10"
      aria-labelledby="configurator-heading"
    >
      <FadeIn y={20}>
        <p className="mono-label text-graphite text-center mb-4">
          Tell us what you&rsquo;re selling
        </p>
      </FadeIn>
      <FadeIn y={40} delay={0.05}>
        <h2
          id="configurator-heading"
          className="display-grad font-display font-extrabold lowercase text-center leading-none track-display mb-12 md:mb-16"
          style={{ fontSize: "clamp(2.5rem, 9vw, 120px)" }}
        >
          we market
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto flex flex-col gap-6 md:gap-7">
        <Row
          label="What we market"
          options={PROPERTY_TYPES}
          selected={type}
          onSelect={(v) => choose("type", v)}
        />
        <Row
          label="How it's positioned"
          options={POSITIONS}
          selected={position}
          onSelect={(v) => choose("position", v)}
        />
        <Row
          label="Where it is"
          options={STAGES}
          selected={stage}
          onSelect={(v) => choose("stage", v)}
        />
      </div>

      {/* The composed sentence. Only the changed word animates; the rest of
          the line stays put so the eye is not asked to re-read it. */}
      <p
        className="max-w-[900px] mx-auto text-center my-14 sm:my-16 md:my-20 font-display font-medium text-graphite"
        style={{ fontSize: "clamp(1.5rem, 4.5vw, 3.25rem)", lineHeight: 1.15 }}
      >
        {/* aria-live so the composed answer is announced rather than silently
            rewritten under a screen reader user. */}
        <span className="sr-only" aria-live="polite">
          Marketing {positionLabel} {typeLabel} at {stageLabel}, end to end.
        </span>
        <span aria-hidden="true">
          Marketing <Word text={positionLabel} reduced={reduced} />{" "}
          <Word text={typeLabel} reduced={reduced} /> at{" "}
          <Word text={stageLabel} reduced={reduced} /> &mdash; end to end.
        </span>
      </p>

      {/* Panel: cross-fades as a whole on any change. Keyed on the full
          combination so React swaps rather than diffs. */}
      <div className="max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${type}-${position}-${stage}`}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            // Exit is faster than enter: the outgoing panel is already stale,
            // so lingering on it only delays the answer.
            exit={reduced ? undefined : { opacity: 0, transition: { duration: 0.12 } }}
            transition={{ duration: 0.26, ease: EASE }}
            className="grid gap-6 md:gap-5 md:grid-cols-2 lg:grid-cols-4"
          >
            {STATIONS.filter((s) => !s.isReturn).map((s, i) => (
              <motion.div
                key={s.n}
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.26, delay: reduced ? 0 : i * 0.04, ease: EASE }}
                className="pt-4 border-t border-mist"
              >
                <p className="mono-label text-signal mb-2">{s.n}</p>
                <h3 className="font-display text-lg text-ink mb-2">{s.name}</h3>
                <p className="text-graphite font-light text-sm sm:text-base leading-relaxed">
                  {resolveLine(s.line, type, position, stage)}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* The Return sits apart, on --pulse, because it is the payoff rather
            than a fifth station. */}
        {STATIONS.filter((s) => s.isReturn).map((s) => (
          <div key={s.n} className="mt-6 pt-4 border-t" style={{ borderColor: "rgba(255,138,61,0.4)" }}>
            <p className="mono-label mb-2" style={{ color: "var(--pulse)" }}>
              {s.n} {s.name}
            </p>
            <p className="text-graphite font-light text-sm sm:text-base leading-relaxed max-w-3xl">
              {resolveLine(s.line, type, position, stage)}
            </p>
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto mt-12 sm:mt-14 flex justify-center">
        <Link
          href={contactHref}
          onClick={() => track("configurator_submit", { type, position, stage })}
          className="primary-cta inline-flex items-center justify-center rounded-full bg-signal-bright text-ink font-medium uppercase tracking-widest px-8 py-3.5 sm:px-10 sm:py-4 text-xs sm:text-sm text-center"
        >
          Get this plan for your project
        </Link>
      </div>
    </section>
  );
}

/** One animated word inside the composed sentence. */
function Word({ text, reduced }: { text: string; reduced: boolean }) {
  return (
    <span className="inline-block relative">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={text}
          initial={reduced ? false : { y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduced ? undefined : { y: -14, opacity: 0, transition: { duration: 0.16, ease: EASE } }}
          transition={{ duration: 0.24, ease: EASE }}
          className="inline-block font-extrabold text-ink"
        >
          {text}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function Row({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string;
  options: readonly { id: string; label: string }[];
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-start gap-3 md:gap-6">
      <p className="mono-label text-graphite md:w-[150px] md:shrink-0 md:pt-3">{label}</p>
      {/* Horizontally scrollable on mobile with edge masks signalling more.
          role=radiogroup because it is single-select, so arrow keys and the
          announced "1 of 8" both come for free. */}
      <div className="config-track flex gap-2 overflow-x-auto md:flex-wrap md:overflow-visible pb-1 md:pb-0">
        <div className="flex gap-2 md:flex-wrap" role="radiogroup" aria-label={label}>
          {options.map((o) => {
            const active = o.id === selected;
            return (
              <button
                key={o.id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => onSelect(o.id)}
                className={`config-chip ${active ? "is-selected" : ""}`}
              >
                <span className="relative z-[1]">{o.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
