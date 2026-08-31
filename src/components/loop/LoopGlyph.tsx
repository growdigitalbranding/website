"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

/**
 * The site's signature mark: an open circuit that leaves a node at the top,
 * travels clockwise through four nodes, and returns. The outbound run is
 * --signal, the final return quarter is --pulse.
 *
 * The hero renders it open, drawing on mount. The final CTA renders it closed,
 * which is the payoff for the open circuit at the top of the page.
 */
export function LoopGlyph({
  closed = false,
  nodes = 4,
  className,
  drawOnMount = false,
}: {
  closed?: boolean;
  nodes?: number;
  className?: string;
  drawOnMount?: boolean;
}) {
  const outRef = useRef<SVGPathElement>(null);
  const retRef = useRef<SVGPathElement>(null);
  const reduced = useReducedMotion();

  // Circle of r=70 about (80,80). The outbound arc covers three quarters from
  // the top node clockwise; the return quarter closes back to it.
  const R = 70;
  const C = 80;
  // Rounded to 3dp: Math.cos/sin differ in the last bits between Node and the
  // browser, which is enough to make the server and client path strings
  // disagree and trip a hydration mismatch.
  const round = (n: number) => Math.round(n * 1000) / 1000;
  const pt = (deg: number) => {
    const a = ((deg - 90) * Math.PI) / 180;
    return [round(C + R * Math.cos(a)), round(C + R * Math.sin(a))] as const;
  };
  const [sx, sy] = pt(0);
  const [ex, ey] = pt(270);
  // A small gap keeps the circuit visibly open unless `closed`.
  const [gx, gy] = pt(closed ? 360 : 344);

  const outbound = `M ${sx} ${sy} A ${R} ${R} 0 1 1 ${ex} ${ey}`;
  const ret = `M ${ex} ${ey} A ${R} ${R} 0 0 1 ${gx} ${gy}`;

  const nodeAngles = Array.from({ length: nodes }, (_, i) => (360 / nodes) * i);

  useEffect(() => {
    const els = [outRef.current, retRef.current];
    for (const el of els) {
      if (!el) continue;
      const len = el.getTotalLength();
      if (!len) continue;
      el.style.strokeDasharray = `${len}`;
      if (reduced || !drawOnMount) {
        el.style.strokeDashoffset = "0";
      } else {
        el.style.strokeDashoffset = `${len}`;
        // Draw is a transition, not a keyframe, so it stays interruptible.
        requestAnimationFrame(() => {
          el.style.transition = "stroke-dashoffset 1600ms cubic-bezier(0.65, 0, 0.35, 1)";
          el.style.strokeDashoffset = "0";
        });
      }
    }
  }, [reduced, drawOnMount, closed]);

  return (
    <svg viewBox="0 0 160 160" className={className} role="img" aria-label="The loop">
      <path
        ref={outRef}
        d={outbound}
        fill="none"
        stroke="var(--signal)"
        strokeWidth={2}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      <path
        ref={retRef}
        d={ret}
        fill="none"
        stroke="var(--pulse)"
        strokeWidth={2}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      {nodeAngles.map((deg, i) => {
        const [x, y] = pt(deg);
        const isReturn = i === nodes - 1;
        return (
          <circle
            key={deg}
            cx={x}
            cy={y}
            r={5}
            fill="var(--paper)"
            stroke={isReturn ? "var(--pulse)" : "var(--signal)"}
            strokeWidth={2}
            vectorEffect="non-scaling-stroke"
            className={drawOnMount && !reduced ? "loop-node" : undefined}
            style={
              drawOnMount && !reduced
                ? { animationDelay: `${300 + i * 300}ms`, transformBox: "fill-box", transformOrigin: "center" }
                : undefined
            }
          />
        );
      })}
    </svg>
  );
}
