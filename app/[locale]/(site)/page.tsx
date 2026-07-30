import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { FactsStrip } from "@/components/sections/FactsStrip";
import { PricingSection } from "@/components/sections/PricingSection";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { SchedulePreview } from "@/components/sections/SchedulePreview";
import { TrainersPreview } from "@/components/sections/TrainersPreview";
import { Gallery } from "@/components/sections/Gallery";
import { FaqSection } from "@/components/sections/FaqSection";
import { ContactsMap } from "@/components/sections/ContactsMap";
import { FinalCta } from "@/components/sections/FinalCta";
import type { AppLocale } from "@/lib/i18n/routing";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const typedLocale = locale as AppLocale;

  return (
    <>
      <Hero />
      <FactsStrip locale={typedLocale} />
      <PricingSection />
      <ServicesGrid />
      <SchedulePreview />
      <TrainersPreview />
      <Gallery />
      <FaqSection />
      <ContactsMap />
      <FinalCta />
    </>
  );
}
