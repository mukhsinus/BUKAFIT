import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { buildPageMetadata } from "@/lib/seo";
import type { AppLocale } from "@/lib/i18n/routing";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.legal" });
  return buildPageMetadata({
    locale: locale as AppLocale,
    path: "/legal/privacy",
    title: t("privacyTitle"),
    description: t("privacyDescription"),
  });
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.legal");

  const sections = [
    { num: "01", body: t("privacyIntro") },
    { num: "02", body: t("privacyData") },
    { num: "03", body: t("privacyContact") },
  ];

  return (
    <section className="section-y">
      <div className="container-content max-w-[42rem]">
        <Reveal>
          <h1 className="font-display text-display-section text-ink">
            {t("privacyTitle")}
          </h1>

          <ol className="mt-10 space-y-8 border-t border-mineral pt-8">
            {sections.map((section) => (
              <li
                key={section.num}
                className="grid grid-cols-[3rem_1fr] gap-4 md:grid-cols-[3.5rem_1fr]"
              >
                <span className="font-mono-label tabular-nums text-ink/45">
                  {section.num}
                </span>
                <p className="text-[0.9375rem] leading-[1.65] text-ink/80">
                  {section.body}
                </p>
              </li>
            ))}
          </ol>

          <p className="mt-10 font-mono-label text-ink/45">{t("todoNote")}</p>

          <p className="mt-8">
            <Link
              href="/legal/offer"
              className="text-sm font-medium text-pool transition-colors duration-200 hover:text-pool-deep"
            >
              {t("offerTitle")}
              <span className="ms-1" aria-hidden>
                →
              </span>
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
