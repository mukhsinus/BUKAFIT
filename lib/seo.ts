import type { Metadata } from "next";
import { club } from "@/content/club";
import type { AppLocale } from "@/lib/i18n/routing";
import { routing } from "@/lib/i18n/routing";

/** Shared SEO helpers — keep robots.txt and meta robots in sync. */

export function siteOrigin(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "http://localhost:3000"
  );
}

/**
 * Pre-launch default: site is closed to indexing unless explicitly opened.
 * Set NEXT_PUBLIC_NOINDEX=false to allow indexing.
 */
export function isNoIndex(): boolean {
  return process.env.NEXT_PUBLIC_NOINDEX !== "false";
}

export function localePath(locale: string, path = "/"): string {
  const normalized =
    path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${normalized}`;
}

export function absoluteUrl(locale: string, path = "/"): string {
  return `${siteOrigin()}${localePath(locale, path)}`;
}

const ogLocale: Record<AppLocale, string> = {
  ru: "ru_RU",
  uz: "uz_UZ",
  en: "en_US",
};

type PageMetaInput = {
  locale: AppLocale;
  /** Path without locale, e.g. `/pricing` or `/` */
  path: string;
  title: string;
  description: string;
};

export function buildPageMetadata({
  locale,
  path,
  title,
  description,
}: PageMetaInput): Metadata {
  const canonical = absoluteUrl(locale, path);
  const languages: Record<string, string> = {
    "x-default": absoluteUrl("ru", path),
  };
  for (const loc of routing.locales) {
    languages[loc] = absoluteUrl(loc, path);
  }

  const noindex = isNoIndex();

  return {
    title,
    description,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: club.name,
      locale: ogLocale[locale],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

/** JSON-LD SportsActivityLocation — 24/7 club. */
export function buildClubJsonLd(locale: AppLocale) {
  const origin = siteOrigin();
  return {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: club.name,
    description: club.address.full[locale],
    url: absoluteUrl(locale, "/"),
    image: `${origin}/${locale}/opengraph-image`,
    telephone: club.phone.e164,
    address: {
      "@type": "PostalAddress",
      streetAddress: club.address.street[locale],
      addressLocality: club.address.city[locale],
      addressCountry: "UZ",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: club.coordinates.lat,
      longitude: club.coordinates.lng,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    sameAs: [
      club.social.telegramChannelUrl,
      club.social.instagramUrl,
    ],
  };
}
