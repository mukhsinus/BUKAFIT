import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MediaImage, type MediaSlot } from "@/components/media/MediaImage";
import { FinalCta } from "@/components/sections/FinalCta";
import { PricingSection } from "@/components/sections/PricingSection";
import { getServiceBySlug, serviceSlugs } from "@/content/services";
import { buildPageMetadata } from "@/lib/seo";
import type { AppLocale } from "@/lib/i18n/routing";

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
      <section className="section-y">
        <div className="container-content grid gap-8 lg:grid-cols-2">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-brass">
              {t("eyebrow")}
            </p>
            <h1 className="font-display text-display-section uppercase text-smoke">
              {service.title[typedLocale]}
            </h1>
            <p className="mt-4 text-smoke-muted">{service.body[typedLocale]}</p>
            <div className="mt-8 border border-line bg-graphite-elevated p-5">
              <h2 className="font-display text-lg uppercase text-brass">
                {t("forWhom")}
              </h2>
              <p className="mt-2 text-sm text-smoke">{service.forWhom[typedLocale]}</p>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden border border-line bg-graphite-mid">
            <MediaImage
              slot={service.mediaSlot as MediaSlot}
              alt=""
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="absolute inset-0"
            />
          </div>
        </div>
      </section>
      <PricingSection showAllPlansLink />
      <FinalCta />
    </>
  );
}
