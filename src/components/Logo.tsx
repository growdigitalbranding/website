/**
 * Brand mark, inlined as SVG so it inherits the site's loaded webfonts — an
 * external <img src="*.svg"> can reach neither the page's fonts nor its CSS
 * variables. `textLength` pins each line's width, so the mark keeps its
 * proportions even if a font is still swapping in.
 *
 * This is a faithful rebuild, not the official artwork. To use the real
 * export, replace the two <text> elements with the vector's <path> data.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 340 150"
      role="img"
      aria-label="Grow Digital Branding"
      className={className}
    >
      <defs>
        <linearGradient id="grow-swoosh" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#8DC63F" />
          <stop offset="55%" stopColor="#A6D137" />
          <stop offset="100%" stopColor="#D7DF23" />
        </linearGradient>
      </defs>

      <text
        x="6"
        y="92"
        textLength="252"
        lengthAdjust="spacingAndGlyphs"
        fontFamily="var(--font-bricolage), sans-serif"
        fontSize="96"
        fontWeight="700"
        fill="#8A8C8E"
      >
        grow
      </text>

      {/* The rising swoosh, crossing the wordmark */}
      <path
        d="M12 82 C 92 78, 196 66, 286 24"
        stroke="url(#grow-swoosh)"
        strokeWidth="14"
        fill="none"
        strokeLinecap="round"
      />
      <path d="M274 4 L322 20 L278 46 Z" fill="url(#grow-swoosh)" />

      <text
        x="62"
        y="128"
        textLength="262"
        lengthAdjust="spacingAndGlyphs"
        fontFamily="var(--font-inter-tight), sans-serif"
        fontSize="30"
        fontWeight="700"
        fill="#8A8C8E"
      >
        DIGITAL BRANDING
      </text>
    </svg>
  );
}
