import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { PageHero, CTABand } from "@/components/PageHero";

export const metadata: Metadata = pageMeta({
  path: "/insights",
  title: "Insights",
  description:
    "Benchmark data and tactical pieces on performance marketing for high-consideration purchases.",
});

export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="INSIGHTS"
        title="Two articles a month. Minimum."
        subtitle="One benchmark piece with original data, one tactical piece. Every article opens with a direct answer before any preamble."
      />
      <div className="mx-auto max-w-[1440px] px-6 pb-16">
        <div className="border border-mist rounded-2xl p-8 text-graphite">
          First articles are in production. The MDX content pipeline and article template are
          built and ready. Check back shortly, or ask about our published benchmarks directly on
          a call.
        </div>
      </div>
      <CTABand />
    </>
  );
}
