"use client";

import Link from "next/link";
import { LoopGlyph } from "@/components/loop/LoopGlyph";
import { Magnet } from "@/components/loop/Magnet";
import { FadeIn, PrimaryCta } from "@/components/loop/ui";

const NAV = [
  { href: "/the-loop", label: "The Loop" },
  { href: "/what-we-do", label: "What we do" },
  { href: "/work", label: "Work" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
];


export function HeroSection() {
  return (
    <section
      className="relative flex flex-col min-h-[100dvh] bg-paper"
      style={{ overflowX: "clip" }}
    >
      <FadeIn y={-20} delay={0} className="px-6 md:px-10 pt-6 md:pt-8">
        <div className="flex items-center justify-between gap-6">
          <Link
            href="/"
            className="font-display font-extrabold uppercase tracking-tight text-xl md:text-2xl text-ink"
          >
            Grow
          </Link>
          <nav className="hidden md:flex items-center gap-7 lg:gap-9">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="nav-link text-ink font-medium uppercase tracking-wider text-sm md:text-base lg:text-[1.05rem]"
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/contact"
            className="nav-link md:hidden text-ink font-medium uppercase tracking-wider text-sm"
          >
            Contact
          </Link>
        </div>
      </FadeIn>

      <FadeIn y={12} delay={0.1} className="px-6 md:px-10 mt-16 sm:mt-20">
        <p className="mono-label">Performance marketing for builders &amp; developers</p>
      </FadeIn>

      <h1 className="w-full px-6 md:px-10 overflow-hidden">
        <FadeIn y={30} delay={0.2}>
          <span className="block font-display font-medium lowercase tracking-tight text-graphite leading-none mb-2 md:mb-3 text-[5vw] sm:text-[4.2vw] md:text-[3.4vw] lg:text-[2.8vw]">
            most agencies stop at the lead.
          </span>
        </FadeIn>
        <FadeIn y={44} delay={0.32}>
          <span className="display-grad block font-display font-extrabold lowercase tracking-tight leading-none whitespace-nowrap mt-1 md:-mt-2 text-[11.2vw] sm:text-[11.9vw] md:text-[12.3vw] lg:text-[12.6vw]">
            we run the loop
          </span>
        </FadeIn>
      </h1>

      {/* In flow rather than absolutely placed: the free band between the
          headline and the metric strip measures ~250-270px at desktop, so a
          fixed 440px glyph could only ever collide with the type. Flow lets it
          centre in whatever space the viewport actually leaves. */}
      <FadeIn
        y={24}
        delay={0.6}
        className="flex-1 min-h-0 flex items-center justify-center py-4"
      >
        <Magnet padding={150} strength={3}>
          <LoopGlyph
            drawOnMount
            className="h-auto w-[130px] sm:w-[160px] md:w-[185px] lg:w-[205px]"
          />
        </Magnet>
      </FadeIn>

      <div>
        <div className="flex justify-between items-end gap-6 px-6 md:px-10 pb-7 sm:pb-8 md:pb-10">
          <FadeIn y={20} delay={0.45}>
            <p
              className="text-graphite font-light lowercase tracking-wide leading-snug max-w-[180px] sm:max-w-[240px] md:max-w-[280px]"
              style={{ fontSize: "clamp(0.75rem, 1.4vw, 1.15rem)" }}
            >
              full-loop performance marketing for real estate developers across tamil nadu
              &amp; karnataka
            </p>
          </FadeIn>
          <FadeIn y={20} delay={0.5}>
            <PrimaryCta />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
