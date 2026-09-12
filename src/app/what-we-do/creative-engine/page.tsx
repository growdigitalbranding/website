import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { ServiceTemplate } from "@/components/ServiceTemplate";

export const metadata: Metadata = pageMeta({
  path: "/what-we-do/creative-engine",
  title: "Creative Engine",
  description:
    "Creative volume as a production system, not a monthly favour from a designer.",
});

export default function Page() {
  return (
    <>
      <BreadcrumbSchema path="/what-we-do/creative-engine" />
      <ServiceTemplate
        eyebrow="WHAT WE DO / 01"
        title="Creative volume as a production line"
        subtitle="With broad targeting, the ad is the targeting. A production system beats a single designer working from a brief once a month."
        whoFor={[
          "Accounts stuck on the same 2-3 creatives for over a month",
          "Builders whose only asset library is stock renders from the sales office",
          "Anyone whose frequency has crept past 2.8 without anyone noticing",
        ]}
        included={[
          "15-20 distinct creative angles produced every month",
          "Fatigue monitoring against a frequency 2.8 trigger, with a defined refresh SLA",
          "A shoot cadence. Real site footage, real units, not another rendered lobby",
          "Angle testing across format: static, carousel, short-form video",
        ]}
        tooling={["Meta Creative Hub", "Figma", "CapCut", "Frequency/reach dashboards in Ads Manager"]}
        miniCase="A plotted-development client had run the same 3 creatives for 11 weeks straight. Fresh angles across four buyer motivations. Investment, self-use, proximity, price-lock. Brought frequency back under 2.5 and CPL down 58% inside a month."
        objection={{
          question: "Why do we need 15-20 angles a month? Isn't that overkill?",
          answer:
            "Not every angle needs to be a full shoot. Most are recuts and re-copies of the same 3-4 raw assets, tested against different buyer motivations. Volume comes from variation, not from 20 separate production days.",
        }}
      />
    </>
  );
}
