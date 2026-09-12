/**
 * Brand mark, inlined as SVG so it inherits the site's loaded webfonts. An
 * external <img src="*.svg"> can reach neither the page's fonts nor its CSS
 * variables, and the wordmark needs both.
 *
 * This is a faithful rebuild of the supplied artwork, not the official
 * export. To drop the real vector in, replace the <text> elements in
 * Wordmark/Descriptor/Tagline with the outline's <path> data and keep the
 * viewBox; nothing else needs to change.
 *
 * Three variants, because the lockup has four tiers and its placements give
 * it between 32px and 56px of height. At 44px tall the "REAL ESTATE GROWTH &
 * CONVERSION" line lands around 3px, which is a smudge rather than a
 * tagline, so the tier count has to come down with the height:
 *
 *   wordmark  grow + arrow. For the hero nav row, which is a single line of
 *             ~32px and cannot carry a stacked mark at all.
 *   compact   + DIGITAL BRANDING. The inner-page header, at 44px.
 *   full      + rule + positioning line. The footer, at 56px.
 *
 * `tone` picks the ground: "ink" for the light paper pages, "paper" for the
 * dark hero and anywhere else on --ink. The arrow gradient is the same in
 * both, since the brand green is legible on either.
 */

import { BRAND_LOCKUP } from "@/lib/brand";

/**
 * The gradient id has to be unique per rendered instance or the document ends
 * up with duplicate ids, which is invalid and makes url(#...) ambiguous. The
 * mark renders at most once per variant+tone on any page (hero wordmark,
 * header compact, footer full), so keying the id on those is enough and keeps
 * this a server component. useId would force it to the client for nothing.
 */
function gradientId(variant: string, tone: string) {
  return `grow-swoosh-${variant}-${tone}`;
}

function Swoosh({ id }: { id: string }) {
  return (
    <>
      {/* The rising arrow, crossing the wordmark as in the supplied art */}
      <path
        d="M6 96 C 92 93, 210 68, 300 22"
        stroke={`url(#${id})`}
        strokeWidth="15"
        fill="none"
        strokeLinecap="round"
      />
      <path d="M288 2 L334 20 L290 44 Z" fill={`url(#${id})`} />
    </>
  );
}

function Wordmark({ fill }: { fill: string }) {
  return (
    <text
      x="4"
      y="92"
      textLength="250"
      lengthAdjust="spacingAndGlyphs"
      fontFamily="var(--font-bricolage), sans-serif"
      fontSize="104"
      fontWeight="700"
      fill={fill}
    >
      grow
    </text>
  );
}

function Descriptor({ fill }: { fill: string }) {
  return (
    <text
      x="6"
      y="142"
      textLength="300"
      lengthAdjust="spacingAndGlyphs"
      fontFamily="var(--font-inter-tight), sans-serif"
      fontSize="29"
      fontWeight="700"
      fill={fill}
    >
      DIGITAL BRANDING
    </text>
  );
}

export function Logo({
  className,
  variant = "compact",
  tone = "ink",
}: {
  className?: string;
  variant?: "wordmark" | "compact" | "full";
  tone?: "ink" | "paper";
}) {
  const full = variant === "full";
  const bare = variant === "wordmark";
  const fill = tone === "paper" ? "var(--paper)" : "var(--ink)";
  // The rule and the positioning line are the quiet tier in both tones: a
  // hairline on paper, and the same hairline weight in reverse on ink.
  const rule = tone === "paper" ? "rgba(239,240,236,0.22)" : "var(--mist)";
  const quiet = tone === "paper" ? "rgba(239,240,236,0.7)" : "var(--graphite)";
  const gid = gradientId(variant, tone);

  return (
    <svg
      viewBox={full ? "-8 0 352 190" : bare ? "-8 0 352 118" : "-8 0 352 148"}
      role="img"
      aria-label={BRAND_LOCKUP}
      className={className}
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--signal-bright)" />
          <stop offset="55%" stopColor="#a6d137" />
          <stop offset="100%" stopColor="#d7df23" />
        </linearGradient>
      </defs>

      <Wordmark fill={fill} />
      <Swoosh id={gid} />
      {!bare && <Descriptor fill={fill} />}

      {full && (
        <>
          {/* Hairline rule, then the positioning line beneath it */}
          <line
            x1="6"
            y1="160"
            x2="338"
            y2="160"
            stroke={rule}
            strokeWidth="2"
          />
          <text
            x="6"
            y="184"
            textLength="332"
            lengthAdjust="spacingAndGlyphs"
            fontFamily="var(--font-inter-tight), sans-serif"
            fontSize="19"
            fontWeight="500"
            fill={quiet}
          >
            REAL ESTATE GROWTH &amp; CONVERSION
          </text>
        </>
      )}
    </svg>
  );
}
