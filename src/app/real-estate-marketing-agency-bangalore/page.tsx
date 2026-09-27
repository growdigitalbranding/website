import type { Metadata } from "next";
import Link from "@/components/Link";
import { pageMeta } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { PageHero, CTABand } from "@/components/PageHero";
import { DirectAnswer } from "@/components/DirectAnswer";
import { FurtherReading } from "@/components/FurtherReading";
import { SourceList } from "@/components/SourceList";
import { faqJsonLd, ORG_ID } from "@/lib/schema/jsonld";

/**
 * Owns "real estate marketing agency bangalore" / "bengaluru".
 *
 * The one city page on the site, and deliberately the only one. The gap
 * analysis found a competitor running a dozen city pages for places it does
 * not operate in; that is the pattern this page is not. It exists because the
 * site already says it works in Karnataka, the work page already describes a
 * Bengaluru engagement, and the site mentioned "Bangalore" zero times.
 *
 * It says plainly that the agency is in Coimbatore. A Bengaluru page that
 * implied a Bengaluru office would be the first thing a buyer checked.
 *
 * Regulatory detail is named at the level of which authority does what, not
 * procedure, and carries the same not-legal-advice line as the RERA article.
 */

export const metadata: Metadata = pageMeta({
  path: "/real-estate-marketing-agency-bangalore",
  title: "Real estate marketing agency in Bangalore",
  description:
    "Real estate marketing for Bangalore developers: Meta and Google Ads by micro-market, RERA Karnataka-ready creative, leads judged on cost per booking.",
});

const FAQS = [
  {
    question: "Do you work with real estate developers in Bangalore?",
    answer:
      "Yes. We work with builders across Karnataka and Tamil Nadu, and Bengaluru is the largest market in that area. The work is the same loop we run everywhere: Meta and Google Ads bought against cost per booking, WhatsApp follow-up inside the first minute, and bookings fed back to the ad account.",
  },
  {
    question: "Do you have an office in Bangalore?",
    answer:
      "No. We are based in Coimbatore. What we do for a developer is ad accounts, tracking, creative and follow-up systems, none of which needs an office in the city. Site visits are run by your sales team, as they would be with any agency.",
  },
  {
    question: "What does RERA Karnataka require in real estate ads?",
    answer:
      "Where the Real Estate (Regulation and Development) Act, 2016 applies, a project must be registered with the state authority, in Karnataka RERA Karnataka, before it is advertised, and the registration number has to appear in the advertisement. Layout and plan approvals come from the planning authority for the area, such as BDA or BMRDA. This is marketing guidance, not legal advice; confirm the specifics with counsel.",
  },
];

