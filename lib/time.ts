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

/** Минуты с полуночи Asia/Tashkent */
export function getTashkentMinutes(date: Date = new Date()): number {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TASHKENT,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? "0");
  return hour * 60 + minute;
}

/** HH:mm → минуты с полуночи */
export function parseHmToMinutes(time: string): number {
  const [h = "0", m = "0"] = time.split(":");
  return Number(h) * 60 + Number(m);
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
