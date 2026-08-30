import type { Metadata } from "next";
import { PageHero, CTABand } from "@/components/PageHero";
import { TrackingHealthCheck } from "./TrackingHealthCheck";

export const metadata: Metadata = {
  title: "Tracking Health Check",
  description: "A short questionnaire that scores your CAPI/pixel setup and tells you what's missing.",
};

export default function TrackingHealthCheckPage() {
  return (
    <>
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
