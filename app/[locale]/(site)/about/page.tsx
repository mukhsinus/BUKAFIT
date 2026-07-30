import type { Metadata } from "next";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { TypographicBlock } from "@/components/ui/TypographicBlock";
import { PhotoTile } from "@/components/media/PhotoTile";
import { FinalCta } from "@/components/sections/FinalCta";
import { Reveal } from "@/components/motion/Reveal";
import { club } from "@/content/club";
import { services } from "@/content/services";
import { buildPageMetadata } from "@/lib/seo";
import type { AppLocale } from "@/lib/i18n/routing";

type PageProps = { params: Promise<{ locale: string }> };

const ABOUT_TILES = ["gym", "pool", "spa", "group"] as const;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.about" });
  return buildPageMetadata({
    locale: locale as AppLocale,
    path: "/about",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.about");
  const typedLocale = (await getLocale()) as AppLocale;

  return (
    <>
      <section className="section-y">
        <div className="container-content">
          <Reveal>
            <TypographicBlock title={t("title")} lead={t("body")}>
              <p>{t("body2")}</p>
              <ul className="!mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-mineral pt-8 sm:grid-cols-4">
                {club.facts.map((fact) => (
                  <li key={fact.id}>
                    <p className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-medium tabular-nums leading-none text-ink">
                      {fact.value}
                      {"suffix" in fact ? fact.suffix : ""}
                    </p>
                    <p className="mt-2 font-mono-label text-ink/55">
                      {fact.caption[typedLocale]}
                    </p>
                  </li>
                ))}
              </ul>
            </TypographicBlock>
          </Reveal>
        </div>
      </section>

      {/* Фотоплитки §4.4 — full-bleed, без рамок */}
      <section className="pb-0">
        <Reveal>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {ABOUT_TILES.map((slug) => {
              const service = services.find((s) => s.slug === slug)!;
              return (
                <PhotoTile
                  key={slug}
                  title={service.title[typedLocale]}
                  short={service.short[typedLocale]}
                  href={`/services/${slug}`}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  placeholderLabel={t("photoLabel", {
                    zone: service.title[typedLocale],
                  })}
                  aspectClass="aspect-[4/5] lg:aspect-[3/4]"
                />
              );
            })}
          </div>
        </Reveal>
      </section>

      <FinalCta />
    </>
  );
}
