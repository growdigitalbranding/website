"use client";

import Link from "next/link";
import { motion, type HTMLMotionProps } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Enter-on-scroll wrapper. `once: true` so nothing re-animates on scroll back,
 * which is the clearest tell of a template.
 */
export function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className,
  ...rest
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
} & Omit<HTMLMotionProps<"div">, "children">) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Filled pill. Lime ground with ink text, which is the pairing that clears AA. */
export function PrimaryCta({
  label = "Book a call",
  href = "/contact",
  type,
  disabled,
}: {
  label?: string;
  href?: string;
  type?: "submit";
  disabled?: boolean;
}) {
  const cls =
    "primary-cta inline-flex items-center justify-center rounded-full bg-signal-bright text-ink font-medium uppercase tracking-widest " +
    "px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base disabled:opacity-60";
  if (type === "submit") {
    return (
      <button type="submit" className={cls} disabled={disabled}>
        {label}
      </button>
    );
  }
  return (
    <Link href={href} className={cls}>
      {label}
    </Link>
  );
}

/** Outline pill with a nudging arrow. */
export function GhostCta({
  label = "See how the loop works",
  href = "#the-leak",
}: {
  label?: string;
  href?: string;
}) {
  return (
    <Link href={href} className="ghost-cta group inline-flex items-center gap-2 rounded-full font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base">
      {label}
      <ArrowDown
        size={16}
        strokeWidth={1.5}
        className="transition-transform duration-200 ease-out group-hover:translate-y-[3px]"
      />
    </Link>
  );
}

/** Ghost pill used on the case cards. */
export function CaseButton({ href = "/work" }: { href?: string }) {
  return (
    <Link href={href} className="ghost-cta group inline-flex items-center gap-2 rounded-full font-medium uppercase tracking-widest px-5 py-2.5 text-xs sm:text-sm shrink-0">
      Read the case
      <ArrowUpRight
        size={15}
        strokeWidth={1.5}
        className="transition-transform duration-200 ease-out group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
      />
    </Link>
  );
}
