import { club } from "@/content/club";

const TASHKENT = club.timezone;

export function formatTashkentTime(date: Date = new Date()): string {
  return new Intl.DateTimeFormat("ru-RU", {
    timeZone: TASHKENT,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

/** Понедельник = 0 … Воскресенье = 6 (как в content/schedule) */
export function getTashkentWeekday(date: Date = new Date()): number {
  const day = new Intl.DateTimeFormat("en-US", {
    timeZone: TASHKENT,
    weekday: "short",
  }).format(date);

  const map: Record<string, number> = {
    Mon: 0,
    Tue: 1,
    Wed: 2,
    Thu: 3,
    Fri: 4,
    Sat: 5,
    Sun: 6,
  };

  return map[day] ?? 0;
}
