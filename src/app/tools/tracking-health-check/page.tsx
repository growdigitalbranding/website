import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { PageHero, CTABand } from "@/components/PageHero";
import { TrackingHealthCheck } from "./TrackingHealthCheck";
import { FurtherReading } from "@/components/FurtherReading";
import { DirectAnswer } from "@/components/DirectAnswer";

export const metadata: Metadata = pageMeta({
  path: "/tools/tracking-health-check",
  title: "Meta pixel and CAPI tracking health check",
  description:
    "A short questionnaire that scores your pixel and Conversions API setup and tells you which gap is costing you the most measurable conversions.",
});

export default function TrackingHealthCheckPage() {
  return (
    <>
      <BreadcrumbSchema path="/tools/tracking-health-check" />
      <PageHero
        eyebrow="TOOLS / TRACKING HEALTH CHECK"
        title="Five questions. One honest score."
        subtitle="If you can't answer 'yes' with certainty, treat it as a no. Most accounts we audit overestimate their own setup."
      />

      <DirectAnswer>
        A short questionnaire that scores your pixel and Conversions API setup against the three levels of feedback: browser pixel, server-side CAPI, and weekly offline conversion uploads. Almost nobody runs the third, which is the one that changes lead quality. Meta's published guidance puts the learning phase at roughly 50 conversions per week per ad set, so the depth you can optimise for is a volume question as much as a tracking one.
      </DirectAnswer>
      <div className="mx-auto max-w-2xl px-6 pb-16">
        <TrackingHealthCheck />
      </div>
      <div className="mx-auto max-w-3xl px-6 pb-16">
        <FurtherReading label="Why this matters" slugs={["why-meta-lead-ads-poor-quality"]} />
      </div>

      <CTABand />
    </>
  );
}
