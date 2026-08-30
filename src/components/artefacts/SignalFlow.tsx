"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

// Station 02. Browser and CRM both feed the server-side container, which fans
// one deduplicated event out to each platform endpoint.
const ENDPOINTS = [
  { label: "Meta CAPI", y: 26 },
  { label: "GA4", y: 76 },
  { label: "Google Ads", y: 126 },
];

export function SignalFlow() {
  const reduced = useReducedMotion();

  return (
    <figure className="m-0">
      <svg viewBox="0 0 320 152" className="w-full h-auto" role="img"
        aria-label="Browser and CRM events flow into a server-side container, which forwards one deduplicated event to Meta CAPI, GA4 and Google Ads.">
        {/* sources */}
        <Node x={4} y={40} w={72} label="Browser" />
        <Node x={4} y={90} w={72} label="CRM" />

        {/* hub */}
        <rect x={116} y={54} width={78} height={44} rx={6}
          className="fill-[var(--paper)] stroke-[var(--signal)]" strokeWidth={1.5} />
        <text x={155} y={72} textAnchor="middle"
          className="fill-[var(--ink)] font-mono text-[9px]">server-side</text>
        <text x={155} y={85} textAnchor="middle"
          className="fill-[var(--ink)] font-mono text-[9px]">GTM</text>

        {/* source -> hub */}
        {[52, 102].map((y, i) => (
          <path key={i} d={`M 76 ${y} H 96 Q 106 ${y} 106 ${y < 76 ? y + 14 : y - 14} V 76 H 116`}
            className="stroke-[var(--mist)]" strokeWidth={1.5} fill="none" />
        ))}

        {/* hub -> endpoints */}
        {ENDPOINTS.map((e, i) => (
          <g key={e.label}>
            <path id={`flow-${i}`} d={`M 194 76 H 210 Q 220 76 220 ${e.y + 12} V ${e.y + 12} H 236`}
              className="stroke-[var(--mist)]" strokeWidth={1.5} fill="none" />
            <Node x={236} y={e.y} w={80} label={e.label} />
            {!reduced && (
              <motion.circle
                r={2.5}
                className="fill-[var(--signal-bright)]"
                initial={{ offsetDistance: "0%" }}
                animate={{ offsetDistance: "100%" }}
                transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.45, ease: "linear" }}
                style={{ offsetPath: `path("M 194 76 H 210 Q 220 76 220 ${e.y + 12} V ${e.y + 12} H 236")` }}
              />
            )}
          </g>
        ))}
      </svg>
      <figcaption className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-graphite">
        One event, deduplicated by shared event_id, fanned out server-side
      </figcaption>
    </figure>
  );
}

function Node({ x, y, w, label }: { x: number; y: number; w: number; label: string }) {
  return (
    <>
      <rect x={x} y={y} width={w} height={24} rx={5}
        className="fill-[var(--paper-2)] stroke-[var(--mist)]" strokeWidth={1.5} />
      <text x={x + w / 2} y={y + 16} textAnchor="middle"
        className="fill-[var(--ink)] font-mono text-[9px]">{label}</text>
    </>
  );
}
