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
    /** Статичная подложка до клика; iframe Яндекс — по взаимодействию (Фаза 3+) */
    yandexEmbedQuery: "Buka FIT Мирабад 41/6 Ташкент",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=41.2995,69.2797",
    dualGisUrl: "https://2gis.uz/tashkent/search/Buka%20FIT",
  },
  facts: [
    { id: "247", label: { ru: "24/7", uz: "24/7", en: "24/7" } },
    {
      id: "area",
      label: {
        ru: "2000 м²",
        uz: "2000 m²",
        en: "2000 m²",
      },
    },
    {
      id: "pool",
      label: {
        ru: "Бассейн",
        uz: "Basseyn",
        en: "Pool",
      },
    },
    {
      id: "spa",
      label: {
        ru: "Сауна и хаммам",
        uz: "Sauna va hammom",
        en: "Sauna & hammam",
      },
    },
    {
      id: "center",
      label: {
        ru: "Центр города",
        uz: "Shahar markazi",
        en: "City center",
      },
    },
  ] as const,
} as const;

export type Club = typeof club;
