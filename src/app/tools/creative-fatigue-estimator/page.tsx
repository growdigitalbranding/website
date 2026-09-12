import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { PageHero, CTABand } from "@/components/PageHero";
import { CreativeFatigueEstimator } from "./CreativeFatigueEstimator";

export const metadata: Metadata = pageMeta({
  path: "/tools/creative-fatigue-estimator",
  title: "Creative Fatigue Estimator",
  description:
    "Enter frequency and its growth rate, get an estimated refresh date before CPL starts climbing.",
});

export default function CreativeFatigueEstimatorPage() {
  return (
    <>
      <BreadcrumbSchema path="/tools/creative-fatigue-estimator" />
      <PageHero
        eyebrow="TOOLS / CREATIVE FATIGUE ESTIMATOR"
        title="When does your creative need a refresh?"
        subtitle="Frequency past 2.8 is where CPL typically starts climbing even with no change to your offer. Estimate your refresh date from current frequency and its weekly growth rate."
      />
      <div className="mx-auto max-w-2xl px-6 pb-16">
        <CreativeFatigueEstimator />
      </div>
      <CTABand />
    </>
  );
}
