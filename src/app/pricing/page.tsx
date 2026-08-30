import type { Metadata } from "next";
import { PageHero, CTABand } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Three engagement models, with real ranges. No 'contact us for a quote.'",
};

const PLANS = [
  {
    name: "Signal Setup",
    price: "₹75,000",
    unit: "one-time",
    desc: "CAPI, server-side GTM, offline conversion upload, Consent Mode v2. Fixes the tracking foundation, nothing else.",
    good: ["Accounts with working campaigns but no server-side tracking", "A one-time technical fix before you switch or scale spend"],
  },
  {
    name: "Audit & Rebuild",
    price: "₹1,25,000",
    unit: "one-time",
    desc: "Full account teardown across structure, creative, tracking and follow-up, with a written rebuild plan and campaign restructure.",
    good: ["Anyone evaluating whether their current agency is the problem", "A standalone diagnostic before committing to a retainer"],
    featured: true,
  },
  {
    name: "Full Loop Retainer",
    price: "₹60,000-₹2,50,000",
    unit: "per month",
    desc: "All four stations, run continuously. Tiered by ad spend under management, starting at ₹1.5L/month media spend.",
    good: ["Builders ready to commit to the full system, ongoing", "1-4 live projects with an in-house sales team of 2-15"],
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="PRICING"
        title="Real numbers. Not 'contact us for a quote.'"
        subtitle="Publishing ranges filters out the wrong leads before they cost either of us a call."
      />
      <div className="mx-auto max-w-[1440px] px-6 pb-16 grid md:grid-cols-3 gap-6">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-2xl p-8 flex flex-col border ${
              plan.featured ? "border-signal bg-paper-2" : "border-mist"
            }`}
          >
            <h2 className="text-h3 font-display font-bold mb-2">{plan.name}</h2>
            <p className="font-mono text-2xl mb-1">{plan.price}</p>
            <p className="mono-label text-graphite mb-6">{plan.unit}</p>
            <p className="text-graphite mb-6 flex-1">{plan.desc}</p>
            <ul className="flex flex-col gap-2 text-sm border-t border-mist pt-4">
              {plan.good.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto max-w-3xl px-6 pb-16 text-graphite">
        <p>
          Media spend is separate and goes directly to Meta/Google. We don't mark it up or take
          a percentage of it. Minimum media spend to start a Full Loop Retainer is ₹1.5L/month;
          below that, the creative testing volume the loop needs doesn't reach statistical
          signal.
        </p>
      </div>
      <CTABand />
    </>
  );
}
