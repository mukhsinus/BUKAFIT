import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";
import { Reveal } from "@/components/motion/Reveal";
import { faq, faqHomeIds } from "@/content/faq";
import type { AppLocale } from "@/lib/i18n/routing";

export async function FaqSection() {
  const t = await getTranslations("home.faq");
  const locale = (await getLocale()) as AppLocale;
  const items = faqHomeIds
    .map((id) => faq.find((item) => item.id === id))
    .filter((item): item is (typeof faq)[number] => Boolean(item));

  return (
    <section className="border-t border-line section-y">
      <div className="container-content">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14 lg:items-start">
          <Reveal>
            <div className="lg:sticky lg:top-24">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-brass">
                {t("eyebrow")}
              </p>
              <h2 className="font-display text-display-section uppercase text-smoke">
                {t("title")}
              </h2>
              <p className="mt-3 max-w-sm text-smoke-muted">{t("description")}</p>
              <Link
                href="/faq"
                className="mt-5 inline-flex text-sm font-semibold text-brass hover:text-brass-hover"
              >
                {t("all")}
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
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
          </Reveal>
        </div>
      </div>
    </section>
  );
}
