import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { PageHero, CTABand } from "@/components/PageHero";

export const metadata: Metadata = pageMeta({
  path: "/work",
  title: "Work",
  description:
    "Case studies from managed accounts across real estate, senior living, and interiors.",
});

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="WORK"
        title="Case studies, in progress."
        subtitle="We're building this index out with full case studies as engagements complete their reporting cycle. Check back, or ask on a call for the specific numbers relevant to your ticket size."
      />
      <div className="mx-auto max-w-[1440px] px-6 pb-16">
        <div className="border border-mist rounded-2xl p-8 text-graphite">
          Case study template is live. See the metrics referenced on the homepage's{" "}
          <Link href="/#proof" className="text-signal hover:underline">
            proof section
          </Link>{" "}
          for a preview of the headline numbers, with full write-ups landing here shortly.
        </div>
      </div>
      <CTABand />
    </>
  );
}
