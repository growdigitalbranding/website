import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { PageHero, CTABand } from "@/components/PageHero";
import { DirectAnswer } from "@/components/DirectAnswer";

export const metadata: Metadata = pageMeta({
  path: "/tools",
  title: "Free real estate marketing calculators",
  description:
    "Free calculators for lead-to-booking economics, tracking health and creative fatigue. No email gate, no signup, and the arithmetic is published.",
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

      <DirectAnswer>
        Three calculators, free, with results on the page and no email gate. They run the same arithmetic we run on client accounts: cost per booking from your five funnel rates, a tracking score against the three levels of feedback, and a creative refresh date from frequency accrual against a 2.8 fatigue trigger.
      </DirectAnswer>
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
      <div className="mx-auto max-w-3xl px-6 pb-16 flex flex-col gap-10">
        <section className="flex flex-col gap-4">
          <h2 className="text-h3 font-display font-bold text-ink">
            Why are the results not gated?
          </h2>
          <p className="text-lg text-graphite">
            Because a calculator that hides its answer until you hand over a phone number
            is a lead form wearing a costume, and everyone can tell. These run in the
            browser, show the result on the page, and send nothing anywhere. The
            arithmetic behind each one is published in full on the insights pages, so you
            can check the working rather than trust the output.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-h3 font-display font-bold text-ink">Which one should I use?</h2>
          <ul className="flex flex-col gap-3">
            {[
              "Start with the cost per booking calculator if you have ever been quoted a cost per lead target. It turns that number into the one that decides whether the media paid for itself.",
              "Use the tracking health check if your leads arrive but your sales team distrusts them. Poor lead quality is usually a feedback problem rather than a targeting one.",
              "Use the creative fatigue estimator if cost per lead has been climbing with no change to the offer, the targeting or the market.",
            ].map((x) => (
              <li key={x} className="text-lg text-graphite flex gap-3">
                <span aria-hidden="true" className="text-signal shrink-0 select-none">
                  /
                </span>
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <CTABand />
    </>
  );
}
