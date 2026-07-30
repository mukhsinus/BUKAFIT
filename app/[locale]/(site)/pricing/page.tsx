import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PricingSection } from "@/components/sections/PricingSection";
import { HowToBuy } from "@/components/sections/HowToBuy";
import { FaqFull } from "@/components/sections/FaqFull";
import { FinalCta } from "@/components/sections/FinalCta";
import { buildPageMetadata } from "@/lib/seo";
import type { AppLocale } from "@/lib/i18n/routing";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.pricing" });
  return buildPageMetadata({
    locale: locale as AppLocale,
    path: "/pricing",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function PricingPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.pricing");

  return (
    <>
      <PricingSection
        showAllPlansLink={false}
        title={t("pageTitle")}
        headingLevel="h1"
      />
      <HowToBuy />
      {/* Заморозка / гостевые / возврат — паттерн §4.7 */}
      <FaqFull
        ids={["freeze", "guest", "refund"]}
        flat
        headingLevel="h2"
        title={t("faqTitle")}
        description={t("faqDescription")}
      />
      <FinalCta />
    </>
  );
}
