# Off-site checklist — the part that decides the ranking

**Why this exists.** The website side is done. It is server-rendered, has correct
canonicals, one owner page per keyword, cited sources, structured data,
`llms.txt`, and IndexNow on every deploy. What still decides whether you reach
the top three is outside the site:

- a Google Business Profile
- reviews
- listings
- links
- mentions

Nothing on the site substitutes for these, and nobody can promise a position.
Search engines and AI assistants choose who to rank and cite; the work below
makes you eligible and trustworthy enough to be chosen.

Do these in order. Every item has copy ready to paste.

---

## 0. Inputs only you can supply

These unblock several items below. Send them over and I will wire each one into
the site the same day.

| Needed | Unblocks |
|---|---|
| Street address, or confirmation that you do not receive clients at an address | Google Business Profile setup; `address` and `geo` in schema |
| Business hours | GBP; `openingHours` in schema |
| Name and LinkedIn URL of the person who runs the work | A named author on every article (`Person` schema), the single biggest remaining trust signal |
| One real photograph: a portrait, or you at work | `/about`, GBP, author pages |
| Written permission from one client to publish their figures | The first real case study |
| The GBP URL, once claimed | `sameAs` in schema |

---

## 1. Google Business Profile — do this first

This is the highest-value action in the whole plan. Searches like "real estate
marketing agency Coimbatore" and "digital marketing course in Coimbatore" show
the map pack above the organic results, and you are not in it.

### Step 1: create or claim the profile

Go to business.google.com and sign in with the Google account that should own
the profile long term (a business account, not a personal one).

1. Search for `growdigitalbranding`. If a profile already exists, claim it.
   Otherwise choose "Add your business".
2. **Business name:** `growdigitalbranding`, exactly. Do not add keywords such
   as "Digital Marketing Agency Coimbatore" to the name. Google's guidelines
   prohibit it, and it is a common reason profiles get suspended.
3. **Primary category:** Marketing agency
4. **Location: show the address.** The classroom course means trainees come to
   you, so this is a business customers visit, not a hidden service-area
   business. Enter the street address exactly as it will appear everywhere else
   (see §3), and place the map pin on the building.
5. **Service areas** (in addition to the address): Coimbatore, Tamil Nadu and
   Bengaluru, Karnataka.
6. **Phone:** +91 70107 49648
7. **Website:** https://growdigitalbranding.com
8. **Verify.** Google decides the method. It is usually a video recording
   showing the signboard, the inside of the office and something that proves you
   operate there, such as the workspace or business documents. Have a sign with
   the business name visible before you start. Verification can take a few days
   and nothing shows publicly until it is done.

### Step 2: complete the profile

- **Additional categories:** Internet marketing service, Advertising agency, and
  one training category. Type "training" in the category box and pick the
  closest available, such as "Computer training school" or "Training centre".
  Only add it because you actually teach there.
- **Hours:** your real office hours. If classes run outside them (weekend
  batches), add the class days to the hours, or the profile will show
  "Closed" when trainees arrive.
- **Description.** Paste as is; it is 646 characters, within the 750 limit:

> growdigitalbranding is a performance marketing agency in Coimbatore for real
> estate developers across Tamil Nadu and Karnataka. We run Facebook, Instagram
> and Google Ads for builders and measure them in cost per booking, not cost per
> lead. The work covers campaign structure, ad creative, server-side tracking so
> Meta and Google learn which leads became site visits, and WhatsApp follow-up
> inside the first minute. Our pricing is published on our website, starting
> with a ₹75,000 tracking setup. We also run a four-week classroom AI digital
> marketing course in Coimbatore: ₹20,000, eight trainees per batch, with a
> live project on a real account.

- **Services.** Add each one as a service, with the page link in its
  description:

| Service | Page |
|---|---|
| Facebook and Meta ads for real estate | /what-we-do/facebook-ads-real-estate |
| Google Ads for real estate | /what-we-do/google-ads-real-estate |
| WhatsApp marketing for real estate | /what-we-do/follow-up-systems |
| Real estate lead generation | /what-we-do/performance-marketing |
| Server-side tracking and Meta CAPI | /what-we-do/tracking-attribution |
| Ad creative production | /what-we-do/creative-engine |
| AI search visibility | /what-we-do/ai-search-visibility |
| AI digital marketing course (₹20,000, 4 weeks) | /training |

