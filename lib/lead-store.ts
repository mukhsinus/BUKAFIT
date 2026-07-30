import type { LeadBody } from "@/lib/validations/lead";

export type StoredLead = LeadBody & {
  id: string;
  createdAt: string;
  telegramOk: boolean;
};

/**
 * Persistence interface for leads.
 * Stub logs to console; swap for DB / Google Sheets later.
 */
export type LeadStore = {
  save: (lead: StoredLead) => Promise<void>;
};

export const consoleLeadStore: LeadStore = {
  async save(lead) {
    // Structured log for ops — not a browser console noise source
    console.info("[lead]", JSON.stringify(lead));
  },
};

// TODO: implement Postgres / Google Sheets LeadStore and select via env
export const leadStore: LeadStore = consoleLeadStore;
