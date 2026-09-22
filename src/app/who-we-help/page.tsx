import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { PageHero, CTABand } from "@/components/PageHero";
import { DirectAnswer } from "@/components/DirectAnswer";

export const metadata: Metadata = pageMeta({
  path: "/who-we-help",
  title: "Builders, senior living and interior firms",
  description:
    "Builders and developers first, then senior living operators and premium interior firms. Three segments that share a long, trust-first buying cycle.",
});

const VERTICALS = [
  {
    href: "/who-we-help/real-estate",
    title: "Real Estate",
    desc: "Builders and developers doing ₹40L-₹5Cr ticket sizes in Tamil Nadu and Karnataka.",
  },
  {
    href: "/who-we-help/senior-living",
    title: "Senior Living",
    desc: "Long sales cycles, high-trust decision-making, family influencers in the buying unit.",
  },
  {
    href: "/who-we-help/interiors",
    title: "Interiors",
    desc: "Premium local design firms selling a considered, high-ticket service.",
  },
];

export default function WhoWeHelpPage() {
  return (
    <>
      <PageHero
        eyebrow="WHO WE HELP"
        title="High-consideration purchases. Nothing shopped on price."
        subtitle="Not for ecommerce dropshippers, sub-₹25k/month budgets, or anyone shopping on price."
      />

      <DirectAnswer>
        Three segments that share one shape: a high-consideration purchase, a long window, and a decision nobody makes on price alone. Builders and developers at ₹40L to ₹5Cr ticket sizes first, then senior living operators and premium interior firms. Not ecommerce, not sub-₹25k monthly budgets, and not anyone shopping purely on price.
      </DirectAnswer>
      <div className="mx-auto max-w-[1440px] px-6 py-4 pb-16 grid md:grid-cols-3 gap-6">
        {VERTICALS.map((v) => (
          <Link
            key={v.href}
            href={v.href}
            className="border border-mist rounded-2xl p-6 hover:border-signal transition-colors"
          >
            <h2 className="text-h3 font-display font-bold mb-2">{v.title}</h2>
            <p className="text-graphite">{v.desc}</p>
          </Link>
        ))}
      </div>
      <div className="mx-auto max-w-3xl px-6 pb-16 flex flex-col gap-10">
        <section className="flex flex-col gap-4">
          <h2 className="text-h3 font-display font-bold text-ink">
            What do these three have in common?
          </h2>
          <p className="text-lg text-graphite">
            A buyer who takes weeks or months to decide, a decision that involves more
            than one person, and a purchase large enough that nobody clicks buy. That
            shape is what makes the loop worth running: when a single booking is worth
            lakhs, the rates between the lead and the booking matter far more than the
            price of the lead.
          </p>
          <p className="text-lg text-graphite">
            It is also what rules most categories out. A purchase decided in one session
            by one person does not need a follow-up loop, a qualification layer or a
            signal layer feeding bookings back into the ad account. It needs cheap traffic,
            which is a different job and a cheaper agency.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-h3 font-display font-bold text-ink">Who is this not for?</h2>
          <ul className="flex flex-col gap-3">
            {[
              "Ecommerce and dropshipping. Short cycle, single decision maker, and the whole model is volume at a low cost per action.",
              "Budgets under \u20b925,000 a month. Below that the retainer is most of the spend, which is not a service, it is a tax.",
              "Anyone comparing agencies purely on cost per lead. We would lose that comparison on purpose, because the number we optimise is the one after it.",
            ].map((x) => (
              <li key={x} className="text-lg text-graphite flex gap-3">
                <span aria-hidden="true" className="text-signal shrink-0 select-none">
                  /
                </span>
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <CTABand />
    </>
  );
}
