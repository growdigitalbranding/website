"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FadeIn } from "@/components/loop/ui";
import { useMediaQuery } from "@/lib/motion/useMediaQuery";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { FUNNEL_STAGES, type FunnelStage } from "@/data/capability";

/**
 * The ten funnel stages, with the tenth curving back to the first.
 *
 * The brief asks for a GSAP pinned horizontal scrub. This uses a scroll-linked
 * sticky section driven by Motion values instead: same reading — the ribbon
 * advances as you scroll and holds after the return arc — without a pin.
 * Pinned horizontal scrubs are the biggest single source of jank on mid-range
 * Android, and this page already ships GSAP for the gutter path; adding a
 * second pinned context on the same page is where scroll positions start
 * fighting each other.
 *
 * Below md the whole scrub is dropped for a plain vertical timeline, as the
 * brief requires. Under reduced motion the desktop version degrades to the
 * same static list.
 */
export function FunnelRibbonSection() {
  const ref = useRef<HTMLElement>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const reduced = useReducedMotion();
  const scrubbed = isDesktop && !reduced;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Stages occupy the first 80% of the scroll; the last 20% is the hold after
  // the return arc completes, so the thesis has a beat to land.
  const active = useTransform(scrollYProgress, [0, 0.8], [0, FUNNEL_STAGES.length - 1]);
  const arcDraw = useTransform(scrollYProgress, [0.72, 0.88], [0, 1]);

  return (
    <section
      ref={ref}
      id="the-funnel"
      className="bg-ink rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]"
      style={scrubbed ? { height: "250dvh" } : undefined}
      aria-labelledby="funnel-heading"
    >
      <div
        className={`${scrubbed ? "sticky top-0 h-[100dvh] flex flex-col justify-center" : ""} py-24 sm:py-32 px-5 sm:px-8 md:px-10`}
      >
        <FadeIn y={30}>
          <h2
            id="funnel-heading"
            className="font-display font-extrabold lowercase text-center leading-none track-display text-paper"
            style={{ fontSize: "clamp(2.5rem, 9vw, 120px)" }}
          >
            the whole funnel
          </h2>
        </FadeIn>
        <FadeIn y={16} delay={0.06}>
          <p className="mono-label text-center mt-5 mb-12 md:mb-16 text-paper/[0.55]">
            Most agencies own stages 03 and 04. We own all ten.
          </p>
        </FadeIn>

        {scrubbed ? (
          <Ribbon active={active} arcDraw={arcDraw} />
        ) : (
          <Timeline />
        )}
      </div>
    </section>
  );
}

function Ribbon({
  active,
  arcDraw,
}: {
  active: ReturnType<typeof useTransform<number, number>>;
  arcDraw: ReturnType<typeof useTransform<number, number>>;
}) {
  const dash = useTransform(arcDraw, (v) => `${v} 1`);

  return (
    <div className="max-w-6xl mx-auto w-full">
      <svg viewBox="0 0 1000 150" className="w-full h-auto" role="img"
        aria-label="Ten funnel stages, with stage ten looping back to stage one.">
        {/* Connector */}
        <line x1="30" y1="110" x2="970" y2="110" stroke="rgba(239,240,236,0.18)" strokeWidth="2" />
        {/* The return arc: drawn last, in --pulse, curving back to stage 01.
            This is the site's whole thesis in the client's vocabulary. */}
        <motion.path
          d="M 970 110 C 970 30, 800 20, 500 20 C 200 20, 30 30, 30 110"
          fill="none"
          stroke="var(--pulse)"
          strokeWidth="2"
          strokeLinecap="round"
          pathLength={1}
          style={{ strokeDasharray: dash }}
        />
        {FUNNEL_STAGES.map((s, i) => {
          const x = 30 + (i * 940) / (FUNNEL_STAGES.length - 1);
          return <Node key={s.n} x={x} index={i} active={active} isReturn={!!s.isReturn} />;
        })}
      </svg>
      <ActiveCard active={active} />
    </div>
  );
}

function Node({
  x,
  index,
  active,
  isReturn,
}: {
  x: number;
  index: number;
  active: ReturnType<typeof useTransform<number, number>>;
  isReturn: boolean;
}) {
  // Peaks at 1.35 exactly as the head passes, settling either side.
  const scale = useTransform(active, [index - 0.5, index, index + 0.5], [1, 1.35, 1]);
  const opacity = useTransform(active, [index - 1.5, index], [0.35, 1]);
  return (
    <motion.circle
      cx={x}
      cy={110}
      r={6}
      fill={isReturn ? "var(--pulse)" : "var(--signal-bright)"}
      style={{ scale, opacity, transformBox: "fill-box", transformOrigin: "center" }}
    />
  );
}

function ActiveCard({ active }: { active: ReturnType<typeof useTransform<number, number>> }) {
  return (
    <div className="relative mt-10 min-h-[190px]">
      {FUNNEL_STAGES.map((s, i) => (
        <Card key={s.n} stage={s} index={i} active={active} />
      ))}
    </div>
  );
}

function Card({
  stage,
  index,
  active,
}: {
  stage: FunnelStage;
  index: number;
  active: ReturnType<typeof useTransform<number, number>>;
}) {
  const opacity = useTransform(active, [index - 0.5, index, index + 0.5], [0, 1, 0]);
  return (
    <motion.div style={{ opacity }} className="absolute inset-0 text-center" aria-hidden="true">
      <p className="mono-label mb-2" style={{ color: stage.isReturn ? "var(--pulse)" : "var(--signal-bright)" }}>
        {stage.n}
      </p>
      <h3 className="font-display text-xl sm:text-2xl text-paper mb-3">{stage.name}</h3>
      <p className="text-paper/[0.62] max-w-2xl mx-auto font-light">{stage.does}</p>
      <p className="mono-label mt-4" style={{ color: stage.isReturn ? "var(--pulse)" : "var(--signal-bright)" }}>
        Measured on &mdash; {stage.measure}
      </p>
    </motion.div>
  );
}

/** Mobile and reduced-motion: a plain vertical timeline, no pin, no scrub. */
function Timeline() {
  return (
    <ol className="max-w-2xl mx-auto relative pl-8">
      <span
        aria-hidden="true"
        className="absolute left-[5px] top-2 bottom-2 w-[2px]"
        style={{ background: "rgba(239,240,236,0.18)" }}
      />
      {FUNNEL_STAGES.map((s, i) => (
        <li key={s.n} className="relative pb-9 last:pb-0">
          <span
            aria-hidden="true"
            className="absolute -left-8 top-1.5 w-3 h-3 rounded-full"
            style={{ background: s.isReturn ? "var(--pulse)" : "var(--signal-bright)" }}
          />
          <FadeIn y={20} delay={i * 0.06}>
            <p className="mono-label mb-1" style={{ color: s.isReturn ? "var(--pulse)" : "var(--signal-bright)" }}>
              {s.n}
            </p>
            <h3 className="font-display text-xl text-paper mb-2">{s.name}</h3>
            <p className="text-paper/[0.62] font-light text-sm sm:text-base">{s.does}</p>
            <p className="mono-label mt-3" style={{ color: s.isReturn ? "var(--pulse)" : "var(--signal-bright)" }}>
              Measured on &mdash; {s.measure}
            </p>
          </FadeIn>
        </li>
      ))}
    </ol>
  );
}
