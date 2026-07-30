import { buildClubJsonLd } from "@/lib/seo";
import type { AppLocale } from "@/lib/i18n/routing";

type JsonLdProps = {
  locale: AppLocale;
};

export function ClubJsonLd({ locale }: JsonLdProps) {
  const data = buildClubJsonLd(locale);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
