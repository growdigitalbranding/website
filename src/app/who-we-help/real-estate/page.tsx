import Link from "@/components/Link";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { PageHero, CTABand } from "@/components/PageHero";
import { faqJsonLd } from "@/lib/schema/jsonld";
import { FurtherReading } from "@/components/FurtherReading";
import { SourceList } from "@/components/SourceList";

export const metadata: Metadata = pageMeta({
  path: "/who-we-help/real-estate",
  title: "Digital marketing for real estate in Coimbatore",
  description:
    "Digital marketing for real estate developers in Coimbatore, Tamil Nadu and Karnataka: Meta and Google Ads, lead quality by ticket size, RERA-safe creative, and site visits.",
});

// Benchmark ranges below are typical ranges observed across managed accounts,
// not audited industry-wide statistics. Update with live portfolio data as
// it accumulates.
const BENCHMARKS = [
  { ticket: "₹40L-₹75L (affordable/mid)", cpl: "₹350-₹700", l2v: "18-28%", v2b: "8-14%" },
  { ticket: "₹75L-₹1.5Cr (premium)", cpl: "₹800-₹1,500", l2v: "12-20%", v2b: "6-11%" },
  { ticket: "₹1.5Cr-₹5Cr (luxury)", cpl: "₹1,800-₹3,500", l2v: "8-15%", v2b: "4-9%" },
];

const FAQS = [
  {
    question: "Should we run project-launch and sustenance campaigns differently?",
    answer:
      "Yes. A launch campaign should run tighter budgets against warm audiences (past visitors, CP databases) with urgency-led creative, since inventory is genuinely time-limited. A sustenance campaign for an ongoing project should widen to cold prospecting with education-led creative, since there's no artificial urgency to lean on and overclaiming it erodes trust with repeat-visit buyers.",
  },
  {
    question: "CP-driven leads or direct leads: which convert better?",
    answer:
      "Direct leads from your own campaigns convert to site visit at a meaningfully higher rate in most accounts we've managed, because the channel partner's incentive is volume, not fit. CP leads still matter for reach in markets where trust runs through a known broker, but they should be tracked and reported separately from direct performance, never blended into one CPL number.",
  },
  {
    question: "What RERA constraints affect our creative?",
    answer:
      "RERA registration numbers must appear on every promotional creative in most states, possession dates can't be implied without the registered timeline, and pricing claims need to match the registered price list exactly. 'starting from' language is scrutinised. We build a creative approval checklist per state before the first ad goes live.",
  },
  {
    question: "How do I choose the best real estate marketing agency in Coimbatore?",
    answer:
      "Choose the agency that can show how it measures the full path from lead to site visit and booking, not only a low cost per lead. Ask whether it can run the Meta and Google campaigns, creative, tracking, and follow-up as one system; whether its pricing is clear; and whether it can explain what it does when lead quality drops. The right choice depends on your project, ticket size, sales process, and proof—not on a generic ranking claim.",
  },
];

