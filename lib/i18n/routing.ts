import { defineRouting } from "next-intl/routing";

export const locales = ["ru", "uz", "en"] as const;

export type AppLocale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "ru",
  localePrefix: "always",
});
