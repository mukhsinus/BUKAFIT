import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { TrainersPreview } from "@/components/sections/TrainersPreview";
import { FinalCta } from "@/components/sections/FinalCta";
import { FEATURES } from "@/content/features";
import { buildPageMetadata } from "@/lib/seo";
import type { AppLocale } from "@/lib/i18n/routing";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!FEATURES.trainers) return {};
  const t = await getTranslations({ locale, namespace: "pages.trainers" });
  return buildPageMetadata({
    locale: locale as AppLocale,
    path: "/trainers",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function TrainersPage({ params }: PageProps) {
  const { locale } = await params;
  if (!FEATURES.trainers) notFound();
  setRequestLocale(locale);

  return (
    <>
      <TrainersPreview showAllLink={false} />
      <FinalCta />
    </>
  );
}
