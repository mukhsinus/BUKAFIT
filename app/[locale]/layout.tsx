import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Manrope, Unbounded } from "next/font/google";
import { AnalyticsScripts } from "@/components/analytics/AnalyticsScripts";
import { ClubJsonLd } from "@/components/seo/ClubJsonLd";
import { routing, type AppLocale } from "@/lib/i18n/routing";
import { buildPageMetadata, isNoIndex, siteOrigin } from "@/lib/seo";
import "../globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  variable: "--font-unbounded",
  display: "swap",
  weight: ["500", "600", "700"],
});

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const typedLocale = locale as AppLocale;
  const page = buildPageMetadata({
    locale: typedLocale,
    path: "/",
    title: t("defaultTitle"),
    description: t("defaultDescription"),
  });

  return {
    metadataBase: new URL(siteOrigin()),
    title: {
      default: t("defaultTitle"),
      template: `%s · ${t("siteName")}`,
    },
    description: t("defaultDescription"),
    alternates: page.alternates,
    openGraph: page.openGraph,
    twitter: page.twitter,
    robots: isNoIndex()
      ? { index: false, follow: false }
      : { index: true, follow: true },
    icons: {
      icon: [
        { url: "/icon", type: "image/png" },
        { url: "/icon.svg", type: "image/svg+xml" },
      ],
      apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
    },
    manifest: "/site.webmanifest",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const typedLocale = locale as AppLocale;

  return (
    <html
      lang={locale}
      className={`${manrope.variable} ${unbounded.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ClubJsonLd locale={typedLocale} />
        <AnalyticsScripts />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
