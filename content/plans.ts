import type { LocalizedString } from "@/lib/content-types";

export type PlanId = "month" | "months6" | "year" | "year_vip";

export type Plan = {
  id: PlanId;
  /** Срок в месяцах; для отображения используйте name/durationLabel */
  durationMonths: number;
  /** Цена в сумах. Точные суммы = TODO у клуба */
  price: number;
  currency: "UZS";
  recommended: boolean;
  name: LocalizedString;
  durationLabel: LocalizedString;
  forWhom: LocalizedString;
  includes: LocalizedString[];
};

/**
 * Матрица тарифов: Месяц / 6 месяцев / Год / Год VIP.
 * «Выгодный выбор» — Год. VIP — премиум-якорь справа.
 * Разовое посещение — не карточка (см. dayPass ниже).
 */
export const plans: Plan[] = [
  {
    id: "month",
    durationMonths: 1,
    price: 1_500_000,
    currency: "UZS",
    recommended: false,
    name: {
      ru: "Месяц",
      uz: "Oy",
      en: "Month",
    },
    durationLabel: {
      ru: "1 месяц",
      uz: "1 oy",
      en: "1 month",
    },
    forWhom: {
      ru: "Попробовать клуб без долгого обязательства",
      uz: "Uzoq majburiyatsiz klubni sinab ko‘rish",
      en: "Try the club without a long commitment",
    },
    includes: [
      {
        ru: "Тренажёрный зал 24/7",
        uz: "Trenajyor zali 24/7",
        en: "Gym floor 24/7",
      },
      {
        ru: "Групповые программы",
        uz: "Guruh dasturlari",
        en: "Group classes",
      },
      {
        ru: "Бассейн, сауна и хаммам",
        uz: "Basseyn, sauna va hammom",
        en: "Pool, sauna & hammam",
      },
    ],
  },
  {
    id: "months6",
    durationMonths: 6,
    /** TODO: подтвердить цену у клуба */
    price: 7_500_000,
    currency: "UZS",
    recommended: false,
    name: {
      ru: "6 месяцев",
      uz: "6 oy",
      en: "6 months",
    },
    durationLabel: {
      ru: "6 месяцев",
      uz: "6 oy",
      en: "6 months",
    },
    forWhom: {
      ru: "Стабильный ритм без годовой предоплаты",
      uz: "Yillik to‘lovsiz barqaror ritm",
      en: "A steady rhythm without a full-year prepay",
    },
    includes: [
      {
        ru: "Всё из месячного",
        uz: "Oylikdagi hammasi",
        en: "Everything in the monthly plan",
      },
      {
        ru: "Выгоднее помесячной оплаты",
        uz: "Oylik to‘lovdan foydaliroq",
        en: "Better value than paying monthly",
      },
    ],
  },
  {
    id: "year",
    durationMonths: 12,
    price: 10_000_000,
    currency: "UZS",
    recommended: true,
    name: {
      ru: "Год",
      uz: "Yil",
      en: "Year",
    },
    durationLabel: {
      ru: "12 месяцев",
      uz: "12 oy",
      en: "12 months",
    },
    forWhom: {
      ru: "Максимум пространства за лучшую цену дня",
      uz: "Kunning eng yaxshi narxida maksimal imkoniyat",
      en: "Maximum access at the best everyday price",
    },
    includes: [
      {
        ru: "Полный доступ к зоне клуба",
        uz: "Klub zonasiga to‘liq kirish",
        en: "Full club access",
      },
      {
        ru: "Бассейн и SPA в раздевалках",
        uz: "Basseyn va SPA kiyinish xonalarida",
        en: "Pool & spa in locker rooms",
      },
      {
        ru: "Групповые программы по расписанию",
        uz: "Jadval bo‘yicha guruh dasturlari",
        en: "Group classes by schedule",
      },
    ],
  },
  {
    id: "year_vip",
    durationMonths: 12,
    /** TODO: подтвердить VIP-цену у клуба */
    price: 15_000_000,
    currency: "UZS",
    recommended: false,
    name: {
      ru: "Год VIP",
      uz: "Yil VIP",
      en: "Year VIP",
    },
    durationLabel: {
      ru: "12 месяцев · VIP",
      uz: "12 oy · VIP",
      en: "12 months · VIP",
    },
    forWhom: {
      ru: "Кто ценит тишину VIP-раздевалки и приоритет",
      uz: "VIP kiyinish xonasi va ustuvorlikni qadrlaydiganlar",
      en: "For those who want the VIP locker room and priority",
    },
    includes: [
      {
        ru: "Всё из годового",
        uz: "Yillikdagi hammasi",
        en: "Everything in the yearly plan",
      },
      {
        ru: "VIP-раздевалка",
        uz: "VIP kiyinish xonasi",
        en: "VIP locker room",
      },
      {
        ru: "Приоритетная запись к тренеру",
        uz: "Murabbiyga ustuvor yozilish",
        en: "Priority trainer booking",
      },
    ],
  },
];

/** Разовое посещение — строка под матрицей, не карточка тарифа */
export const dayPass = {
  id: "day_pass" as const,
  /** TODO: подтвердить цену разового визита */
  price: 250_000,
  currency: "UZS" as const,
  name: {
    ru: "Разовое посещение",
    uz: "Bir martalik tashrif",
    en: "Day pass",
  } satisfies LocalizedString,
  note: {
    ru: "Один визит без абонемента — оставьте заявку, менеджер подтвердит время.",
    uz: "Abonementsiz bitta tashrif — ariza qoldiring, menejer vaqtni tasdiqlaydi.",
    en: "One visit without a membership — leave a request and a manager will confirm the time.",
  } satisfies LocalizedString,
};

export function getPlanById(id: PlanId): Plan | undefined {
  return plans.find((plan) => plan.id === id);
}

export function getRecommendedPlan(): Plan {
  const recommended = plans.find((plan) => plan.recommended);
  return recommended ?? plans[2]!;
}