export default function RealEstatePage() {
  return (
    <>
      <BreadcrumbSchema path="/who-we-help/real-estate" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQS)) }}
      />
      <PageHero
        eyebrow="WHO WE HELP / REAL ESTATE"
        title="Digital marketing for real estate in Coimbatore"
        subtitle="Based in Coimbatore and working with developers across Tamil Nadu and Karnataka: ₹40L-₹5Cr ticket sizes, 1-4 live projects, an in-house sales team of 2-15, and a CRM you don't fully trust yet."
      />

      <article className="mx-auto max-w-3xl px-6 py-16 flex flex-col gap-14">
        <section className="flex flex-col gap-4">
          <h2 className="text-h3 font-display font-bold">
            What does digital marketing for real estate actually involve?
          </h2>
          <p className="text-lg text-graphite">
            Four jobs, run as one system. Paid media that finds buyers, on{" "}
            <Link href="/what-we-do/facebook-ads-real-estate" className="text-signal hover:underline">
              Facebook and Instagram through Meta
            </Link>{" "}
            before they search and on{" "}
            <Link href="/what-we-do/google-ads-real-estate" className="text-signal hover:underline">
              Google Ads
            </Link>{" "}
            while they do. Creative at the volume those platforms need to keep learning.
            Tracking that tells them which leads became site visits. And{" "}
            <Link href="/what-we-do/follow-up-systems" className="text-signal hover:underline">
              follow-up fast enough
            </Link>{" "}
            that the lead is still interested when someone calls.
          </p>
          <p className="text-lg text-graphite">
            Most real estate marketing is bought one job at a time, from whoever sells that
            job, and reported on cost per lead because that is the only number each of them
            controls. The difference between that and{" "}
            <Link href="/what-we-do/performance-marketing" className="text-signal hover:underline">
              real estate lead generation measured in bookings
            </Link>{" "}
            is the rest of this page.
          </p>
          <p className="text-lg text-graphite">
            Marketing a project in Bangalore? The corridor-level detail is on our{" "}
            <Link href="/real-estate-marketing-agency-bangalore" className="text-signal hover:underline">
              Bengaluru real estate marketing
            </Link>{" "}
            page.
          </p>
        </section>

        <section>
          <h2 className="text-h3 font-display font-bold mb-4">
            Project launch vs. sustenance. Different campaigns, different math
          </h2>
          <p className="text-lg text-graphite">
            A launch campaign has a shelf life and real urgency. Early-bird pricing, limited
            phase-1 inventory, a genuine reason to move now. A sustenance campaign for a project
            in its second or third year doesn't have that, and creative that fakes urgency on a
            project that's been "launching soon" for 14 months damages trust with anyone who's
            seen your ads before. We run these as two different campaign structures with two
            different creative briefs, reported separately.
          </p>
        </section>

        <section>
          <h2 className="text-h3 font-display font-bold mb-4">
            Lead quality benchmarks by ticket size
          </h2>
          <p className="text-lg text-graphite mb-6">
            Ranges below are typical across the accounts we manage, not a promise for your
            market or your creative. Use them to sanity-check what an agency is telling you, not
            as a guarantee.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-mono border border-mist">
              <thead>
                <tr className="bg-paper-2 text-left">
                  <th className="p-3 border-b border-mist">Ticket size</th>
                  <th className="p-3 border-b border-mist">Typical CPL</th>
                  <th className="p-3 border-b border-mist">Lead → visit</th>
                  <th className="p-3 border-b border-mist">Visit → booking</th>
                </tr>
              </thead>
              <tbody>
                {BENCHMARKS.map((row) => (
                  <tr key={row.ticket}>
                    <td className="p-3 border-b border-mist">{row.ticket}</td>
                    <td className="p-3 border-b border-mist">{row.cpl}</td>
                    <td className="p-3 border-b border-mist">{row.l2v}</td>
                    <td className="p-3 border-b border-mist">{row.v2b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-h3 font-display font-bold mb-4">Site-visit economics</h2>
          <p className="text-lg text-graphite">
            A booked site visit that doesn't show up costs you the same media spend as one that
            does. The difference is entirely in follow-up discipline between booking and visit
            date. Automated WhatsApp reminders at 24 hours and 2 hours before a scheduled visit,
            plus a reschedule flow instead of a silent no-show, are the highest-leverage,
            lowest-cost fix available in this part of the funnel.
          </p>
        </section>

        {FAQS.map((f) => (
          <section key={f.question}>
            <h2 className="text-h3 font-display font-bold mb-4">{f.question}</h2>
            <p className="text-lg text-graphite">{f.answer}</p>
          </section>
        ))}
      </article>

      <div className="mx-auto max-w-3xl px-6 pb-16">
        <FurtherReading
          label="Written for builders"
          slugs={[
            "good-cost-per-lead-real-estate",
            "rera-approval-status-lead-quality",
            "channel-partner-vs-direct-leads",
            "portal-leads-vs-own-ads-real-estate",
            "pre-launch-marketing-real-estate",
          ]}
        />
        <SourceList keys={["reraAct", "tnrera", "reraKarnataka"]} className="mt-12" />
      </div>

      <CTABand />
    </>
  );
}
