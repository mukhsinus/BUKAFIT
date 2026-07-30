import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faq, faqHomeIds } from "@/content/faq";
import type { AppLocale } from "@/lib/i18n/routing";

export async function FaqSection() {
  const t = await getTranslations("home.faq");
  const locale = (await getLocale()) as AppLocale;
  const items = faqHomeIds
    .map((id) => faq.find((item) => item.id === id))
    .filter((item): item is (typeof faq)[number] => Boolean(item));

  return (
    <section className="border-t border-line py-[clamp(4rem,10vw,7.5rem)]">
      <div className="container-content max-w-3xl">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
          action={
            <Link
              href="/faq"
              className="text-sm font-semibold text-brass hover:text-brass-hover"
            >
              {t("all")}
            </Link>
          }
        />

        <Accordion>
          {items.map((item) => (
            <AccordionItem
              key={item.id}
              id={item.id}
              title={item.question[locale]}
            >
              {item.answer[locale]}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
