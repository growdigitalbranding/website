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
  "/what-we-do/performance-marketing": "Performance marketing",
  "/what-we-do/creative-engine": "Creative engine",
  "/what-we-do/tracking-attribution": "Tracking & attribution",
  "/what-we-do/follow-up-systems": "Follow-up systems",
  "/what-we-do/ai-search-visibility": "AI search visibility",
  "/who-we-help": "Who we help",
  "/who-we-help/real-estate": "Real estate",
  "/who-we-help/senior-living": "Senior living",
  "/who-we-help/interiors": "Interiors",
  "/tools": "Tools",
  "/tools/cpl-calculator": "CPL calculator",
  "/tools/tracking-health-check": "Tracking health check",
  "/tools/creative-fatigue-estimator": "Creative fatigue estimator",
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
