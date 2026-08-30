import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, CTABand } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Who we help",
  description: "Builders and developers first. Senior living and interiors, too.",
};

const VERTICALS = [
  {
    href: "/who-we-help/real-estate",
    title: "Real Estate",
    desc: "Builders and developers doing ₹40L-₹5Cr ticket sizes in Tamil Nadu and Karnataka.",
  },
  {
    href: "/who-we-help/senior-living",
    title: "Senior Living",
    desc: "Long sales cycles, high-trust decision-making, family influencers in the buying unit.",
  },
  {
    href: "/who-we-help/interiors",
    title: "Interiors",
    desc: "Premium local design firms selling a considered, high-ticket service.",
  },
];

export default function WhoWeHelpPage() {
  return (
    <>
      <PageHero
        eyebrow="WHO WE HELP"
        title="High-consideration purchases. Nothing shopped on price."
        subtitle="Not for ecommerce dropshippers, sub-₹25k/month budgets, or anyone shopping on price."
      />
      <div className="mx-auto max-w-[1440px] px-6 py-4 pb-16 grid md:grid-cols-3 gap-6">
        {VERTICALS.map((v) => (
          <Link
            key={v.href}
            href={v.href}
            className="border border-mist rounded-2xl p-6 hover:border-signal transition-colors"
          >
            <h2 className="text-h3 font-display font-bold mb-2">{v.title}</h2>
            <p className="text-graphite">{v.desc}</p>
          </Link>
        ))}
      </div>
      <CTABand />
    </>
  );
}
