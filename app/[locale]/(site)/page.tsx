import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { PricingSection } from "@/components/sections/PricingSection";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { SchedulePreview } from "@/components/sections/SchedulePreview";
import { TrainersPreview } from "@/components/sections/TrainersPreview";
import { Gallery } from "@/components/sections/Gallery";
import { FaqSection } from "@/components/sections/FaqSection";
import { ContactsMap } from "@/components/sections/ContactsMap";
import { FinalCta } from "@/components/sections/FinalCta";
import { FEATURES } from "@/content/features";
import { buildPageMetadata } from "@/lib/seo";
import type { AppLocale } from "@/lib/i18n/routing";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return buildPageMetadata({
    locale: locale as AppLocale,
    path: "/",
    title: t("defaultTitle"),
    description: t("defaultDescription"),
  });
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <PricingSection />
      <ServicesGrid />
      <SchedulePreview />
      {FEATURES.trainers ? <TrainersPreview /> : null}
      <Gallery />
      <FaqSection />
      <ContactsMap />
      <FinalCta />
    </>
  );
}
