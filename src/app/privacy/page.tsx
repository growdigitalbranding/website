import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { EMAIL, PHONE_DISPLAY, WHATSAPP_URL } from "@/lib/contact";
import { getGtmContainerId } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What growdigitalbranding collects when you send an enquiry, where it is stored, how long it is kept, and how to have it deleted.",
};

/**
 * Written to match what the site actually does, and revised when the lead
 * inbox was added: enquiries are now stored in a database and forwarded to an
 * automation tool, which the previous copy did not mention because neither
 * existed. It also claimed GA4, Meta CAPI, Google Ads and a cookie banner,
 * none of which are on the site. A policy that overstates collection is as
 * wrong as one that understates it.
 *
 * The analytics paragraph reads the live Tag Manager setting rather than being
 * hardcoded. Tracking can now be switched on from the dashboard without a
 * deploy, and a static "we do not run analytics" would quietly become a false
 * statement the moment someone did — in the document where being wrong matters
 * most. This way the page cannot disagree with the site.
 */

const UPDATED = "31 August 2026";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-h3 font-display font-bold text-ink">{title}</h2>
      {children}
    </section>
  );
}

export default async function PrivacyPage() {
  const gtm = await getGtmContainerId();

  return (
    <>
      <PageHero
        eyebrow="LEGAL"
        title="Privacy Policy"
        subtitle={`How we handle the information you send us. Last updated ${UPDATED}.`}
      />

      <article className="mx-auto max-w-3xl px-6 py-16 flex flex-col gap-12 text-graphite">
        <Section title="Who we are">
          <p>
            growdigitalbranding (&ldquo;Grow&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is a
            performance marketing agency based in Coimbatore, Tamil Nadu, India. This policy
            covers growdigitalbranding.com. It does not cover the marketing accounts we
            operate for clients, where the client is the data fiduciary and their own policy
            applies.
          </p>
        </Section>

        <Section title="What we collect">
          <p>We collect two things, and only two.</p>
          <p>
            <strong className="text-ink">What you type into an enquiry form.</strong> Your
            name, your WhatsApp number, and the project name. Nothing on this site asks for
            anything else, and there are no hidden fields.
          </p>
          <p>
            <strong className="text-ink">Notes our team writes about your enquiry.</strong>{" "}
            When we follow up, whoever speaks to you records what was discussed and the stage
            your enquiry has reached, so the next person you speak to is not starting from
            nothing. These notes are attached to your enquiry and are covered by every right
            listed below.
          </p>
          {gtm ? (
            <p>
              <strong className="text-ink">Analytics and advertising data.</strong> We use
              Google Tag Manager to load measurement tools such as Google Analytics, the
              Meta Conversions API and Google Ads. These record how the site was reached and
              which pages were viewed, so we can tell which of our own marketing is working.
              Consent is set to denied by default, so these tools run without marketing or
              analytics cookies unless you allow them.
            </p>
          ) : (
            <p>
              We do not run analytics, advertising pixels or tracking cookies on this site.
              There is no Google Analytics, no Meta pixel and no tag manager, which is why
              you have not been asked to accept cookies. If that changes, this page changes
              with it.
            </p>
          )}
        </Section>

        <Section title="Why we collect it">
          <p>
            To reply to you, and to run the conversation that follows. That is the whole
            purpose. Your consent is given by submitting the form, and you can withdraw it at
            any time by asking us to delete your enquiry.
          </p>
          <p>
            We do not sell your personal data. We do not share it with other clients, add you
            to a marketing list, or upload it to any advertising platform as an audience.
          </p>
        </Section>

        <Section title="Where it is stored, and who else can see it">
          <p>
            Enquiries are stored in a PostgreSQL database hosted by{" "}
            <strong className="text-ink">Supabase</strong>, and are also forwarded to{" "}
            <strong className="text-ink">Make</strong>, the automation tool that alerts our
            team so we can reply quickly. Both act as processors on our instructions and are
            bound by their own data processing terms. Depending on the hosting region, your
            data may be processed on servers outside India.
          </p>
          {gtm && (
            <p>
              Measurement data is additionally processed by Google and Meta under their own
              data processing terms, on servers outside India. It is not linked to your
              enquiry record.
            </p>
          )}
          <p>
            Inside Grow, access is restricted to team members who need it to respond to you.
            Every account is individually authenticated, and the record shows who changed
            what. Nobody outside the company can read it.
          </p>
        </Section>

        <Section title="How long we keep it">
          <p>
            Enquiries and their follow-up notes are kept for{" "}
            <strong className="text-ink">24 months</strong> from your last contact with us,
            then deleted. If you become a client, the engagement is governed by the retention
            terms in your signed service agreement instead.
          </p>
          <p>You can ask us to delete it sooner, at any point, and we will.</p>
        </Section>

        <Section title="Your rights">
          <p>
            Under India&rsquo;s Digital Personal Data Protection Act, 2023, you can ask us to:
          </p>
          <ul className="flex flex-col gap-2 pl-5 list-disc marker:text-signal">
            <li>tell you what personal data we hold about you and who it has been shared with;</li>
            <li>correct anything that is inaccurate, incomplete or out of date;</li>
            <li>delete it, where we are no longer required to keep it;</li>
            <li>nominate someone to exercise these rights on your behalf if you cannot.</li>
          </ul>
          <p>
            Ask by WhatsApp or email using the details below. We will respond within 30 days,
            usually much sooner, and we will not charge you for it.
          </p>
        </Section>

        <Section title="Getting in touch, and complaints">
          <p>
            For any question about this policy, or to exercise any of the rights above,
            contact us:
          </p>
          <ul className="flex flex-col gap-2">
            <li>
              Email:{" "}
              <a href={`mailto:${EMAIL}`} className="text-signal hover:underline">
                {EMAIL}
              </a>
            </li>
            <li>
              WhatsApp:{" "}
              <a
                href={WHATSAPP_URL}
                className="text-signal hover:underline"
                rel="noopener noreferrer"
              >
                {PHONE_DISPLAY}
              </a>
            </li>
          </ul>
          <p>
            If you are not satisfied with how we have handled your request, you may complain
            to the Data Protection Board of India.
          </p>
        </Section>

        <Section title="Changes to this policy">
          <p>
            If we change what we collect or who processes it, we will update this page and
            the date at the top. Material changes to how we use enquiry data will not be
            applied retroactively to enquiries already submitted.
          </p>
          <p>
            See also our{" "}
            <Link href="/terms" className="text-signal hover:underline">
              Terms of Service
            </Link>
            .
          </p>
        </Section>

        <p className="text-sm border-t border-mist pt-8">
          This policy describes our actual practices accurately, but it has not been reviewed
          by a lawyer. Have counsel check it before launch, particularly the retention period
          and the hosting region.
        </p>
      </article>
    </>
  );
}
