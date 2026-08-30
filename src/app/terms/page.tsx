import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="LEGAL" title="Terms of Service" />
      <article className="mx-auto max-w-3xl px-6 py-16 flex flex-col gap-8 text-graphite">
        <p>
          These terms govern your use of growdigitalbranding.com. Engagement-specific
          terms (scope, fees, media spend handling, cancellation) are set out in each
          client's signed service agreement, not on this page. See /pricing for
          indicative ranges.
        </p>
        <p>
          Content on this site, including benchmark figures, tools and calculators, is provided for informational purposes and does not constitute a guarantee of
          results for any specific account, market, or budget.
        </p>
        <p className="text-sm">
          This is placeholder legal copy. Replace with counsel-reviewed text before
          launch.
        </p>
      </article>
    </>
  );
}
