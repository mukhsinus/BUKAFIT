import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { TypographicBlock } from "@/components/ui/TypographicBlock";
import { ScheduleBoard } from "@/components/sections/ScheduleBoard";
import { FinalCta } from "@/components/sections/FinalCta";
import { Reveal } from "@/components/motion/Reveal";
import { SectionAtmosphere } from "@/components/motion/SectionAtmosphere";
import { buildPageMetadata } from "@/lib/seo";
import type { AppLocale } from "@/lib/i18n/routing";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.schedule" });
  return buildPageMetadata({
    locale: locale as AppLocale,
    path: "/schedule",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function SchedulePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.schedule");

  return (
    <>
      <section className="relative overflow-hidden section-y">
        <SectionAtmosphere variant="b" />
        <div className="container-content relative z-[1]">
          <Reveal>
            <TypographicBlock
              title={t("title")}
              lead={t("description")}
              className="mb-10 lg:mb-12"
            />
            <ScheduleBoard />
          </Reveal>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
