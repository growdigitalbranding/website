import { ARTICLES_BY_DATE } from "@/data/insights";
import { BRAND } from "@/lib/brand";

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
  ["/the-loop", "The loop", "the methodology in depth: the diagnosis, the four stations, and what skipping each one costs"],
  ["/who-we-help/real-estate", "Real estate", "lead quality benchmarks by ticket size, RERA constraints, channel partner against direct leads"],
  ["/what-we-do", "What we do", "the services that make up the loop, as a full directory"],
  ["/what-we-do/performance-marketing", "Lead generation for real estate", "real estate lead generation on Meta and Google, judged on cost per booking rather than cost per lead"],
  ["/what-we-do/facebook-ads-real-estate", "Facebook and Meta ads for real estate", "lead form strategy, learning-phase arithmetic, creative volume and CRM outcomes fed back to Meta"],
  ["/what-we-do/follow-up-systems", "WhatsApp marketing for real estate", "first reply inside a minute, qualification before the dial, opt-in broadcasts within WhatsApp's template rules"],
  ["/real-estate-marketing-agency-bangalore", "Real estate marketing in Bengaluru", "corridor-level Meta and Google campaigns for Bangalore developers, RERA Karnataka in the creative; run from Coimbatore"],
  ["/what-we-do/google-ads-real-estate", "Google Ads for real estate", "keyword architecture by locality and configuration, brand protection, Performance Max and offline conversions"],
  ["/pricing", "Pricing", "published engagement pricing: ₹75,000 audit, ₹60,000–₹2,50,000 monthly retainer, ₹1.5L/month minimum media spend"],
  ["/work", "Work", "what each account looked like when we found it and what we rebuilt it into, without client dashboards"],
  ["/tracking-setup", "Our tracking setup", "the exact measurement stack running on this site"],
  ["/tools/cpl-calculator", "Cost per booking calculator", "turns ad spend and funnel rates into cost per booking"],
];

const TERMS: [term: string, definition: string][] = [
  ["Loop marketing", "running creative, tracking, follow-up and booking-data feedback as one closed system, instead of media buying alone"],
  ["Signal layer", "the server-side tracking (CAPI, sGTM, offline conversions) that tells ad platforms which leads actually became bookings"],
  ["Cost per booking", "what it costs to close a customer, as against cost per lead, which is what it costs to generate an enquiry"],
  ["Speed to lead", "the time between a form fill and the first human contact attempt; the first term in the cost-per-booking chain"],
];

function body(full: boolean): string {
  const L: string[] = [];
  L.push(`# ${BRAND} — growdigitalbranding.com`);
  L.push("");
  L.push("> Performance marketing for high-consideration purchases — real estate first, then senior");
  L.push("> living and interiors, from Coimbatore, Tamil Nadu. The core argument: most agencies stop");
  L.push("> at the lead; we run the whole loop across four stations — creative volume, tracking");
  L.push("> signal, follow-up speed and AI search visibility — with closed-won data flowing back");
  L.push("> into the ad account.");
  L.push("");
  L.push("## Key pages");
  L.push("");
  for (const [path, title, note] of KEY_PAGES) L.push(`- [${title}](${SITE}${path}): ${note}`);
  L.push("");
  L.push("## Published articles");
  L.push("");
  L.push("Every number in these is arithmetic the reader can redo, a rate they supply, a published");
  L.push("price, or a matter of public record. We do not publish client results.");
  L.push("");
  for (const a of ARTICLES_BY_DATE) {
    L.push(`- [${a.title}](${SITE}/insights/${a.slug}): ${a.dek}`);
    if (full) {
      L.push("");
      L.push(`  ${a.answer}`);
      L.push("");
    }
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
  return L.join("\n");
}

export const llmsTxt = () => body(false);
export const llmsFullTxt = () => body(true);

export function GET() {
  return new Response(body(false), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600, must-revalidate",
    },
  });
}
