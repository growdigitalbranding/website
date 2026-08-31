"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LoopPath } from "@/components/motion/LoopPath";
import { FooterSection } from "@/components/sections/FooterSection";

/**
 * The homepage carries its own navbar inside the hero and its own footer, and
 * uses the LoopGlyph as its loop device rather than the scroll-drawn gutter
 * path. Inner pages keep the shared header, footer and gutter path.
 */
export function SiteChrome({ slot }: { slot: "top" | "bottom" }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  // The dashboard is a different product with a different job. Giving it the
  // marketing nav, the scroll-drawn loop gutter and the packet readout would
  // put "Book a 30-min call" above a list of people who already did.
  if (pathname.startsWith("/admin")) return null;

  if (slot === "top") {
    if (isHome) return null;
    return (
      <>
        <LoopPath />
        <Header />
      </>
    );
  }

  return isHome ? <FooterSection /> : <Footer />;
}
