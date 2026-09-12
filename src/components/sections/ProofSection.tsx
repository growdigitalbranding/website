"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FadeIn, CaseButton } from "@/components/loop/ui";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

/**
 * Proof without publishing anybody's account.
 *
 * The section used to reserve three image slots per case for dashboard
 * screenshots. Two things killed that. The boards on hand were design layouts
 * rather than exports, five of them still carrying unfilled tokens. And a
 * client's ad account is the client's: spend, CPL and campaign names sit under
 * a confidentiality duty, and a competitor learning what a developer pays per
 * lead is a real harm to that developer regardless of any clause. So there are
 * no screenshots here, and the nine files have been removed from public/ where
 * they were being served to anyone holding the URL.
 *
 * What replaces them is a portfolio-level aggregate, where no single account is
 * identifiable, plus per-case figures offered as claims a caller can check
 * rather than pictures a reader has to trust.
 *
 * VERIFIED is the gate, and it is the whole point of this file. Everything
 * numeric stays hidden until somebody confirms the figure against an account
 * they can open. A `metrics` array is not evidence; a true `verified` is. The
 * intervention text renders either way, because describing the work done is a
 * claim about method, not about results.
 */

type Metric = { label: string; value: string; tone?: "signal" | "flag" };

type Case = {
  n: string;
  category: string;
  client: string;
  meta: string;
  /** Flip to true only once every value below is checkable on a real account. */
  verified: boolean;
  metrics: Metric[];
  intervention: string;
};

/**
 * Portfolio-level, so no single client is identifiable. Set `verified` once
 * the figures come from a real roll-up across accounts.
 */
const AGGREGATE: { verified: boolean; stats: Metric[] } = {
  verified: false,
  stats: [
    { label: "Real estate accounts run", value: "" },
    { label: "Median CPL change, first 6 months", value: "" },
    { label: "Median lead to site visit", value: "" },
  ],
};

const CASES: Case[] = [
  {
    n: "01",
    category: "Structure + return path",
    client: "Bengaluru luxury villas",
    meta: "Client · 14 months",
    verified: false,
    metrics: [
      { label: "CPL", value: "₹3,400 → ₹1,180", tone: "signal" },
      { label: "Lead → visit", value: "6% → 14%", tone: "signal" },
      { label: "Cost / booking", value: "−61%", tone: "signal" },
      { label: "Cycle", value: "68 → 41 days", tone: "signal" },
    ],
    intervention:
      "Rebuilt from four self-competing Advantage+ campaigns into a clean three-tier structure, then wired offline bookings back into the account.",
  },
  {
    n: "02",
    category: "Follow-up loop",
    client: "Coimbatore plotted development",
    meta: "Client · 9 months",
    verified: false,
    metrics: [
      { label: "Leads / mo", value: "210 → 480", tone: "signal" },
      { label: "Speed to lead", value: "6h → 40s", tone: "signal" },
      { label: "RNR rate", value: "−44%", tone: "signal" },
      { label: "CPL", value: "Flat" },
    ],
    intervention:
      "CPL never moved. Bookings doubled, because WhatsApp qualification ran before the telecaller ever dialled.",
  },
  {
    n: "03",
    category: "Signal layer",
    client: "Senior living community",
    meta: "Client · 6 months",
    verified: false,
    metrics: [
      { label: "Match quality", value: "4.1 → 8.7", tone: "signal" },
      { label: "Attributed leads", value: "+38%", tone: "signal" },
      { label: "CPL", value: "−29%", tone: "signal" },
      { label: "CAPI dedup", value: "99.2%" },
    ],
    intervention:
      "No creative changes in month one. We fixed the signal layer, and the same budget started finding a different person.",
  },
];

