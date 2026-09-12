import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { PageHero, CTABand } from "@/components/PageHero";
import { TrackingHealthCheck } from "./TrackingHealthCheck";

export const metadata: Metadata = pageMeta({
  path: "/tools/tracking-health-check",
  title: "Tracking Health Check",
  description:
    "A short questionnaire that scores your CAPI/pixel setup and tells you what's missing.",
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
      <div className="mx-auto max-w-2xl px-6 pb-16">
        <TrackingHealthCheck />
      </div>
      <CTABand />
    </>
  );
}
