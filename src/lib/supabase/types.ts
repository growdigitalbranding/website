export type UserRole = "admin" | "telecaller";

export type LeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "site_visit"
  | "booked"
  | "lost";

export type DeliveryState = "pending" | "delivered" | "failed";

export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  role: UserRole;
  created_at: string;
};

export type Lead = {
  id: string;
  name: string;
  whatsapp: string;
  project: string;
  source: string;
  status: LeadStatus;
  assigned_to: string | null;
  delivery_status: DeliveryState;
  delivery_error: string | null;
  submitted_at: string;
  created_at: string;
  updated_at: string;
};

export type LeadNote = {
  id: string;
  lead_id: string;
  author_id: string | null;
  body: string;
  created_at: string;
};

/** Labels and tones for the status pills. One place, so they never drift. */
export const LEAD_STATUS: Record<LeadStatus, { label: string; tone: string }> = {
  new: { label: "New", tone: "var(--pulse)" },
  contacted: { label: "Contacted", tone: "var(--graphite)" },
  qualified: { label: "Qualified", tone: "var(--signal)" },
  site_visit: { label: "Site visit", tone: "var(--signal)" },
  booked: { label: "Booked", tone: "var(--signal)" },
  lost: { label: "Lost", tone: "var(--flag)" },
};

export const LEAD_STATUS_ORDER: LeadStatus[] = [
  "new",
  "contacted",
  "qualified",
  "site_visit",
  "booked",
  "lost",
];
