import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { PageHero, CTABand } from "@/components/PageHero";
import { DirectAnswer } from "@/components/DirectAnswer";

export const metadata: Metadata = pageMeta({
  path: "/who-we-help/interiors",
  title: "Marketing for interior design firms",
  description:
    "Performance marketing for premium interior design firms, built around a long consideration window and a lead that is worth qualifying before it is called.",
});

export default function Page() {
  return (
    <>
      <BreadcrumbSchema path="/who-we-help/interiors" />
      <PageHero
        eyebrow="WHO WE HELP / INTERIORS"
        title="Portfolio-driven marketing for a service, not a product"
        subtitle="Interior design sells on taste and trust before it sells on price. The creative engine and the follow-up loop both have to reflect that."
      />

      <DirectAnswer>
        A long consideration window and a lead worth qualifying before anyone calls it. Cost per booking is cost per lead divided by the product of the five post-lead rates, and in a category this considered the qualification rate is usually the one furthest from its ceiling, not the media cost.
      </DirectAnswer>
      <article className="mx-auto max-w-3xl px-6 py-16 flex flex-col gap-10">
        <p className="text-lg text-graphite">
          A furniture ad and an interior design ad look similar but sell differently. The buyer
          isn't evaluating a single product, they're evaluating whether they trust your taste
          with their entire home for the next six months. That means the creative engine here
          leans harder on portfolio storytelling and process transparency than on any single
          "before/after" hero shot.
        </p>
        <p className="text-lg text-graphite">
          The sales cycle is long, often 60-120 days from first inquiry to signed contract, which makes the follow-up loop less about speed and more about consistent, useful
          nurture: showing progress on live projects, answering budget questions honestly
          upfront, and qualifying out tyre-kicker consultations before they consume a designer's
          calendar.
        </p>
        <p className="text-lg text-graphite">
          Signal layer work matters just as much here. Most interior design accounts we've
          audited had zero server-side tracking, meaning every consultation booking looked
          identical to the platform regardless of whether it turned into a ₹2L project or a
          no-show.
        </p>
      </article>
      <CTABand />
    </>
  );
}
