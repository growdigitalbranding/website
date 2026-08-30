import type { Metadata } from "next";
import { PageHero, CTABand } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Interiors",
  description: "Performance marketing for premium interior design firms with a long, portfolio-driven sales cycle.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="WHO WE HELP / INTERIORS"
        title="Portfolio-driven marketing for a service, not a product"
        subtitle="Interior design sells on taste and trust before it sells on price. The creative engine and the follow-up loop both have to reflect that."
      />
      <article className="mx-auto max-w-3xl px-6 py-16 flex flex-col gap-10">
        <p className="text-lg text-graphite">
          A furniture ad and an interior design ad look similar but sell differently. The buyer
          isn't evaluating a single product, they're evaluating whether they trust your taste
          with their entire home for the next six months. That means the creative engine here
          leans harder on portfolio storytelling and process transparency than on any single
          "before/after" hero shot.
        </p>
        <p className="text-lg text-graphite">
          The sales cycle is long — often 60–120 days from first inquiry to signed contract —
          which makes the follow-up loop less about speed and more about consistent, useful
          nurture: showing progress on live projects, answering budget questions honestly
          upfront, and qualifying out tyre-kicker consultations before they consume a designer's
          calendar.
        </p>
        <p className="text-lg text-graphite">
          Signal layer work matters just as much here — most interior design accounts we've
          audited had zero server-side tracking, meaning every consultation booking looked
          identical to the platform regardless of whether it turned into a ₹2L project or a
          no-show.
        </p>
      </article>
      <CTABand />
    </>
  );
}
