"use client";

import { useLocale, useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/Reveal";
import { PhotoTile } from "@/components/media/PhotoTile";
import { services, type ServiceSlug } from "@/content/services";
import type { AppLocale } from "@/lib/i18n/routing";

/** Реальные фото — когда появятся в public/media/{slot}.jpg */
const READY: Partial<Record<ServiceSlug, string>> = {};

const ORDER: ServiceSlug[] = [
  "gym",
  "pool",
  "spa",
  "group",
  "massage",
  "kids",
  "personal",
];

export function ServicesGrid() {
  const t = useTranslations("home.services");
  const locale = useLocale() as AppLocale;
  const bySlug = Object.fromEntries(services.map((s) => [s.slug, s])) as Record<
    ServiceSlug,
    (typeof services)[number]
  >;

  return (
    <section id="services" className="section-y !pt-0">
      <Reveal>
        <div className="container-content mb-8 md:mb-10">
          <h2 className="font-display text-display-section text-ink">
            {t("title")}
          </h2>
        </div>
      </Reveal>

      <div className="services-mosaic">
        {ORDER.map((slug) => {
          const service = bySlug[slug];
          return (
            <PhotoTile
              key={slug}
              title={service.title[locale]}
              short={service.short[locale]}
              href={`/services/${slug}`}
              src={READY[slug]}
              sizes={
                slug === "gym"
                  ? "(max-width: 1024px) 100vw, 58vw"
                  : slug === "personal"
                    ? "100vw"
                    : "(max-width: 1024px) 100vw, 42vw"
              }
              viewLabel={t("view")}
              placeholderLabel={t("photoLabel", {
                zone: service.title[locale],
              })}
              className={`mosaic-tile mosaic-${slug}`}
              aspectClass="aspect-[4/5] lg:aspect-auto lg:h-full"
            />
          );
        })}
      </div>
    </section>
  );
}
