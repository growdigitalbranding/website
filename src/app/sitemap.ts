import type { MetadataRoute } from "next";

const ROUTES = [
  "/",
  "/the-loop",
  "/what-we-do",
  "/what-we-do/performance-marketing",
  "/what-we-do/creative-engine",
  "/what-we-do/tracking-attribution",
  "/what-we-do/follow-up-systems",
  "/what-we-do/ai-search-visibility",
  "/who-we-help",
  "/who-we-help/real-estate",
  "/who-we-help/senior-living",
  "/who-we-help/interiors",
  "/work",
  "/pricing",
  "/about",
  "/insights",
  "/tools",
  "/tools/cpl-calculator",
  "/tools/tracking-health-check",
  "/tools/creative-fatigue-estimator",
  "/tracking-setup",
  "/contact",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `https://growdigitalbranding.com${route}`,
    lastModified: new Date(),
  }));
}
