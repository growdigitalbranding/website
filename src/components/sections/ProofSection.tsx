"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FadeIn, CaseButton } from "@/components/loop/ui";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

/**
 * Case screenshots are not in the repo yet. Per the asset note, a missing
 * asset renders as a --mist block naming what belongs there, never a stock
 * photo. Drop the files into /public/proof and set HAS_ASSETS true.
 */
const HAS_ASSETS = false;

type Metric = { label: string; value: string; tone?: "signal" | "flag" };

type Case = {
  n: string;
  category: string;
  client: string;
  meta: string;
  metrics: Metric[];
  intervention: string;
  images: [string, string, string];
};

const CASES: Case[] = [
  {
    n: "01",
    category: "Structure + return path",
    client: "Bengaluru luxury villas",
    meta: "Client · 14 months",
    metrics: [
      { label: "CPL", value: "₹3,400 → ₹1,180", tone: "signal" },
      { label: "Lead → visit", value: "6% → 14%", tone: "signal" },
      { label: "Cost / booking", value: "−61%", tone: "signal" },
      { label: "Cycle", value: "68 → 41 days", tone: "signal" },
    ],
    intervention:
      "Rebuilt from four self-competing Advantage+ campaigns into a clean three-tier structure, then wired offline bookings back into the account.",
    images: ["villas-01", "villas-02", "villas-03"],
  },
  {
    n: "02",
    category: "Follow-up loop",
    client: "Coimbatore plotted development",
    meta: "Client · 9 months",
    metrics: [
      { label: "Leads / mo", value: "210 → 480", tone: "signal" },
      { label: "Speed to lead", value: "6h → 40s", tone: "signal" },
      { label: "RNR rate", value: "−44%", tone: "signal" },
      { label: "CPL", value: "Flat" },
    ],
    intervention:
      "CPL never moved. Bookings doubled, because WhatsApp qualification ran before the telecaller ever dialled.",
    images: ["plots-01", "plots-02", "plots-03"],
  },
  {
    n: "03",
    category: "Signal layer",
    client: "Senior living community",
    meta: "Client · 6 months",
    metrics: [
      { label: "Match quality", value: "4.1 → 8.7", tone: "signal" },
      { label: "Attributed leads", value: "+38%", tone: "signal" },
      { label: "CPL", value: "−29%", tone: "signal" },
      { label: "CAPI dedup", value: "99.2%" },
    ],
    intervention:
      "No creative changes in month one. We fixed the signal layer, and the same budget started finding a different person.",
    images: ["senior-01", "senior-02", "senior-03"],
  },
];

export function ProofSection() {
  return (
    <section
      id="proof"
      className="relative z-10 -mt-10 sm:-mt-12 md:-mt-14 bg-paper rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-28 pb-[30vh]"
    >
      <FadeIn y={40}>
        <h2
          className="display-grad font-display font-extrabold lowercase text-center leading-none tracking-tight mb-16 sm:mb-20"
          style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
        >
          proof
        </h2>
      </FadeIn>

      <div className="max-w-6xl mx-auto">
        {CASES.map((c, i) => (
          <CaseCard key={c.n} data={c} index={i} total={CASES.length} />
        ))}
      </div>
    </section>
  );
}

function CaseCard({ data, index, total }: { data: Case; index: number; total: number }) {
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
    <div ref={ref} className="h-[85vh] flex items-start justify-center sticky top-24 md:top-32">
      <motion.article
        style={{
          scale: reduced ? 1 : scale,
          top: `${index * 28}px`,
        }}
        className="relative w-full rounded-[32px] sm:rounded-[40px] md:rounded-[48px] border border-mist bg-paper-2 p-4 sm:p-6 md:p-8"
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-start gap-4 sm:gap-6 min-w-0">
            <span
              className="font-display font-extrabold leading-none text-ink/[0.15] shrink-0"
              style={{ fontSize: "clamp(3rem, 10vw, 140px)" }}
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

        {/* The metric bar is the most important element, so it sits above the
            images rather than under them. */}
        <dl className="grid grid-cols-2 md:grid-cols-4 border-y border-mist py-4 mb-5">
          {data.metrics.map((m, i) => (
            <div
              key={m.label}
              className={`px-3 sm:px-4 py-2 md:py-0 ${i > 0 ? "md:border-l md:border-mist" : ""}`}
            >
              <dd
                className="font-mono text-base sm:text-lg md:text-xl leading-tight"
                style={{ color: m.tone === "signal" ? "var(--signal)" : m.tone === "flag" ? "var(--flag)" : "var(--ink)" }}
              >
                {m.value}
              </dd>
              <dt className="mono-label mt-1">{m.label}</dt>
            </div>
          ))}
        </dl>

        <p className="text-graphite max-w-2xl mb-5 text-sm sm:text-base">{data.intervention}</p>

        <div className="grid grid-cols-1 sm:grid-cols-[40%_60%] gap-3">
          <div className="flex flex-col gap-3">
            <Shot id={data.images[0]} h="clamp(130px, 16vw, 230px)" />
            <Shot id={data.images[1]} h="clamp(160px, 22vw, 340px)" />
          </div>
          <Shot id={data.images[2]} h="clamp(300px, 38vw, 583px)" />
        </div>
      </motion.article>
    </div>
  );
}

function Shot({ id, h }: { id: string; h: string }) {
  return (
    <div
      className="rounded-[24px] sm:rounded-[32px] md:rounded-[40px] overflow-hidden border border-mist bg-mist/50 flex items-end p-3"
      style={{ height: h }}
    >
      {HAS_ASSETS ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`/proof/${id}.webp`}
          alt={`${id} dashboard screenshot`}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <span className="mono-label text-graphite">{id}.webp</span>
      )}
    </div>
  );
}
