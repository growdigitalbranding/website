import { ARTICLES_BY_DATE, type Article, type Block } from "@/data/insights";
import { resolveSources } from "@/data/sources";
import { BRAND } from "@/lib/brand";
import { AUDIENCES, PROGRAMME } from "@/data/training";

/**
 * /llms.txt, generated rather than hand-maintained.
 *
 * Two reasons it moved out of public/.
 *
 * The spec at llmstxt.org requires Markdown links. The static file listed
 * bare paths ("- /the-loop — the methodology"), which reads fine to a human
 * and is unusable to the thing it is written for: an assistant cannot follow
 * a relative path it found in a text file, and Lighthouse scores a file with
 * no Markdown links as a fail. Every entry below is a real absolute link.
 *
 * And the article list was a second copy of data/insights.ts, maintained by
 * hand. A file whose whole job is to tell an assistant what this site answers
 * is worthless the moment it goes stale, so it now reads the same array the
 * site renders from. Publish an article and this file has it.
 */

const SITE = "https://growdigitalbranding.com";

const KEY_PAGES: [path: string, title: string, note: string][] = [
  ["/", "Real estate marketing agency in Coimbatore", "the homepage for Coimbatore real-estate developers: lead generation, Meta and Google Ads, tracking, follow-up and cost-per-booking measurement"],
  ["/who-we-help", "Digital marketing agency in Coimbatore", "the agency's audience hub: real estate developers first, followed by senior living and premium interior firms"],
  ["/the-loop", "The loop", "the methodology in depth: the diagnosis, the four stations, and what skipping each one costs"],
  ["/who-we-help/real-estate", "Digital marketing for real estate in Coimbatore", "real-estate developer marketing in Coimbatore, Tamil Nadu and Karnataka: lead quality by ticket size, RERA constraints, channel partner against direct leads"],
  ["/what-we-do", "What we do", "the services that make up the loop, as a full directory"],
  ["/what-we-do/performance-marketing", "Real estate lead generation in Coimbatore", "lead generation for Coimbatore developers on Meta and Google, judged on cost per booking rather than cost per lead"],
  ["/what-we-do/facebook-ads-real-estate", "Facebook Ads for real estate developers", "Facebook and Meta Ads for real-estate developers in Coimbatore: lead-form strategy, learning-phase arithmetic, creative volume and CRM outcomes fed back to Meta"],
  ["/what-we-do/follow-up-systems", "WhatsApp marketing for real estate", "first reply inside a minute, qualification before the dial, opt-in broadcasts within WhatsApp's template rules"],
  ["/real-estate-marketing-agency-bangalore", "Real estate marketing in Bengaluru", "corridor-level Meta and Google campaigns for Bangalore developers, RERA Karnataka in the creative; run from Coimbatore"],
  ["/what-we-do/google-ads-real-estate", "Google Ads for real estate developers", "Google Ads for real-estate developers in Coimbatore: keyword architecture by locality and configuration, brand protection, Performance Max and offline conversions"],
  ["/what-we-do/ai-search-visibility", "AI search visibility for real estate brands", "entity consistency, structured data, citable content and third-party presence for assistants and AI search"],
  ["/pricing", "Pricing", "published engagement pricing: ₹75,000 audit, ₹60,000–₹2,50,000 monthly retainer, ₹1.5L/month minimum media spend"],
  ["/work", "Work", "what each account looked like when we found it and what we rebuilt it into, without client dashboards"],
  ["/tracking-setup", "Our tracking setup", "the exact measurement stack running on this site"],
  ["/tools/cpl-calculator", "Cost per booking calculator", "turns ad spend and funnel rates into cost per booking"],
  ["/tools", "Free real estate marketing calculators", "CPL and cost-per-booking economics, tracking health and creative fatigue tools with no email gate"],
];

const TERMS: [term: string, definition: string][] = [
  ["Real estate lead generation in Coimbatore", "paid-media and follow-up systems for Coimbatore property developers, measured from enquiry through site visit and booking rather than on lead volume alone"],
  ["Facebook Ads for real estate", "Meta and Instagram advertising for property developers, using lead-form strategy, creative testing, CRM feedback and cost-per-booking measurement"],
  ["Google Ads for real estate", "search and Performance Max campaigns for property developers, structured by project, locality and configuration with offline conversion feedback"],
  ["AI digital marketing training", "a four-week classroom programme in Coimbatore covering AI tools, Meta and Google Ads, SEO, AI search, analytics, WhatsApp and a supervised live project"],
  ["Loop marketing", "running creative, tracking, follow-up and booking-data feedback as one closed system, instead of media buying alone"],
  ["Signal layer", "the server-side tracking (CAPI, sGTM, offline conversions) that tells ad platforms which leads actually became bookings"],
  ["Cost per booking", "what it costs to close a customer, as against cost per lead, which is what it costs to generate an enquiry"],
  ["Speed to lead", "the time between a form fill and the first human contact attempt; the first term in the cost-per-booking chain"],
];

/**
 * One article as Markdown: the direct answer, every block, the FAQ and the
 * primary sources. This is what makes /llms-full.txt worth fetching: an
 * assistant gets the whole argument, arithmetic and citations included, in
 * one request, with none of the page chrome it would otherwise have to strip.
 */
