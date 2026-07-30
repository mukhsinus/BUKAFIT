"use client";

import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function HowToBuy() {
  const t = useTranslations("pages.pricing.howToBuy");

  const steps = [
    { title: t("step1Title"), body: t("step1Body") },
    { title: t("step2Title"), body: t("step2Body") },
    { title: t("step3Title"), body: t("step3Body") },
  ];

  return (
    <section className="border-t border-line py-[clamp(3rem,8vw,5rem)]">
      <div className="container-content">
        <SectionHeading title={t("title")} description={t("description")} />
        <ol className="grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="border border-line bg-graphite-elevated p-5"
            >
              <p className="font-display text-2xl text-brass">{index + 1}</p>
              <h3 className="mt-3 font-display text-lg uppercase text-smoke">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-smoke-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
