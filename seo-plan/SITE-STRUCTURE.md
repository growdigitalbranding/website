# Site Structure — current and target

Current state measured by crawling all 31 indexable URLs on commit `341e951`.
Internal inbound counts are contextual links excluding the global footer where noted.

## Current hierarchy

```
/                                            in:30  2,103w   ProfessionalService, WebSite, FAQPage
├── /the-loop                                in:30  —        + BreadcrumbList          [process page]
├── /what-we-do                              in:30  1,983w   + FAQPage, Service ×5
│   ├── /performance-marketing               in:30           + FAQPage, BreadcrumbList
│   ├── /creative-engine                     in:30           + FAQPage, BreadcrumbList
│   ├── /tracking-attribution                in:30           + FAQPage, BreadcrumbList
│   ├── /follow-up-systems                   in:30           + FAQPage, BreadcrumbList
│   └── /ai-search-visibility                in:30           + FAQPage, BreadcrumbList
├── /who-we-help                             in:30    339w
│   ├── /real-estate                         in:30           + FAQPage, BreadcrumbList
│   ├── /senior-living                       in:30    293w   + BreadcrumbList
│   └── /interiors                           in:30    274w   + BreadcrumbList
├── /work                                    in:30           + BreadcrumbList     [4 cases, 0 URLs]
├── /pricing                                 in:30    300w   + OfferCatalog, 3 Offers
├── /about                                   in:30    315w   + BreadcrumbList
├── /insights                                in:30           + BreadcrumbList
│   ├── /good-cost-per-lead-real-estate      in:16  1,4xxw   BlogPosting, FAQPage, BreadcrumbList
│   ├── /why-meta-lead-ads-poor-quality      in:7
│   ├── /channel-partner-vs-direct-leads     in:7
│   ├── /speed-to-lead-real-estate           in:6
│   ├── /rera-approval-status-lead-quality   in:5
│   ├── /get-cited-by-ai-assistants          in:4   1,725w
│   └── /how-many-ad-creatives-real-estate   in:4
├── /tools                                   in:29    317w
│   ├── /cpl-calculator                      in:29    144w   + BreadcrumbList
│   ├── /tracking-health-check                in:29    263w   + BreadcrumbList
│   └── /creative-fatigue-estimator          in:29    128w   + BreadcrumbList
├── /tracking-setup                          in:29    774w   + BreadcrumbList     [proof page]
├── /contact                                 in:30     65w   + BreadcrumbList
├── /privacy                                 in:30
└── /terms                                   in:30     88w                        [only page with no H2]

Non-indexable: /admin/*, /api/lead, /llms.txt, /llms-full.txt, /robots.txt, /sitemap.xml
```

**Depth:** nothing sits deeper than two levels. Good — no page needs more than two clicks
from home.

**Link equity:** the 29–30 inbound figure on most pages is the global footer, which is
uniform and therefore carries little discriminating signal. The numbers that matter are
the article ones (4–16), which are genuinely contextual.

---

## Target hierarchy

Additions marked `NEW`. Nothing is removed.

```
/
├── /the-loop
├── /what-we-do                                    (unchanged, 5 children)
├── /who-we-help                                   (unchanged, 3 children)
├── /work
│   ├── /work/<case-slug-1>                  NEW   Article schema, 1,000w+, real figures
│   ├── /work/<case-slug-2>                  NEW
│   └── /work/<case-slug-3>                  NEW
├── /pricing
├── /about
│   └── /about/team                          NEW   hub, ProfilePage
│       └── /about/team/<person>             NEW   Person + sameAs → LinkedIn
├── /compare                                 NEW   hub
│   ├── /compare/in-house-vs-agency          NEW
│   ├── /compare/channel-partner-vs-performance-marketing   NEW
│   ├── /compare/freelancer-vs-agency        NEW
│   └── /compare/meta-vs-google-real-estate  NEW
├── /insights                                      (7 → 19 over 12 months)
├── /benchmarks                              NEW   the original survey (§5 of the strategy)
├── /tools                                         (unchanged, 3 children)
├── /tracking-setup
├── /faq                                     NEW   hub consolidating the embedded FAQPage sets
├── /contact
├── /privacy
└── /terms
```

**Count:** 31 → ~55 indexable URLs over 12 months. Deliberately modest. This is not a
programmatic-SEO site and inflating the page count with thin location or service
permutations is the fastest way to undo the quality position.

---

## URL conventions to hold

Already consistent and worth writing down so they stay that way:

- Lowercase, hyphenated, no trailing slash, no dates in article URLs.
- Article slugs are the **question**, shortened — `speed-to-lead-real-estate`, not
  `2026/09/how-fast-should-you-call`. Keeps them stable if the piece is updated.
- Service and segment pages are nouns; comparison pages are `a-vs-b`.
- No `/blog` — `/insights` already carries the brand meaning and is linked everywhere.

## Internal linking rules

1. **Every article links to the service page it supports, and back.** Currently one-way
   in places.
2. **Every service page carries 2–3 `FurtherReading` slugs.** Done as of `341e951`.
3. **Comparison pages link to `/pricing` and the relevant service page**, never to a
   competitor.
4. **The benchmark page becomes the hub every article's opening statistic points at.**
   That is what turns 19 articles into one topical cluster instead of 19 essays.
5. **No page more than two clicks from home.** Currently true; keep it true.

## Sitemap quality gates

Already enforced in `src/app/sitemap.ts`; keep them:

- `lastmod` from git history of the page's own source, not build time.
- Only indexable, canonical, 200-status URLs.
- New page types (case studies, comparisons, team) must be added to the `ROUTES` array —
  the sitemap is explicit, not a crawl, which is the safer default but does mean a new
  route is invisible until listed.
