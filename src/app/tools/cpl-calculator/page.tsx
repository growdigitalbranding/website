import type { Metadata } from "next";
import { PageHero, CTABand } from "@/components/PageHero";
import { CplCalculator } from "./CplCalculator";

export const metadata: Metadata = {
  title: "CPL Calculator",
  description: "Turn ad spend and conversion rates into cost per booking and marketing cost as a % of revenue.",
};

export default function CplCalculatorPage() {
  return (
    <>
      <PageHero
        eyebrow="TOOLS / CPL CALCULATOR"
        title="What's your real cost per booking?"
        subtitle="Cost per lead hides the number that matters. Enter your funnel rates below — the result updates live, no email required."
      />
      <div className="mx-auto max-w-[1440px] px-6 pb-16">
        <CplCalculator />
      </div>
      <CTABand />
    </>
  );
}
