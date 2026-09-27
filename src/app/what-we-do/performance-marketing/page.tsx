import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { ServiceTemplate } from "@/components/ServiceTemplate";

export const metadata: Metadata = pageMeta({
  path: "/what-we-do/performance-marketing",
  title: "Lead generation for real estate developers",
  description:
    "Real estate lead generation on Meta and Google Ads, measured in cost per booking, so a cheap lead that never books is counted as the loss it is.",
});

export default function Page() {
  return (
    <>
      <BreadcrumbSchema path="/what-we-do/performance-marketing" />
      <ServiceTemplate
        eyebrow="WHAT WE DO / 00"
        title="Campaign architecture that stops competing with itself"
        heroTitle="Lead generation for real estate, measured in bookings"
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
        answer="Lead generation for real estate is only worth paying for when the lead books. We buy Meta and Google media against cost per booking, not cost per lead. Cost per booking is cost per lead divided by the product of the five rates after the lead, so a \u20b91,500 lead converting at 0.69% to booking costs \u20b92,16,450 a booking. That is the number on the weekly report, and it is the one that moves when the structure stops competing with itself."
        sections={[
          {
            heading: "What is real estate lead generation actually buying?",
            body: [
              "A name, a number and a moment of interest, and nothing more. Whether that becomes a booking depends on five rates after the lead: contact, qualification, site visit, negotiation and booking. Most lead generation is priced and reported on the first number alone, which is why an account can get cheaper every month while bookings stay flat.",
              "So the question to ask of any real estate lead source is not what a lead costs but what a booking costs through it. A ₹600 lead that books at half the rate of a ₹1,200 lead is the same price per booking, and the cheaper one costs your sales team twice the calls to find out.",
            ],
          },
          {
            heading: "Where should real estate leads come from?",
            body: [
              "From more than one place, measured the same way. Meta finds buyers before they search and supplies volume. Google reaches them while they search and supplies intent. Channel partners bring reach through brokers a buyer already trusts, at a brokerage cost that has to be compared per booking rather than per lead. WhatsApp is less a source than the channel where the follow-up happens. None of them wins on every project; the split is decided by which delivers bookings cheapest, and it moves as the project moves from launch to sustenance.",
            ],
          },
        ]}
        links={[
          {
            href: "/what-we-do/facebook-ads-real-estate",
            label: "Facebook and Meta ads for real estate",
            note: "Volume before the buyer searches: form strategy, creative at volume, and CRM outcomes fed back to Meta.",
          },
          {
            href: "/what-we-do/google-ads-real-estate",
            label: "Google Ads for real estate",
            note: "Intent while the buyer searches: keyword architecture by locality, brand protection, offline conversions.",
          },
          {
            href: "/what-we-do/follow-up-systems",
            label: "Speed-to-lead and WhatsApp follow-up",
            note: "Where most of the value of a lead is won or lost, in the first minutes after it arrives.",
          },
        ]}
        reading={["good-cost-per-lead-real-estate", "channel-partner-vs-direct-leads", "rera-approval-status-lead-quality"]}
      />
    </>
  );
}
