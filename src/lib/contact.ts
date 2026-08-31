/**
 * One source of truth for the contact details.
 *
 * These were duplicated across five files as the literal 910000000000, which
 * is a placeholder. When the real number lands it has to be correct in every
 * one of them, including the fallback the lead form shows when delivery to
 * Make fails — the one place a wrong number costs an actual enquiry.
 */

/** Country code + number, digits only. Used to build the wa.me link. */
export const WHATSAPP_NUMBER = "910000000000";

/** Same number in dialable form. */
export const PHONE = "+910000000000";

export const EMAIL = "hello@growdigitalbranding.com";

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

/** Prefilled WhatsApp link, so a visitor whose form failed does not retype it. */
export function whatsappUrlWith(message: string) {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
}
