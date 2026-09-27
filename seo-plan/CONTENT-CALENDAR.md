# Content Calendar — 12 months

**Cadence:** 1–2 pieces a month. Deliberately low. The editorial rule in
`src/data/insights.ts` — every number is arithmetic the reader can redo, a rate they
supply, a published price, or public record — is the moat, and it does not survive a
four-a-month schedule with one operator.

**Priority key:** P1 = do not slip. P2 = slips only behind P1. P3 = opportunistic.

---

## Quarter 1 — entity and proof

The theme is not traffic. It is making the site's claims corroborable by something
outside the site.

| Month | Piece | Type | Priority | Why now |
|---|---|---|---|---|
| 1 | **`/about/team` + per-person page** | Page | **P1** | `Person` schema with `sameAs`, real photograph, real bio. Unblocks article bylines, which is the single biggest E-E-A-T lever. Not a traffic play. |
| 1 | **Re-attribute all 7 articles to a Person author** | Edit | **P1** | One-line data change once the Person exists. Articles currently authored by a logo. |
| 1 | **Photography shoot** | Asset | **P1** | Portrait, desk/whiteboard, four artefact frames. Unblocks `/about`, `/work` and every OG card that is not an article. |
| 2 | `/compare/in-house-vs-agency` | Comparison | P1 | Highest-intent unbuilt page. The `/pricing` FAQ already answers this in two sentences — expand into the page that owns the query. |
| 2 | Article: the qualification rate | Article | P2 | The five-rate chain is covered except qualification. Completes the cluster. |
| 3 | `/compare/channel-partner-vs-performance-marketing` | Comparison | P1 | Extends the existing channel-partner article into commercial intent. |
| 3 | `/faq` hub | Page | P2 | Consolidates the FAQPage sets already scattered across 9 pages into one entity-level answer surface. |

**Quarter 1 exit criteria:** GBP claimed, GSC connected, a named human author on every
article, at least one real photograph on the site.

---

## Quarter 2 — the citable asset

| Month | Piece | Type | Priority | Why now |
|---|---|---|---|---|
| 4 | **Benchmark survey: fieldwork** | Research | **P1** | 30–60 TN/Karnataka developers, anonymised: CPL, contact rate, site-visit rate, booking rate by ticket band. Runs over 4–6 weeks. |
| 4 | Article: what a site-visit rate actually depends on | Article | P2 | Warms the topic the survey will quantify. |
| 5 | **`/benchmarks` — the survey published** | Research page | **P1** | The one asset that gives this domain a number other people cite. Ranges and distributions, method stated, sample size stated, raw anonymised table downloadable. |
| 5 | Outreach push on the survey | Off-site | **P1** | Property trade press, LinkedIn, the developers who participated. One asset pitched properly beats fifty directory links. |
| 6 | `/compare/freelancer-vs-agency` | Comparison | P2 | Now answerable with survey data rather than assertion. |
| 6 | Article: reading the survey — what the spread means for your account | Article | P2 | Converts the research into a service argument without corrupting the research. |

**Quarter 2 exit criteria:** one original dataset published and pitched; first referring
domains that were not bought.

---

## Quarter 3 — proof and depth

| Month | Piece | Type | Priority | Why now |
|---|---|---|---|---|
| 7 | **Case study #1 at its own URL** | Case study | **P1** | 1,000w+, `Article` schema, real figures with client permission. If permission is still unobtainable, substitute a fully-worked anonymised engagement built on survey ranges — and label it as such. |
| 7 | Article | Article | P2 | Topic chosen from Q1–Q2 GSC data, which will exist by now. |
| 8 | Case study #2 | Case study | P2 | |
| 8 | `/compare/meta-vs-google-real-estate` | Comparison | P2 | |
| 9 | Article ×2 | Article | P2 | First month where topic selection is data-led rather than judgement-led. |
| 9 | Refresh pass on the 7 originals | Edit | P2 | Add the external citations that could not be verified at build time; re-check every derived figure. |

**Quarter 3 exit criteria:** at least one publishable case study; topic selection driven
by real query data.

---

## Quarter 4 — authority

| Month | Piece | Type | Priority |
|---|---|---|---|
| 10 | Case study #3 | Case study | P2 |
| 10 | Article | Article | P2 |
| 11 | **Benchmark survey, wave 2** | Research | **P1** — year-on-year change is more citable than a one-off |
| 11 | Article | Article | P3 |
| 12 | Annual review: what moved and what did not | Article | P2 |
| 12 | Full re-audit + drift comparison against the Q1 baseline | Audit | **P1** |

---

## Standing rules

1. **No article ships with an unverifiable number.** The existing rule. It is why the
   content scores 84–91 on quality with zero AI-pattern hits, and it is the reason to
   publish at this cadence rather than four a month.
2. **Every article gets 2–3 external citations to primary sources**, verified by clicking
   them, at publication. The current seven have none — a gap left open deliberately
   because the build environment could not reach any source to check it.
3. **Every article links to the service page it supports and to `/benchmarks`** once that
   exists. This is what makes a cluster rather than a pile.
4. **Question-shaped H2s and a direct answer at the top.** Already the house pattern; it
   is why the AEO foundation scores well.
5. **Per-article OG card is automatic** — generated at build from the title. No manual
   work per piece.
6. **Do not build location pages** unless there is a real presence to describe. A thin
   "/real-estate-marketing-chennai" page is the classic agency self-inflicted wound.

## Topic backlog, ranked

Derivable from what the site already argues but has not written:

1. What a qualification rate depends on, and how to move it *(completes the five-rate chain)*
2. What a site-visit rate actually depends on
3. When a developer should stop running ads entirely
4. Sales-team capacity as the real constraint on ad spend
5. What to do in the first 90 days of a new project launch
6. Why cost per lead falls when quality falls, and how to see it in the data
7. Reading a media plan a competing agency sent you
8. What changes when the ticket size crosses ₹1 crore