export default function BangalorePage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://growdigitalbranding.com/real-estate-marketing-agency-bangalore#service",
    name: "Real estate marketing for Bengaluru developers",
    serviceType: "Real estate marketing",
    provider: { "@id": ORG_ID },
    areaServed: {
      "@type": "City",
      name: "Bengaluru",
      alternateName: "Bangalore",
      containedInPlace: { "@type": "State", name: "Karnataka" },
    },
  };

  return (
    <>
      <BreadcrumbSchema path="/real-estate-marketing-agency-bangalore" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQS)) }}
      />
      <PageHero
        eyebrow="WHO WE HELP / BENGALURU"
        title="Real estate marketing for Bengaluru developers"
        subtitle="Bangalore is a set of corridors, not one market. The campaigns, the keyword lists and the creative are built per corridor, and judged on what a booking costs."
        variant="split"
      />

      <DirectAnswer>
        We are a real estate marketing agency based in Coimbatore, working with developers in
        Bengaluru and across Karnataka. The loop is the one we run everywhere: Meta and Google
        Ads bought against cost per booking, a WhatsApp reply inside the first minute, and
        bookings fed back to the ad account. What changes in Bangalore is the regulator, the
        shape of the market, and how many national developers you are bidding against.
      </DirectAnswer>

      <article className="mx-auto max-w-3xl px-6 py-16 flex flex-col gap-14">
        <section className="flex flex-col gap-4">
          <h2 className="text-h3 font-display font-bold">
            What is different about marketing a Bengaluru project?
          </h2>
          <p className="text-lg text-graphite">
            Scale and fragmentation. A buyer looking in Whitefield, on Sarjapur Road, in North
            Bengaluru or around Electronic City is usually shopping one corridor, not the city,
            and searches that way. A campaign aimed at &ldquo;Bangalore&rdquo; spends money on
            people who will never cross the city for your project. So the unit of planning is
            the corridor: its own keyword group, its own audience, its own creative angle.
          </p>
          <p className="text-lg text-graphite">
            The auction is also more crowded than in most of the markets we work in. On the
            same corridor names you are bidding against national developers&rsquo; budgets,
            which makes keyword discipline, negative lists and the quality of the lead that
            comes out the other end matter more, not less. Outspending them is rarely the
            available strategy; out-converting them usually is.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-h3 font-display font-bold">
            What does RERA Karnataka change in the creative?
          </h2>
          <p className="text-lg text-graphite">
            The rule is the national one; the authority is RERA Karnataka. Where the Act
            applies, the project is registered before it is advertised and the registration
            number appears in the advertisement. Layout and plan approvals come from the
            planning authority for the area, BDA inside its limits and BMRDA or the local
            planning authority across the wider region, and Bengaluru buyers ask about khata
            status as readily as they ask about RERA.
          </p>
          <p className="text-lg text-graphite">
            The marketing consequence is the one in our{" "}
            <Link
              href="/insights/rera-approval-status-lead-quality"
              className="text-signal hover:underline"
            >
              article on approval status and lead quality
            </Link>
            : put the registration and approval stage in the creative, not the footer, because
            it is the first thing a serious buyer checks. This is marketing guidance, not legal
            advice. Confirm the specifics for a project with counsel.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-h3 font-display font-bold">
            How we run Google Ads for a Bangalore project
          </h2>
          <p className="text-lg text-graphite">
            By corridor and configuration: a 3 BHK on Sarjapur Road is a different search, a
            different buyer and a different bid from a villa plot in North Bengaluru. Your own
            project and developer names are protected first, because competitors and channel
            partners will bid on them. The negative list does as much work as the keyword list,
            cutting rent, PG, resale and job searches that ride along on every property term in
            a city this size. For buyers relocating from another city or buying from abroad,
            location targeting is set to reach interest in the corridor, not only people
            physically in it. The full method is on our{" "}
            <Link href="/what-we-do/google-ads-real-estate" className="text-signal hover:underline">
              Google Ads for real estate
            </Link>{" "}
            page.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-h3 font-display font-bold">
            How we run Meta ads for a Bangalore project
          </h2>
          <p className="text-lg text-graphite">
            Targeting where the buyers live and work rather than a radius drawn around the
            site, broad enough that the creative does the selecting, and structured so each ad
            set clears the learning phase on the event volume the project actually produces.
            Click-to-WhatsApp and lead forms are tested against each other on cost per booking,
            and booked outcomes go back to Meta so it learns which leads were buyers. The detail
            is on our{" "}
            <Link
              href="/what-we-do/facebook-ads-real-estate"
              className="text-signal hover:underline"
            >
              Facebook and Meta ads for real estate
            </Link>{" "}
            page.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-h3 font-display font-bold">
            Why use an agency in Coimbatore for a Bengaluru project?
          </h2>
          <p className="text-lg text-graphite">
            Because none of the work needs a Bengaluru address. It lives in ad accounts,
            tracking, creative and the follow-up system, and it is judged on a number, cost per
            booking, that does not care where the agency sits. What it does need is someone who
            knows how Karnataka projects are regulated, reads the corridors correctly, and
            reports honestly. Our{" "}
            <Link href="/pricing" className="text-signal hover:underline">
              pricing is published
            </Link>
            , and our{" "}
            <Link href="/work" className="text-signal hover:underline">
              work page
            </Link>{" "}
            describes a Bengaluru villa engagement.
          </p>
        </section>

        {FAQS.map((f) => (
          <section key={f.question} className="flex flex-col gap-3">
            <h2 className="text-h3 font-display font-bold">{f.question}</h2>
            <p className="text-lg text-graphite">{f.answer}</p>
          </section>
        ))}

        <FurtherReading
          label="Written for developers"
          slugs={[
            "pre-launch-marketing-real-estate",
            "portal-leads-vs-own-ads-real-estate",
            "channel-partner-vs-direct-leads",
          ]}
          className="border-t border-mist pt-10"
        />

        <SourceList
          keys={["reraAct", "reraKarnataka", "googleLocationOptions", "metaLearningPhase"]}
          className="border-t border-mist pt-10"
        />
      </article>

      <CTABand />
    </>
  );
}
