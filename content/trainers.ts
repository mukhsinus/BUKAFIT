import type { LocalizedString } from "@/lib/content-types";

export type Trainer = {
  id: string;
  name: LocalizedString;
  specialization: LocalizedString;
  /** Стаж в годах; null = не публиковать до подтверждения */
  yearsExperience: number | null;
  photoSlot: string;
};

/**
 * Trainers stay empty until the club provides real names and photos.
 * Do not invent names. Enable FEATURES.trainers when this array is filled.
 * See CONTENT_TODO.md.
 */
export const trainers: Trainer[] = [];
