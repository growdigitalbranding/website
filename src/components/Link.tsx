import NextLink from "next/link";
import type { ComponentProps } from "react";

/**
 * next/link with viewport prefetching off by default.
 *
 * Next prefetches every <Link> the moment it scrolls into view. With the
 * header, mega menu, two footers and in-page link lists, one page view was
 * firing about 60 background RSC requests (90–100 requests in all), in
 * bursts. The host rate-limits per IP, so a visitor who read four or five
 * pages was served 429 for the whole site. That is what took the site down
 * for the owner's own connection.
 *
 * Every page here is prerendered and served from cache, so a click without
 * prefetch still lands fast. A link that genuinely earns a prefetch can
 * still opt in with prefetch={true}.
 */
export default function Link({ prefetch = false, ...props }: ComponentProps<typeof NextLink>) {
  return <NextLink prefetch={prefetch} {...props} />;
}
