import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { FinalCta } from "@/components/sections/FinalCta";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.services" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function ServicesPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ServicesGrid showAllLink={false} />
      <FinalCta />
    </>
  );
}
