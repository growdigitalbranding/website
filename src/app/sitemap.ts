import { execFileSync } from "node:child_process";
import type { MetadataRoute } from "next";

/**
 * Route, plus the source file whose history stands in for "when did this page
 * last change". The homepage's substance lives in its section components, not
 * in page.tsx, so it points at that directory instead.
 */
const ROUTES: [route: string, source: string][] = [
  ["/", "src/components/sections"],
  ["/the-loop", "src/app/the-loop/page.tsx"],
  ["/what-we-do", "src/app/what-we-do/page.tsx"],
  ["/what-we-do/performance-marketing", "src/app/what-we-do/performance-marketing/page.tsx"],
  ["/what-we-do/creative-engine", "src/app/what-we-do/creative-engine/page.tsx"],
  ["/what-we-do/tracking-attribution", "src/app/what-we-do/tracking-attribution/page.tsx"],
  ["/what-we-do/follow-up-systems", "src/app/what-we-do/follow-up-systems/page.tsx"],
  ["/what-we-do/ai-search-visibility", "src/app/what-we-do/ai-search-visibility/page.tsx"],
  ["/who-we-help", "src/app/who-we-help/page.tsx"],
  ["/who-we-help/real-estate", "src/app/who-we-help/real-estate/page.tsx"],
  ["/who-we-help/senior-living", "src/app/who-we-help/senior-living/page.tsx"],
  ["/who-we-help/interiors", "src/app/who-we-help/interiors/page.tsx"],
  ["/work", "src/app/work/page.tsx"],
  ["/pricing", "src/app/pricing/page.tsx"],
  ["/about", "src/app/about/page.tsx"],
  ["/insights", "src/app/insights/page.tsx"],
  ["/tools", "src/app/tools/page.tsx"],
  ["/tools/cpl-calculator", "src/app/tools/cpl-calculator/page.tsx"],
  ["/tools/tracking-health-check", "src/app/tools/tracking-health-check/page.tsx"],
  ["/tools/creative-fatigue-estimator", "src/app/tools/creative-fatigue-estimator/page.tsx"],
  ["/tracking-setup", "src/app/tracking-setup/page.tsx"],
  ["/contact", "src/app/contact/page.tsx"],
  ["/privacy", "src/app/privacy/page.tsx"],
  ["/terms", "src/app/terms/page.tsx"],
];

/**
 * Every URL used to carry `lastModified: new Date()`, so the whole sitemap
 * claimed each page had changed at build time. Google's guidance is explicit
 * that it stops trusting lastmod site-wide once it sees values that do not
 * match the page, which costs more than having no lastmod at all.
 *
 * The commit date of the page's own source is the one honest signal available
 * without a CMS. Where git is unreachable, as it may be on a host that builds
 * from an unpacked archive, lastModified is omitted rather than faked.
 */
function lastCommit(source: string): Date | undefined {
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cI", "--", source], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return out ? new Date(out) : undefined;
  } catch {
    return undefined;
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(([route, source]) => {
    const lastModified = lastCommit(source);
    return {
      url: `https://growdigitalbranding.com${route}`,
      ...(lastModified ? { lastModified } : {}),
    };
  });
}
