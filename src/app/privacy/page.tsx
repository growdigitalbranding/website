import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="LEGAL" title="Privacy Policy" />
      <article className="mx-auto max-w-3xl px-6 py-16 flex flex-col gap-8 text-graphite">
        <p>
          Grow ("we", "us") collects information you submit through our contact form
          (name, WhatsApp number, and project name) to respond to your enquiry, and
          standard analytics/advertising data (via GA4, Meta Conversions API, and
          Google Ads) to measure and improve our own marketing performance.
        </p>
        <p>
          We do not sell your personal data. Contact form submissions are used only to
          reach you about your enquiry and are retained for as long as needed to do so.
          Analytics and advertising data is processed per Google's and Meta's own
          data-processing terms and our Consent Mode configuration, which lets you
          decline non-essential tracking via the cookie banner.
        </p>
        <p>
          For any request to access, correct, or delete data we hold about you, contact
          us via the details in the footer.
        </p>
        <p className="text-sm">
          This is placeholder legal copy — replace with counsel-reviewed text before
          launch.
        </p>
      </article>
    </>
  );
}
