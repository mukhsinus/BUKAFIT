import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { TrainersPreview } from "@/components/sections/TrainersPreview";
import { FinalCta } from "@/components/sections/FinalCta";
import { Reveal } from "@/components/motion/Reveal";
import { FEATURES } from "@/content/features";
import { buildPageMetadata } from "@/lib/seo";
import type { AppLocale } from "@/lib/i18n/routing";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.trainers" });
  return buildPageMetadata({
    locale: locale as AppLocale,
    path: "/trainers",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

/**
 * Page always exists (sitemap / deep links). When FEATURES.trainers is false
 * we show an honest empty state — no invented names — instead of 404.
 */
export default async function TrainersPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.trainers");
  const tHome = await getTranslations("home.trainers");

  if (FEATURES.trainers) {
    return (
      <>
        <TrainersPreview showAllLink={false} />
        <FinalCta />
      </>
    );
  }

  return (
    <>
      <section className="section-y">
        <div className="container-content max-w-3xl">
          <Reveal>
            <p className="font-mono-label text-ink/55">{tHome("eyebrow")}</p>
            <h1 className="mt-3 font-display text-display-section text-ink">
              {t("metaTitle")}
            </h1>
            <p className="mt-4 text-body-lg text-ink/75">{t("pending")}</p>
          </Reveal>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
