export type AppLocale = "ru" | "uz" | "en";

export type LocalizedString = Record<AppLocale, string>;

export function pickLocale<T extends Record<AppLocale, unknown>>(
  map: T,
  locale: AppLocale,
): T[AppLocale] {
  return map[locale] ?? map.ru;
}
