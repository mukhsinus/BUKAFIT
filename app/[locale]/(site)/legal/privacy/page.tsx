import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.legal" });
  return { title: t("privacyTitle"), description: t("privacyDescription") };
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.legal");

  return (
    <section className="py-[clamp(4rem,10vw,7.5rem)]">
      <div className="container-content prose-legal max-w-3xl space-y-6 text-sm leading-relaxed text-smoke-muted">
        <h1 className="font-display text-display-section uppercase text-smoke">
          {t("privacyTitle")}
        </h1>
        <p>{t("privacyIntro")}</p>
        <p>{t("privacyData")}</p>
        <p>{t("privacyContact")}</p>
        <p className="text-xs text-smoke-muted/80">{t("todoNote")}</p>
        <p>
          <Link href="/legal/offer" className="font-semibold text-brass hover:underline">
            {t("offerTitle")}
          </Link>
        </p>
      </div>
    </section>
  );
}
