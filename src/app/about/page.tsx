import type { Metadata } from "next";
import { PageHero, CTABand } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "About",
  description: "An operator-run agency, not a stock-photo team page.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="ABOUT"
        title="Run by people who've bought their own media."
        subtitle="Grow is based in Coimbatore, working with builders across Tamil Nadu and Karnataka on the assumption that most agencies stop too early to matter."
      />
      <article className="mx-auto max-w-3xl px-6 py-16 flex flex-col gap-10">
        <p className="text-lg text-graphite">
          We started this agency because every real estate account we inherited had the same
          three problems: a media buyer reporting cost per lead with no idea what happened to
          those leads afterward, a tracking setup that hadn't been touched since the pixel was
          first installed, and a follow-up process that lived entirely in one overworked
          telecaller's head. Fixing all three at once, as one system, is the whole premise of
          the loop.
        </p>
        <p className="text-lg text-graphite">
          We work with a small number of accounts at a time on purpose. The creative volume and
          tracking discipline this system needs doesn't scale to fifty clients per account
          manager. If our roster is full when you call, we'll tell you and give you a real
          timeline, not a placeholder.
        </p>
        <p className="text-lg text-graphite">
          Explicitly not for us: ecommerce dropshippers, sub-₹25k/month budgets, or anyone
          shopping purely on price. If that's you, there are cheaper options and they'll serve
          you better than we would.
        </p>
      </article>
      <CTABand />
    </>
  );
}
