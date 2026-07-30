import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
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
    path: "/legal/offer",
    title: t("offerTitle"),
    description: t("offerDescription"),
  });
}

export default async function OfferPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.legal");

  return (
    <section className="py-[clamp(4rem,10vw,7.5rem)]">
      <div className="container-content max-w-3xl space-y-6 text-sm leading-relaxed text-smoke-muted">
        <h1 className="font-display text-display-section uppercase text-smoke">
          {t("offerTitle")}
        </h1>
        <p>{t("offerIntro")}</p>
        <p>{t("offerScope")}</p>
        <p>{t("offerPayment")}</p>
        <p className="text-xs text-smoke-muted/80">{t("todoNote")}</p>
        <p>
          <Link
            href="/legal/privacy"
            className="font-semibold text-brass hover:underline"
          >
            {t("privacyTitle")}
          </Link>
        </p>
      </div>
    </section>
  );
}
