"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FadeIn, PrimaryCta } from "@/components/loop/ui";
import { FloatingNav } from "@/components/loop/FloatingNav";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

/**
 * The same hundred leads, run two ways.
 *
 * The fold used to be a claim in large type. A builder arriving cold has read
 * that claim on every agency site in the market, so it did no work. This is the
 * argument as a mechanism he operates himself: one switch, five bands, and a
 * top band that never moves. Cost per lead is identical on both settings and
 * the bookings are not, which is the whole thesis and needs no adjective.
 *
 * The rates are illustrative and say so on screen. They are arithmetic on a
 * fixed cohort rather than a claim about any account, and the structural point
 * survives whatever the real numbers turn out to be. Swapping them for measured
 * ones is an edit to STAGES and the removal of one line.
 */

type Stage = { label: string; before: number; after: number };

const STAGES: Stage[] = [
  { label: "Leads bought", before: 100, after: 100 },
  { label: "Reached inside an hour", before: 58, after: 86 },
  { label: "Qualified", before: 31, after: 47 },
  { label: "Site visit booked", before: 11, after: 22 },
  { label: "Showed up", before: 3, after: 7 },
];

// Derived, never typed in: the end-to-end multiple has to agree with the last
// band, or the fold contradicts itself the moment these rates are replaced.
const LAST = STAGES[STAGES.length - 1];
const TOTAL_UPLIFT = `${(LAST.after / LAST.before).toFixed(1)}x the bookings`;

const SEGMENTS = {
  full: ["Plots", "Apartments", "Villas", "Senior Living", "Commercial"],
  short: ["Plots", "Apartments", "Villas"],
};

