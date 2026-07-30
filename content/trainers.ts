import type { LocalizedString } from "@/lib/content-types";

export type Trainer = {
  id: string;
  /** Имена = TODO у клуба; заглушки без выдуманных «звёзд» */
  name: LocalizedString;
  specialization: LocalizedString;
  /** Стаж в годах; null = не публиковать до подтверждения */
  yearsExperience: number | null;
  photoSlot: string;
};

/**
 * Структура карточек тренеров. Имена и фото — заглушки.
 * Не выдумывать реальные ФИО до данных клуба.
 */
export const trainers: Trainer[] = [
  {
    id: "trainer-1",
    name: {
      ru: "Тренер 1",
      uz: "Murabbiy 1",
      en: "Trainer 1",
    },
    specialization: {
      ru: "Силовые и функциональные тренировки",
      uz: "Kuch va funksional mashg‘ulotlar",
      en: "Strength & functional training",
    },
    yearsExperience: null,
    photoSlot: "trainers/placeholder",
  },
  {
    id: "trainer-2",
    name: {
      ru: "Тренер 2",
      uz: "Murabbiy 2",
      en: "Trainer 2",
    },
    specialization: {
      ru: "Групповые программы и мобильность",
      uz: "Guruh dasturlari va mobililik",
      en: "Group classes & mobility",
    },
    yearsExperience: null,
    photoSlot: "trainers/placeholder",
  },
  {
    id: "trainer-3",
    name: {
      ru: "Тренер 3",
      uz: "Murabbiy 3",
      en: "Trainer 3",
    },
    specialization: {
      ru: "Персональный коучинг",
      uz: "Shaxsiy murabbiylik",
      en: "Personal coaching",
    },
    yearsExperience: null,
    photoSlot: "trainers/placeholder",
  },
];
