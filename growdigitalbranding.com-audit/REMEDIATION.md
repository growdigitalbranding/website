# Remediation — what was fixed, and what was not

Against the audit of commit `c18988e`. Every number below was re-measured on a
rebuilt local production server, not estimated.

## Fixed

| Finding | Before | After |
|---|---|---|
| Homepage payload | 2195KB / 49 reqs | **685KB @1x, 996KB @2x** / 47 reqs |
| Creative bytes on the homepage | 1694KB WebP @640w | **186KB @1x, 497KB @2x** AVIF |
| `llms.txt` Lighthouse check | fail (no Markdown links) | **pass** |
| `/llms-full.txt` | 404 | **200** |
| Article `<title>` length | 70–85 chars | **50–63** |
| Pages with no H2 | 4 | **1** (`/terms`, legal copy) |
| Pages with `BreadcrumbList` | 18 | **28** |
| `Offer` schema on `/pricing` | none | **OfferCatalog + 3 Offers** |
| `/tracking-setup` word count | 154 | **774** |
| Per-article OG images | 1 shared `/og.png` | **7 generated cards** |
| Weakest article inbound links | 3 | **4–5** |
| P1 agent-readiness failures | 1 | **0** |

Homepage H1 text extraction: `textContent`, `innerText` and BeautifulSoup
`get_text()` all now return `watch where the money actually goes.` where they
previously returned `watch wherethe moneyactually goes.` The separator is a
real text node between the three line blocks, so the rendered layout is
unchanged. Note that the audit plugin's own parser joins `stripped_strings`
and still reports the run-together form; it is stricter than any real
extractor, and satisfying it would mean collapsing the H1 into one text node
and dropping the per-line entrance animation.

## Not fixed, and why

**Outbound citations (High).** Still zero. This is the one finding left open
deliberately. The container has no outbound network access — every candidate
source URL, from the RERA portals to the Meta and Google documentation, returns
403 at the egress proxy — so no citation could be verified before shipping. On
a site whose entire argument is "check our working", a dead citation link is
worse than no citation. This wants one pass with network access, verifying each
URL as it goes.

**Photography (High).** 30 of 31 pages still carry no image. A production task:
a portrait for `/about`, artefact photography for `/work`, one diagram per
article. Per the project's asset rule, a stock photograph is not an acceptable
substitute.

**Google Business Profile in `sameAs` (Medium).** Needs the listing claimed
first. It is the highest-value entity link still missing for local queries.

**15 titles remain 61–70 characters (Medium, partially fixed).** All of the
overflow is now the ` | growdigitalbranding` suffix, which is the expendable
end of the string; the article titles, where the *question* was being cut, are
all under 63 now. Shortening further would mean either dropping the brand from
the SERP or cutting words the page needs.

**WebMCP form annotations (Low).** Forward-looking, not a current ranking
factor. Backlog.
