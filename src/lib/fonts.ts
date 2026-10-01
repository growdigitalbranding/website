import localFont from "next/font/local";

/**
 * Fonts are bundled locally so production builds do not depend on Google Fonts
 * being reachable from the hosting build worker. The supplied font files are
 * licensed and kept in assets/fonts.
 */
export const bricolage = localFont({
  src: "../../assets/fonts/BricolageGrotesque-Bold.ttf",
  variable: "--font-bricolage",
  display: "swap",
});

export const interTight = localFont({
  src: [
    {
      path: "../../assets/fonts/InterTight-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../assets/fonts/InterTight-Medium.ttf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-inter-tight",
  display: "swap",
});

export const jetbrainsMono = localFont({
  src: "../../assets/fonts/JetBrainsMono-Regular.ttf",
  variable: "--font-jetbrains",
  display: "swap",
});
