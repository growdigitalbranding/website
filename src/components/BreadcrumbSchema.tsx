import { breadcrumbJsonLd } from "@/lib/schema/jsonld";

const SITE = "https://growdigitalbranding.com";

/**
 * Labels for the breadcrumb trail. A map rather than title-casing the slug,
 * because the slugs include acronyms that title-casing mangles: cpl-calculator
 * becomes "Cpl Calculator", ai-search-visibility becomes "Ai Search
 * Visibility".
 */
const LABELS: Record<string, string> = {
  "/what-we-do": "What we do",
  "/what-we-do/performance-marketing": "Real estate lead generation",
  "/what-we-do/facebook-ads-real-estate": "Facebook & Meta ads for real estate",
  "/what-we-do/google-ads-real-estate": "Google Ads for real estate",
  "/what-we-do/creative-engine": "Creative engine",
  "/what-we-do/tracking-attribution": "Tracking & attribution",
  "/what-we-do/follow-up-systems": "WhatsApp marketing for real estate",
  "/real-estate-marketing-agency-bangalore": "Bengaluru",
  "/what-we-do/ai-search-visibility": "AI search visibility",
  "/who-we-help": "Who we help",
  "/who-we-help/real-estate": "Real estate",
  "/who-we-help/senior-living": "Senior living",
  "/who-we-help/interiors": "Interiors",
  "/training": "Training",
  "/training/students": "For students",
  "/training/job-switchers": "For job switchers",
  "/training/business-owners": "For business owners",
  "/training/housewives": "For housewives and homemakers",
  "/training/careers-in-digital-marketing": "Careers guide",
  "/tools": "Tools",
  "/tools/cpl-calculator": "CPL calculator",
  "/tools/tracking-health-check": "Tracking health check",
  "/tools/creative-fatigue-estimator": "Creative fatigue estimator",
  // Depth-1 routes. A two-level trail (Home > Page) is still a trail: it is
  // what lets a SERP render the site path instead of a bare URL, and it is
  // the node that ties each page back to the WebSite entity.
  "/work": "Work",
  "/pricing": "Pricing",
  "/the-loop": "The loop",
  "/insights": "Insights",
  "/about": "About",
  "/contact": "Contact",
  "/tracking-setup": "Tracking setup",
};

/**
 * BreadcrumbList markup for a nested route. breadcrumbJsonLd had been written
 * and then never called, so the eleven two-level pages published no trail at
 * all: a crawler could not tell that /what-we-do/creative-engine sits under
 * /what-we-do, and the SERP showed a bare URL instead of the path.
 *
 * Renders nothing visible. The visible breadcrumb is the page's own eyebrow.
 */
export function BreadcrumbSchema({ path }: { path: string }) {
  const segments = path.split("/").filter(Boolean);
  const trail = [{ name: "Home", url: SITE }];

  for (let i = 0; i < segments.length; i++) {
    const sub = "/" + segments.slice(0, i + 1).join("/");
    trail.push({ name: LABELS[sub] ?? sub, url: SITE + sub });
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(trail)) }}
    />
  );
}
