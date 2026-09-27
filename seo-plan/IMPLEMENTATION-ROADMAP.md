# Implementation Roadmap

Four phases. Each lists its **dependencies** first, because half of this plan is blocked
on things that are not SEO work at all.

---

## Phase 0 — unblock (this week, before anything else)

Not in the standard template. It exists because nothing else in this plan can be
measured, and much of it cannot be done, until these three are cleared.

| # | Action | Owner | Blocks |
|---|---|---|---|
| 0.1 | **Deploy and restart the Node process.** Everything committed this session — the design pass, the SEO remediation, the social links — is still unpublished. The build now runs an image-optimisation step, so a restart without a rebuild will not pick it up. | you | literally everything |
| 0.2 | **Widen the environment's network access** (environment menu → Edit → Network access) so the live host and external sources are reachable | you | live verification, citations, competitor data, CrUX |
| 0.3 | **Confirm the live lead path works end to end.** `NEXT_PUBLIC_*` vars are build-time, so this needs the rebuild from 0.1, not just a restart. Submit the form and confirm the lead arrives. | you | every conversion metric in this plan |

**Phase 0 is done when** `curl -s https://growdigitalbranding.com/ | grep build-commit`
returns the current HEAD and a test lead lands.

---

## Phase 1 — Foundation (weeks 1–4)

**Depends on:** Phase 0.

| # | Action | Effort | Priority |
|---|---|---|---|
| 1.1 | **Claim the Google Business Profile.** Category, service area (TN + Karnataka), hours, photos, description. | hours | **P1** |
| 1.2 | Add the GBP URL to `sameAs` in `src/lib/schema/jsonld.ts` | minutes | **P1** |
| 1.3 | Add `geo` and `openingHours` to the organisation node | minutes | P1 |
| 1.4 | **Connect Search Console** (all four property variants) and submit the sitemap | 1h | **P1** |
| 1.5 | Connect GA4 to GSC; confirm organic sessions are recording | 1h | P1 |
| 1.6 | **Capture the baseline.** First GSC data + `seo-drift` baseline + this audit's health score. Write the numbers down — every target in §8 of the strategy hangs off them. | 1h | **P1** |
| 1.7 | **Photography shoot** — portrait, workspace, four artefact frames | half a day | **P1** |
| 1.8 | Build `/about/team` + per-person page with `Person`/`ProfilePage` schema and `sameAs` → LinkedIn | 1 day | **P1** |
| 1.9 | Re-attribute all 7 articles from the organisation to the Person author | 1h | **P1** |
| 1.10 | NAP consistency sweep: GBP, LinkedIn, Instagram, Facebook, Justdial, IndiaMART | 1 day | P2 |
| 1.11 | Re-run the full audit against the **live** host; verify HTTPS/HSTS, compression, cache headers — none of which could be checked from the build environment | 1h | P2 |
| 1.12 | Add the 2–3 external citations per article that were deliberately left out, verifying each URL | half a day | P2 |

**Exit criteria:** GBP live, GSC recording, a named human author on every article, at
least one real photograph published, a written baseline.

---

## Phase 2 — Expansion (weeks 5–12)

**Depends on:** 1.1, 1.4, 1.7.

| # | Action | Priority |
|---|---|---|
| 2.1 | `/compare/in-house-vs-agency` | **P1** |
| 2.2 | `/compare/channel-partner-vs-performance-marketing` | P1 |
| 2.3 | `/faq` hub consolidating the FAQPage sets from 9 pages | P2 |
| 2.4 | Article: the qualification rate | P2 |
| 2.5 | Promote the three calculators — LinkedIn, the property trade, the developers you already talk to. These are the only natural link-earning assets on the site and nothing currently points at them from outside. | **P1** |
| 2.6 | Wire `Article` schema and a case-study route type, ready for Phase 3 content | P2 |
| 2.7 | First monthly AI-citation check (the 15-prompt list, §9 of the strategy) | P2 |
| 2.8 | Review the first 8 weeks of GSC data and **set the lagging-indicator targets** that §8 deliberately left blank | **P1** |

**Exit criteria:** two comparison pages live, calculators promoted, real numeric targets
set for the first time.

---

## Phase 3 — Scale (weeks 13–24)

**Depends on:** Phase 1 complete; survey fieldwork started by week 14.

| # | Action | Priority |
|---|---|---|
| 3.1 | **Benchmark survey fieldwork** — 30–60 developers, anonymised | **P1** |
| 3.2 | **Publish `/benchmarks`** — ranges, distributions, stated method and sample size, downloadable anonymised table | **P1** |
| 3.3 | Outreach push on the survey: trade press, LinkedIn, participants | **P1** |
| 3.4 | Case study #1 at its own URL, 1,000w+, `Article` schema | **P1** |
| 3.5 | `/compare/freelancer-vs-agency` | P2 |
| 3.6 | Re-point every article's opening statistic at `/benchmarks` — this is what turns essays into a cluster | P2 |
| 3.7 | Performance: re-measure CWV against live CrUX, now that field data should exist | P2 |
| 3.8 | Guest writing / podcast appearances in the property trade | P2 |

**Exit criteria:** one original dataset published and pitched; first earned referring
domains; at least one case study at its own URL.

---

## Phase 4 — Authority (months 7–12)

**Depends on:** Phase 3.

| # | Action | Priority |
|---|---|---|
| 4.1 | Case studies #2 and #3 | P2 |
| 4.2 | `/compare/meta-vs-google-real-estate` | P2 |
| 4.3 | 4–6 further articles, topic selection now led by GSC query data | P2 |
| 4.4 | **Benchmark survey wave 2** — year-on-year change is more citable than a one-off | **P1** |
| 4.5 | Refresh pass on the seven originals: re-verify every derived figure | P2 |
| 4.6 | Full re-audit + `seo-drift` comparison against the Phase 1 baseline | **P1** |
| 4.7 | Decide on location pages — **only** where there is a real presence to describe | P3 |

**Exit criteria:** a second dataset, measured year-on-year movement against a real
baseline, and a documented decision on whether geographic expansion is warranted.

---

## Resource reality

| Resource | Needed | Currently |
|---|---|---|
| Developer time | ~2 days in Phase 1, ~1 day/quarter after | available (this repo) |
| Writing | 1–2 pieces a month | operator, who is also the subject-matter expert |
| Photography | one shoot, Phase 1 | **not arranged** |
| Client permission for case studies | 1–3 clients | **not secured — the plan's biggest single risk** |
| Survey fieldwork | 4–6 weeks part-time, Phase 3 | not started |
| Paid tooling | GSC + GA4 are free and sufficient through Phase 2. A DataForSEO or Ahrefs key becomes worth it at Phase 3, not before. | none |

## What to do first if only one thing gets done

**Claim the Google Business Profile.** It is hours of work, it is free, it is the
highest-value missing signal on the entire plan, and every "agency in Coimbatore" query
runs through a local pack this business is currently absent from. No amount of on-page
work substitutes for it.
