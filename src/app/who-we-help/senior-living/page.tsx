import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { PageHero, CTABand } from "@/components/PageHero";

export const metadata: Metadata = pageMeta({
  path: "/who-we-help/senior-living",
  title: "Senior Living",
  description:
    "Performance marketing for senior living operators with long, trust-first sales cycles.",
});

export default function Page() {
  return (
    <>
      <BreadcrumbSchema path="/who-we-help/senior-living" />
      <PageHero
        eyebrow="WHO WE HELP / SENIOR LIVING"
        title="Trust-first marketing for a decision the whole family makes"
        subtitle="The lead is rarely the person who'll live there. Creative, qualification, and follow-up all have to account for an influencer who isn't the prospect."
      />
      <article className="mx-auto max-w-3xl px-6 py-16 flex flex-col gap-10">
        <p className="text-lg text-graphite">
          Senior living has one of the longest and most emotionally loaded sales cycles in
          high-consideration marketing. The adult children researching the decision are often a
          different demographic, on a different platform, with a different objection set than
          the resident themselves. Creative that speaks only to the resident misses half the
          buying unit; creative that speaks only to the children can feel presumptuous about a
          parent's autonomy.
        </p>
        <p className="text-lg text-graphite">
          Our approach runs two creative tracks against the same campaign. One addressed to
          adult children researching options for a parent, one addressed to prospective
          residents evaluating independence and community directly, and lets engagement data
          tell us which is working for which audience segment, rather than guessing.
        </p>
        <p className="text-lg text-graphite">
          Follow-up here isn't speed-to-lead in the same aggressive sense as real estate. A
          60-second WhatsApp ping can read as pushy on a decision this sensitive. We tune the
          qualification flow and cadence specifically for this vertical, still automated, but
          paced differently.
        </p>
      </article>
      <CTABand />
    </>
  );
}
