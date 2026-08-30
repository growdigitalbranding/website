import type { Metadata } from "next";
import "./globals.css";
import { bricolage, interTight, jetbrainsMono } from "@/lib/fonts";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LenisProvider } from "@/components/motion/LenisProvider";
import { LoopPath } from "@/components/motion/LoopPath";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { organizationJsonLd } from "@/lib/schema/jsonld";

export const metadata: Metadata = {
  metadataBase: new URL("https://growdigitalbranding.com"),
  title: {
    default: "Grow | Performance marketing for builders and developers",
    template: "%s | Grow",
  },
  description:
    "Most agencies stop at the lead. Grow runs the whole loop. Creative volume, clean signal, and follow-up that actually closes. Real estate first.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${interTight.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <LenisProvider>
          <LoopPath />
          <Header />
          <main className="flex-1 relative z-[2]">{children}</main>
          <Footer />
          <StickyMobileCTA />
        </LenisProvider>
      </body>
    </html>
  );
}