- **Photos.** Real ones only: the signboard, the office, the classroom with
  trainees at work (with their permission), and the team. Add the logo and a
  cover photo. No stock images.
- **Messaging:** turn on chat if someone will answer within a few hours;
  otherwise leave it off, because slow replies show on the profile.
- **Booking link:** https://growdigitalbranding.com/contact

### Step 3: keep it active

- **Posts, one a week.** Alternate two kinds:
  - **Article posts:** an article's direct-answer paragraph plus its link. Nine
    articles already exist, which is two months of posts.
  - **Batch posts, monthly:** before the 1st, post the next weekday and weekend
    batch start dates with a link to /training. The dates are on that page.
- **Reviews:** see §2. Ask trainees as well as clients, once their course or
  project is finished.

**Then:** send me the profile URL and the street address. The URL goes into
`sameAs`, and the address goes into the site's schema, the footer and the
training pages, which currently say the location is "shared on enquiry".

---

## 2. Reviews

The map pack weighs reviews heavily. The rules:

- **Ask every client, satisfied or not.** Asking only happy clients ("review
  gating") breaks Google's review policy.
- **Never offer anything in return** for a review, and never write one
  yourself or have staff write one.
- **Reply to every review**, including critical ones, briefly and specifically.

**Request message** (WhatsApp or email, with the GBP review link from the
profile's "Ask for reviews" button):

> Hi [name], thank you for working with us on [project]. If you have two
> minutes, a Google review would help other developers decide whether we are
> the right fit. An honest one, including anything we should do better:
> [review link]

**Target:** 10 genuine reviews in the first 90 days is a realistic start.
Recency matters as much as count, so keep asking steadily rather than all at
once.

---

## 3. Name, address and phone everywhere, identically

Pick one exact form and use it on every listing below, character for
character. Inconsistency across directories weakens the local signal.

```
growdigitalbranding
[street address, or "Coimbatore, Tamil Nadu" if hidden]
+91 70107 49648
https://growdigitalbranding.com
```

---

## 4. Listings that already rank on your keywords

Found in the live search results during the gap analysis. They are free, and
they are the fastest way onto page one while the site builds authority.

| Listing | Where | Why |
|---|---|---|
| **Justdial** | Categories: "Marketing Agencies for Real Estate", "Marketing Agencies for Builders & Developers", "Property Marketing Services", all in Coimbatore | Three separate Justdial pages rank for Coimbatore real estate marketing queries |
| **IndiaMART** | Product: "Real Estate Marketing Services" | Ranks on the Coimbatore query |
| **Bing Places** | bingplaces.com, import from GBP once it is live | Copilot draws on Bing's local data |
| **LinkedIn company page** | Already exists: add the website, the description above and the services | Corroborates the entity; already in `sameAs` |

**Listing description** for Justdial and IndiaMART, shorter:

> Performance marketing for real estate developers in Coimbatore, Tamil Nadu and
> Bengaluru. Facebook, Instagram and Google Ads measured in cost per booking,
> server-side tracking, and WhatsApp follow-up inside a minute. Pricing
> published at growdigitalbranding.com/pricing.

---

## 5. Search Console and Bing Webmaster Tools

1. **Google Search Console:** add a Domain property (DNS verification), or a
   URL-prefix property using the HTML tag. For the tag method, set
   `GOOGLE_SITE_VERIFICATION=<value>` on the server, run `npm run deploy`, then
   restart. The site emits the tag automatically.
2. Submit `https://growdigitalbranding.com/sitemap.xml`.
3. Under URL Inspection, request indexing for the pages that nothing outside
   the site links to yet:
   - /what-we-do/facebook-ads-real-estate
   - /what-we-do/google-ads-real-estate
   - /what-we-do/follow-up-systems
   - /real-estate-marketing-agency-bangalore
   - /insights/portal-leads-vs-own-ads-real-estate
   - /insights/pre-launch-marketing-real-estate
4. **Bing Webmaster Tools:** import the property from Search Console (one
   click), or set `BING_SITE_VERIFICATION=<value>` the same way. IndexNow
   already notifies Bing on every deploy (see §8).
5. Check Search Console's **generative AI performance report** monthly. It
   shows impressions in AI Overviews and AI Mode.

---

## 6. Links and mentions

This is the authority gap. In a niche this small, a few relevant links beat
any volume play. **Never buy links**; in a small market a spammy profile is more
visible, not less.

| Target | Ask |
|---|---|
| [Frameleads — best real estate marketing agencies in Coimbatore](https://frameleads.com/best-real-estate-marketing-agencies-in-coimbatore/real-estate) | Inclusion. Point them at /pricing; published pricing is rare enough to be a reason to list you |
| "Top real estate lead generation agencies in India" lists (getmerank, serpwizard, ritzmediaworld) | Inclusion, same pitch |
| Property trade press (e.g. Construction Week India) | A contributed piece built on one of the articles: the portal-vs-paid comparison or the pre-launch sizing formula are the most pitchable |
| Developers you already work with | A link from their site's "partners" or project page, where it is natural |
| Coimbatore business associations and CREDAI Coimbatore, if you are a member | Member directory listing |

**Outreach email** for the listicles:

> Subject: A Coimbatore real estate agency for your list
>
> Hi [name], I run growdigitalbranding, a performance marketing agency in
> Coimbatore that works only with real estate developers. Two things that might
> make us useful to your readers: we publish our pricing
> (growdigitalbranding.com/pricing), which almost nobody in this category does,
> and we report on cost per booking rather than cost per lead, with the
> arithmetic public. Happy to answer anything you need for the listing.

---

## 7. Measuring AI visibility (AEO and GEO)

Neither Search Console nor rank trackers show this properly. Once a month, ask
the same prompts in ChatGPT, Perplexity, Google AI Mode and Microsoft Copilot,
and record for each whether growdigitalbranding is **cited**, **mentioned** or
**absent**:

1. What is a good cost per lead for a real estate project in India?
2. How fast should a builder call a real estate lead?
3. Why are my Facebook leads for real estate poor quality?
4. How many ad creatives does a real estate campaign need?
5. Are 99acres leads cheaper than running your own ads?
6. How do you market a real estate project before RERA registration?
7. Channel partner vs direct leads, which is cheaper per booking?
8. Best real estate marketing agency in Coimbatore
9. Real estate marketing agency in Bangalore
10. WhatsApp marketing for real estate builders
11. Facebook ads for real estate India
12. Google Ads for real estate developers
13. What does RERA require in a real estate ad?
14. Meta Conversions API for real estate leads
15. How much does a real estate marketing agency cost in India?

Same wording every month, one spreadsheet. Expect movement in months, not
weeks, and expect the local and "best agency" prompts (8, 9, 15) to follow the
GBP and reviews rather than the site.

---

## 8. What already runs automatically

After every deploy, `npm run verify` checks that the live server is on the
commit you pushed. When it is, it submits only the URLs whose `lastmod` changed
to IndexNow, which reaches Bing and, through Bing, Copilot. Pinging for a stale
build is blocked by design. Google does not take IndexNow; it relies on the
sitemap and Search Console.

---

## The honest timeline

| When | What you should see, if the above is done |
|---|---|
| Weeks 1–4 | Pages indexed; GBP live; first listings |
| Months 2–3 | Impressions in Search Console for the long-tail question titles and the Bengaluru page; first map-pack appearances once reviews start |
| Months 3–6 | Page-one positions for the specific queries (the questions, WhatsApp, portal vs paid); first AI citations on the question prompts |
| Months 6–12 | Competing for the head terms, which depends almost entirely on reviews, links and mentions accumulated by then |

The question-shaped queries are where top-three is most realistic soonest,
because few competitors answer them with worked arithmetic. The head terms
("real estate marketing agency Coimbatore") are decided mostly by the Google
Business Profile and reviews.
