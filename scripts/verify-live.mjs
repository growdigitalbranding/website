#!/usr/bin/env node
/**
 * Post-deploy verification.
 *
 * Checks the DEPLOYED site for everything that has to survive a build, so
 * "did the deploy actually land" stops being a question answered by clicking
 * around. Run it right after a deploy, before npm run indexnow.
 *
 *   npm run verify
 *   npm run verify -- --base http://localhost:3000
 *
 * Exit code is 0 only when every check passes, so it can gate a deploy
 * script. It cannot check the GTM container diagnostics panel, which lives
 * behind a Google login; what it can do is prove the consent defaults the
 * panel is complaining about are actually region-scoped in the served HTML.
 */

import { argv, exit } from "node:process";

const args = argv.slice(2);
const baseFlag = args.indexOf("--base");
const BASE = (baseFlag !== -1 ? args[baseFlag + 1] : "https://growdigitalbranding.com").replace(/\/$/, "");

const INDEXNOW_KEY = "53c7b409475b8560ff641f37c1297377";
const EXPECTED_ARTICLES = [
  "good-cost-per-lead-real-estate",
  "rera-approval-status-lead-quality",
  "channel-partner-vs-direct-leads",
  "speed-to-lead-real-estate",
  "why-meta-lead-ads-poor-quality",
  "how-many-ad-creatives-real-estate",
  "get-cited-by-ai-assistants",
];

const results = [];
function record(name, ok, detail = "") {
  results.push({ name, ok, detail });
  console.log(`${ok ? "  ok  " : " FAIL "} ${name}${detail ? "  " + detail : ""}`);
}

async function get(path) {
  const res = await fetch(BASE + path, { headers: { "User-Agent": "verify-live" }, redirect: "follow" });
  return { status: res.status, type: res.headers.get("content-type") || "", body: await res.text() };
}

console.log(`Verifying ${BASE}\n`);

// --- is the server even running the code you pushed? ----------------------
// Checked first, because every other failure below is noise if the answer is
// no, and "I deployed and nothing changed" is nearly always this.
let localHead = null;
try {
  const { execFileSync } = await import("node:child_process");
  localHead = execFileSync("git", ["rev-parse", "HEAD"], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  }).trim();
} catch {
  // Not in a git checkout. Skip the comparison rather than fail on it.
}

try {
  const home = await get("/");
  const live = home.body.match(/<meta name="build-commit" content="([^"]+)"/)?.[1] ?? null;
  const builtAt = home.body.match(/<meta name="build-time" content="([^"]+)"/)?.[1] ?? null;

  if (!live) {
    record(
      "deployed build is identifiable",
      false,
      "no build-commit meta: the server is running a build from before this check existed, so it is definitely stale",
    );
  } else if (!localHead || live === "unknown") {
    record("deployed build", true, `live ${live.slice(0, 8)}${builtAt ? `, built ${builtAt}` : ""}`);
  } else {
    record(
      "server is running the commit you pushed",
      live === localHead,
      live === localHead
        ? `${live.slice(0, 8)}, built ${builtAt}`
        : `live ${live.slice(0, 8)} but local HEAD is ${localHead.slice(0, 8)}. Rebuild, then RESTART the node process: next start serves the build it loaded at boot.`,
    );
  }
} catch (err) {
  record("homepage reachable", false, err.message);
}

