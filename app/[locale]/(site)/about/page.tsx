import type { Metadata } from "next";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { Gallery } from "@/components/sections/Gallery";
import { FinalCta } from "@/components/sections/FinalCta";
import { club } from "@/content/club";
import type { AppLocale } from "@/lib/i18n/routing";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.about" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.about");
  const typedLocale = (await getLocale()) as AppLocale;

  return (
    <>
      <section className="py-[clamp(4rem,10vw,7.5rem)]">
        <div className="container-content max-w-3xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-brass">
            {t("eyebrow")}
          </p>
          <h1 className="font-display text-display-section uppercase text-smoke">
            {t("title")}
          </h1>
          <p className="mt-4 text-smoke-muted">{t("body")}</p>
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {club.facts.map((fact) => (
              <li
                key={fact.id}
                className="border border-line bg-graphite-elevated px-4 py-5 text-center"
              >
                <p className="font-display text-xl uppercase text-brass">
                  {fact.label[typedLocale]}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Gallery />
      <FinalCta />
    </>
  );
}
