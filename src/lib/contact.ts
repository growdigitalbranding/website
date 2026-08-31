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

/** Same number in dialable form. */
export const PHONE = "+917010749648";

export const EMAIL = "hello@growdigitalbranding.com";

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

/** Prefilled WhatsApp link, so a visitor whose form failed does not retype it. */
export function whatsappUrlWith(message: string) {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
}
