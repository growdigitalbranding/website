import type { Metadata } from "next";
import { PageHero, CTABand } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "The Loop",
  description:
    "Why performance marketing for high-consideration purchases has to be a closed loop, not a media buying line item.",
};

export default function TheLoopPage() {
  return (
    <>
      <PageHero
        eyebrow="THE METHODOLOGY"
        title="Most agencies stop at the lead. Here's why that's the whole problem."
        subtitle="A loop marketing works when the account learns from your bookings, not just your form fills. Here's the diagnosis, the four stations, and what it costs to skip each one."
      />

      <article className="mx-auto max-w-3xl px-6 py-16 flex flex-col gap-16">
        <section>
          <h2 className="text-h3 font-display font-bold mb-4">
            What's a good cost per lead for a real estate developer?
          </h2>
          <p className="text-lg text-graphite">
            There isn't one — not on its own. A ₹1,200 CPL that converts at 1% to booking is
            worse than a ₹2,500 CPL that converts at 4%. Cost per lead is a media-buying metric.
            Cost per booking is a business metric. Most agencies report the first because it's
            the only number they can influence without touching your sales process, your
            tracking stack, or your creative pipeline. The four stations below are the parts of
            the funnel that actually move cost per booking, and they're the parts most agencies
            don't touch.
          </p>
        </section>

        <section>
          <p className="mono-label text-signal mb-2">01</p>
          <h2 className="text-h3 font-display font-bold mb-4">
            Creative Engine — the ad is the targeting now
          </h2>
          <p className="text-lg text-graphite mb-4">
            Advantage+ and Performance Max removed most of the manual targeting knobs that used
            to justify a media buyer's retainer. What's left is creative. The algorithm finds
            your buyer by testing which ad a person stops scrolling for — so the ad itself is
            now doing the audience-finding work targeting used to do. An agency running 2–3
            creatives a month against a broad audience isn't running a campaign, it's running a
            single bet.
          </p>
          <p className="text-lg text-graphite">
            <strong className="text-ink">What it costs to skip:</strong> creative fatigue sets
            in around frequency 2.8–3.2 for most real estate audiences in a metro. Past that
            point, CPL climbs even though nothing about your offer changed — the algorithm is
            just tired of your one ad. Without a refresh cadence, you pay a rising CPL tax every
            month, forever.
          </p>
        </section>

        <section>
          <p className="mono-label text-signal mb-2">02</p>
          <h2 className="text-h3 font-display font-bold mb-4">
            Signal Layer — platforms optimise on what you feed them
          </h2>
          <p className="text-lg text-graphite mb-4">
            Meta and Google don't know which of your leads bought a ₹1.2Cr villa and which one
            was a student doing a college project. Unless you tell them. Server-side tracking —
            CAPI, sGTM, offline conversion uploads — is how you tell them, every week, in a
            format the algorithm can learn from.
          </p>
          <p className="text-lg text-graphite">
            <strong className="text-ink">What it costs to skip:</strong> without a signal loop,
            the algorithm keeps optimising toward whatever converted to "lead" in its dashboard —
            usually the cheapest, least-qualified action available. You end up buying more of
            exactly the leads your telecallers already complain about.
          </p>
        </section>

        <section>
          <p className="mono-label text-signal mb-2">03</p>
          <h2 className="text-h3 font-display font-bold mb-4">
            Follow-Up Loop — the lead is the start, not the deliverable
          </h2>
          <p className="text-lg text-graphite mb-4">
            A lead that isn't called back inside 60 seconds converts at a fraction of a lead
            that is — that gap is the single largest lever most builders have never touched,
            because it isn't a media buying problem and no agency wants to own a client's
            telecalling discipline.
          </p>
          <p className="text-lg text-graphite">
            <strong className="text-ink">What it costs to skip:</strong> the industry figure for
            leads never followed up inside an hour hovers around 60% at most in-house sales
            desks we've audited. That's not a CPL problem. It's money already spent, sitting
            uncalled.
          </p>
        </section>

        <section>
          <p className="mono-label text-signal mb-2">04</p>
          <h2 className="text-h3 font-display font-bold mb-4">
            Answer Visibility — discovery is moving into AI assistants
          </h2>
          <p className="text-lg text-graphite mb-4">
            Buyers researching a ₹1Cr+ purchase increasingly ask an assistant before they ask
            Google. Assistants synthesise from entity consistency, third-party mentions, and
            citable content — not from your homepage's SEO metadata.
          </p>
          <p className="text-lg text-graphite">
            <strong className="text-ink">What it costs to skip:</strong> your competitor gets
            named in the answer and you don't, for a purchase decision that's already
            three-quarters made by the time someone books a site visit.
          </p>
        </section>

        <section>
          <h2 className="text-h3 font-display font-bold mb-4">The Return</h2>
          <p className="text-lg text-graphite">
            Fix all four stations and the loop closes: creative feeds the algorithm variety,
            signal feeds it truth, follow-up feeds it real outcomes, and booking data flows back
            into the ad account every week. That's the difference between an agency that reports
            cost per lead and one that reports cost per booking — and only one of those numbers
            tells you whether the money worked.
          </p>
        </section>
      </article>

      <CTABand />
    </>
  );
}
