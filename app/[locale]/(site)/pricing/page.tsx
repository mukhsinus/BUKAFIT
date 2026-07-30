import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PricingSection } from "@/components/sections/PricingSection";
import { HowToBuy } from "@/components/sections/HowToBuy";
import { FaqFull } from "@/components/sections/FaqFull";
import { FinalCta } from "@/components/sections/FinalCta";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.pricing" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function PricingPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PricingSection showAllPlansLink={false} />
      <HowToBuy />
      <FaqFull categories={["membership", "payment"]} />
      <FinalCta />
    </>
  );
}
