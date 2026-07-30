import { getLocale, getTranslations } from "next-intl/server";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";
import { Reveal } from "@/components/motion/Reveal";
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
  /** Limit to specific item ids (e.g. freeze / guest / refund) */
  ids?: string[];
  /** Hide category headings — flat list */
  flat?: boolean;
  title?: string;
  description?: string;
  /** h2 for embedded sections (pricing); h1 for /faq */
  headingLevel?: "h1" | "h2";
};

export async function FaqFull({
  categories,
  ids,
  flat,
  title,
  description,
  headingLevel = "h1",
}: FaqFullProps) {
  const t = await getTranslations("pages.faq");
  const locale = (await getLocale()) as AppLocale;

  let items = faq;
  if (ids) {
    items = ids
      .map((id) => faq.find((item) => item.id === id))
      .filter((item): item is (typeof faq)[number] => Boolean(item));
  } else if (categories) {
    items = faq.filter((item) => categories.includes(item.category));
  }

  const list = categories ?? categoryOrder;
  const showByCategory = !ids && !flat;
  const Heading = headingLevel;

  return (
    <section className="section-y">
      <div className="container-content">
        <Reveal>
          <div className="mb-10 max-w-[62ch] lg:mb-12">
            <Heading className="font-display text-display-section text-ink">
              {title ?? t("title")}
            </Heading>
            <p className="mt-4 text-ink/70">
              {description ?? t("description")}
            </p>
          </div>

          {showByCategory ? (
            <div className="space-y-12">
              {list.map((category) => {
                const group = items.filter((item) => item.category === category);
                if (group.length === 0) return null;
                return (
                  <div key={category}>
                    <h2 className="mb-4 font-mono-label text-ink/55">
                      {faqCategories[category][locale]}
                    </h2>
                    <Accordion>
                      {group.map((item) => (
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
          ) : (
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
          )}
        </Reveal>
      </div>
    </section>
  );
}
