# SEO Strategy — growdigitalbranding.com

**Business type:** performance-marketing agency (agency/consultancy template), operating
as a local service from Coimbatore, Tamil Nadu, selling into Tamil Nadu and Karnataka.
**Current state:** 31 indexable pages, 7 published articles, SEO health 81/100 as measured
on commit `341e951`.
**Plan written:** 2026-09-27.

---

## 0. What this plan is built on, and what it is missing

Everything in the "current state" columns below was measured this session by crawling
all 31 pages. Nothing in it is estimated.

Four inputs a normal SEO plan would have, this one does not:

| Missing input | Why | What it blocks |
|---|---|---|
| Search Console | not connected | every traffic and ranking baseline, real indexation status |
| Keyword volumes | no DataForSEO/Ahrefs key, no network access from this environment | prioritising terms by demand |
| Competitor data | same | domain authority comparison, gap analysis |
| Backlink profile | same | authority baseline and link targets |

**So there are no invented numbers in this plan.** Where a target needs a baseline that
does not exist yet, it says so, and Phase 1 exists largely to create those baselines.
Anyone handing you an SEO plan with a "current domain authority: 12 → 12-month target:
35" for a site with no connected analytics is making it up.

---

## 1. Strategic position

### The asset most agencies in this market do not have

Three things on this site are genuinely uncommon for a regional performance agency, and
the whole strategy should compound them rather than chase generic terms:

1. **Published pricing.** ₹75,000 / ₹1,25,000 / ₹60,000–₹2,50,000 are on the page with
   an `OfferCatalog` behind them. Almost every competitor gates this behind "contact us".
   It is the highest-intent page on the site and it can actually rank for
   "[service] pricing India" style queries that competitors cannot serve.
2. **Arithmetic published in full.** The seven articles derive their numbers rather than
   asserting them. This is exactly the shape an answer engine can quote, and it is the
   reason the AEO foundation already scores well.
3. **Three working calculators.** Ungated, results on the page. These are the site's
   only natural link-earning assets and currently the least promoted.

### The three things holding it back

1. **No entity outside this domain.** No Google Business Profile, no team entities, no
   citations, no backlinks. The schema graph is immaculate and points at nothing that
   corroborates it. An answer engine has one source for every claim: the claimant.
2. **No people.** Articles are authored by the organisation. There is no `/team`, no
   `Person` schema, no portrait anywhere on the site. For a category where the buyer is
   choosing an operator, this is the biggest E-E-A-T gap.
3. **No provable results.** `/work` describes structures and explicitly refuses to
   publish client numbers — an honest position, but it means the four case entries carry
   `verified: false` and nothing on the site is a citable outcome.

### Positioning statement for the plan

Compete on **specificity and verifiability in a defined geography**, not on volume.
The realistic ceiling here is being the most-cited source on real-estate marketing
economics in Tamil Nadu and Karnataka — which is a winnable position — not out-ranking
national agencies for "digital marketing agency".

---

## 2. Target query classes

Grouped by intent, with the page that owns each. No volumes attached, because none are
knowable from here; the ordering is by commercial value and by how defensible the
position is, which is judgement you can override once GSC data exists.

| Class | Example shape | Owner page | Status |
|---|---|---|---|
| **Pricing intent** (highest value) | "real estate marketing agency cost", "digital marketing retainer price India" | `/pricing` | live, now with Offer schema |
| **Local commercial** | "real estate marketing agency Coimbatore / Tamil Nadu" | `/who-we-help/real-estate`, home | live, **no GBP backing it** |
| **Problem-aware** | "why are my Meta leads poor quality", "how fast to call a lead" | 7 articles | live, strongest asset |
| **Service** | "Meta CAPI setup", "server-side GTM agency" | `/what-we-do/*` | live |
| **Comparison** (not built) | "X agency vs Y", "alternatives to [agency]", "in-house vs agency" | none | **gap** |
| **Tool** | "cost per booking calculator", "CPL calculator" | `/tools/*` | live, unpromoted |
| **Brand** | "growdigitalbranding" | home | live, `sameAs` now set |

The comparison class is the clearest unbuilt opportunity: it is high-intent, it is where
a buyer goes right before choosing, and the site already has the honest-comparison voice
to write it without being sleazy.

---

## 3. Architecture: current vs the agency template

