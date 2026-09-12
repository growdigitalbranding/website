import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { PageHero, CTABand } from "@/components/PageHero";

export const metadata: Metadata = pageMeta({
  path: "/tools",
  title: "Tools",
  description:
    "Free interactive calculators for lead-to-booking economics, tracking health, and creative fatigue.",
});

const TOOLS = [
  {
    href: "/tools/cpl-calculator",
    title: "CPL calculator",
    desc: "Turn ad spend and conversion rates into cost per booking and marketing cost as a % of revenue.",
  },
  {
    href: "/tools/tracking-health-check",
    title: "Tracking health check",
    desc: "A short questionnaire that scores your CAPI/pixel setup and tells you what's missing.",
  },
  {
    href: "/tools/creative-fatigue-estimator",
    title: "Creative fatigue estimator",
    desc: "Enter frequency and spend, get an estimated refresh date before CPL starts climbing.",
  },
];

export default function ToolsPage() {
  return (
    <>
      <PageHero
        eyebrow="TOOLS"
        title="Free tools. Real numbers, not gated results."
        subtitle="Results show on the page for everyone. Only the emailed PDF version is gated."
      />
      <div className="mx-auto max-w-[1440px] px-6 pb-16 grid md:grid-cols-3 gap-6">
        {TOOLS.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="border border-mist rounded-2xl p-6 hover:border-signal transition-colors"
          >
            <h2 className="text-h3 font-display font-bold mb-2">{t.title}</h2>
            <p className="text-graphite">{t.desc}</p>
          </Link>
        ))}
      </div>
      <CTABand />
    </>
  );
}