// --- sitemap ---------------------------------------------------------------
let sitemapUrls = [];
try {
  const s = await get("/sitemap.xml");
  record("sitemap 200", s.status === 200, `HTTP ${s.status}`);
  record("sitemap is application/xml", s.type.includes("xml"), s.type);
  sitemapUrls = [...s.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  record("sitemap lists 31 URLs", sitemapUrls.length === 31, `${sitemapUrls.length} found`);
  const lastmods = (s.body.match(/<lastmod>/g) || []).length;
  record(
    "sitemap carries lastmod",
    lastmods === sitemapUrls.length,
    lastmods === 0 ? "none: git was unavailable at build time" : `${lastmods}/${sitemapUrls.length}`,
  );
} catch (err) {
  record("sitemap reachable", false, err.message);
}

// --- robots and IndexNow ---------------------------------------------------
try {
  const r = await get("/robots.txt");
  record("robots.txt 200", r.status === 200, `HTTP ${r.status}`);
  record("robots declares the sitemap", r.body.includes("/sitemap.xml"));
  for (const bot of ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended", "Applebot-Extended"]) {
    record(`robots names ${bot}`, r.body.includes(bot));
  }
} catch (err) {
  record("robots.txt reachable", false, err.message);
}

try {
  const k = await get(`/${INDEXNOW_KEY}.txt`);
  record("IndexNow key file 200", k.status === 200, `HTTP ${k.status}`);
  record("IndexNow key file content matches", k.body.trim() === INDEXNOW_KEY);
} catch (err) {
  record("IndexNow key file reachable", false, err.message);
}

// --- assets ----------------------------------------------------------------
for (const a of ["/favicon.ico", "/icon.svg", "/apple-icon.png", "/logo.png", "/og.png", "/site.webmanifest", "/llms.txt"]) {
  try {
    const res = await get(a);
    record(`asset ${a}`, res.status === 200, `HTTP ${res.status}`);
  } catch (err) {
    record(`asset ${a}`, false, err.message);
  }
}

// --- every page: status, canonical, stale brand name -----------------------
let bad200 = [];
let badCanonical = [];
let staleBrand = [];
let consentChecked = false;

for (const url of sitemapUrls) {
  const path = url.replace(/^https?:\/\/[^/]+/, "") || "/";
  let page;
  try {
    page = await get(path);
  } catch (err) {
    bad200.push(`${path} (${err.message})`);
    continue;
  }
  if (page.status !== 200) bad200.push(`${path} -> ${page.status}`);

  const canonical = page.body.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  const want = url.replace(/\/$/, "") || url;
  if (!canonical || canonical.replace(/\/$/, "") !== want.replace(/\/$/, "")) {
    badCanonical.push(`${path} -> ${canonical ?? "missing"}`);
  }

  if (page.body.includes("Grow Digital Branding")) staleBrand.push(path);

  // Consent defaults only appear when a GTM container is configured.
  if (!consentChecked && path === "/") {
    consentChecked = true;
    const hasTagging = page.body.includes("gtag('consent', 'default'");
    if (!hasTagging) {
      record("consent mode", true, "skipped: no GTM container configured yet");
    } else {
      record("consent default is region-scoped", page.body.includes("region: CONSENT_REGIONS"));
      record("denied default present (EEA)", page.body.includes("ad_storage: 'denied'"));
      record("granted default present (elsewhere)", page.body.includes("ad_storage: 'granted'"));
    }
  }
}

record(`all ${sitemapUrls.length} sitemap URLs return 200`, bad200.length === 0, bad200.join(", "));
record("every page canonicalises to itself", badCanonical.length === 0, badCanonical.slice(0, 5).join(", "));
record("no stale brand spelling", staleBrand.length === 0, staleBrand.slice(0, 5).join(", "));

// --- articles and entity graph --------------------------------------------
const missingArticles = EXPECTED_ARTICLES.filter(
  (slug) => !sitemapUrls.some((u) => u.endsWith("/insights/" + slug)),
);
record("all 7 articles in the sitemap", missingArticles.length === 0, missingArticles.join(", "));

try {
  const home = await get("/");
  record("organisation node has a stable @id", home.body.includes("growdigitalbranding.com/#organization"));
  record("organisation node declares a logo", home.body.includes("/logo.png"));
} catch (err) {
  record("homepage reachable", false, err.message);
}

// --- summary ---------------------------------------------------------------
const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} checks passed.`);
if (failed.length) {
  console.log("\nFailed:");
  for (const f of failed) console.log(`  ${f.name}${f.detail ? "  " + f.detail : ""}`);
}
exit(failed.length ? 1 : 0);
