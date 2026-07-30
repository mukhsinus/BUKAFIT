import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { TypographicBlock } from "@/components/ui/TypographicBlock";
import { ServiceHero } from "@/components/sections/ServiceHero";
import { PricingSection } from "@/components/sections/PricingSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { Reveal } from "@/components/motion/Reveal";
import { getServiceBySlug, serviceSlugs } from "@/content/services";
import { buildPageMetadata } from "@/lib/seo";
import type { AppLocale } from "@/lib/i18n/routing";
import type { MediaSlot } from "@/components/media/MediaImage";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  const typedLocale = locale as AppLocale;
  return buildPageMetadata({
    locale: typedLocale,
    path: `/services/${slug}`,
    title: service.title[typedLocale],
    description: service.short[typedLocale],
  });
}

export default async function ServicePage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const typedLocale = locale as AppLocale;
  const t = await getTranslations("pages.service");

  return (
    <>
      <ServiceHero
        title={service.title[typedLocale]}
        slot={service.mediaSlot as MediaSlot}
        placeholderLabel={t("photoLabel", {
          zone: service.title[typedLocale],
        })}
      />

      <section className="section-y">
        <div className="container-content">
          <Reveal>
            <TypographicBlock
              titleAs="h2"
              title={t("about")}
              lead={service.short[typedLocale]}
            >
              <p>{service.body[typedLocale]}</p>
              <div className="border-t border-mineral pt-6">
                <p className="font-mono-label text-ink/55">{t("forWhom")}</p>
                <p className="mt-2 text-ink/80">{service.forWhom[typedLocale]}</p>
              </div>
            </TypographicBlock>
          </Reveal>
        </div>
      </section>

      <PricingSection showAllPlansLink title={t("relatedPlans")} />
      <FinalCta />
    </>
  );
}
