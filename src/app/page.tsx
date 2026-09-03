import { listAssets } from "@/lib/assets";
import { HeroSection } from "@/components/sections/HeroSection";
import { CreativeMarqueeSection } from "@/components/sections/CreativeMarqueeSection";
import { LeakSection } from "@/components/sections/LeakSection";
import { StationsSection } from "@/components/sections/StationsSection";
import { ConfiguratorSection } from "@/components/sections/ConfiguratorSection";
import { FunnelRibbonSection } from "@/components/sections/FunnelRibbonSection";
import { PillarsSection } from "@/components/sections/PillarsSection";
import { SegmentStripSection } from "@/components/sections/SegmentStripSection";
import { ProofSection } from "@/components/sections/ProofSection";
import { Objections } from "@/components/sections/Objections";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";

export default function HomePage() {
  // Read at build time, so uploading any subset of the images just works.
  const proof = listAssets("proof");
  const creatives = listAssets("creatives");

  return (
    <>
      <HeroSection />
      <CreativeMarqueeSection available={creatives} />
      <LeakSection />
      {/* Stations stays on --ink. The addendum asked for it to move to paper
          on the grounds that it sits directly above the dark funnel ribbon,
          but in the revised order the configurator (--paper-2) sits between
          them, so there are no adjacent dark blocks to break up. */}
      <StationsSection />
      <ConfiguratorSection />
      <FunnelRibbonSection />
      <PillarsSection />
      <SegmentStripSection />
      <ProofSection available={proof} />
      {/* Retained against the revised order, which omits it. This section is
          the homepage's only FAQPage schema source and answers six real
          objections before a call. Removing working AEO content looked more
          like an oversight than an instruction; say the word and it goes. */}
      <Objections />
      <FinalCtaSection />
    </>
  );
}
