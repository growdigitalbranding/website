import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { ServiceTemplate } from "@/components/ServiceTemplate";

export const metadata: Metadata = pageMeta({
  path: "/what-we-do/performance-marketing",
  title: "Meta and Google Ads for real estate developers",
  description:
    "Meta and Google campaign architecture for real estate, built to stop your ad sets competing with each other and priced against cost per booking.",
});

export default function Page() {
  return (
    <>
      <BreadcrumbSchema path="/what-we-do/performance-marketing" />
      <ServiceTemplate
        eyebrow="WHAT WE DO / 00"
        title="Campaign architecture that stops competing with itself"
        subtitle="Advantage+ and PMax do the structural buying work now. The value is in structure, budget discipline, and not letting three ad sets bid against each other for the same buyer."
        whoFor={[
          "Builders running 1-4 live projects on Meta and Google",
          "Teams whose account has grown into 6+ overlapping campaigns with no one auditing structure",
          "Anyone whose CPL keeps rising despite fresh creative",
        ]}
        included={[
          "A campaign architecture audit. Structure, budget allocation, audience overlap",
          "Consolidation into a clean tier structure sized to your actual budget",
          "Bid strategy and budget pacing tuned to your sales cycle length, not platform defaults",
          "Weekly account monitoring, not a monthly check-in",
        ]}
        tooling={["Meta Ads Manager", "Google Ads", "Meta Advantage+", "Performance Max", "Looker Studio"]}
        miniCase="A Bengaluru villa account was running four overlapping ad sets against the same 2km radius, each competing in the same auction. Consolidating into one 3-tier structure with weekly refresh cut CPL from ₹3,400 to ₹1,180 in six weeks, without a rupee of extra spend."
        objection={{
          question: "Isn't Advantage+ supposed to do all this automatically?",
          answer:
            "Advantage+ optimises within the account structure and creative you give it. If the structure is fighting itself or the creative pool is thin, automation just finds the least-bad answer inside a bad setup, fast. Structure and creative are still your job.",
        }}
        answer="We buy Meta and Google media against cost per booking, not cost per lead. Cost per booking is cost per lead divided by the product of the five rates after the lead, so a \u20b91,500 lead converting at 0.69% to booking costs \u20b92,16,450 a booking. That is the number on the weekly report, and it is the one that moves when the structure stops competing with itself."
        reading={["good-cost-per-lead-real-estate", "channel-partner-vs-direct-leads"]}
      />
    </>
  );
}
