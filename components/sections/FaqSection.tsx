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
    <section id="faq" className="section-y">
      <div className="container-content">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16 lg:items-start">
          <Reveal className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <h2 className="font-display text-display-section text-ink">
                {t("title")}
              </h2>
              <p className="mt-4 max-w-sm text-ink/70">{t("description")}</p>
              <Link
                href="/faq"
                className="group mt-6 inline-flex text-sm font-medium text-pool transition-colors duration-200 hover:text-pool-deep"
              >
                {t("all")}
                <span
                  className="ms-1 inline-block transition-transform duration-200 [@media(hover:hover)]:group-hover:translate-x-1"
                  aria-hidden
                >
                  →
                </span>
              </Link>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.06}>
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
