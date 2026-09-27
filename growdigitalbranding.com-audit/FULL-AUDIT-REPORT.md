# SEO Audit — growdigitalbranding.com

**Health score: 81/100**  
**Business type:** Local service / B2B agency (performance marketing for real-estate developers, Coimbatore TN)

> Audited the local production build of commit c18988e. The public host was unreachable from the audit container, so live headers, TLS, CDN, CrUX/GSC field data and real-world CWV are NOT covered.

## Top findings

- 30 of 31 pages contain zero images
- Zero outbound citations on a site whose argument is verifiability
- 21 of 31 titles exceed 60 characters and will truncate in SERPs
- Homepage H1 extracts as run-together text: 'watch wherethe moneyactually goes.'
- llms.txt fails the llmstxt.org/Lighthouse rule: no Markdown links

## Quick wins

- Rewrite llms.txt entries as Markdown links
- Add spaces between the H1 span lines
- Shorten the 8 article titles that run 70-85 chars
- Add Offer/PriceSpecification schema to /pricing
- Add H2 structure to /about, /who-we-help/interiors, /who-we-help/senior-living

---

## Scores

| Category | Weight | Score |
|---|---:|---:|
| Technical SEO | 22% | 92 |
| Content Quality | 23% | 78 |
| On-Page SEO | 20% | 80 |
| Schema / Structured Data | 10% | 85 |
| Performance (CWV) | 10% | 72 |
| AI Search Readiness | 10% | 80 |
| Images | 5% | 65 |
| **Overall** | **100%** | **81** |


## Technical SEO — 92/100

**What works**

- robots.txt reachable, 18 groups, 11 named AI user agents
- Sitemap valid urlset, 31 URLs
- 31/31 canonicals absolute, correct and unique
- Unknown URLs return a real 404
- Server-rendered: 2155 words present without JavaScript

**Findings**


### Info — Live-server surface not audited

Egress policy blocked the public host, so HTTPS/HSTS, compression, cache headers and CDN behaviour were not checked.

*Fix:* Re-run against https://growdigitalbranding.com once network access is widened.

## Content Quality — 78/100

**What works**

- QRG quality 84-91 across sampled pages
- filler_score 0 and ai_pattern_score 0 on every page sampled
- information_density 1.0 on 4 of 5 sampled pages

**Findings**


### High — Zero outbound citations site-wide

Across all 7 articles and 24 other pages there is not one external link. The site repeatedly claims its numbers are 'a matter of public record' but never links the record (RERA portals, Meta/Google documentation, DTCP).

*Fix:* Add 2-4 primary-source links per article to the documents each claim rests on.

### Medium — Five pages under 300 words

contact 65, terms 88, tools/creative-fatigue-estimator 128, tools/cpl-calculator 144, tracking-setup 154.

*Fix:* tracking-setup is the one that matters commercially - it is a proof page with 6 H2s and 154 words. The calculators are interactive tools and are acceptable thin.

### Medium — Articles are weakly linked internally

Contextual inbound links per article: 3-12, against 29-30 for every other page (which is the global footer). get-cited-by-ai-assistants and rera-approval-status-lead-quality have 3 each.

*Fix:* Cross-link articles from the service pages whose subject they support.

## On-Page SEO — 80/100

**What works**

- Exactly one H1 on all 31 pages
- Title and meta description present on all 31
- No heading-level jumps
- No generic anchor text anywhere
- No orphan pages

**Findings**


### Medium — 21 of 31 titles exceed 60 characters

The brand suffix '| growdigitalbranding' is 20 chars and pushes 8 article titles to 70-85. 'Channel partner leads vs direct leads: the real cost comparison | growdigitalbranding' is 85.

*Fix:* Drop the brand suffix on article pages, or shorten the article titles to ~40 chars.

### Medium — Homepage H1 extracts as run-together text

The H1 is three display:block spans with no whitespace between them, so naive text extractors read 'watch wherethe moneyactually goes.' Browsers and Google render it correctly; plain-text extractors, which many AI crawlers use, do not.

*Fix:* Add a space or newline between the span elements.

### Low — Four pages have no H2 at all

/about, /terms, /who-we-help/interiors, /who-we-help/senior-living.

*Fix:* The two who-we-help pages are ~280 words of unstructured prose; give each 2-3 question-shaped H2s.

## Schema / Structured Data — 85/100

**What works**

- @graph with stable @id on all 31 pages; no duplicate or conflicting entity declarations
- sameAs now present (Instagram, LinkedIn, Facebook)
- BlogPosting + BreadcrumbList + FAQPage on all 7 articles
- Service schema on /what-we-do
- No validation errors found

**Findings**


### Medium — No Offer or PriceSpecification on /pricing

The page publishes three real prices in prose and markup but declares no Offer, so it cannot win a price-related rich result or be quoted as structured pricing.

