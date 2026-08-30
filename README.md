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

## What's built vs. what's next

Phases 0–2 (foundation, homepage, conversion spine) are live: the full homepage with the
signature Loop path, all four station sections, the Return, proof, objections, and a working
3-field contact form. `/what-we-do`, `/who-we-help`, `/pricing`, `/about`, `/the-loop`, and the
three `/tools` calculators are built with real (if concise) copy and, where relevant, working
interactivity.

**Not yet wired:**
- `/api/lead` logs submissions server-side but isn't connected to n8n/WhatsApp/Slack or a
  database yet (see the `TODO` in `src/app/api/lead/route.ts`) — provision Postgres + the n8n
  webhook and wire it in.
- `/work` and `/insights` are placeholder indexes — the case-study and MDX article pipelines
  (Phases 4–5) aren't built.
- Off-site entity footprint (Phase 7) is inherently not a code task.
- Client logos in the homepage marquee and the phone number in the footer are placeholders —
  swap before launch.

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
