import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { PageHero, CTABand } from "@/components/PageHero";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { DirectAnswer } from "@/components/DirectAnswer";
import { FurtherReading } from "@/components/FurtherReading";

export const metadata: Metadata = pageMeta({
  path: "/tracking-setup",
  title: "The tracking stack running on this site",
  description:
    "A plain-language writeup of exactly what runs under this site: the stack, the events, the consent defaults, and how to check each claim yourself in a browser.",
});

/**
 * Each item carries what it is and why it is there.
 *
 * The page previously ran six one-line details, 154 words in total, which is
 * thin for a page whose whole argument is "we will show you the work". The
 * `why` lines are the part a builder is actually evaluating: not that we run
 * a Conversions API, which every agency claims, but what breaks without one.
 * Nothing here describes a capability this site does not run.
 */
const ITEMS = [
  {
    name: "Server-side GTM",
    detail:
      "Runs on its own subdomain with a proper cookie lifespan, ahead of the browser container.",
    why:
      "A browser-set cookie on Safari expires in seven days, so a buyer who clicks an ad and returns a fortnight later arrives as a new person and the ad that found them gets no credit. Setting it server-side from your own subdomain is what makes the attribution window match the length of a real property decision rather than the length of a browser policy.",
  },
  {
    name: "Meta Conversions API",
    detail:
      "Deduplicated against the browser pixel via a shared event_id, with fbclid captured and stored.",
    why:
      "Without the shared event_id the same lead arrives twice and the account optimises against inflated conversion counts. Storing fbclid at the point of the click is what lets a booking reported three weeks later still be matched to the ad that produced it.",
  },
  {
    name: "GA4",
    detail:
      "Wired through sGTM with a clean event taxonomy. Not 40 auto-events nobody reads.",
    why:
      "Enhanced measurement will happily record every scroll and outbound click on the site. A report nobody opens is not measurement, and the noise makes the six events that matter harder to find.",
  },
  {
    name: "Google Enhanced Conversions",
    detail: "Wired for the Book-a-call action.",
    why:
      "It hands Google a hashed version of the details the visitor already typed into the form, so conversions that would otherwise go unattributed because of a blocked cookie still count.",
  },
  {
    name: "Offline conversion upload",
    detail:
      "Deal stages pushed back to Meta and Google on a weekly cron: call_booked → call_held → proposal → won.",
    why:
      "This is the station most accounts are missing and the one the whole loop turns on. Until closed-won data reaches the ad platform, the algorithm is optimising toward whoever fills in forms, because a form fill is the last thing it was told about. Feeding the outcome back is what moves an account from cheap leads to cheap bookings.",
  },
  {
    name: "Consent Mode v2",
    detail: "Implemented properly, with a banner that isn't hostile about it.",
    why:
      "Signals are region-scoped rather than denied globally: visitors in the EEA and UK get a banner and a genuine choice, everyone else is not asked for a consent their jurisdiction does not require. A blanket denied default is the common misconfiguration, and it silently throws away modelling for traffic that never needed a banner.",
  },
];

/** Claims on this page a reader can confirm without taking our word for it. */
const CHECKS = [
  "Open devtools, Network, and filter on the sGTM subdomain. The requests are there or they are not.",
  "View source and search for gtag('consent'. The default call and the region list are both in the page.",
  "Run our tracking health check against your own domain and compare what it finds to this list.",
  "Ask us to screen-share the offline upload job on a call. It is a cron, and it either has a run history or it does not.",
];

export default function TrackingSetupPage() {
  return (
    <>
      <BreadcrumbSchema path="/tracking-setup" />
      <PageHero
        eyebrow="TRACKING SETUP"
        title="If you open devtools on this page, this is what you'll find."
        subtitle="Our tracking setup is a sales asset, not a backroom detail. Here it is, in plain language."
      />

      <DirectAnswer>
        Six things: server-side GTM on its own subdomain, the Meta Conversions API
        deduplicated against the browser pixel, GA4 wired through sGTM with a deliberate
        event taxonomy, Google Enhanced Conversions on the booking action, a weekly
        offline conversion upload carrying deal stages back to both platforms, and
        region-scoped Consent Mode v2. It is the same stack we build for clients, and
        every claim on this page can be checked from your own browser.
      </DirectAnswer>

      <div className="mx-auto max-w-3xl px-6 pb-4 flex flex-col gap-10">
        {ITEMS.map((item) => (
          <div key={item.name} className="border-t border-mist pt-6 flex flex-col gap-3">
            <h2 className="text-h3 font-display font-bold">{item.name}</h2>
            <p className="text-ink">{item.detail}</p>
            <p className="text-graphite">{item.why}</p>
          </div>
        ))}

        <section className="surface rounded-card p-6 sm:p-8 flex flex-col gap-4">
          <h2 className="text-h3 font-display font-bold">How to check any of this yourself</h2>
          <p className="text-graphite">
            Everything above is a claim about software that is running while you read
            this, so none of it needs to be taken on trust.
          </p>
          <ul className="flex flex-col gap-3">
            {CHECKS.map((c) => (
              <li key={c} className="border-l-2 border-mist pl-4 text-graphite">
                {c}
              </li>
            ))}
          </ul>
        </section>

        <FurtherReading
          label="Why this stack is built this way"
          slugs={[
            "why-meta-lead-ads-poor-quality",
            "good-cost-per-lead-real-estate",
            "get-cited-by-ai-assistants",
          ]}
        />
      </div>

      <CTABand />
    </>
  );
}
