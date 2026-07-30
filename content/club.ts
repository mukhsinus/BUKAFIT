import type { LocalizedString } from "@/lib/content-types";

export const club = {
  name: "Buka FIT",
  areaSqm: 2000,
  open24h: true as const,
  timezone: "Asia/Tashkent",
  address: {
    street: {
      ru: "ул. Мирабад, 41/6",
      uz: "Mirabad ko‘chasi, 41/6",
      en: "Mirabad St. 41/6",
    } satisfies LocalizedString,
    city: {
      ru: "Ташкент",
      uz: "Toshkent",
      en: "Tashkent",
    } satisfies LocalizedString,
    full: {
      ru: "Ташкент, ул. Мирабад, 41/6",
      uz: "Toshkent, Mirabad ko‘chasi, 41/6",
      en: "Tashkent, Mirabad St. 41/6",
    } satisfies LocalizedString,
  },
  /** WGS84 — уточнить у клуба при подключении карты */
  coordinates: {
    lat: 41.2995,
    lng: 69.2797,
  },
  phone: {
    display: "+998 90 018 33 77",
    e164: "+998900183377",
    telHref: "tel:+998900183377",
  },
  social: {
    telegramChannel: "bukafit24",
    telegramChannelUrl: "https://t.me/bukafit24",
    instagram: "bukafit_uz",
    instagramUrl: "https://instagram.com/bukafit_uz",
    /** Deep link менеджера для заявок */
    salesManager: "BUKAFIT_SALESMANAGER",
    salesManagerUrl: "https://t.me/BUKAFIT_SALESMANAGER",
  },
  maps: {
    /** Lazy map: without NEXT_PUBLIC_MAPS_* → external Google Maps; embed only when env enables it */
    yandexEmbedQuery: "Buka FIT Мирабад 41/6 Ташкент",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=41.2995,69.2797",
    dualGisUrl: "https://2gis.uz/tashkent/search/Buka%20FIT",
  },
  facts: [
    {
      id: "area",
      value: 2000,
      caption: { ru: "м²", uz: "m²", en: "m²" },
      label: { ru: "2000 м²", uz: "2000 m²", en: "2000 m²" },
    },
    {
      id: "hours",
      value: 24,
      suffix: "/7",
      caption: { ru: "режим", uz: "rejim", en: "hours" },
      label: { ru: "24/7", uz: "24/7", en: "24/7" },
    },
    {
      id: "lanes",
      value: 16,
      caption: {
        ru: "м · 3 дорожки",
        uz: "m · 3 yo‘lak",
        en: "m · 3 lanes",
      },
      label: {
        ru: "16 м · 3 дорожки",
        uz: "16 m · 3 yo‘lak",
        en: "16 m · 3 lanes",
      },
    },
    {
      id: "sauna",
      value: 2,
      caption: { ru: "сауны", uz: "sauna", en: "saunas" },
      label: { ru: "2 сауны", uz: "2 sauna", en: "2 saunas" },
    },
  ] as const,
  /** Бегущая лента внизу hero (фаза 11) — единственное место этих формулировок на главной. */
  tickerItems: [
    {
      id: "area",
      label: { ru: "2000 М²", uz: "2000 M²", en: "2000 M²" },
    },
    {
      id: "hours",
      label: { ru: "24/7", uz: "24/7", en: "24/7" },
    },
    {
      id: "pool",
      label: {
        ru: "БАССЕЙН 16 М",
        uz: "BASSEYIN 16 M",
        en: "POOL 16 M",
      },
    },
    {
      id: "spa",
      label: {
        ru: "САУНА И ХАММАМ",
        uz: "SAUNA VA HAMMAM",
        en: "SAUNA & HAMMAM",
      },
    },
    {
      id: "location",
      label: {
        ru: "ЦЕНТР ГОРОДА",
        uz: "SHAHAR MARKAZI",
        en: "CITY CENTER",
      },
    },
  ] as const,
} as const;

export type Club = typeof club;
