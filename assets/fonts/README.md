# Fonts for generated Open Graph images

These are here for `next/og` only. The site itself loads Bricolage Grotesque,
Inter Tight and JetBrains Mono through `next/font`, which fetches and subsets
woff2 at build time; satori (what `ImageResponse` runs on) cannot read woff2,
so the OG image route needs a TTF on disk.

Both families are SIL Open Font License 1.1. The licence text ships beside
each file, as the OFL requires when the font is redistributed.

- `BricolageGrotesque-Bold.ttf` — the display face, for the headline
- `JetBrainsMono-Regular.ttf` — the mono face, for the eyebrow and the domain
