import type { LocalizedString } from "@/lib/content-types";

/** 0 = понедельник … 6 = воскресенье */
export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type ScheduleDirection =
  | "step"
  | "dance"
  | "yoga"
  | "pilates"
  | "stretch"
  | "trx"
  | "shaping"
  | "aqua";

export type ScheduleHall = "group" | "pool";

export type ScheduleItem = {
  id: string;
  day: Weekday;
  /** HH:mm, Asia/Tashkent */
  time: string;
  title: LocalizedString;
  direction: ScheduleDirection;
  hall: ScheduleHall;
};

/**
 * Черновое расписание-заглушка для скелета.
 * Актуальное — у клуба / в Telegram @bukafit24. См. CONTENT_TODO.md.
 */
export const schedule: ScheduleItem[] = [
  {
    id: "mon-0700-yoga",
    day: 0,
    time: "07:00",
    title: { ru: "Йога", uz: "Yoga", en: "Yoga" },
    direction: "yoga",
    hall: "group",
  },
  {
    id: "mon-0900-step",
    day: 0,
    time: "09:00",
    title: { ru: "STEP PRO", uz: "STEP PRO", en: "STEP PRO" },
    direction: "step",
    hall: "group",
  },
  {
    id: "mon-1100-pilates",
    day: 0,
    time: "11:00",
    title: { ru: "Пилатес", uz: "Pilates", en: "Pilates" },
    direction: "pilates",
    hall: "group",
  },
  {
    id: "mon-1300-aqua",
    day: 0,
    time: "13:00",
    title: {
      ru: "Аквааэробика",
      uz: "Akvaaerobika",
      en: "Aqua aerobics",
    },
    direction: "aqua",
    hall: "pool",
  },
  {
    id: "mon-1800-stretch",
    day: 0,
    time: "18:00",
    title: { ru: "Стретчинг", uz: "Stretching", en: "Stretching" },
    direction: "stretch",
    hall: "group",
  },
  {
    id: "mon-1900-dance",
    day: 0,
    time: "19:00",
    title: { ru: "DANCE", uz: "DANCE", en: "DANCE" },
    direction: "dance",
    hall: "group",
  },
  {
    id: "tue-0800-pilates",
    day: 1,
    time: "08:00",
    title: { ru: "Пилатес", uz: "Pilates", en: "Pilates" },
    direction: "pilates",
    hall: "group",
  },
  {
    id: "tue-1000-aqua",
    day: 1,
    time: "10:00",
    title: {
      ru: "Аквааэробика",
      uz: "Akvaaerobika",
      en: "Aqua aerobics",
    },
    direction: "aqua",
    hall: "pool",
  },
  {
    id: "tue-1200-yoga",
    day: 1,
    time: "12:00",
    title: { ru: "Йога", uz: "Yoga", en: "Yoga" },
    direction: "yoga",
    hall: "group",
  },
  {
    id: "tue-1700-step",
    day: 1,
    time: "17:00",
    title: { ru: "STEP PRO", uz: "STEP PRO", en: "STEP PRO" },
    direction: "step",
    hall: "group",
  },
  {
    id: "tue-1900-shaping",
    day: 1,
    time: "19:00",
    title: { ru: "Шейпинг", uz: "Shaping", en: "Shaping" },
    direction: "shaping",
    hall: "group",
  },
  {
    id: "tue-2000-trx",
    day: 1,
    time: "20:00",
    title: { ru: "TRX", uz: "TRX", en: "TRX" },
    direction: "trx",
    hall: "group",
  },
  {
    id: "wed-0700-stretch",
    day: 2,
    time: "07:00",
    title: { ru: "Стретчинг", uz: "Stretching", en: "Stretching" },
    direction: "stretch",
    hall: "group",
  },
  {
    id: "wed-0900-yoga",
    day: 2,
    time: "09:00",
    title: { ru: "Йога", uz: "Yoga", en: "Yoga" },
    direction: "yoga",
    hall: "group",
  },
  {
    id: "wed-1100-aqua",
    day: 2,
    time: "11:00",
    title: {
      ru: "Аквааэробика",
      uz: "Akvaaerobika",
      en: "Aqua aerobics",
    },
    direction: "aqua",
    hall: "pool",
  },
  {
    id: "wed-1600-trx",
    day: 2,
    time: "16:00",
    title: { ru: "TRX", uz: "TRX", en: "TRX" },
    direction: "trx",
    hall: "group",
  },
  {
    id: "wed-1800-shaping",
    day: 2,
    time: "18:00",
    title: { ru: "Шейпинг", uz: "Shaping", en: "Shaping" },
    direction: "shaping",
    hall: "group",
  },
  {
    id: "wed-2000-dance",
    day: 2,
    time: "20:00",
    title: { ru: "DANCE", uz: "DANCE", en: "DANCE" },
    direction: "dance",
    hall: "group",
  },
  {
    id: "thu-0800-pilates",
    day: 3,
    time: "08:00",
    title: { ru: "Пилатес", uz: "Pilates", en: "Pilates" },
    direction: "pilates",
    hall: "group",
  },
  {
    id: "thu-0900-yoga",
    day: 3,
    time: "09:00",
    title: { ru: "Йога", uz: "Yoga", en: "Yoga" },
    direction: "yoga",
    hall: "group",
  },
  {
    id: "thu-1200-stretch",
    day: 3,
    time: "12:00",
    title: { ru: "Стретчинг", uz: "Stretching", en: "Stretching" },
    direction: "stretch",
    hall: "group",
  },
  {
    id: "thu-1700-trx",
    day: 3,
    time: "17:00",
    title: { ru: "TRX", uz: "TRX", en: "TRX" },
    direction: "trx",
    hall: "group",
  },
  {
    id: "thu-1900-step",
    day: 3,
    time: "19:00",
    title: { ru: "STEP PRO", uz: "STEP PRO", en: "STEP PRO" },
    direction: "step",
    hall: "group",
  },
  {
    id: "thu-2030-dance",
    day: 3,
    time: "20:30",
    title: { ru: "DANCE", uz: "DANCE", en: "DANCE" },
    direction: "dance",
    hall: "group",
  },
  {
    id: "fri-0800-pilates",
    day: 4,
    time: "08:00",
    title: { ru: "Пилатес", uz: "Pilates", en: "Pilates" },
    direction: "pilates",
    hall: "group",
  },
  {
    id: "fri-1000-kids-swim",
    day: 4,
    time: "10:00",
    title: {
      ru: "Детское плавание",
      uz: "Bolalar suzishi",
      en: "Kids swimming",
    },
    direction: "aqua",
    hall: "pool",
  },
  {
    id: "fri-1200-yoga",
    day: 4,
    time: "12:00",
    title: { ru: "Йога", uz: "Yoga", en: "Yoga" },
    direction: "yoga",
    hall: "group",
  },
  {
    id: "fri-1700-step",
    day: 4,
    time: "17:00",
    title: { ru: "STEP PRO", uz: "STEP PRO", en: "STEP PRO" },
    direction: "step",
    hall: "group",
  },
  {
    id: "fri-1900-shaping",
    day: 4,
    time: "19:00",
    title: { ru: "Шейпинг", uz: "Shaping", en: "Shaping" },
    direction: "shaping",
    hall: "group",
  },
  {
    id: "fri-2000-dance",
    day: 4,
    time: "20:00",
    title: { ru: "DANCE", uz: "DANCE", en: "DANCE" },
    direction: "dance",
    hall: "group",
  },
  {
    id: "sat-0900-yoga",
    day: 5,
    time: "09:00",
    title: { ru: "Йога", uz: "Yoga", en: "Yoga" },
    direction: "yoga",
    hall: "group",
  },
  {
    id: "sat-1000-stretch",
    day: 5,
    time: "10:00",
    title: { ru: "Стретчинг", uz: "Stretching", en: "Stretching" },
    direction: "stretch",
    hall: "group",
  },
  {
    id: "sat-1100-aqua",
    day: 5,
    time: "11:00",
    title: {
      ru: "Аквааэробика",
      uz: "Akvaaerobika",
      en: "Aqua aerobics",
    },
    direction: "aqua",
    hall: "pool",
  },
  {
    id: "sat-1200-trx",
    day: 5,
    time: "12:00",
    title: { ru: "TRX", uz: "TRX", en: "TRX" },
    direction: "trx",
    hall: "group",
  },
  {
    id: "sat-1600-step",
    day: 5,
    time: "16:00",
    title: { ru: "STEP PRO", uz: "STEP PRO", en: "STEP PRO" },
    direction: "step",
    hall: "group",
  },
  {
    id: "sat-1800-dance",
    day: 5,
    time: "18:00",
    title: { ru: "DANCE", uz: "DANCE", en: "DANCE" },
    direction: "dance",
    hall: "group",
  },
  {
    id: "sun-1000-pilates",
    day: 6,
    time: "10:00",
    title: { ru: "Пилатес", uz: "Pilates", en: "Pilates" },
    direction: "pilates",
    hall: "group",
  },
  {
    id: "sun-1100-yoga",
    day: 6,
    time: "11:00",
    title: { ru: "Йога", uz: "Yoga", en: "Yoga" },
    direction: "yoga",
    hall: "group",
  },
  {
    id: "sun-1200-aqua",
    day: 6,
    time: "12:00",
    title: {
      ru: "Аквааэробика",
      uz: "Akvaaerobika",
      en: "Aqua aerobics",
    },
    direction: "aqua",
    hall: "pool",
  },
  {
    id: "sun-1400-stretch",
    day: 6,
    time: "14:00",
    title: { ru: "Стретчинг", uz: "Stretching", en: "Stretching" },
    direction: "stretch",
    hall: "group",
  },
  {
    id: "sun-1600-trx",
    day: 6,
    time: "16:00",
    title: { ru: "TRX", uz: "TRX", en: "TRX" },
    direction: "trx",
    hall: "group",
  },
  {
    id: "sun-1800-shaping",
    day: 6,
    time: "18:00",
    title: { ru: "Шейпинг", uz: "Shaping", en: "Shaping" },
    direction: "shaping",
    hall: "group",
  },
];

