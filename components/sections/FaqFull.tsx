import { getLocale, getTranslations } from "next-intl/server";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faq, faqCategories, type FaqCategoryId } from "@/content/faq";
import type { AppLocale } from "@/lib/i18n/routing";

const categoryOrder: FaqCategoryId[] = [
  "membership",
  "visit",
  "pool",
  "payment",
  "kids",
];

type FaqFullProps = {
  /** Limit to specific categories (e.g. payment on pricing page) */
  categories?: FaqCategoryId[];
};

export async function FaqFull({ categories }: FaqFullProps) {
  const t = await getTranslations("pages.faq");
  const locale = (await getLocale()) as AppLocale;
  const list = categories ?? categoryOrder;

  return (
    <section className="border-t border-line py-[clamp(4rem,10vw,7.5rem)]">
      <div className="container-content max-w-3xl">
        <SectionHeading title={t("title")} description={t("description")} />

        <div className="space-y-10">
          {list.map((category) => {
            const items = faq.filter((item) => item.category === category);
            if (items.length === 0) return null;
            return (
              <div key={category}>
                <h3 className="mb-4 font-display text-xl uppercase text-brass">
                  {faqCategories[category][locale]}
                </h3>
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
