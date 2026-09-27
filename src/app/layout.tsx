import type { Metadata, Viewport } from "next";
import "./globals.css";
import { bricolage, interTight, jetbrainsMono } from "@/lib/fonts";
import { LenisProvider } from "@/components/motion/LenisProvider";
import { SiteChrome } from "@/components/SiteChrome";
import { Grain } from "@/components/Grain";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { organizationJsonLd } from "@/lib/schema/jsonld";
import { Analytics, AnalyticsNoScript } from "@/components/Analytics";
import { ConsentBanner } from "@/components/ConsentBanner";
import { getGtmContainerId } from "@/lib/settings";
import { BUILD_COMMIT, BUILT_AT } from "@/lib/build";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  metadataBase: new URL("https://growdigitalbranding.com"),
  title: {
    // The homepage owns the agency queries: "real estate marketing agency
    // Coimbatore" and "marketing agency for real estate". It is the page a
    // Google Business Profile will link to, so the city belongs in its title.
    default: `Real estate marketing agency in Coimbatore | ${BRAND}`,
    template: `%s | ${BRAND}`,
  },
  description:
    "Real estate marketing agency in Coimbatore. Facebook, Meta and Google Ads for developers across Tamil Nadu and Karnataka, measured in cost per booking.",
  alternates: { canonical: "/" },
  // Lets anyone, including npm run verify, tell in one request whether the
  // running server is serving the commit that was pushed. Not secret: the
  // repository is the client's and the SHA reveals nothing the source does not.
  other: {
    "build-commit": BUILD_COMMIT,
    "build-time": BUILT_AT,
  },
  // favicon.ico, icon.svg and apple-icon.png are picked up from src/app by
  // file convention; the manifest is the one that has to be declared.
  manifest: "/site.webmanifest",
  // Search Console and Bing Webmaster Tools ownership, set from the server's
  // environment so verifying a property never needs a code change. Build-time
  // values: set them, then rebuild. Unset, no tag is emitted.
  //   GOOGLE_SITE_VERIFICATION=<content value from Search Console's HTML tag>
  //   BING_SITE_VERIFICATION=<content value from Bing's msvalidate.01 tag>
  verification: {
    ...(process.env.GOOGLE_SITE_VERIFICATION
      ? { google: process.env.GOOGLE_SITE_VERIFICATION }
      : {}),
    ...(process.env.BING_SITE_VERIFICATION
      ? { other: { "msvalidate.01": process.env.BING_SITE_VERIFICATION } }
      : {}),
  },
  // Without these every shared link renders as a blank card, which is most of
  // how this site actually gets seen: pasted into WhatsApp and email.
  // metadataBase above resolves the relative path, so this stays correct on
  // any host. 2400x1260 is the 1.91:1 card at 2x, for retina previews.
  openGraph: {
    type: "website",
    siteName: BRAND,
    locale: "en_IN",
    url: "/",
    title: "Most agencies stop at the lead. We run the loop.",
    description:
      "Performance marketing for real estate developers across Tamil Nadu and Karnataka. Creative volume, clean signal, and follow-up that closes.",
    images: [
      {
        url: "/og.png",
        width: 2400,
        height: 1260,
        alt: `${BRAND}. Most agencies stop at the lead. We run the loop.`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Most agencies stop at the lead. We run the loop.",
    description:
      "Performance marketing for real estate developers across Tamil Nadu and Karnataka.",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  // Colours the browser chrome around the page: the address bar on Android
  // and the status bar area of an installed shortcut.
  themeColor: "#14171a",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Cached and tagged, so this does not make every page dynamic. Null until a
  // container is set in the dashboard, in which case nothing is rendered and
  // no third-party script loads at all.
  const gtm = await getGtmContainerId();

  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${interTight.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink antialiased">
        <AnalyticsNoScript containerId={gtm} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Analytics containerId={gtm} />
        <LenisProvider>
          <Grain />
          <SiteChrome slot="top" />
          <main className="flex-1 relative z-[2]">{children}</main>
          <SiteChrome slot="bottom" />
          <StickyMobileCTA />
          {/* Nothing to consent to until a container is configured. */}
          {gtm && <ConsentBanner />}
        </LenisProvider>
      </body>
    </html>
  );
}
