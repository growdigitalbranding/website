import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { ServiceTemplate } from "@/components/ServiceTemplate";

/**
 * Owns "google ads for real estate".
 *
 * Separate from the Meta page because the two searches want different
 * answers: Meta is an audience and creative problem, Google is a keyword and
 * intent problem, and one page trying to be both ranks for neither.
 *
 * No CPC or CPL benchmarks. They vary by city, locality and month, and a
 * number this site cannot verify would break the rule every other page keeps.
 * Where a number helps, it is arithmetic on the reader's own inputs.
 */

export const metadata: Metadata = pageMeta({
  path: "/what-we-do/google-ads-real-estate",
  title: "Google Ads for real estate developers",
  description:
    "Google Ads for real estate developers in Coimbatore: keywords by locality and configuration, brand protection, Performance Max done safely, and offline conversions.",
});

export default function Page() {
  return (
    <>
      <BreadcrumbSchema path="/what-we-do/google-ads-real-estate" />
      <ServiceTemplate
        eyebrow="WHAT WE DO / GOOGLE"
        title="Google Ads for real estate developers in Coimbatore"
        subtitle="Search reaches a Coimbatore property buyer at the moment they are looking. That makes the intent higher than anywhere else, the volume smaller, and the keyword list the whole game."
        answer="Google Ads reaches a property buyer while they are searching: for a locality, a configuration, a project or a developer. The intent is higher than on Meta and the volume is capped by how many people actually search, so the keyword architecture decides almost everything. We run Google Ads for real estate developers search-first, add Performance Max only once the account is feeding it qualified outcomes, and measure every campaign in cost per booking."
        sections={[
          {
            heading: "Which searches should a real estate developer bid on?",
            body: [
              "Four groups, in the order they usually pay back. Your own project and developer names first, because competitors and channel partners will bid on them if you do not. Then locality and configuration together, such as a 3 BHK in Saravanampatti or plots in Vadavalli, which is a buyer who has already narrowed the decision. Then category and city, such as villas in Coimbatore, which is wider and costlier. Broad terms like real estate or property on their own come last, if at all.",
              "The negative keyword list saves more money than the positive one. Rent, PG, resale, jobs, loans and interior design all ride along on property searches and none of them is your buyer. A weekly search-terms review is where most of the waste in a real estate account is found and removed.",
            ],
          },
          {
            heading: "Should real estate campaigns use Performance Max?",
            body: [
              "Not first. Performance Max optimises toward the conversion you give it across all of Google's inventory, and when that conversion is a form submission it gets very good at finding cheap form submissions on placements where nobody was looking for a home. Fed with offline conversions, meaning qualified leads and site visits imported back from the CRM, it can find buyers. So the order is search first, tracking and offline import second, Performance Max third, with your brand terms excluded so it does not quietly take credit for searches you would have won anyway.",
            ],
          },
          {
            heading: "Lead form assets or a landing page?",
            body: [
              "The same trade as on Meta. A lead form asset captures the enquiry without the buyer leaving Google, which lowers friction and intent together. A landing page filters harder and converts a searcher who wanted detail, provided it loads fast on a phone and reports the conversion server-side. We test both on cost per booking rather than choosing on cost per lead.",
            ],
          },
          {
            heading: "How do you target buyers who do not live in the city?",
            body: [
              "Through a location setting most accounts never look at. Google distinguishes between people physically in or regularly in a location and people who have shown interest in it, and its default reaches both. For a project that sells to buyers relocating, investing from another city or buying from abroad, that default is doing useful work and should be left on deliberately. For a project that sells almost entirely locally, switching to presence only keeps the budget where the buyers are.",
            ],
          },
          {
            heading: "How does Google learn which leads actually booked?",
            body: [
              "By being told. Offline conversion import sends CRM stages back against the click identifier captured at the first visit, and Enhanced Conversions for leads matches enquiries using the hashed details the buyer already typed into the form, which recovers conversions a blocked cookie would lose. Until one of those is in place, smart bidding is optimising toward form fills, and the account will get cheaper per lead without getting cheaper per booking.",
            ],
          },
        ]}
        whoFor={[
          "Developers with a project name or locality that buyers are already searching for",
          "Accounts where Performance Max took over the budget and lead quality fell",
          "Teams paying for clicks on rent, PG or resale searches without knowing it",
        ]}
        included={[
          "Keyword architecture across brand, locality and configuration, developer, and category-and-city",
          "A weekly search-terms review and a maintained negative keyword list",
          "Brand protection for your project and developer names",
          "Offline conversion import and Enhanced Conversions for leads",
          "Performance Max only after the account is feeding it qualified outcomes",
          "Landing pages written for the search that sent the visitor, tracked server-side",
        ]}
        tooling={[
          "Google Ads",
          "Search campaigns",
          "Performance Max",
          "Enhanced Conversions for leads",
          "Offline conversion import",
          "Server-side GTM",
          "Looker Studio",
        ]}
        objection={{
          question: "Isn't Google Ads too expensive for real estate?",
          answer:
            "Per click, often. Per booking, not necessarily. A search for a configuration in a named locality comes from a buyer who has already done the narrowing Meta has to do with creative. Whether that works out cheaper per booking depends on your site-visit and booking rates, which is why we measure both channels on that number rather than on cost per click or cost per lead.",
        }}
        faqs={[
          {
            question: "How much should a real estate developer spend on Google Ads?",
            answer:
              "Search spend is capped by demand in a way Meta spend is not: you can only buy the searches that happen. So the budget comes out of the keyword plan, estimated clicks multiplied by expected cost per click, rather than the other way round. A small project in a single locality may genuinely not be able to spend much on search, and that is a finding, not a failure.",
          },
          {
            question: "Should we bid on competitor project names?",
            answer:
              "You can use them as keywords; a trademark owner can file a complaint that restricts their name in your ad text, so the ad itself should stand on your own project. Whether it is worth it is arithmetic: those searchers are real buyers, and they convert at whatever rate your project wins against the one they searched for.",
          },
        ]}
        links={[
          {
            href: "/what-we-do/facebook-ads-real-estate",
            label: "Facebook and Meta ads for real estate",
            note: "The other half: buyers reached before they search, at volume, with creative doing the selecting.",
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
        sources={["googleEcLeads", "googleOci", "googleBrandExclusions", "googleLocationOptions", "googleTrademarks"]}
        reading={["good-cost-per-lead-real-estate", "channel-partner-vs-direct-leads", "speed-to-lead-real-estate"]}
      />
    </>
  );
}
