"use client";

import { useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

/**
 * True once the page has scrolled past `threshold`.
 *
 * Reads scroll through Motion's `useScroll` rather than a raw scroll listener,
 * so nothing runs on the React render path per frame. State flips only when the
 * threshold is actually crossed, not on every scroll event.
 */
export function useScrolledPast({
  pixels,
  progress,
}: {
  pixels?: number;
  progress?: number;
}) {
  const [past, setPast] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const source = pixels !== undefined ? scrollY : scrollYProgress;
  const limit = pixels !== undefined ? pixels : (progress ?? 0);

  useMotionValueEvent(source, "change", (value) => {
    const next = value > limit;
    setPast((prev) => (prev === next ? prev : next));
  });

  return past;
}
