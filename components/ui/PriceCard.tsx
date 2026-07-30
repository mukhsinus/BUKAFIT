"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { useCanHover } from "@/hooks/useCanHover";
import type { Plan } from "@/content/plans";
import type { AppLocale } from "@/lib/i18n/routing";
import type { LeadPlanId } from "@/lib/validations/lead";
import { cn } from "@/lib/utils";

type PriceCardProps = {
  plan: Plan;
  onSelect: (planId: LeadPlanId) => void;
  /** Stagger delay для появления при скролле */
  delay?: number;
  className?: string;
};

function CheckMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
    >
      <path
        d="M2.5 7.25 L5.5 10.25 L11.5 3.75"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Карточка тарифа §4.3 / /pricing — премиум-сетка фазы 10.
 * Прямые дети = пояса для CSS subgrid (выравнивание по Y во всех карточках ряда).
 */
export function PriceCard({
  plan,
  onSelect,
  delay = 0,
  className,
}: PriceCardProps) {
  const t = useTranslations("home.pricing");
  const locale = useLocale() as AppLocale;
  const canHover = useCanHover();
  const reduce = useReducedMotion();
  const recommended = plan.recommended;
  const tone = recommended ? "chalk" : "ink";
  const cardRef = useRef<HTMLElement>(null);
  const [gradientIn, setGradientIn] = useState(!!reduce);

  useEffect(() => {
    if (!recommended || reduce) {
      setGradientIn(true);
      return;
    }
    const el = cardRef.current;
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

  const shellClass = cn(
    /* 7 поясов subgrid: label / title / desc / hairline / price / list / cta */
    "group relative col-span-1 row-span-7 grid grid-rows-subgrid gap-y-0 overflow-visible",
    "rounded-[20px] md:rounded-[24px] xl:rounded-[28px]",
    "p-8 md:p-10 xl:p-12",
    "transition-[transform,box-shadow] duration-[250ms] ease-out",
    recommended
      ? cn(
          "gradient-pool-year bg-ink text-chalk",
          "shadow-[0_2px_8px_rgba(16,20,24,0.04),0_12px_32px_rgba(16,20,24,0.06)]",
          canHover &&
            "hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(16,20,24,0.10)]",
        )
      : cn(
          "bg-steam text-ink",
          "shadow-[0_2px_8px_rgba(16,20,24,0.04),0_12px_32px_rgba(16,20,24,0.06)]",
          canHover &&
            "hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(16,20,24,0.10)]",
        ),
    className,
  );

  const body = (
    <>
      {/* 1 — mono-метка */}
      <p
        className={cn(
          "relative z-[1] font-mono-label",
          recommended ? "text-chalk/70" : "text-ink/55",
        )}
      >
        {plan.durationLabel[locale]}
      </p>

      {/* 2 — title */}
      <h3 className="relative z-[1] mt-3 font-display text-display-h3">
        {plan.name[locale]}
      </h3>

      {/* 3 — описание: до 2 строк полностью, без ellipsis; общая min-height */}
      <p
        className={cn(
          "relative z-[1] mt-2 min-h-[calc(2*1.375em)] text-[0.9375rem] leading-snug",
          recommended ? "text-chalk/65" : "text-ink/65",
        )}
      >
        {plan.forWhom[locale]}
      </p>

      {/* 4 — hairline */}
      <div className="relative z-[1] my-6" aria-hidden>
        <div
          className={cn(
            "h-px w-full",
            recommended ? "bg-chalk/20" : "bg-mineral",
          )}
        />
      </div>

      {/* 5 — цена */}
      <div className="relative z-[1]">
        <PriceDisplay
          amount={plan.price}
          locale={locale}
          tone={tone}
          size="lg"
          layout="inline"
        />
      </div>

      {/* 6 — список */}
      <ul className="relative z-[1] mt-6 flex flex-col gap-3">
        {plan.includes.map((item) => (
          <li
            key={item.ru}
            className={cn(
              "flex items-start gap-2.5 text-[0.875rem] leading-snug",
              recommended ? "text-chalk/85" : "text-ink/80",
            )}
          >
            <CheckMark
              className={cn(
                "mt-0.5 shrink-0",
                recommended ? "text-chalk" : "text-pool",
              )}
            />
            <span>{item[locale]}</span>
          </li>
        ))}
      </ul>

      {/* 7 — CTA */}
      <div className="relative z-[1] mt-8 flex items-end">
        <button
          type="button"
          className={cn(
            "flex min-h-12 w-full items-center justify-center text-sm font-medium",
            "transition-colors duration-200 ease-out",
            recommended
              ? "bg-chalk text-ink"
              : cn(
                  "border border-ink bg-transparent text-ink",
                  canHover && "hover:bg-ink hover:text-chalk",
                ),
          )}
          onClick={() => onSelect(plan.id)}
        >
          {t("select")}
        </button>
      </div>

      {/* Декор после поясов: row 1/-1, не создаёт лишних треков */}
      {recommended ? (
        <>
          <div
            className={cn(
              "pointer-events-none absolute inset-0 z-0 row-span-full row-start-1 rounded-[inherit]",
              "transition-opacity duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
              gradientIn ? "opacity-100 delay-150" : "opacity-0",
            )}
            aria-hidden
          >
            <div className="gradient-pool gradient-pool-layer motion-safe:animate-gradient-drift absolute inset-0 rounded-[inherit]" />
          </div>
          <span
            className={cn(
              "radius-pill absolute left-1/2 top-[-14px] z-[2] row-start-1 -translate-x-1/2",
              "bg-chalk px-3 py-1 font-mono-label whitespace-nowrap text-ink",
              "shadow-[0_2px_8px_rgba(16,20,24,0.08)]",
            )}
          >
            {t("badge")}
          </span>
        </>
      ) : null}
    </>
  );

  if (reduce) {
    return (
      <article ref={cardRef} className={shellClass}>
        {body}
      </article>
    );
  }

  return (
    <motion.article
      ref={cardRef}
      className={shellClass}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {body}
    </motion.article>
  );
}
