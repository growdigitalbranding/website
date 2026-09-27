# Competitor Analysis — growdigitalbranding.com

> **This document contains no competitor data.**
>
> The environment this plan was produced in has no outbound network access: every
> external host, including Google, the RERA portals and every SEO data API, returns 403
> at the egress proxy. There is no DataForSEO, Ahrefs, Moz or Search Console credential
> configured either.
>
> I could generate a plausible-looking table of five competitor domains with domain
> authority scores, traffic estimates and keyword counts. It would be fabrication, and on
> a project whose entire market position is "every number we publish can be checked" it
> would be the worst possible thing to hand over. So this file is the **method** and the
> **analysis frame**, ready to be filled in one sitting once either network access or an
> SEO API key exists.

---

## Who to analyse

Five slots, chosen to cover the three ways this agency actually loses a deal. Fill in the
domains yourself — you know this market and I do not.

| # | Slot | What to look for |
|---|---|---|
| 1 | **Regional peer** — a Coimbatore or Chennai performance agency of similar size | the realistic head-to-head; how they present pricing, proof and team |
| 2 | **Regional peer** — second one | whether slot 1 is typical or an outlier |
| 3 | **National real-estate marketing specialist** (Mumbai/Bangalore/Delhi) | who outranks you nationally and on what content depth |
| 4 | **Generalist digital agency with a real-estate page** | the weak competitor whose traffic you can take with specificity |
| 5 | **The non-agency alternative** — a channel-partner network, or an in-house build | not a domain to out-rank, but the comparison page you must write |

## What to record for each

Twelve fields. Anything beyond this is data collection for its own sake.

**Presentation and positioning**
1. Do they publish pricing? (If no — that is the wedge, and you should say so on `/pricing`.)
2. Do they name and photograph their team?
3. Do they publish case studies with real figures, or only logos?
4. Is there a stated methodology, or just a service list?

**Content**
5. Article count and the date of the most recent one (a dead blog is an opportunity).
6. Do their articles derive numbers or assert them?
7. Which of your seven article topics do they also cover, and worse?
8. Do they have comparison pages?

**Technical and entity**
9. Server-rendered or JS-shell? (Run `render_page.py --mode auto` against them.)
10. Schema types present on the homepage and a service page.
11. Google Business Profile: claimed, review count, review recency.
12. `sameAs` / profile consistency across directories.

## How to fill it, when access exists

```bash
export CLAUDE_SEO_LOCAL_TARGETS=""   # not needed for public hosts
S="$HOME/.claude/skills/seo/scripts/claude-seo"

# Per competitor: structural read
$S run render_page.py https://COMPETITOR/ --mode auto --json
$S run parse_html.py  <saved.html> --url https://COMPETITOR/ --json
$S run agentic_check.py https://COMPETITOR/ --json

# Then the comparative pass
/seo-page https://COMPETITOR/pricing        # if it exists at all
/seo-content https://COMPETITOR/<their best article>
```

With a DataForSEO key, `seo-dataforseo` adds the parts guesswork cannot:
`dataforseo_labs_google_competitors_domain` to find who actually competes for your terms
rather than who you think does, `dataforseo_labs_google_domain_intersection` for the
keyword gap, and `business_data_business_listings_search` for local pack reality.

## The analysis that matters most

Once the table is filled, answer one question in a paragraph:

> **On which queries does a competitor win purely on authority, and on which do they win
> because their page is genuinely better?**

The first group is a link-building and time problem and mostly not worth chasing from a
standing start. The second group is a content problem you can fix this quarter. Most
agency SEO plans burn their budget on the first group because it is easier to put in a
slide.

## What is already known without any competitor data

Three structural advantages are visible from your own site alone, and they hold
regardless of what the competitor table says:

1. **Published pricing** — rare enough in this market that it is a defensible position
   for pricing-intent queries most competitors cannot serve at all.
2. **Derived arithmetic** — the seven articles show their working. Agency content in
   this category overwhelmingly asserts benchmarks without deriving them, which makes
   your version the more quotable one to an answer engine.
3. **Three ungated calculators** — competitors in this space typically gate these behind
   a form, which means they cannot be linked to usefully. Yours can.

And one structural disadvantage, equally visible: **no Google Business Profile, no
backlinks, no team entities.** Any competitor with a claimed GBP and twenty reviews
currently beats you on every local query regardless of page quality.