```
                             template        this site
/                            ✓               ✓
/services                    ✓               ✓  as /what-we-do (5 children)
/industries                  ✓               ✓  as /who-we-help (3 children)
/work                        ✓               ✓  but no individual case-study pages
  /case-study-N              ✓               ✗  GAP
/about                       ✓               ✓
  /team                      ✓               ✗  GAP — highest-value missing page
    /team-member-N           ✓               ✗  GAP
/insights                    ✓               ✓  7 articles
/contact                     ✓               ✓
/process                     ✓               ✓  as /the-loop
/faq                         ✓               ~  FAQs embedded in pages, no standalone hub
(not in template)                            +  /tools ×3, /tracking-setup
```

Two structural gaps, one structural strength.

**Gap 1 — `/team` and per-person pages.** The template calls this High priority and it is
the E-E-A-T backbone of an agency site. `Person` + `ProfilePage` schema with `sameAs` to
real profiles is also what lets the organisation entity be corroborated by something
outside the domain.

**Gap 2 — individual case-study URLs.** `/work` is one page describing four engagements.
The template wants a URL per case study at 1,000+ words. This is blocked on client
permission, not on effort — see the risk register.

**Strength — `/tools` and `/tracking-setup`.** Not in the template and worth keeping.
`/tracking-setup` is a proof page with no equivalent at most agencies, and the three
calculators are link-earning assets the template does not anticipate.

---

## 4. Schema plan

| Page type | Template asks for | Currently |
|---|---|---|
| Homepage | Organization, ProfessionalService | ✓ ProfessionalService + WebSite, stable `@id`, `sameAs` |
| Service page | Service, ProfessionalService | ✓ + FAQPage + BreadcrumbList |
| Pricing | (not specified) | ✓ OfferCatalog + 3 Offers |
| Case study | Article, Organization | ✗ **gap** |
| Team member | Person, ProfilePage | ✗ **gap** |
| Blog | Article, BlogPosting | ✓ BlogPosting + FAQPage + BreadcrumbList |

Three additions, in value order:

1. **`Person` + `ProfilePage`** for each operator, with `sameAs` to their LinkedIn.
   Then set each article's `author` to that Person rather than the organisation, which
   is the single change that most improves article E-E-A-T.
2. **`Article` per case study**, once any case can be published with real figures.
3. **`LocalBusiness` refinement** — the organisation already has an address; add `geo`
   and `openingHours`, which are the two fields a local pack reads and which are still
   absent.

---

## 5. Content strategy

### What exists

7 articles, roughly 1,100–1,750 words each, every number derived or public record.
Editorial rule already enforced in `src/data/insights.ts`. This is a strong base and the
cadence question is whether to keep adding or to deepen.

### Recommended mix, next 12 months

| Type | Count | Rationale |
|---|---|---|
| **Comparison pages** | 4 | the unbuilt high-intent class; "in-house vs agency", "channel partner vs performance marketing", "freelancer vs agency at ₹X spend", "Meta vs Google for real estate" |
| **Articles** | 8–12 (1 or 2/month) | continue the derived-arithmetic format; it is what earns citations |
| **Case studies** | 2–3 | gated on client permission; one publishable case is worth more than four described structures |
| **Team pages** | 1 hub + N people | E-E-A-T, not traffic |
| **Original research** | 1 | see below |
| **Location pages** | 0–2, carefully | only if there is genuine Bengaluru/Chennai presence to describe; thin location pages are the classic agency self-inflicted wound |

### The one asset that would change the trajectory

**An original benchmark survey.** The template lists "original research" under thought
leadership; for this site specifically it is the highest-leverage thing available.
A survey of 30–60 Tamil Nadu and Karnataka developers on cost per lead, contact rate,
site-visit rate and booking rate — published as ranges, anonymised — creates the one
thing the site currently lacks: **a citable number that belongs to you.** Every article
already teaches readers to compute these rates; publishing the distribution makes this
domain the source other people cite when they write about the subject, which is the
only durable link-and-citation engine in this category.

It also solves the `/work` problem sideways: you cannot publish a client's CPL, but you
can publish an anonymised industry distribution the client is one anonymous row in.

---

## 6. Technical foundation

Largely done. Current measured state on `341e951`:

| Item | State |
|---|---|
| Server-rendered without JS | ✓ 2,155 words on the homepage |
| robots.txt | ✓ 18 groups, 11 AI user agents named deliberately |
| Sitemap | ✓ valid urlset, 31 URLs, lastmod from git history |
| Canonicals | ✓ 31/31 absolute, correct, unique |
| CLS | ✓ 0.0007 homepage, 0.0000 elsewhere |
| Homepage payload | ✓ 685KB @1x / 996KB @2x, down from 2.2MB |
| llms.txt + llms-full.txt | ✓ generated, spec-compliant |
| Agent readiness | ✓ P0 3/3, P1 failures 0 |
| Alt text | ✓ 57/57 |
| Field CWV (CrUX) | ✗ unknown — needs traffic and GSC |
| HTTPS/HSTS/compression on the live host | ✗ **unverified** — could not reach the host |

