export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

export function formatPriceUzs(amount: number, locale: string): string {
  const formatted = new Intl.NumberFormat(
    locale === "en" ? "en-US" : locale === "uz" ? "uz-UZ" : "ru-RU",
    {
      maximumFractionDigits: 0,
    },
  ).format(amount);

  if (locale === "en") {
    return `${formatted} UZS`;
  }

  if (locale === "uz") {
    return `${formatted} so‘m`;
  }

  return `${formatted} сум`;
}