export function ProofSection() {
  return (
    <section
      id="proof"
      className="relative z-10 -mt-10 sm:-mt-12 md:-mt-14 bg-paper rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-28 pb-[22vh]"
    >
      <FadeIn y={40}>
        <h2
          className="display-grad font-display font-extrabold lowercase text-center leading-none track-display mb-6"
          style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
        >
          proof
        </h2>
      </FadeIn>

      {/* Said once, at the top, instead of a screenshot on every card. */}
      <FadeIn y={20} delay={0.06}>
        <p className="mono-label text-graphite text-center max-w-[52ch] mx-auto leading-[1.9] mb-14 sm:mb-20">
          We do not publish client dashboards. Figures are checkable against a
          live account on a call, and named references are available once a
          client has agreed to be named.
        </p>
      </FadeIn>

      {AGGREGATE.verified && (
        <FadeIn y={24} delay={0.1}>
          <dl className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-8 sm:gap-10 border-y border-mist py-8 mb-16 sm:mb-20">
            {AGGREGATE.stats.map((s) => (
              <div key={s.label}>
                <dd
                  className="font-display font-extrabold leading-none"
                  style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)", color: "var(--signal)" }}
                >
                  {s.value}
                </dd>
                <dt className="mono-label text-graphite mt-2 leading-[1.7]">{s.label}</dt>
              </div>
            ))}
          </dl>
        </FadeIn>
      )}

      <div className="max-w-6xl mx-auto">
        {CASES.map((c, i) => (
          <CaseCard key={c.n} data={c} index={i} total={CASES.length} />
        ))}
      </div>
    </section>
  );
}

function CaseCard({
  data,
  index,
  total,
}: {
  data: Case;
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });

  // Cards behind the top of the stack settle slightly smaller.
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div className="min-h-[46vh] flex items-start justify-center sticky top-24 md:top-32">
      <motion.article
        ref={ref}
        style={{ scale: reduced ? 1 : scale, top: `${index * 22}px` }}
        className="surface-raised relative w-full rounded-[32px] sm:rounded-[40px] md:rounded-[48px] p-5 sm:p-7 md:p-9"
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-start gap-4 sm:gap-6 min-w-0">
            <span
              className="font-display font-extrabold leading-none text-ink/[0.15] shrink-0"
              style={{ fontSize: "clamp(2.6rem, 8vw, 110px)" }}
            >
              {data.n}
            </span>
            <div className="pt-2 min-w-0">
              <p className="mono-label mb-2">{data.category}</p>
              <h3
                className="font-display font-bold leading-tight"
                style={{ fontSize: "clamp(1.1rem, 2.4vw, 2.2rem)" }}
              >
                {data.client}
              </h3>
              <p className="mono-label mt-2">{data.meta}</p>
            </div>
          </div>
          <CaseButton />
        </div>

        {data.verified ? (
          <dl className="grid grid-cols-2 md:grid-cols-4 border-y border-mist py-4 mb-5">
            {data.metrics.map((m, i) => (
              <div
                key={m.label}
                className={`px-3 sm:px-4 py-2 md:py-0 ${i > 0 ? "md:border-l md:border-mist" : ""}`}
              >
                <dd
                  className="font-mono text-base sm:text-lg md:text-xl leading-tight"
                  style={{
                    color:
                      m.tone === "signal"
                        ? "var(--signal)"
                        : m.tone === "flag"
                          ? "var(--flag)"
                          : "var(--ink)",
                  }}
                >
                  {m.value}
                </dd>
                <dt className="mono-label mt-1">{m.label}</dt>
              </div>
            ))}
          </dl>
        ) : (
          /* Unverified: the work is described, the numbers are withheld. A
             quiet line beats a metric nobody has checked. */
          <div className="border-y border-mist py-3.5 mb-5">
            <p className="mono-label text-graphite leading-[1.8]">
              Figures for this account on request
            </p>
          </div>
        )}

        <p className="text-graphite max-w-2xl text-sm sm:text-base">{data.intervention}</p>
      </motion.article>
    </div>
  );
}