export const scheduleDisclaimer: LocalizedString = {
  ru: "Расписание может меняться — актуальное в Telegram @bukafit24",
  uz: "Jadval o‘zgarishi mumkin — dolzarbi Telegram @bukafit24 da",
  en: "Schedule may change — see the latest on Telegram @bukafit24",
};

export const directionLabels: Record<ScheduleDirection, LocalizedString> = {
  step: { ru: "STEP PRO", uz: "STEP PRO", en: "STEP PRO" },
  dance: { ru: "DANCE", uz: "DANCE", en: "DANCE" },
  yoga: { ru: "Йога", uz: "Yoga", en: "Yoga" },
  pilates: { ru: "Пилатес", uz: "Pilates", en: "Pilates" },
  stretch: { ru: "Стретчинг", uz: "Stretching", en: "Stretching" },
  trx: { ru: "TRX", uz: "TRX", en: "TRX" },
  shaping: { ru: "Шейпинг", uz: "Shaping", en: "Shaping" },
  aqua: { ru: "Аква", uz: "Akva", en: "Aqua" },
};

export const hallLabels: Record<ScheduleHall, LocalizedString> = {
  group: {
    ru: "Зал групповых",
    uz: "Guruh zali",
    en: "Group studio",
  },
  pool: {
    ru: "Бассейн",
    uz: "Basseyn",
    en: "Pool",
  },
};

export const weekdayLabels: Record<Weekday, LocalizedString> = {
  0: { ru: "Пн", uz: "Du", en: "Mon" },
  1: { ru: "Вт", uz: "Se", en: "Tue" },
  2: { ru: "Ср", uz: "Ch", en: "Wed" },
  3: { ru: "Чт", uz: "Pa", en: "Thu" },
  4: { ru: "Пт", uz: "Ju", en: "Fri" },
  5: { ru: "Сб", uz: "Sh", en: "Sat" },
  6: { ru: "Вс", uz: "Ya", en: "Sun" },
};

export const weekdays: Weekday[] = [0, 1, 2, 3, 4, 5, 6];

export function getScheduleForDay(day: Weekday): ScheduleItem[] {
  return schedule
    .filter((item) => item.day === day)
    .sort((a, b) => a.time.localeCompare(b.time));
}
