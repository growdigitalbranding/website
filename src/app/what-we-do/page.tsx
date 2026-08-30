import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, CTABand } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "What we do",
  description: "Five services that make up one loop: creative, signal, follow-up, and visibility.",
};

const SERVICES = [
  {
    href: "/what-we-do/performance-marketing",
    number: "00",
    title: "Performance marketing",
    desc: "Meta + Google campaign architecture built to stop competing with itself.",
  },
  {
    href: "/what-we-do/creative-engine",
    number: "01",
    title: "Creative engine",
    desc: "Creative volume as a production system, not a monthly favour from a designer.",
  },
  {
    href: "/what-we-do/tracking-attribution",
    number: "02",
    title: "Tracking & attribution",
    desc: "CAPI, server-side GTM, offline conversions — the signal layer.",
  },
  {
    href: "/what-we-do/follow-up-systems",
    number: "03",
    title: "Follow-up systems",
    desc: "WhatsApp automation, speed-to-lead, and a CRM loop that closes.",
  },
  {
    href: "/what-we-do/ai-search-visibility",
    number: "04",
    title: "AI search visibility",
    desc: "Entity consistency and citable content for the assistants your buyers now ask.",
  },
];

export default function WhatWeDoPage() {
  return (
    <>
      <PageHero
        eyebrow="WHAT WE DO"
        title="Five services. One loop."
        subtitle="Each one is sold standalone if you already have parts of this working. Together, they're the system."
      />
      <div className="mx-auto max-w-[1440px] px-6 py-4 pb-16 grid md:grid-cols-2 gap-6">
        {SERVICES.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="border border-mist rounded-2xl p-6 hover:border-signal transition-colors"
          >
            <p className="font-mono text-signal text-xl mb-2">{s.number}</p>
            <h2 className="text-h3 font-display font-bold mb-2">{s.title}</h2>
            <p className="text-graphite">{s.desc}</p>
          </Link>
        ))}
      </div>
      <CTABand />
    </>
  );
}
