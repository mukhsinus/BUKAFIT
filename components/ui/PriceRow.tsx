"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { useCanHover } from "@/hooks/useCanHover";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { Plan } from "@/content/plans";
import type { AppLocale } from "@/lib/i18n/routing";
import type { LeadPlanId } from "@/lib/validations/lead";
import { cn } from "@/lib/utils";

type PriceRowProps = {
  plan: Plan;
  onSelect: (planId: LeadPlanId) => void;
};

/** Строка прайс-листа §4.3 — переиспользуется на главной, /pricing и /services/[slug]. */
export function PriceRow({ plan, onSelect }: PriceRowProps) {
  const t = useTranslations("home.pricing");
  const locale = useLocale() as AppLocale;
  const canHover = useCanHover();
  const reduce = usePrefersReducedMotion();
  const recommended = plan.recommended;
  const tone = recommended ? "chalk" : "ink";
  const rowRef = useRef<HTMLLIElement>(null);
  const [gradientIn, setGradientIn] = useState(reduce);

  useEffect(() => {
    if (!recommended || reduce) {
      setGradientIn(true);
      return;
    }
    const el = rowRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setGradientIn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [recommended, reduce]);

  return (
    <li
      ref={rowRef}
      className={cn(
        "group relative border-b border-mineral last:border-b-0",
        "transition-[background-color,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
        recommended
          ? "gradient-pool-year bg-ink text-chalk"
          : cn("bg-transparent text-ink", canHover && "hover:bg-mineral"),
        canHover && "hover:translate-x-1",
      )}
    >
      {recommended ? (
        <div
          className={cn(
            "gradient-pool gradient-pool-layer motion-safe:animate-gradient-drift pointer-events-none absolute inset-0",
            "transition-opacity duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
            gradientIn ? "opacity-100 delay-150" : "opacity-0",
          )}
          aria-hidden
        />
      ) : null}

      <div
        className={cn(
          "relative z-[1] grid grid-cols-1 gap-5 py-6 md:gap-6 md:py-7 lg:grid-cols-12 lg:items-center lg:gap-0 lg:py-0",
          recommended && "pb-0 lg:pr-[11rem]",
        )}
      >
        <div className="min-w-0 lg:col-span-4 lg:px-5 lg:py-8">
          <div className="flex flex-wrap items-center gap-3">
            {recommended ? (
              <span className="radius-pill motion-safe:animate-badge-pulse bg-chalk px-3 py-1 font-mono-label text-ink">
                {t("badge")}
              </span>
            ) : null}
            <h3 className="font-display text-display-h3">{plan.name[locale]}</h3>
          </div>
          <p
            className={cn(
              "mt-2 text-[0.9375rem] leading-snug",
              recommended ? "text-chalk/70" : "text-ink/70",
            )}
          >
            {plan.forWhom[locale]}
          </p>
        </div>

        <div className="order-3 min-w-0 lg:order-none lg:col-span-3 lg:px-5 lg:py-8">
          <p
            className={cn(
              "text-[0.8125rem] leading-relaxed",
              recommended ? "text-chalk/75" : "text-ink/75",
            )}
          >
            {plan.includes.map((item, i) => (
              <span key={item.ru}>
                {i > 0 ? (
                  <span className="mx-2 font-mono-label opacity-50">/</span>
                ) : null}
                {item[locale]}
              </span>
            ))}
          </p>
        </div>

        <div className="order-2 min-w-0 lg:order-none lg:col-span-3 lg:px-5 lg:py-8">
          <PriceDisplay
            amount={plan.price}
            locale={locale}
            tone={tone}
            size="lg"
            layout="inline"
          />
        </div>

        {!recommended ? (
          <div className="order-4 min-w-0 lg:order-none lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:px-5 lg:py-8">
            <button
              type="button"
              className={cn(
                "inline-flex min-h-11 w-full items-center justify-center text-sm font-medium text-ink lg:w-auto lg:justify-end",
                "transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
                canHover && "hover:text-pool",
              )}
              onClick={() => onSelect(plan.id)}
            >
              {t("select")}
              <span
                className={cn(
                  "ms-1 inline-block transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  canHover && "group-hover:translate-x-1",
                )}
                aria-hidden
              >
                →
              </span>
            </button>
          </div>
        ) : null}
      </div>

      {recommended ? (
        <>
          <button
            type="button"
            className="btn-pool relative z-[1] flex min-h-12 w-full items-center justify-center rounded-none text-sm font-medium text-chalk lg:hidden"
            onClick={() => onSelect(plan.id)}
          >
            {t("select")}
            <span className="ms-1" aria-hidden>
              →
            </span>
          </button>
          <button
            type="button"
            className="btn-pool absolute inset-y-0 right-0 z-[2] hidden w-[11rem] items-center justify-center rounded-none text-sm font-medium text-chalk lg:inline-flex"
            onClick={() => onSelect(plan.id)}
          >
            {t("select")}
            <span className="ms-1" aria-hidden>
              →
            </span>
          </button>
        </>
      ) : null}
    </li>
  );
}
