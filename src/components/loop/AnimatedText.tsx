"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

/**
 * Character-by-character scroll reveal.
 *
 * Each character used to render twice: a transparent placeholder to hold the
 * line box, plus an absolutely positioned animated copy on top. The placeholder
 * was there because the animated span was absolute, and the span was absolute
 * for no reason, since the only animated property is opacity and opacity never
 * reflows. The cost of that pair was real: text extraction returned every
 * character doubled, so the leak paragraph, the most argumentative copy on the
 * site, was indexable as "y y o o u u r r  c c o o s s t t".
 *
 * One span per character now. Half the DOM, correct text, same reveal.
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
    // Two spans, not one per character: nothing is animating, so the split
    // only has to mark where the highlight starts.
    const cut = highlightFrom ?? text.length;
    return (
      <p ref={ref} className={className}>
        <span style={{ color: "var(--ink)" }}>{text.slice(0, cut)}</span>
        {cut < text.length && (
          <span style={{ color: "var(--signal)" }}>{text.slice(cut)}</span>
        )}
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
    <motion.span
      className="whitespace-pre"
      style={{ opacity, color: highlight ? "var(--signal)" : "var(--ink)" }}
    >
      {char}
    </motion.span>
  );
}
