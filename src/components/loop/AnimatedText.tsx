"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

/**
 * Character-by-character scroll reveal. Each character renders an invisible
 * placeholder plus an absolutely positioned animated span, so the paragraph
 * never reflows as it animates.
 *
 * `highlightFrom` is a character index. Everything past it resolves to
 * --signal rather than --ink, which is how the thesis sentence carries the
 * only colour in the section.
 */
export function AnimatedText({
  text,
  highlightFrom,
  className,
}: {
  text: string;
  highlightFrom?: number;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  const chars = [...text];

  if (reduced) {
    return (
      <p ref={ref} className={className}>
        {chars.map((c, i) => (
          <span
            key={i}
            style={{
              color:
                highlightFrom !== undefined && i >= highlightFrom
                  ? "var(--signal)"
                  : "var(--ink)",
            }}
          >
            {c}
          </span>
        ))}
      </p>
    );
  }

  return (
    <p ref={ref} className={className}>
      {chars.map((c, i) => (
        <Char
          key={i}
          char={c}
          index={i}
          total={chars.length}
          progress={scrollYProgress}
          highlight={highlightFrom !== undefined && i >= highlightFrom}
        />
      ))}
    </p>
  );
}

function Char({
  char,
  index,
  total,
  progress,
  highlight,
}: {
  char: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  highlight: boolean;
}) {
  const start = index / total;
  const end = start + 1 / total;
  const opacity = useTransform(progress, [start, end], [0.25, 1]);

  return (
    <span className="relative inline-block whitespace-pre">
      <span className="opacity-0" aria-hidden="true">
        {char}
      </span>
      <motion.span
        className="absolute left-0 top-0"
        style={{ opacity, color: highlight ? "var(--signal)" : "var(--ink)" }}
      >
        {char}
      </motion.span>
    </span>
  );
}
