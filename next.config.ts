import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },

      /**
       * Prerendered HTML shipped with `stale-while-revalidate=31532400`, so a
       * shared cache was entitled to serve last year's markup. Every deploy
       * renames the content-hashed CSS and JS chunks and deletes the old ones,
       * so that stale HTML asks for files the server no longer has: the page
       * arrives with its content intact and every stylesheet 404ing.
       *
       * A minute of shared-cache freshness and five of stale keeps the win on
       * a traffic burst and bounds the broken window to minutes, not a year.
       *
       * Only HTML documents. The negative lookahead keeps /_next/* on Next's
       * own immutable policy, which is correct precisely because those names
       * are content-hashed.
       */
      {
        source: "/:path((?!_next/).*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, s-maxage=60, stale-while-revalidate=300",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
