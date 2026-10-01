import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { ServiceTemplate } from "@/components/ServiceTemplate";

export const metadata: Metadata = pageMeta({
  path: "/what-we-do/ai-search-visibility",
  title: "AI search visibility for real estate brands",
  description:
    "Entity consistency, structured data and citable content, so the assistants your buyers ask before they ask Google can find and quote you.",
});

export default function Page() {
  return (
    <>
      <BreadcrumbSchema path="/what-we-do/ai-search-visibility" />
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
        objection={{
          question:
            "How do you even measure this? There's no 'AI rank tracker' that means anything yet.",
          answer:
            "We track it the way you'd expect an operator to: direct prompts against major assistants on your target queries, tracked monthly, plus referral traffic tagged from assistant citations where it's detectable. It's directional, not a vanity metric, and we say so.",
        }}
        answer="Three things decide whether an assistant can cite you: whether a crawler can read the page without JavaScript, whether your company resolves to one consistent entity, and whether you have published something specific enough to quote. The practical work is ordinary technical SEO plus clear answer blocks, visible sources, named expertise, original data and independent mentions; no AI engine can honestly be promised a citation on a fixed timetable."
        sources={["googleAiFeatures", "googleCrawlers", "llmsTxt"]}
        reading={["get-cited-by-ai-assistants", "good-cost-per-lead-real-estate"]}
      />
    </>
  );
}
