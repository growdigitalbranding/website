import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { PageHero, CTABand } from "@/components/PageHero";

export const metadata: Metadata = pageMeta({
  path: "/tracking-setup",
  title: "Our Tracking Setup",
  description:
    "A plain-language writeup of exactly what's running under this site. The credibility artefact.",
});

const ITEMS = [
  { name: "Server-side GTM", detail: "Runs on its own subdomain with a proper cookie lifespan, ahead of the browser container." },
  { name: "Meta Conversions API", detail: "Deduplicated against the browser pixel via a shared event_id, with fbclid captured and stored." },
  { name: "GA4", detail: "Wired through sGTM with a clean event taxonomy. Not 40 auto-events nobody reads." },
  { name: "Google Enhanced Conversions", detail: "Wired for the Book-a-call action." },
  { name: "Offline conversion upload", detail: "Deal stages pushed back to Meta and Google on a weekly cron: call_booked → call_held → proposal → won." },
  { name: "Consent Mode v2", detail: "Implemented properly, with a banner that isn't hostile about it." },
];

export default function TrackingSetupPage() {
  return (
    <>
      <PageHero
        eyebrow="TRACKING SETUP"
        title="If you open devtools on this page, this is what you'll find."
        subtitle="Our tracking setup is a sales asset, not a backroom detail. Here it is, in plain language."
      />
      <div className="mx-auto max-w-3xl px-6 pb-16 flex flex-col gap-6">
        {ITEMS.map((item) => (
          <div key={item.name} className="border-t border-mist pt-6">
            <h2 className="text-h3 font-display font-bold mb-2">{item.name}</h2>
            <p className="text-graphite">{item.detail}</p>
          </div>
        ))}
      </div>
      <CTABand />
    </>
  );
}
