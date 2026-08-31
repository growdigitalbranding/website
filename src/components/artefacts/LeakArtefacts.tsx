/**
 * The four failure artefacts for the Leak section. All drawn in --ink at 1.5px
 * on transparent ground: no fills, no shadows. Each one states a specific
 * failure rather than decorating the corner.
 */

const S = {
  fill: "none" as const,
  stroke: "var(--ink)",
  strokeWidth: 1.5,
  vectorEffect: "non-scaling-stroke" as const,
};

/** A circuit that fails to close, with a visible gap. */
export function BrokenArc() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-auto" role="img" aria-label="A circuit that never closes">
      <path d="M 60 12 A 48 48 0 1 1 24 96" {...S} strokeLinecap="round" />
      <circle cx="60" cy="12" r="4" {...S} />
      <circle cx="24" cy="96" r="4" {...S} />
      <path d="M 34 104 L 44 112" {...S} strokeLinecap="round" opacity={0.5} />
      <path d="M 40 100 L 50 108" {...S} strokeLinecap="round" opacity={0.3} />
    </svg>
  );
}

/** A metric card: CPL flat while bookings trend down. */
export function CplReadout() {
  return (
    <svg viewBox="0 0 130 100" className="w-full h-auto" role="img" aria-label="Cost per lead flat while bookings fall">
      <rect x="4" y="4" width="122" height="92" rx="8" {...S} />
      <path d="M 4 30 H 126" {...S} opacity={0.4} />
      <text x="14" y="22" className="font-mono" fontSize="9" fill="var(--graphite)">
        CPL
      </text>
      <text x="96" y="22" className="font-mono" fontSize="9" fill="var(--graphite)">
        BOOKINGS
      </text>
      {/* CPL: flat */}
      <path d="M 14 62 H 58" {...S} strokeLinecap="round" />
      {/* Bookings: falling */}
      <path d="M 72 46 L 88 56 L 104 62 L 116 78" {...S} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 116 78 l -6 -2 m 6 2 l 2 -6" {...S} strokeLinecap="round" />
    </svg>
  );
}

/** A chat stack where the reply never arrives. */
export function DeadThread() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-auto" role="img" aria-label="A lead thread with no reply">
      <path d="M 8 14 h 62 a 6 6 0 0 1 6 6 v 20 a 6 6 0 0 1 -6 6 h -50 l -12 10 v -10 a 6 6 0 0 1 -6 -6 v -20 a 6 6 0 0 1 6 -6 z" {...S} />
      <path d="M 20 26 h 38 M 20 34 h 26" {...S} strokeLinecap="round" opacity={0.45} />
      {/* The reply that never came: dashed, empty. */}
      <path
        d="M 44 66 h 62 a 6 6 0 0 1 6 6 v 22 a 6 6 0 0 1 -6 6 h -62 a 6 6 0 0 1 -6 -6 v -22 a 6 6 0 0 1 6 -6 z"
        {...S}
        strokeDasharray="4 5"
        opacity={0.55}
      />
      <circle cx="62" cy="83" r="2.5" fill="var(--ink)" opacity={0.3} />
      <circle cx="75" cy="83" r="2.5" fill="var(--ink)" opacity={0.3} />
      <circle cx="88" cy="83" r="2.5" fill="var(--ink)" opacity={0.3} />
    </svg>
  );
}

/** Pixel/CAPI diagram with the server leg missing. */
export function BlindPixel() {
  return (
    <svg viewBox="0 0 140 100" className="w-full h-auto" role="img" aria-label="Browser pixel present, server leg missing">
      <rect x="4" y="34" width="42" height="30" rx="6" {...S} />
      <text x="25" y="53" textAnchor="middle" className="font-mono" fontSize="8" fill="var(--graphite)">
        BROWSER
      </text>
      <rect x="94" y="34" width="42" height="30" rx="6" {...S} />
      <text x="115" y="53" textAnchor="middle" className="font-mono" fontSize="8" fill="var(--graphite)">
        PLATFORM
      </text>
      {/* Browser leg: present */}
      <path d="M 46 44 H 94" {...S} strokeLinecap="round" />
      <path d="M 94 44 l -6 -3 m 6 3 l -6 3" {...S} strokeLinecap="round" />
      {/* Server leg: missing */}
      <rect x="49" y="76" width="42" height="20" rx="5" {...S} strokeDasharray="4 5" opacity={0.5} />
      <text x="70" y="90" textAnchor="middle" className="font-mono" fontSize="7" fill="var(--graphite)" opacity={0.6}>
        NO SERVER
      </text>
      <path d="M 46 56 Q 70 76 49 84" {...S} strokeDasharray="4 5" opacity={0.4} />
    </svg>
  );
}
