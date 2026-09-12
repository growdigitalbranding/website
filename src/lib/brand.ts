/**
 * One source of truth for the brand's name.
 *
 * It had drifted into three spellings across the site — "Grow", "Grow
 * Digital Branding" and the domain — which matters most in the places a
 * machine reads: schema.org name, og:site_name, the manifest. Entity
 * consistency is the first thing Answer Visibility asks for, and an
 * assistant cannot reconcile three names into one organisation.
 */

/** The brand name, as the brand writes it. Use this wherever the name is
 *  being *stated* — titles, schema, manifest, copyright, aria labels. */
export const BRAND = "growdigitalbranding";

/** The wordmark, for chrome too narrow for the full name: the manifest's
 *  short_name truncates past ~12 characters on a home screen. */
export const BRAND_SHORT = "grow";

/** How the logo sets the name, for alt text and aria labels that should
 *  describe the artwork rather than restate the string. */
export const BRAND_LOCKUP = "growdigitalbranding, real estate growth and conversion";
