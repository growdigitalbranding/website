/**
 * One source of truth for the contact details.
 *
 * These were duplicated across five files as placeholders. They are
 * centralised here because the lead form's delivery-failure fallback
 * uses the same number, and that is the one place a stale number costs an
 * actual enquiry.
 */

/** Country code + number, digits only. Used to build the wa.me link. */
export const WHATSAPP_NUMBER = "917010749648";

/** Same number in dialable form. Never render this directly: tel: hrefs want
 *  the unspaced form, readers want the grouped one. */
export const PHONE = "+917010749648";

/** The same number grouped for reading. The footers used to carry
 *  "+91 00000 00000" as literal text above a tel: link that already dialled
 *  the real number, so the page said one thing and did another. */
export const PHONE_DISPLAY = "+91 70107 49648";

export const EMAIL = "hello@growdigitalbranding.com";

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

/** Prefilled WhatsApp link, so a visitor whose form failed does not retype it. */
export function whatsappUrlWith(message: string) {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
}

/**
 * The public profiles, in one place.
 *
 * Two jobs. They are the `sameAs` array on the organization entity, which is
 * how an answer engine corroborates that the Grow it reads here is the same
 * Grow it has seen elsewhere — without it the entity stays unlinked and every
 * mention has to stand on its own. And they are the outbound links in both
 * footers.
 *
 * Order matters a little: put the profile you keep most current first.
 * Anything added here has to be a profile this company actually controls; a
 * `sameAs` pointing at a page we do not own is worse than none.
 */
export const SOCIAL = [
  { label: "Instagram", url: "https://www.instagram.com/growdigitalbranding/" },
  { label: "LinkedIn", url: "https://www.linkedin.com/company/growdigitalbranding/" },
  { label: "Facebook", url: "https://www.facebook.com/growdigitalbranding" },
] as const;

export const SOCIAL_URLS = SOCIAL.map((s) => s.url);
