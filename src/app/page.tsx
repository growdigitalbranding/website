import { HeroSection } from "@/components/sections/HeroSection";
import { CreativeMarqueeSection } from "@/components/sections/CreativeMarqueeSection";
import { LeakSection } from "@/components/sections/LeakSection";
import { StationsSection } from "@/components/sections/StationsSection";
import { ProofSection } from "@/components/sections/ProofSection";
import { Objections } from "@/components/sections/Objections";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CreativeMarqueeSection />
      <LeakSection />
      <StationsSection />
      <ProofSection />
      {/* Retained from the previous build: the FAQPage schema source, and the
          six answers that do the objection-handling work before a call. */}
      <Objections />
      <FinalCtaSection />
    </>
  );
}
