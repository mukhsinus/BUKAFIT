import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
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
      <section className="py-[clamp(4rem,10vw,7.5rem)]">
        <div className="container-content grid gap-10 lg:grid-cols-2">
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
          <div className="aspect-[4/3] overflow-hidden border border-line bg-graphite">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/media/placeholders/${service.mediaSlot}.svg`}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>
      <PricingSection showAllPlansLink />
      <FinalCta />
    </>
  );
}
