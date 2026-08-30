import type { Metadata } from "next";
import { ServiceTemplate } from "@/components/ServiceTemplate";

export const metadata: Metadata = {
  title: "AI Search Visibility",
  description: "Entity consistency and citable content for the assistants your buyers now ask.",
};

export default function Page() {
  return (
    <ServiceTemplate
      eyebrow="WHAT WE DO / 04"
      title="Discovery is moving into assistants, not search boxes"
      subtitle="Buyers researching a high-ticket purchase increasingly ask an assistant before Google. This is how you get named in the answer."
      whoFor={[
        "Builders whose brand entity is inconsistent across Google Business Profile, directories, and their own site",
        "Anyone with zero schema markup beyond the Next.js defaults",
        "Teams publishing no original data or benchmarks anywhere",
      ]}
      included={[
        "Entity and NAP consistency audit and fix across every source assistants cite",
        "Full schema coverage: Organization, Service, FAQPage, BreadcrumbList, Article",
        "A mention-footprint plan across review sites, forums, YouTube, and local directories",
        "Content rewritten to open with a direct, quotable answer",
      ]}
      tooling={["Schema.org JSON-LD", "Google Business Profile", "Google Search Console", "llms.txt"]}
      miniCase="A senior living operator had three different phone numbers listed across Google Business Profile, Justdial, and their own footer. Fixing entity consistency plus adding FAQPage schema got them cited in ChatGPT's answer for a category query inside eight weeks."
      objection={{
        question:
          "How do you even measure this? There's no 'AI rank tracker' that means anything yet.",
        answer:
          "We track it the way you'd expect an operator to: direct prompts against major assistants on your target queries, tracked monthly, plus referral traffic tagged from assistant citations where it's detectable. It's directional, not a vanity metric, and we say so.",
      }}
    />
  );
}