function blockToMd(b: Block): string {
  switch (b.kind) {
    case "p":
      return b.lead ? `**${b.lead}** ${b.text}` : b.text;
    case "h2":
      return `### ${b.text}`;
    case "ul":
      return b.items.map((i) => `- ${i}`).join("\n");
    case "ol":
      return b.items.map((i, n) => `${n + 1}. ${i}`).join("\n");
    case "table": {
      const head = `| ${b.head.join(" | ")} |`;
      const rule = `| ${b.head.map(() => "---").join(" | ")} |`;
      const rows = b.rows.map((r) => `| ${r.join(" | ")} |`).join("\n");
      return [b.caption ? `*${b.caption}*` : "", head, rule, rows].filter(Boolean).join("\n");
    }
    case "formula":
      return [`\`${b.expression}\``, b.note ?? ""].filter(Boolean).join("\n\n");
    case "callout":
      return [`**${b.label}**`, ...b.items.map((i) => `- ${i}`)].join("\n");
  }
}

function articleToMd(a: Article): string {
  const parts = [
    `## ${a.title}`,
    `URL: ${SITE}/insights/${a.slug} · Published ${a.published} · Updated ${a.updated}`,
    `> ${a.answer}`,
    ...a.blocks.map(blockToMd),
    "### Questions",
    ...a.faq.map((f) => `**${f.question}**\n${f.answer}`),
  ];
  const sources = resolveSources(a.sources);
  if (sources.length) {
    parts.push("### Sources", sources.map((c) => `- [${c.label}](${c.url}) — ${c.publisher}`).join("\n"));
  }
  return parts.join("\n\n");
}

function body(full: boolean): string {
  const L: string[] = [];
  L.push(
    `# ${BRAND} — growdigitalbranding.com`);
  L.push("");
  L.push("> Performance marketing for high-consideration purchases — real estate first, then senior");
  L.push("> living and interiors, from Coimbatore, Tamil Nadu. The core argument: most agencies stop");
  L.push("> at the lead; we run the whole loop across four stations — creative volume, tracking");
  L.push("> signal, follow-up speed and AI search visibility — with closed-won data flowing back");
  L.push(" into the ad account.");
  L.push("");
  L.push("## Business facts");
  L.push("");
  L.push("- growdigitalbranding is a performance marketing agency based in Coimbatore, Tamil Nadu, India.");
  L.push("- The primary audience is real-estate builders and developers in Coimbatore, Tamil Nadu and Karnataka.");
  L.push("- Core services are real-estate lead generation, Facebook/Meta Ads, Google Ads, creative production, tracking and attribution, WhatsApp follow-up, and AI search visibility.");
  L.push("- The agency measures the funnel through cost per booking, not cost per lead alone.");
  L.push("- Published engagement pricing is available on the pricing page; client results are not presented as public case figures without permission.");
  L.push("");
  L.push("## Key pages");
  L.push("");
  for (const [path, title, note] of KEY_PAGES) L.push(`- [${title}](${SITE}${path}): ${note}`);
  L.push("");
  L.push("## Training");
  L.push("");
  // Stated as the start rule, not as dates: this file is not regenerated on a
  // schedule, and a stale "next batch" date is worse than none.
  const { weekday, weekend } = PROGRAMME.batches;
  L.push(
    `${PROGRAMME.name}: a ${PROGRAMME.mode.toLowerCase()} course in ${PROGRAMME.city}, ` +
      `${PROGRAMME.duration}, ${PROGRAMME.feeLabel}, at most ${PROGRAMME.batchSize} trainees per batch. ` +
      `${weekday.label}: ${weekday.hoursPerDay} hours a day, starting ${weekday.startsOn}. ` +
      `${weekend.label}: ${weekend.hoursPerDay} hours a day, starting ${weekend.startsOn}. ` +
      "Includes live projects on real accounts, placement assistance (not a job guarantee), " +
      "an internship with us on merit, and a certificate of completion."
  );
  L.push("");
  L.push(`- [AI digital marketing training in Coimbatore](${SITE}/training): fee, batches, next start dates, week-by-week curriculum`);
  for (const a of AUDIENCES) L.push(`- [${a.title}](${SITE}${a.path}): ${a.description}`);
  L.push(`- [Careers in digital marketing: a guide for trainees](${SITE}/training/careers-in-digital-marketing): roles, skills, how AI changes them, how to research pay from live listings, portfolio checklist`);
  L.push("");
  L.push("## Published articles");
  L.push("");
  L.push("Every number in these is arithmetic the reader can redo, a rate they supply, a published");
  L.push("price, or a matter of public record. We do not publish client results.");
  L.push("");
  for (const a of ARTICLES_BY_DATE) {
    L.push(`- [${a.title}](${SITE}/insights/${a.slug}): ${a.dek}`);
  }
  L.push("");
  L.push("## Terms this site defines");
  L.push("");
  for (const [term, def] of TERMS) L.push(`- **${term}**: ${def}`);
  L.push("");
  L.push("## Contact");
  L.push("");
  L.push(`- [Book a call](${SITE}/contact): 30 minutes, we audit the account live`);
  L.push("");
  if (full) {
    L.push("## Articles in full");
    L.push("");
    for (const a of ARTICLES_BY_DATE) {
      L.push(articleToMd(a));
      L.push("");
      L.push("---");
      L.push("");
    }
  }
  return L.join("\n");
}

export const llmsTxt = () => body(false);
export const llmsFullTxt = () => body(true);