const NAV = [
  { href: "/the-loop", label: "The Loop" },
  { href: "/what-we-do", label: "What we do" },
  { href: "/work", label: "Work" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

function Terms({ parts }: { parts: string[] }) {
  return (
    <>
      {parts.map((text, j) => (
        <span key={text}>
          {j > 0 && <span className="text-paper/30"> &middot; </span>}
          <span className="text-paper/75">{text}</span>
        </span>
      ))}
    </>
  );
}

export function HeroSection() {
  const [on, setOn] = useState(false);
  const reduced = useReducedMotion();

  // One demonstration on load, then it waits. Without it the switch reads as
  // decoration and most visitors never touch it. Under reduced motion nothing
  // moves on its own: the control is still there to press.
  useEffect(() => {
    if (reduced) return;
    const a = setTimeout(() => setOn(true), 1700);
    const b = setTimeout(() => setOn(false), 4100);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, [reduced]);

  const key = on ? "after" : "before";

  return (
    <section className="relative flex flex-col min-h-[100dvh] bg-ink text-paper" style={{ overflowX: "clip" }}>
      <FloatingNav />

      <FadeIn y={-20} delay={0} className="relative z-[1] px-6 md:px-10 pt-6 md:pt-8">
        <div className="flex items-center justify-between gap-6">
          <Link
            href="/"
            className="press font-display font-extrabold uppercase track-h2 text-xl md:text-2xl text-paper"
          >
            Grow
          </Link>
          <nav className="hidden md:flex items-center gap-7 lg:gap-9">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="nav-link text-paper/80 font-medium uppercase tracking-wider text-sm md:text-base lg:text-[1.05rem]"
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/contact"
            className="nav-link md:hidden text-paper/80 font-medium uppercase tracking-wider text-sm"
          >
            Contact
          </Link>
        </div>
      </FadeIn>

      <div className="relative z-[1] flex-1 grid lg:grid-cols-[0.95fr_1.05fr] items-center gap-8 lg:gap-14 px-6 md:px-10 py-6 md:py-8">
        <div className="min-w-0 max-w-[42ch]">
          <FadeIn y={14} delay={0.06}>
            <p className="mono-label mb-4 md:mb-5" style={{ color: "var(--signal-bright)" }}>
              Every hundred leads you buy
            </p>
          </FadeIn>

          <h1
            className="font-display font-extrabold lowercase track-display leading-[0.93] text-paper overflow-x-clip overflow-y-visible"
            style={{ fontSize: "clamp(2.2rem, min(5.6vw, 8.2vh), 5rem)" }}
          >
            <FadeIn y={28} delay={0.14}>
              <span className="block">watch where</span>
            </FadeIn>
            <FadeIn y={28} delay={0.22}>
              <span className="block">the money</span>
            </FadeIn>
            <FadeIn y={28} delay={0.3}>
              <span className="block" style={{ color: "var(--pulse)" }}>
                actually goes.
              </span>
            </FadeIn>
          </h1>

          <FadeIn y={16} delay={0.4}>
            <p
              className="text-paper/65 leading-[1.55] mt-5 md:mt-6 max-w-[44ch]"
              style={{ fontSize: "clamp(0.95rem,1.5vw,1.3rem)" }}
            >
              Your cost per lead is the top band. Everything underneath it is the part
              nobody reports on, and the part that decides what a booking costs you.
            </p>
          </FadeIn>

          <FadeIn y={16} delay={0.48}>
            <div className="mt-7 md:mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <PrimaryCta label="Find your leak" />
              <span className="mono-label text-paper/55">Free, 30 minutes, no deck</span>
            </div>
          </FadeIn>
        </div>

        <FadeIn y={24} delay={0.56} className="min-w-0">
          <div className="flex items-center gap-3 mb-5 md:mb-7">
            <button
              type="button"
              role="switch"
              aria-checked={on}
              aria-label="Compare leads handed over with the follow-up loop run"
              onClick={() => setOn((v) => !v)}
              className="press relative h-9 w-[74px] shrink-0 rounded-full transition-colors duration-300"
              style={{ background: on ? "var(--signal)" : "rgba(239,240,236,0.18)" }}
            >
              <motion.span
                animate={{ left: on ? 42 : 4 }}
                transition={
                  reduced
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 420, damping: 32 }
                }
                className="absolute top-1 h-7 w-7 rounded-full bg-paper"
              />
            </button>
            <span className="mono-label text-paper/75 leading-[1.6]">
              {on ? (
                <>
                  With the follow-up loop
                  <span className="block sm:inline" style={{ color: "var(--signal-bright)" }}>
                    <span className="hidden sm:inline text-paper/30"> &middot; </span>
                    {TOTAL_UPLIFT}
                  </span>
                </>
              ) : (
                "Leads handed over, as usual"
              )}
            </span>
          </div>

          {/* Right gutter, not decoration: the bars are centred, so the widest
              one put its uplift badge 32px past the section edge at 390px and
              the clip hid it. The gutter is what the badge is centred within. */}
          <div className="flex flex-col gap-1.5 sm:gap-2 pr-12 sm:pr-16">
            {STAGES.map((s, i) => {
              const v = s[key];
              const lost = i > 0 ? STAGES[i - 1][key] - v : 0;
              // Against the same stage when the leads are simply handed over.
              const uplift =
                s.before > 0 ? Math.round(((s.after - s.before) / s.before) * 100) : 0;
              return (
                <div key={s.label}>
                  {i > 0 && (
                    <div className="flex justify-center">
                      <motion.span
                        key={key + i}
                        initial={reduced ? false : { opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35 }}
                        className="font-mono text-[10px] sm:text-[11px] mb-1 sm:mb-1.5"
                        style={{ color: "var(--pulse)" }}
                      >
                        &minus;{lost} lost here
                      </motion.span>
                    </div>
                  )}
                  <motion.div
                    animate={{ width: `${Math.max(v, 16)}%` }}
                    transition={
                      reduced ? { duration: 0 } : { type: "spring", stiffness: 90, damping: 18 }
                    }
                    data-band
                    className="relative mx-auto rounded-lg flex items-center justify-center"
                    style={{
                      height: "clamp(2.1rem, 4.8vh, 3.4rem)",
                      background: on ? "var(--signal)" : "rgba(239,240,236,0.22)",
                    }}
                  >
                    <span className="font-mono text-sm sm:text-base md:text-lg text-paper">{v}</span>
                    {/* Pinned to the band's own right edge rather than the row,
                        so it travels with the bar as the bar changes width. */}
                    {on && uplift > 0 && (
                      <motion.span
                        initial={reduced ? false : { opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.25 }}
                        className="absolute left-full top-1/2 -translate-y-1/2 ml-2 font-mono text-[10px] sm:text-xs whitespace-nowrap"
                        style={{ color: "var(--signal-bright)" }}
                      >
                        +{uplift}%<span className="hidden sm:inline"> reached</span>
                      </motion.span>
                    )}
                  </motion.div>
                  <p className="mono-label text-center mt-1.5 sm:mt-2 text-paper/60 leading-[1.5]">
                    {s.label}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Said in the fold rather than a footnote: these are not measured
              numbers and the page should not imply they are. */}
          <p className="mono-label text-paper/40 mt-5 md:mt-7 leading-[1.9] max-w-[46ch]">
            Illustrative rates, not an average across accounts. The audit gives you yours.
          </p>
        </FadeIn>
      </div>

      <FadeIn y={12} delay={0.7} className="relative z-[1]">
        <div className="px-6 md:px-10 pb-6 sm:pb-7 md:pb-9 pt-4 border-t border-paper/10 mx-6 md:mx-10">
          <p className="mono-label positioning-line leading-[1.55]">
            <span className="sm:hidden">
              <Terms parts={SEGMENTS.short} />
            </span>
            <span className="hidden sm:inline">
              <Terms parts={SEGMENTS.full} />
            </span>
          </p>
        </div>
      </FadeIn>
    </section>
  );
}
