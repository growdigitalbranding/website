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