Remaining technical work is small: `geo` + `openingHours`, and re-verifying the live
server surface once it is reachable.

---

## 7. Off-site and entity strategy

This is where the real gap is, and it is not on the website.

| Action | Why it matters here | Effort |
|---|---|---|
| **Claim the Google Business Profile** | the single highest-value missing signal; every "agency in Coimbatore" query runs through the local pack, and you are not in it | hours |
| Add GBP to `sameAs` | closes the entity loop between site and profile | minutes |
| **Consistent NAP** across GBP, LinkedIn, Instagram, Facebook, Justdial, IndiaMART | citation consistency is how a local entity gets corroborated | a day |
| Personal LinkedIn presence for the operator(s) | the articles' arguments carry further from a person than from a logo | ongoing |
| Guest writing / podcasts in the property trade | the only realistic link source in this niche | ongoing |
| Submit the survey (§5) to trade press | one good asset, pitched, beats fifty directory links | one push |

Deliberately **not** recommended: paid directory link packages, guest-post networks,
or any link buying. In a niche this small, a spammy profile is more visible, not less.

---

## 8. KPI framework

Split into two tables, because mixing them is how SEO plans become fiction.

### Leading indicators — controllable, measurable today

| Metric | Now | 3 mo | 6 mo | 12 mo |
|---|---:|---:|---:|---:|
| Indexable pages | 31 | 38 | 46 | 55 |
| Published articles | 7 | 11 | 15 | 19 |
| Comparison pages | 0 | 2 | 4 | 4 |
| Case studies with published figures | 0 | 1 | 2 | 3 |
| Person entities with `sameAs` | 0 | 1+ | 1+ | 1+ |
| External citations on articles | 0 | ≥2/article | ≥3/article | ≥3/article |
| Pages with a real image | 1 | 12 | 25 | 40 |
| SEO health score | 81 | 88 | 92 | 92+ |
| GBP claimed | no | **yes** | yes | yes |

### Lagging indicators — need a baseline that does not exist yet

| Metric | Baseline | Target |
|---|---|---|
| Organic sessions | **unknown** | set after 1 month of GSC/GA4 data |
| Ranking keywords | **unknown** | set after 1 month |
| Referring domains | **unknown** | set after a backlink tool is connected |
| AI citation rate | **unknown** | set after manual prompt testing (§9) |
| Organic → booked calls | **unknown** | the only one that matters commercially |

**Do not set numeric targets on the second table before Phase 1 completes.** The first
month's job is to make these measurable.

---

## 9. Measuring the thing this site is actually optimised for

The site is built for answer engines more than for classic SERPs, and neither GSC nor
any rank tracker reports that well. Run a manual citation check monthly:

Ask ChatGPT, Perplexity, Google AI Mode and Copilot a fixed list of ~15 prompts —
"what is a good cost per lead for a real estate project in India", "how fast should you
call a real estate lead", "real estate marketing agency in Coimbatore" — and record
whether this domain is cited, linked, or absent. Fifteen prompts, same wording each
month, in a spreadsheet. It is crude and it is the only honest read available.

---

## 10. Risk register

| Risk | Likelihood | Mitigation |
|---|---|---|
| **Client permission for case studies never materialises** | high | the anonymised benchmark survey (§5) substitutes; do not fabricate figures, which would destroy the one differentiator the site has |
| Nothing is live — the deploy path still needs a manual restart | certain today | fix the deploy loop before any content plan matters; unpublished work ranks for nothing |
| No network/analytics access continues | medium | Phase 1 is entirely about closing this; every later phase depends on it |
| Thin location pages get built to chase geography | medium | only build a location page where there is a real presence to describe |
| Article cadence outruns quality | medium | the derived-arithmetic rule is the moat; one good article a month beats four asserted ones |
| Single-operator key-person dependency on content | high | the `Person` entity strategy makes this a feature, not a bug — but it does concentrate risk |

---

## Files in this plan

- `SEO-STRATEGY.md` — this document
- `COMPETITOR-ANALYSIS.md` — method and framework; **no competitor data, see its header**
- `CONTENT-CALENDAR.md` — 12 months, with the topics already derivable from site data
- `IMPLEMENTATION-ROADMAP.md` — four phases with dependencies
- `SITE-STRUCTURE.md` — current and target URL hierarchy
