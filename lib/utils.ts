export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

export function formatPriceAmount(amount: number, locale: string): string {
  return new Intl.NumberFormat(
    locale === "en" ? "en-US" : locale === "uz" ? "uz-UZ" : "ru-RU",
    { maximumFractionDigits: 0 },
  ).format(amount);
}

export function formatPriceCurrency(locale: string): string {
  if (locale === "en") return "UZS";
  if (locale === "uz") return "so‘m";
  return "сум";
}

export function formatPriceParts(
  amount: number,
  locale: string,
): { amount: string; currency: string } {
  return {
    amount: formatPriceAmount(amount, locale),
    currency: formatPriceCurrency(locale),
  };
}

export function formatPriceUzs(amount: number, locale: string): string {
  const { amount: formatted, currency } = formatPriceParts(amount, locale);
  return `${formatted} ${currency}`;
}
