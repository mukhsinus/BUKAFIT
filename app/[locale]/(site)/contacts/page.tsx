import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactsMap } from "@/components/sections/ContactsMap";
import { FinalCta } from "@/components/sections/FinalCta";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.contacts" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function ContactsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ContactsMap />
      <FinalCta />
    </>
  );
}
