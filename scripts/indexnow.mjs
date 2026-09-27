#!/usr/bin/env node
/**
 * IndexNow submitter.
 *
 * IndexNow is a push protocol: instead of waiting for a crawler to notice a
 * change, you tell it. Bing, Yandex, Seznam and Naver share the endpoint used
 * below, and a submission to one is forwarded to all of them. Google does not
 * participate, which is why the sitemap still matters. This is worth running
 * because Copilot answers from the Bing index, so Bing crawl latency is AI
 * visibility latency.
 *
 * The URL list comes from the DEPLOYED sitemap rather than from local source.
 * Two reasons, both deliberate:
 *
 *   1. It cannot drift. The sitemap is already the single source of truth for
 *      which URLs exist; a second hand-maintained list in this file would be
 *      wrong within two commits.
 *   2. It fails loudly when the deploy has not happened. Pinging URLs that are
 *      still serving the old build is worse than not pinging, because the
 *      crawler arrives, sees nothing new, and learns to come back less often.
 *
 * Usage:
 *
 *   npm run indexnow                 submit every URL in the live sitemap
 *   npm run indexnow -- --changed    submit only URLs whose <lastmod> moved, or
 *                                    that were never submitted, since the last
 *                                    successful run (what `npm run verify`
 *                                    calls automatically after a good deploy)
 *   npm run indexnow -- --dry-run    print the payload, send nothing
 *   npm run indexnow -- <url> <url>  submit only these (must be on HOST)
 *   npm run indexnow -- --sitemap http://localhost:3000/sitemap.xml
 *
 * On a site this size, resubmitting all 30 URLs per deploy is well inside
 * acceptable use. Past a few hundred pages, filter by <lastmod> instead of
 * submitting the lot, or the endpoint will start rate-limiting.
 */

import { argv, exit } from "node:process";
import { readFileSync, writeFileSync } from "node:fs";

const HOST = "growdigitalbranding.com";
const ORIGIN = `https://${HOST}`;

/**
 * Not a secret, despite looking like one. The protocol requires this exact
 * string to be publicly readable at ORIGIN/<key>.txt, which is how the
 * endpoint proves you control the host. It lives in the repo on purpose and
 * needs no environment variable.
 */
const KEY = "53c7b409475b8560ff641f37c1297377";
const KEY_LOCATION = `${ORIGIN}/${KEY}.txt`;

const ENDPOINT = "https://api.indexnow.org/IndexNow";

const args = argv.slice(2);
const dryRun = args.includes("--dry-run");
const changedOnly = args.includes("--changed");

/**
 * What was last submitted, so a routine deploy pings only what changed.
 * Resubmitting unchanged URLs on every deploy is what the protocol asks you
 * not to do, and it teaches the crawler that your pings mean nothing.
 * Gitignored: it describes this server's history, not the code.
 */
const STATE_FILE = ".indexnow-state.json";
function readState() {
  try {
    return JSON.parse(readFileSync(STATE_FILE, "utf8"));
  } catch {
    return { submittedAt: null, urls: [] };
  }
}
const sitemapFlag = args.indexOf("--sitemap");
const sitemapUrl =
  sitemapFlag !== -1 ? args[sitemapFlag + 1] : `${ORIGIN}/sitemap.xml`;
// The value of --sitemap is itself a URL, so it has to be excluded by
// position rather than by shape, or passing --sitemap would be read as a
// request to submit that one URL.
const explicit = args.filter(
  (a, i) => a.startsWith("http") && i !== sitemapFlag + 1,
);

function fail(message) {
  console.error(`indexnow: ${message}`);
  exit(1);
}

async function urlsFromSitemap(url) {
  let res;
  try {
    res = await fetch(url, { headers: { "User-Agent": "indexnow-submit" } });
  } catch (err) {
    fail(`could not fetch ${url}: ${err.message}`);
  }
  if (!res.ok) fail(`sitemap returned HTTP ${res.status} from ${url}`);

  const xml = await res.text();
  const entries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => ({
    loc: m[1].match(/<loc>([^<]+)<\/loc>/)?.[1]?.trim(),
    lastmod: m[1].match(/<lastmod>([^<]+)<\/lastmod>/)?.[1]?.trim() ?? null,
  })).filter((e) => e.loc);
  if (entries.length === 0) fail(`no <loc> entries found in ${url}`);
  return entries;
}

/** Changed since the last successful submission, or never submitted at all. */
function onlyChanged(entries, state) {
  const since = state.submittedAt ? Date.parse(state.submittedAt) : 0;
  const seen = new Set(state.urls);
  return entries
    .filter((e) => !seen.has(e.loc) || !e.lastmod || Date.parse(e.lastmod) > since)
    .map((e) => e.loc);
}

/** The endpoint rejects the whole batch if any URL is off-host, so catch it here. */
function checkHost(urls) {
  const wrong = urls.filter((u) => {
    try {
      return new URL(u).host !== HOST;
    } catch {
      return true;
    }
  });
  if (wrong.length) {
    fail(`these are not on ${HOST}, which would reject the batch:\n  ${wrong.join("\n  ")}`);
  }
}

/** IndexNow answers in status codes, not messages. Translate them. */
function explain(status) {
  switch (status) {
    case 200:
      return "OK. URLs accepted.";
    case 202:
      return "Accepted, key validation pending. Confirm the key file is reachable at the location above.";
    case 400:
      return "Bad request. Malformed payload.";
    case 403:
      return "Forbidden. The key file is missing, unreadable, or does not match the key.";
    case 422:
      return "Unprocessable. A URL does not belong to the host, or the key does not match the host.";
    case 429:
      return "Too many requests. Back off, and submit only changed URLs.";
    default:
      return "Unexpected status.";
  }
}

const state = readState();
let allSitemapUrls = [];
let urls;
if (explicit.length) {
  urls = explicit;
} else {
  const entries = await urlsFromSitemap(sitemapUrl);
  allSitemapUrls = entries.map((e) => e.loc);
  urls = changedOnly ? onlyChanged(entries, state) : allSitemapUrls;
}
if (urls.length === 0) {
  console.log(`indexnow: nothing changed since ${state.submittedAt}. Nothing sent.`);
  exit(0);
}
checkHost(urls);

const payload = {
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList: urls,
};

console.log(`source:       ${explicit.length ? "command line" : sitemapUrl}`);
console.log(`keyLocation:  ${KEY_LOCATION}`);
console.log(`urls:         ${urls.length}`);
for (const u of urls) console.log(`  ${u}`);

if (dryRun) {
  console.log("\n--dry-run, nothing sent. Payload:");
  console.log(JSON.stringify(payload, null, 2));
  exit(0);
}

let res;
try {
  res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });
} catch (err) {
  fail(`POST to ${ENDPOINT} failed: ${err.message}`);
}

console.log(`\nHTTP ${res.status}. ${explain(res.status)}`);
const body = (await res.text()).trim();
if (body) console.log(body);

// 200 and 202 are both successes. Anything else should fail a deploy script.
const ok = res.status === 200 || res.status === 202;
if (ok && !explicit.length) {
  writeFileSync(
    STATE_FILE,
    JSON.stringify(
      { submittedAt: new Date().toISOString(), urls: [...new Set([...state.urls, ...allSitemapUrls])] },
      null,
      2,
    ),
  );
}
exit(ok ? 0 : 1);
