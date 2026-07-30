"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/Reveal";

/** «Как купить» — типографический нумерованный список mono, без карточек. */
export function HowToBuy() {
  const t = useTranslations("pages.pricing.howToBuy");

  const steps = [
    { title: t("step1Title"), body: t("step1Body") },
    { title: t("step2Title"), body: t("step2Body") },
    { title: t("step3Title"), body: t("step3Body") },
  ];

  return (
    <section className="section-y !pt-0">
      <div className="container-content">
        <Reveal>
          <h2 className="font-display text-display-section text-ink">
            {t("title")}
          </h2>
          <p className="mt-4 max-w-[62ch] text-ink/70">{t("description")}</p>

          <ol className="mt-10 border-y border-mineral">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="grid grid-cols-[3.5rem_1fr] gap-4 border-b border-mineral py-6 last:border-b-0 md:grid-cols-[4.5rem_1fr] md:gap-8 md:py-8"
              >
                <span className="font-mono-label tabular-nums text-ink/50">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-display-h3 text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-[50ch] text-[0.9375rem] leading-relaxed text-ink/70">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
