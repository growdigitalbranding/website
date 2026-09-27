import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ARTICLES, getArticle } from "@/data/insights";
import { BRAND } from "@/lib/brand";

/**
 * A social card per article.
 *
 * All seven articles shared the single /og.png, so seven distinct pieces
 * pasted into WhatsApp or LinkedIn — which is most of how this site actually
 * gets seen — rendered an identical card with the homepage's headline on it.
 * The card carried no information about the thing being shared.
 *
 * Generated at build time, not on request: the route has generateStaticParams
 * and dynamicParams=false, so each slug's card is rendered once into the
 * build output. Nothing here is fabricated — the headline is the article's
 * own title and the kicker is its own `kind`.
 *
 * Typography rather than imagery, deliberately. The alternative is a stock
 * photograph, and the asset rule on this project is that a slot with no real
 * asset gets a typographic treatment, never a stock one.
 */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "growdigitalbranding article";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

const display = await readFile(
  join(process.cwd(), "assets/fonts/BricolageGrotesque-Bold.ttf")
);
const mono = await readFile(join(process.cwd(), "assets/fonts/JetBrainsMono-Regular.ttf"));

// The brand tokens, copied rather than imported: tokens.css is CSS and satori
// takes plain values. Kept in sync by hand, which is fine for four of them.
const INK = "#14171a";
const PAPER = "#eff0ec";
const LIME = "#8dc63f";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  const title = article?.title ?? BRAND;
  const kind = article?.kind ?? "Article";

  // The question titles run 50-62 characters. Below that a larger size reads
  // better; above it the headline needs the room more than the presence.
  const fontSize = title.length > 54 ? 62 : title.length > 42 ? 70 : 80;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: INK,
          padding: "72px 80px",
          fontFamily: "Bricolage",
        }}
      >
        <div style={{ display: "flex", fontFamily: "Mono", fontSize: 24, letterSpacing: 3, color: LIME }}>
          {kind.toUpperCase()}
        </div>

        <div
          style={{
            display: "flex",
            fontSize,
            lineHeight: 1.04,
            letterSpacing: -2,
            color: PAPER,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontFamily: "Mono", fontSize: 24, color: PAPER, opacity: 0.6 }}>
            growdigitalbranding.com
          </div>
          {/* The swoosh, flattened to two strokes. The real logo is an SVG
              component with a gradient and satori does not take either. */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ display: "flex", width: 120, height: 5, background: LIME, borderRadius: 3 }} />
            <div style={{ display: "flex", width: 22, height: 22, background: LIME, borderRadius: 11 }} />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Bricolage", data: display, style: "normal", weight: 700 },
        { name: "Mono", data: mono, style: "normal", weight: 400 },
      ],
    }
  );
}
