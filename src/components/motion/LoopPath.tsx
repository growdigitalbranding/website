"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { useMediaQuery } from "@/lib/motion/useMediaQuery";

const STATIONS = [
  { id: "creative-engine", label: "01 CREATIVE ENGINE" },
  { id: "signal-layer", label: "02 SIGNAL LAYER" },
  { id: "follow-up-loop", label: "03 FOLLOW-UP LOOP" },
  { id: "answer-visibility", label: "04 ANSWER VISIBILITY" },
];

const PACKET_STAGES = [
  "IMPRESSION",
  "CREATIVE",
  "CLICK",
  "LEAD",
  "FOLLOW-UP",
  "SITE VISIT",
  "BOOKING",
  "↩",
];

/**
 * The site's signature element: one continuous path threading down the page,
 * turning to --pulse at "The Return" and curving back up the left gutter.
 * Draw progress is bound to overall scroll depth via stroke-dashoffset.
 */
export function LoopPath() {
  const pathRef = useRef<SVGPathElement>(null);
  const pulsePathRef = useRef<SVGPathElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const reduced = useReducedMotion();
  const progress = reduced ? 1 : scrollProgress;

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        setScrollProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  useEffect(() => {
    // The outbound (signal) leg draws over the first 70% of the page; the
    // return (pulse) leg draws over the last 30%. The 0.15 floor is the slice
    // the hero load sequence shows before any scrolling happens.
    const legs: [SVGPathElement | null, number][] = [
      [pathRef.current, Math.min(1, 0.15 + progress / 0.7)],
      [pulsePathRef.current, Math.max(0, (progress - 0.7) / 0.3)],
    ];
    for (const [el, drawn] of legs) {
      if (!el) continue;
      const length = el.getTotalLength();
      if (!length) continue;
      el.style.strokeDasharray = `${length}`;
      el.style.strokeDashoffset = `${length * (1 - drawn)}`;
      el.style.opacity = drawn <= 0 ? "0" : "1";
    }
  }, [progress, isMobile]);

  const stageIndex = Math.min(
    PACKET_STAGES.length - 1,
    Math.floor(progress * PACKET_STAGES.length)
  );

  if (isMobile) {
    return (
      <>
        <svg
          viewBox="0 0 100 800"
          preserveAspectRatio="none"
          className="fixed inset-0 h-full w-full pointer-events-none z-[1] opacity-60"
        >
          <path
            ref={pathRef}
            d="M 5 0 V 800"
            stroke="var(--signal)"
            strokeWidth={2}
            vectorEffect="non-scaling-stroke"
            fill="none"
          />
        </svg>
        <PacketReadout stage={PACKET_STAGES[stageIndex]} />
      </>
    );
  }

  return (
    <>
      <svg
        viewBox="0 0 100 800"
        preserveAspectRatio="none"
        className="fixed inset-0 h-full w-full pointer-events-none z-[1] opacity-60"
      >
        <path
          ref={pathRef}
          d="M 88 0 C 88 90, 74 130, 74 200 S 92 300, 92 380 S 74 470, 74 550 S 90 640, 90 710 L 90 730"
          stroke="var(--signal)"
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
          fill="none"
        />
        <path
          ref={pulsePathRef}
          d="M 90 730 C 90 775, 3 775, 3 700 L 3 40 C 3 8, 40 0, 88 0"
          stroke="var(--pulse)"
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
          fill="none"
        />
        {STATIONS.map((s, i) => (
          <circle
            key={s.id}
            cx={i % 2 === 0 ? 74 : 92}
            cy={200 + i * 120}
            r={progress > (i + 1) / 6 ? 1.2 : 0}
            fill="var(--signal)"
            className="transition-[r] duration-500"
          />
        ))}
      </svg>
      <PacketReadout stage={PACKET_STAGES[stageIndex]} />
    </>
  );
}

function PacketReadout({ stage }: { stage: string }) {
  return (
    <div className="fixed bottom-4 left-4 z-10 font-mono text-[10px] tracking-[0.14em] text-graphite/70 hidden md:block">
      PACKET: {stage}
    </div>
  );
}
