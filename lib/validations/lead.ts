import { z } from "zod";
import type { PlanId } from "@/content/plans";

const planIds = ["month", "months6", "year", "year_vip", "day_pass"] as const;

export const leadPlanIdSchema = z.enum(planIds);

export type LeadPlanId = z.infer<typeof leadPlanIdSchema>;

/** Accepts +998XXXXXXXXX after client mask normalization */
const phoneSchema = z
  .string()
  .trim()
  .transform((value) => value.replace(/[\s()-]/g, ""))
  .refine((value) => /^\+998\d{9}$/.test(value), {
    message: "invalid_phone",
  });

export const leadBodySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "name_min")
    .max(80, "name_max"),
  phone: phoneSchema,
  planId: leadPlanIdSchema.optional().nullable(),
  sourcePath: z.string().trim().max(200).optional().default("/"),
  locale: z.enum(["ru", "uz", "en"]).optional().default("ru"),
  /** Honeypot — bots fill this; real users leave empty. Checked after parse. */
  website: z.string().max(200).optional().default(""),
  utm: z
    .object({
      source: z.string().max(100).optional(),
      medium: z.string().max(100).optional(),
      campaign: z.string().max(100).optional(),
      content: z.string().max(100).optional(),
      term: z.string().max(100).optional(),
    })
    .optional()
    .default({}),
});

export type LeadBody = z.infer<typeof leadBodySchema>;

export function isMembershipPlanId(id: string | null | undefined): id is PlanId {
  return id === "month" || id === "months6" || id === "year" || id === "year_vip";
}
