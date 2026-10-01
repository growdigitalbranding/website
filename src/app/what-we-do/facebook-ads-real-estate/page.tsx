import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { ServiceTemplate } from "@/components/ServiceTemplate";

/**
 * Owns "facebook ads for real estate" and "meta ads for real estate".
 *
 * One page for both on purpose: they are the same product and the same
 * search intent, and two pages would split the signal between them. The
 * title and H1 carry both names because buyers use both.
 *
 * Every figure here is either Meta's published learning-phase guidance or
 * arithmetic on a rate the reader supplies. No account results are quoted:
 * there is no verified case to cite yet, so miniCase is left out rather than
 * filled.
 */

export const metadata: Metadata = pageMeta({
  path: "/what-we-do/facebook-ads-real-estate",
  title: "Facebook Ads for real estate developers",
  description:
    "Facebook and Meta Ads for real estate developers in Coimbatore: lead-form strategy, CRM data fed back to Meta, creative at volume, and cost-per-booking measurement.",
});

export default function Page() {
  return (
    <>
      <BreadcrumbSchema path="/what-we-do/facebook-ads-real-estate" />
      <ServiceTemplate
        eyebrow="WHAT WE DO / META"
        title="Facebook & Meta ads for real estate"
        heroTitle="Facebook Ads for real estate developers in Coimbatore"
        subtitle="Meta will find Coimbatore real-estate leads. The work is making it find you buyers: the right form, the right optimisation event, and the booking data it never sees unless you send it."
        answer="Facebook and Instagram ads, bought through Meta, reach a property buyer before they start searching, which is why they generate volume that Google cannot. The catch is that Meta optimises toward whoever completes the event you give it, and if that event is a form fill, it gets very good at finding people who fill in forms. We run Meta ads for real estate developers against cost per booking instead: server-side conversion data, CRM outcomes fed back into the ad account, and enough creative that the algorithm has something to learn from."
        sections={[
          {
            heading: "Why do Facebook ads for real estate produce so many poor-quality leads?",
            body: [
              "Because the platform is doing exactly what it was asked. An Instant Form prefilled from the user's profile can be submitted in two taps, so optimising for leads rewards the audience most willing to tap, not the audience most able to buy. Cheap cost per lead and a sales team calling it junk are the same result seen from two ends.",
              "There are three levers, in increasing order of effect. The Higher Intent form type adds a review screen before submission, which costs volume and removes accidental submissions. Qualifying questions on the form filter by budget, configuration and timeline before the lead reaches a telecaller. And feeding CRM stages back to Meta, so it learns which leads became site visits, changes what the algorithm is looking for rather than just what it lets through.",
            ],
          },
          {
            heading: "Instant forms, a landing page, or click-to-WhatsApp?",
            body: [
              "Each trades volume for intent differently. Instant forms carry the least friction and the least intent. A landing page asks the buyer to leave Facebook, which filters harder, but only pays off if the page loads fast and the conversion is tracked server-side, or Meta cannot see what happened. Click-to-WhatsApp ads start a conversation instead of a form, which suits a market where buyers already expect to talk on WhatsApp and where speed to first contact decides the contact rate.",
              "The right answer differs by project, and it cannot be read off cost per lead: the cheapest format is very often the most expensive per booking. We test formats against each other on cost per booking and keep whichever wins on that number.",
            ],
          },
          {
            heading: "What should a real estate campaign on Meta optimise for?",
            body: [
              "The deepest event that still has enough volume. Meta's published guidance is roughly 50 optimisation events per ad set in a seven-day window to exit the learning phase, and that one number decides most of the structure. A project producing 15 site visits a week cannot optimise an ad set directly for site visits; it can optimise for leads while feeding site-visit outcomes back, or consolidate ad sets until one of them clears the threshold.",
              "The same arithmetic sets the floor on budget. At a cost per lead of ₹800, 50 leads a week is ₹40,000, or about ₹1.7L a month, for a single ad set optimising on leads. Put your own cost per lead into that sum before deciding how many ad sets the account can afford to run.",
            ],
          },
          {
            heading: "How much creative does a real estate account on Meta need?",
            body: [
              "More than most accounts run, and a calculable amount rather than a guess. Creative fatigues as frequency accrues against a finite audience, and the refresh rate falls out of your weekly impressions, audience size and how long a winning ad lasts. The worked example in our creative-volume article lands between 12 and 29 new creatives a month. Two or three a month is the most common reason a Meta account's cost per lead climbs with nothing else changing.",
            ],
          },
          {
            heading: "What has to be in a real estate ad on Meta?",
            body: [
              "The regulatory details, before anything else. The project's RERA registration number, possession timelines only as registered, and prices that match the registered price list. These are not optional extras on a real estate ad, and an ad that breaks them is a liability however well it performs. We build the approval checklist per state before the first ad goes live.",
            ],
          },
          {
            heading: "Do Facebook ads still work for real estate after browser privacy changes?",
            body: [
              "Yes, provided the measurement moved server-side with them. A browser pixel alone now misses a meaningful share of conversions, and a real estate decision that takes weeks outlasts browser cookie lifetimes. The Meta Conversions API, deduplicated against the pixel with a shared event_id and carrying the click identifier from the first visit, is what lets a booking reported weeks later still be credited to the ad that produced it.",
            ],
          },
        ]}
        whoFor={[
          "Developers already running Meta ads whose cost per lead looks fine and whose sales team says the leads are junk",
          "Projects launching in the next 90 days that need volume without buying the wrong volume",
          "Accounts running Instant Forms that have never sent a CRM outcome back to Meta",
        ]}
        included={[
          "An account, pixel and Conversions API audit before any spend changes",
          "Campaign structure consolidated to the event volume your project actually produces",
          "Lead form strategy: form type, qualifying questions, landing page or click-to-WhatsApp, tested on cost per booking",
          "Creative produced at the volume the account needs, through the Creative Engine",
          "CRM stages fed back to Meta so it optimises toward site visits, not form fills",
          "A weekly report in cost per booking, with cost per lead alongside it rather than instead of it",
        ]}
        tooling={[
          "Meta Ads Manager",
          "Meta Conversions API",
          "Advantage+ audience",
          "Instant Forms",
          "Click-to-WhatsApp ads",
          "Server-side GTM",
        ]}
        objection={{
          question: "Isn't Meta just cheaper than Google for real estate leads?",
          answer:
            "Often cheaper per lead, and that is exactly the trap. Meta finds people before they are searching, so its leads sit earlier in the decision than a buyer who typed a locality and configuration into Google, and they convert to site visits at a different rate. The comparison that matters is cost per booking on each channel, which is why we report them side by side rather than choosing between them on cost per lead.",
        }}
        faqs={[
          {
            question: "How long before Facebook ads for a new project show results?",
            answer:
              "Tracking and structure fixes show up in cost per lead within two to three weeks. Booking-level movement takes a full sales cycle, typically 30 to 60 days for the ticket sizes we work with. Anyone promising bookings from Meta in week one is measuring the wrong thing.",
          },
          {
            question: "Should we run Meta ads ourselves or use an agency?",
            answer:
              "Below roughly ₹1.5L a month in media spend, one competent in-house person or a freelancer running a single campaign is usually the better economics. Above it, the work splits into media buying, creative production and tracking, and paying for all three as one system is what the agency model is for. Our pricing is published so you can do that sum yourself.",
          },
        ]}
        links={[
          {
            href: "/what-we-do/google-ads-real-estate",
            label: "Google Ads for real estate",
            note: "The other half: buyers reached while they search, by locality and configuration.",
          },
          {
            href: "/what-we-do/performance-marketing",
            label: "Lead generation for real estate",
            note: "How the channels are split and judged against each other, per booking rather than per lead.",
          },
          {
            href: "/what-we-do/tracking-attribution",
            label: "Server-side tracking and CAPI",
            note: "The measurement layer that lets either platform learn which leads actually booked.",
          },
        ]}
        sources={["metaLearningPhase", "metaInstantFormTypes", "metaConversionLeads", "metaCapi", "metaDedup", "metaClickToWhatsApp"]}
        reading={["why-meta-lead-ads-poor-quality", "how-many-ad-creatives-real-estate", "speed-to-lead-real-estate"]}
      />
    </>
  );
}
