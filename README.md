# growdigitalbranding.com

The Grow marketing site — Next.js (App Router), TypeScript, Tailwind CSS v4, GSAP +
ScrollTrigger, Lenis, and Framer Motion, built to the "Instrument Paper" design spec.

## Stack

- **Framework:** Next.js 15 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS v4 + CSS custom properties (`src/styles/tokens.css`) for the
  Instrument Paper color/motion token system
- **Motion:** GSAP + ScrollTrigger (pinned scrub, `src/components/motion/PinnedScrub.tsx`),
  Lenis (smooth scroll), Framer Motion (component reveals)
- **Fonts:** Bricolage Grotesque (display), Inter Tight (body), JetBrains Mono (utility/metrics)

## Getting started

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

## Homepage structure

Seven sections, built to the loop spec:

1. **Hero** — own navbar, two-part headline, the open loop glyph, metric strip
2. **Creative marquee** — two scroll-driven rows of ad creatives
3. **The leak** — four corner artefacts, character-reveal paragraph
4. **Stations** — the one dark block, five rows, `↩` return row in `--pulse`
5. **Proof** — sticky-stacking case cards, metric bar above the images
6. **Objections** — retained from the earlier build; the FAQPage schema source
7. **Final CTA** — the loop glyph again, closed, plus the three-field form

The glyph opening in the hero and closing in the final CTA is the page's spine.
`LoopGlyph` takes a `closed` prop; nothing else differs between the two.

## Assets still needed

Placeholders render as `--mist` blocks labelled with the exact filename, never
stock imagery. Drop the files in and flip the flag at the top of the component:

| Where | Files | Flag |
|---|---|---|
| `/public/creatives/` | `c-01.webp` … `c-21.webp` (11 at 4:5, 10 at 1:1) | `HAS_ASSETS` in `CreativeMarqueeSection.tsx` |
| `/public/proof/` | `villas-`, `plots-`, `senior-` `01..03.webp` | `HAS_ASSETS` in `ProofSection.tsx` |

Every figure on the page is placeholder until replaced with numbers you can
evidence from a dashboard screenshot.

## Not yet wired

- `/api/lead` logs submissions but has no n8n/WhatsApp/Postgres connection, so
  the "inside one working hour" promise is not yet real.
- `/work` and `/insights` are placeholder indexes.
- The final CTA's confirmation card links to real pages but the calendar embed
  and checklist download are not provisioned.

## Design tokens

Color, timing, and easing tokens live in `src/styles/tokens.css`, mapped into Tailwind via
`@theme inline` in `src/app/globals.css` (e.g. `bg-paper`, `text-signal`, `font-mono`).

### The two greens

The brand lime is too light to carry text on a light ground (1.8:1 against `--paper`), so the
accent is split into two tokens with **non-interchangeable** roles:

| Token | Value | Use it for | Never |
|---|---|---|---|
| `--signal` | `#147700` | Type, links, focus rings, borders, station numbers. 5.0:1 on `--paper`, 4.6:1 on `--paper-2`, 3.1:1 on `--ink`. | — |
| `--signal-bright` | `#8DC63F` | Button/bar **fills** (always with `text-ink`, 8.8:1), accents on dark grounds, the loop stroke. | As text on `--paper` or `--paper-2` — it fails AA badly |

`--pulse` (`#FF8A3D`) stays semantic: it marks only the return leg of the loop. `--flag`
(`#C8102E`) is reserved for negative deltas and errors.

Re-run the contrast check after changing any of these — every pairing above is AA or better,
and the split only works if that stays true.
