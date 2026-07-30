import type { LocalizedString } from "@/lib/content-types";

export type FaqCategoryId =
  | "membership"
  | "visit"
  | "pool"
  | "payment"
  | "kids";

export type FaqItem = {
  id: string;
  category: FaqCategoryId;
  question: LocalizedString;
  answer: LocalizedString;
};

export const faqCategories: Record<FaqCategoryId, LocalizedString> = {
  membership: {
    ru: "Абонементы",
    uz: "Abonementlar",
    en: "Memberships",
  },
  visit: {
    ru: "Визит в клуб",
    uz: "Klubga tashrif",
    en: "Visiting the club",
  },
  pool: {
    ru: "Бассейн и SPA",
    uz: "Basseyn va SPA",
    en: "Pool & SPA",
  },
  payment: {
    ru: "Оплата",
    uz: "To‘lov",
    en: "Payment",
  },
  kids: {
    ru: "Детям",
    uz: "Bolalar",
    en: "Kids",
  },
};

export const faq: FaqItem[] = [
  {
    id: "hours",
    category: "visit",
    question: {
      ru: "Клуб действительно работает 24/7?",
      uz: "Klub haqiqatan 24/7 ishlaydimi?",
      en: "Is the club really open 24/7?",
    },
    answer: {
      ru: "Да. Buka FIT открыт круглосуточно — можно тренироваться ночью и рано утром без отдельного «ночного» тарифа.",
      uz: "Ha. Buka FIT kunu tun ochiq — tunda va ertalab alohida «tungi» tarifisiz mashq qilishingiz mumkin.",
      en: "Yes. Buka FIT is open around the clock — train at night or early morning without a separate night rate.",
    },
  },
  {
    id: "where",
    category: "visit",
    question: {
      ru: "Где находится клуб?",
      uz: "Klub qayerda joylashgan?",
      en: "Where is the club?",
    },
    answer: {
      ru: "Ташкент, ул. Мирабад, 41/6 — в центре города. Точные ориентиры и карта — на странице контактов.",
      uz: "Toshkent, Mirabad ko‘chasi, 41/6 — shahar markazida. Aniq mo‘ljallar va xarita — kontaktlar sahifasida.",
      en: "Tashkent, Mirabad St. 41/6 — in the city center. Directions and the map are on the contacts page.",
    },
  },
  {
    id: "what-included",
    category: "membership",
    question: {
      ru: "Что входит в абонемент?",
      uz: "Abonementga nima kiradi?",
      en: "What does a membership include?",
    },
    answer: {
      ru: "Доступ в тренажёрный зал, групповые программы по расписанию, бассейн, сауна и хаммам в раздевалках. Точный состав зависит от тарифа — смотрите матрицу на странице абонементов.",
      uz: "Trenajyor zali, jadval bo‘yicha guruh dasturlari, basseyn, kiyinish xonalaridagi sauna va hammom. Aniq tarkib tarifga bog‘liq — abonementlar sahifasidagi matritsaga qarang.",
      en: "Gym floor access, scheduled group classes, the pool, and sauna & hammam in the locker rooms. Exact inclusions depend on the plan — see the pricing matrix.",
    },
  },
  {
    id: "freeze",
    category: "membership",
    question: {
      ru: "Можно ли заморозить абонемент?",
      uz: "Abonementni muzlatish mumkinmi?",
      en: "Can I freeze my membership?",
    },
    answer: {
      ru: "Условия заморозки уточняются у клуба. Оставьте заявку — менеджер подтвердит актуальные правила.",
      uz: "Muzlatish shartlari klubdan aniqlashtiriladi. Ariza qoldiring — menejer dolzarb qoidalarni tasdiqlaydi.",
      en: "Freeze terms are confirmed by the club. Leave a request and a manager will confirm the current rules.",
    },
  },
  {
    id: "guest",
    category: "visit",
    question: {
      ru: "Можно ли привести гостя?",
      uz: "Mehmon olib kelish mumkinmi?",
      en: "Can I bring a guest?",
    },
    answer: {
      ru: "Правила гостевых визитов зависят от тарифа и загрузки. Актуальные условия — у менеджера.",
      uz: "Mehmon tashrifi qoidalari tarif va yuklamaga bog‘liq. Dolzarb shartlar — menejerda.",
      en: "Guest rules depend on your plan and club load. Ask a manager for the current policy.",
    },
  },
  {
    id: "pool-access",
    category: "pool",
    question: {
      ru: "Бассейн и сауна входят в обычный абонемент?",
      uz: "Basseyn va sauna oddiy abonementga kiradimi?",
      en: "Are the pool and sauna included in a standard membership?",
    },
    answer: {
      ru: "Да — бассейн, финская сауна и хаммам доступны в рамках клубного доступа. VIP добавляет отдельную раздевалку и приоритеты сервиса.",
      uz: "Ha — basseyn, fin saunasi va hammom klub kirishiga kiradi. VIP alohida kiyinish xonasi va xizmat ustuvorligini qo‘shadi.",
      en: "Yes — the pool, Finnish sauna and hammam are part of club access. VIP adds a dedicated locker room and service priority.",
    },
  },
  {
    id: "pay-online",
    category: "payment",
    question: {
      ru: "Можно ли оплатить онлайн?",
      uz: "Onlayn to‘lash mumkinmi?",
      en: "Can I pay online?",
    },
    answer: {
      ru: "Сейчас заявка уходит менеджеру — он подтвердит тариф и способ оплаты. Онлайн-оплата Click/Payme будет подключена позже, когда клуб передаст мерчант-данные.",
      uz: "Hozir ariza menejerga ketadi — u tarif va to‘lov usulini tasdiqlaydi. Click/Payme onlayn to‘lovi klub merchant ma’lumotlarini berganida ulanadi.",
      en: "For now your request goes to a manager who confirms the plan and payment method. Click/Payme online checkout will follow once the club provides merchant credentials.",
    },
  },
  {
    id: "kids-swim",
    category: "kids",
    question: {
      ru: "Есть ли занятия для детей?",
      uz: "Bolalar uchun mashg‘ulotlar bormi?",
      en: "Are there classes for kids?",
    },
    answer: {
      ru: "Да — детское плавание и детская раздевалка. Возраст и расписание уточняйте у менеджера или в актуальном расписании.",
      uz: "Ha — bolalar suzishi va bolalar kiyinish xonasi. Yosh va jadvalni menejer yoki dolzarb jadvaldan aniqlang.",
      en: "Yes — children’s swimming and a kids’ locker room. Confirm age rules and times with a manager or the live schedule.",
    },
  },
];

/** Короткий список для превью на главной (Фаза 3) */
export const faqHomeIds = [
  "hours",
  "where",
  "what-included",
  "pool-access",
  "pay-online",
  "freeze",
] as const;

export function getFaqByCategory(category: FaqCategoryId): FaqItem[] {
  return faq.filter((item) => item.category === category);
}
