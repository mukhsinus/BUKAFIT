import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ScheduleBoard } from "@/components/sections/ScheduleBoard";
import { FinalCta } from "@/components/sections/FinalCta";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.schedule" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function SchedulePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.schedule");

  return (
    <>
      <section className="py-[clamp(4rem,10vw,7.5rem)]">
        <div className="container-content">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-brass">
            {t("eyebrow")}
          </p>
          <h1 className="font-display text-display-section uppercase text-smoke">
            {t("title")}
          </h1>
          <p className="mt-3 max-w-2xl text-smoke-muted">{t("description")}</p>
          <div className="mt-8">
            <ScheduleBoard />
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
