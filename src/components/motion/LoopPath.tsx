"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
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
 *
 * Scroll drives the stroke offsets imperatively through Motion values, so the
 * per-frame work never touches React state. Only the packet label and the
 * station nodes re-render, and those change a handful of times per page.
 */
export function LoopPath() {
  const signalRef = useRef<SVGPathElement>(null);
  const pulseRef = useRef<SVGPathElement>(null);
  const mobileRef = useRef<SVGPathElement>(null);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const reduced = useReducedMotion();

  const [stageIndex, setStageIndex] = useState(0);
  const [nodesLit, setNodesLit] = useState(0);

  const { scrollYProgress } = useScroll();

  // The outbound (signal) leg draws over the first 70% of the page; the return
  // (pulse) leg draws over the last 30%. The 0.15 floor is the slice the hero
  // load sequence shows before any scrolling happens.
  const paint = (progress: number) => {
    const legs: [SVGPathElement | null, number][] = [
      [signalRef.current, Math.min(1, 0.15 + progress / 0.7)],
      [mobileRef.current, Math.min(1, 0.15 + progress / 0.7)],
      [pulseRef.current, Math.max(0, (progress - 0.7) / 0.3)],
    ];
    for (const [el, drawn] of legs) {
      if (!el) continue;
      const length = el.getTotalLength();
      if (!length) continue;
      el.style.strokeDasharray = `${length}`;
      el.style.strokeDashoffset = `${length * (1 - drawn)}`;
      el.style.opacity = drawn <= 0 ? "0" : "1";
    }
  };

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (reduced) return;
    paint(progress);
    setStageIndex((prev) => {
      const next = Math.min(
        PACKET_STAGES.length - 1,
        Math.floor(progress * PACKET_STAGES.length)
      );
      return prev === next ? prev : next;
    });
    setNodesLit((prev) => {
      const next = STATIONS.filter((_, i) => progress > (i + 1) / 6).length;
      return prev === next ? prev : next;
    });
  });

  // Paint the initial frame, and the fully-drawn loop under reduced motion.
  useEffect(() => {
    paint(reduced ? 1 : scrollYProgress.get());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, isMobile]);

  // Under reduced motion the loop is shown complete rather than scroll-drawn,
  // so derive the end state instead of storing it.
  const stage = reduced ? PACKET_STAGES.length - 1 : stageIndex;
  const lit = reduced ? STATIONS.length : nodesLit;

  if (isMobile) {
    return (
      <>
        <svg
          viewBox="0 0 100 800"
          preserveAspectRatio="none"
          className="fixed inset-0 h-full w-full pointer-events-none z-[1] opacity-60"
        >
          <path
            ref={mobileRef}
            d="M 5 0 V 800"
            stroke="var(--signal-bright)"
            strokeWidth={2}
            vectorEffect="non-scaling-stroke"
            fill="none"
          />
        </svg>
        <PacketReadout stage={PACKET_STAGES[stage]} />
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
          ref={signalRef}
          d="M 88 0 C 88 90, 74 130, 74 200 S 92 300, 92 380 S 74 470, 74 550 S 90 640, 90 710 L 90 730"
          stroke="var(--signal-bright)"
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
          fill="none"
        />
        <path
          ref={pulseRef}
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
            r={1.2}
            fill="var(--signal-bright)"
            // Scale, not `r`. Animating the radius attribute repaints; a
            // transform stays on the GPU.
            style={{
              transformBox: "fill-box",
              transformOrigin: "center",
              transform: i < lit ? "scale(1)" : "scale(0)",
            }}
            className="transition-transform duration-300 ease-out"
          />
        ))}
      </svg>
      <PacketReadout stage={PACKET_STAGES[stage]} />
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
