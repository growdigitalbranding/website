import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { ServiceTemplate } from "@/components/ServiceTemplate";

/**
 * Owns "whatsapp marketing for real estate".
 *
 * The most crowded theme in the gap analysis outside the core keywords: four
 * competing agencies and four WhatsApp software vendors each have a page on
 * it. This page already held the substance under a speed-to-lead framing, so
 * it is retitled and expanded rather than duplicated on a new URL.
 *
 * The platform rules stated here (opt-in, the 24-hour customer service window,
 * pre-approved templates, quality rating) are WhatsApp Business Platform
 * policy. No pricing is quoted, because Meta changes it.
 */
export const metadata: Metadata = pageMeta({
  path: "/what-we-do/follow-up-systems",
  title: "WhatsApp marketing for real estate builders",
  description:
    "WhatsApp marketing for real estate builders: automated first reply inside a minute, qualification before the dial, opt-in broadcasts, outcomes fed to your ads.",
});

export default function Page() {
  return (
    <>
      <BreadcrumbSchema path="/what-we-do/follow-up-systems" />
      <ServiceTemplate
        eyebrow="WHAT WE DO / 03"
        title="The lead is the start, not the deliverable"
        heroTitle="WhatsApp marketing and follow-up for real estate builders"
        subtitle="A lead not called back inside 60 seconds converts at a fraction of one that is. This is the system that keeps that from happening."
        whoFor={[
          "In-house sales teams of 2-15 with no follow-up SLA",
          "Anyone whose CRM has no automated acknowledgement step",
          "Builders who can't tell you their speed-to-lead number today",
        ]}
        included={[
          "Sub-60-second WhatsApp acknowledgement on every lead, automated",
          "A qualification flow that runs before a telecaller ever dials",
          "Disposition data written back to Meta/Google as a custom conversion",
          "A telecaller dashboard that flags anything uncalled past 5 minutes",
          "Opt-in capture and approved templates, so broadcasts never put the number's quality rating at risk",
          "Re-engagement flows for past enquirers who opted in, triggered by genuine news rather than a calendar",
        ]}
        tooling={["WhatsApp Business API", "n8n", "Your CRM's webhook layer", "Twilio (fallback SMS)"]}
        miniCase="A mid-rise apartment client was calling back leads in an average of 4 hours 20 minutes. After automated WhatsApp acknowledgement plus a pre-dial qualification flow, no-show site visits dropped by half without any change in media spend."
        objection={{
          question: "We already have telecallers. Why do we need automation on top?",
          answer:
            "Automation doesn't replace your telecallers, it protects the window before they can act. A WhatsApp acknowledgement inside 60 seconds keeps the lead warm for the 20-40 minutes it realistically takes a human to get to the phone.",
        }}
        answer="WhatsApp marketing for real estate earns its keep in the first minutes after a lead arrives, not in broadcasts. First touch inside 60 seconds, automated, then a human dial within minutes. Contact rate sits first in the chain that produces cost per booking, so it multiplies every rate after it: moving it from 60% to 85% and changing nothing else cuts cost per booking 29%, with cost per lead untouched."
        sections={[
          {
            heading: "What does WhatsApp marketing for real estate actually mean?",
            body: [
              "Two different things that get sold under one name. The first is conversation: replying to a buyer who just enquired, or who tapped a click-to-WhatsApp ad, while they are still looking at your project. The second is broadcast: sending messages to a list of people who are not currently talking to you. They run under different platform rules, they cost differently, and they do very different amounts of good.",
              "Almost all the value for a developer is in the first. A buyer who enquired an hour ago and heard nothing has moved on to the next project on their shortlist. A buyer who got the price sheet, the registration number and a site-visit slot in the first minute is still on yours when your telecaller rings.",
            ],
          },
          {
            heading: "Why start on WhatsApp rather than with a phone call?",
            body: [
              "Because the two do different jobs and the order matters. A call needs the buyer to be free at the moment you ring; a message waits for them. A message can carry what a buyer wants first and a call cannot: the brochure, the price sheet, the location pin, the approval status. And it can go out in seconds, where the fastest human desk takes minutes.",
              "That speed is worth real money because contact rate sits first in the chain of rates that produces cost per booking, so it multiplies everything after it. Moving contact rate from 60% to 85% with nothing else changed cuts cost per booking by 29%. The WhatsApp reply does not replace the call. It keeps the lead warm until the call happens.",
            ],
          },
          {
            heading: "What are the WhatsApp rules a builder has to work within?",
            body: [
              "Four, all set by WhatsApp's business platform rather than by us. A business needs the person's opt-in before messaging them. Inside 24 hours of the buyer's last message you can reply freely; outside that window, a business-initiated message has to use a template WhatsApp has approved in advance. Broadcasts are therefore template messages to opted-in contacts, not free-form blasts. And every business number carries a quality rating driven by how recipients respond: enough blocks and reports and the number's messaging is restricted.",
              "That last rule is why indiscriminate broadcasting is self-defeating. A list of old enquiries messaged without care produces blocks, the blocks lower the number's rating, and the number your leads depend on for the first-minute reply gets throttled.",
            ],
          },
          {
            heading: "What should the first automated message contain?",
            body: [
              "Whatever the buyer would otherwise have to ask for, in the order they would ask for it: the project's RERA registration number and approval stage, the price sheet or starting configuration, the location, and a way to book a site visit. A lead that receives the registration number in the first message arrives at the telecaller already filtered on the question that ends most deals late.",
              "It should also say plainly that a person will call and roughly when. The message is a holding pattern for the human, not a substitute for one.",
            ],
          },
          {
            heading: "How do you know whether it is working?",
            body: [
              "By measuring the human contact, not the message delivery. Delivered and read receipts tell you the automation fired; they do not tell you whether anyone spoke to the buyer. The numbers that matter are time to first human contact, contact rate on human contact, site-visit show-up rate, and, once they close, bookings fed back to the ad account so Meta and Google learn which leads were worth finding.",
            ],
          },
        ]}
        faqs={[
          {
            question: "Is WhatsApp marketing legal for real estate in India?",
            answer:
              "Messaging people who asked to hear from you is the normal use of the platform, and WhatsApp's own business rules require that opt-in. Promotional content about a project also carries the project's regulatory obligations, including the RERA registration number where the Act applies. This is marketing guidance, not legal advice; confirm the specifics for your project with counsel.",
          },
          {
            question: "Are broadcasts to old leads worth sending?",
            answer:
              "Sometimes, to people who opted in and enquired recently enough to remember you, with something genuinely new to say: a new tower, a price revision, possession news. As a weekly habit to everyone on file, no. The blocks cost you the number's quality rating, and that number is the one your first-minute reply depends on.",
          },
          {
            question: "Should we use click-to-WhatsApp ads instead of lead forms?",
            answer:
              "They are worth testing, particularly where buyers already expect to talk on WhatsApp and where your team can answer fast. The conversation starts immediately rather than with a form nobody calls back. Judge the test on cost per booking rather than cost per lead, because the two formats bring in buyers at different stages.",
          },
        ]}
        links={[
          {
            href: "/what-we-do/facebook-ads-real-estate",
            label: "Facebook and Meta ads for real estate",
            note: "Where click-to-WhatsApp ads live, and where the lead form strategy is decided.",
          },
          {
            href: "/what-we-do/performance-marketing",
            label: "Lead generation for real estate",
            note: "How every source, WhatsApp included, is judged on cost per booking.",
          },
          {
            href: "/what-we-do/tracking-attribution",
            label: "Server-side tracking and CAPI",
            note: "How bookings get back to the ad account once the conversation has done its job.",
          },
        ]}
        sources={["waOptIn", "waServiceWindow", "waTemplates", "waQuality", "waPolicy", "metaClickToWhatsApp"]}
        reading={["speed-to-lead-real-estate", "rera-approval-status-lead-quality", "why-meta-lead-ads-poor-quality"]}
      />
    </>
  );
}