*Fix:* Add Offer/PriceSpecification nodes for the three tiers, referencing the existing Service @ids.

### Low — No BreadcrumbList on depth-1 pages

Present on all depth-2 pages; absent on /work, /pricing, /the-loop, /insights, /tools, /what-we-do, /who-we-help, /about.

*Fix:* Add a two-level trail (Home > Page) to the eight depth-1 routes.

### Medium — No Google Business Profile in sameAs

For a Coimbatore agency this is the single highest-value entity link and it is absent.

*Fix:* Claim the listing and add its URL.

## Performance (CWV) — 72/100

**What works**

- CLS 0.0007 on the homepage and 0.0000 on the other three pages measured
- All 57 images carry explicit width and height
- All 57 lazy-loaded natively
- Interior pages transfer ~400-500KB over ~30 requests

**Findings**


### High — Homepage transfers 2.2MB over 49 requests

Lab measurement on localhost: homepage 2195KB / 49 requests / LCP 1756ms, against 401-501KB / 30-33 requests / LCP 128-148ms for interior pages. The delta is the 19 creative WebPs (1.7MB on disk) in the marquee. LCP in absolute terms is meaningless on loopback, but the payload is real and on an Indian 4G connection it is the difference between a good and a poor LCP.

*Fix:* Serve the marquee creatives responsively, and consider loading a subset above the fold.

### Medium — next/image is not used anywhere

Zero imports across the codebase. Every image is a raw <img> at a single 640x857 intrinsic size, so a 390px phone downloads the same asset a desktop does - no srcset, no AVIF negotiation, no automatic sizing.

*Fix:* Move the marquee to next/image, or hand-write srcset/sizes with AVIF sources.

### Info — Field data unavailable

No CrUX or GSC access from this container, and the origin may have no CrUX sample yet at current traffic.

*Fix:* Connect Search Console and re-check once traffic accrues.

## AI Search Readiness — 80/100

**What works**

- All three P0 agent-readiness checks pass
- robots.txt names 11 AI user agents deliberately (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, CCBot) with no search crawler blocked at root
- Content is fully server-rendered
- Unknown URLs return a real 404 rather than a soft 200
- Direct-answer blocks and question-shaped H2s on most pages

**Findings**


### Medium — llms.txt fails the llmstxt.org rule Lighthouse checks

The file is 2737 bytes and well written, but every entry is a bare path ('- /the-loop - the methodology') rather than a Markdown link. The spec requires Markdown links; Lighthouse scores it as fail.

*Fix:* Rewrite each entry as '- [Title](https://growdigitalbranding.com/path): description'.

### Low — No /llms-full.txt

Returns 404. Optional in the spec.

*Fix:* Optional; consider once the article set is stable.

### Low — Lead form is not annotated for WebMCP

One form on the homepage, zero annotated. Forward-looking, not a current ranking factor.

*Fix:* Backlog.

## Images — 65/100

**What works**

- 57 of 57 images have alt text - no missing alt anywhere on the site
- All carry width and height, which is why CLS is ~0
- WebP throughout
- Intrinsic 640x857 against a 260x325 slot is a sane ~2x DPR

**Findings**


### High — 30 of 31 pages contain zero images

The homepage holds all 57 image instances (19 unique client ad creatives). /work, /about, /pricing, /the-loop and all 7 articles have none. No image can rank in Google Images, no article has a lead visual for social or Discover, and the pages that carry the trust argument show nothing.

*Fix:* This is a production task, not a code one: a portrait for /about, artefact photography for /work, and one diagram or chart per article.

### Medium — No per-page OG images

Every page shares the single /og.png. Seven articles with distinct titles all render an identical social card.

*Fix:* Generate per-article OG images from the article title.


---

## Action plan


### Phase 1: Quick wins (Week 1)

- [ ] Rewrite llms.txt entries as Markdown links
- [ ] Add whitespace between the homepage H1 span lines
- [ ] Shorten the 8 article titles running 70-85 chars, or drop the brand suffix on articles
- [ ] Add H2 structure to /who-we-help/interiors and /who-we-help/senior-living

### Phase 2: High-impact (Weeks 2-3)

- [ ] Add 2-4 primary-source outbound citations per article
- [ ] Add Offer/PriceSpecification schema to /pricing
- [ ] Claim the Google Business Profile and add it to sameAs
- [ ] Move the marquee creatives to responsive images and cut the 2.2MB homepage payload

### Phase 3: Content and authority (Month 2)

- [ ] Photography: portrait for /about, artefacts for /work, one visual per article
- [ ] Per-article OG images
- [ ] Cross-link articles from the service pages whose subject they support
- [ ] Expand /tracking-setup beyond 154 words

### Phase 4: Monitoring (Ongoing)

- [ ] Connect Search Console and GA4; re-run this audit against the live host
- [ ] Capture a seo-drift baseline so future deploys are diffed
- [ ] Re-check CrUX once the origin has a field-data sample
