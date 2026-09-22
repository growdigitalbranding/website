import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { PageHero, CTABand } from "@/components/PageHero";
import { CplCalculator } from "./CplCalculator";
import { FurtherReading } from "@/components/FurtherReading";

export const metadata: Metadata = pageMeta({
  path: "/tools/cpl-calculator",
  title: "Cost per booking calculator for real estate",
  description:
    "Turn ad spend and your own funnel rates into cost per booking and marketing cost per sale. Runs live in the browser, no email required.",
});

export default function CplCalculatorPage() {
  return (
    <>
      <BreadcrumbSchema path="/tools/cpl-calculator" />
      <PageHero
        eyebrow="TOOLS / CPL CALCULATOR"
        title="What's your real cost per booking?"
        subtitle="Cost per lead hides the number that matters. Enter your funnel rates below. The result updates live, no email required."
      />
      <div className="mx-auto max-w-[1440px] px-6 pb-16">
        <CplCalculator />
      </div>
      <div className="mx-auto max-w-3xl px-6 pb-16">
        <FurtherReading label="Where this arithmetic comes from" slugs={["good-cost-per-lead-real-estate"]} />
      </div>

      <CTABand />
    </>
  );
}
