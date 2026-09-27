# Action plan — growdigitalbranding.com

Generated from the audit of commit c18988e. Health score 81/100.

| Severity | Category | Finding | Fix |
|---|---|---|---|
| High | Content Quality | Zero outbound citations site-wide | Add 2-4 primary-source links per article to the documents each claim rests on. |
| High | Performance (CWV) | Homepage transfers 2.2MB over 49 requests | Serve the marquee creatives responsively, and consider loading a subset above the fold. |
| High | Images | 30 of 31 pages contain zero images | This is a production task, not a code one: a portrait for /about, artefact photography for /work, and one diagram or chart per article. |
| Medium | Content Quality | Five pages under 300 words | tracking-setup is the one that matters commercially - it is a proof page with 6 H2s and 154 words. The calculators are interactive tools and are acceptable thin. |
| Medium | Content Quality | Articles are weakly linked internally | Cross-link articles from the service pages whose subject they support. |
| Medium | On-Page SEO | 21 of 31 titles exceed 60 characters | Drop the brand suffix on article pages, or shorten the article titles to ~40 chars. |
| Medium | On-Page SEO | Homepage H1 extracts as run-together text | Add a space or newline between the span elements. |
| Medium | Schema / Structured Data | No Offer or PriceSpecification on /pricing | Add Offer/PriceSpecification nodes for the three tiers, referencing the existing Service @ids. |
| Medium | Schema / Structured Data | No Google Business Profile in sameAs | Claim the listing and add its URL. |
| Medium | Performance (CWV) | next/image is not used anywhere | Move the marquee to next/image, or hand-write srcset/sizes with AVIF sources. |
| Medium | AI Search Readiness | llms.txt fails the llmstxt.org rule Lighthouse checks | Rewrite each entry as '- [Title](https://growdigitalbranding.com/path): description'. |
| Medium | Images | No per-page OG images | Generate per-article OG images from the article title. |
| Low | On-Page SEO | Four pages have no H2 at all | The two who-we-help pages are ~280 words of unstructured prose; give each 2-3 question-shaped H2s. |
| Low | Schema / Structured Data | No BreadcrumbList on depth-1 pages | Add a two-level trail (Home > Page) to the eight depth-1 routes. |
| Low | AI Search Readiness | No /llms-full.txt | Optional; consider once the article set is stable. |
| Low | AI Search Readiness | Lead form is not annotated for WebMCP | Backlog. |
| Info | Technical SEO | Live-server surface not audited | Re-run against https://growdigitalbranding.com once network access is widened. |
| Info | Performance (CWV) | Field data unavailable | Connect Search Console and re-check once traffic accrues. |


## Phase 1: Quick wins — Week 1

- [ ] Rewrite llms.txt entries as Markdown links
- [ ] Add whitespace between the homepage H1 span lines
- [ ] Shorten the 8 article titles running 70-85 chars, or drop the brand suffix on articles
- [ ] Add H2 structure to /who-we-help/interiors and /who-we-help/senior-living

## Phase 2: High-impact — Weeks 2-3

- [ ] Add 2-4 primary-source outbound citations per article
- [ ] Add Offer/PriceSpecification schema to /pricing
- [ ] Claim the Google Business Profile and add it to sameAs
- [ ] Move the marquee creatives to responsive images and cut the 2.2MB homepage payload

## Phase 3: Content and authority — Month 2

- [ ] Photography: portrait for /about, artefacts for /work, one visual per article
- [ ] Per-article OG images
- [ ] Cross-link articles from the service pages whose subject they support
- [ ] Expand /tracking-setup beyond 154 words

## Phase 4: Monitoring — Ongoing

- [ ] Connect Search Console and GA4; re-run this audit against the live host
- [ ] Capture a seo-drift baseline so future deploys are diffed
- [ ] Re-check CrUX once the origin has a field-data sample
