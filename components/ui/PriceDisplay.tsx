import { cn, formatPriceParts } from "@/lib/utils";

type PriceDisplayProps = {
  amount: number;
  locale: string;
  className?: string;
  /** На светлом — ink; на инверсной строке — chalk */
  tone?: "ink" | "chalk";
  size?: "sm" | "md" | "lg";
  /** Inline: сумма и «СУМ» на одной базовой линии */
  layout?: "stack" | "inline";
};

const sizeClass = {
  sm: "text-[clamp(1.25rem,3.5vw,1.75rem)]",
  md: "text-[clamp(1.5rem,4vw,2.25rem)]",
  /** Потолок 2.75rem: «15 000 000» + СУМ в колонках 8–10 на 1440 */
  lg: "text-[clamp(1.5rem,3.2vw,2.75rem)]",
} as const;

const toneClass = {
  ink: "text-ink",
  chalk: "text-chalk",
} as const;

const currencyTone = {
  ink: "text-ink/65",
  chalk: "text-chalk/70",
} as const;

/**
 * Цены — mono/body + tabular-nums, не display-гарнитура
 * (длинные суммы вроде «15 000 000» на 360px).
 */
export function PriceDisplay({
  amount,
  locale,
  className,
  tone = "ink",
  size = "md",
  layout = "inline",
}: PriceDisplayProps) {
  const { amount: formatted, currency } = formatPriceParts(amount, locale);

  if (layout === "stack") {
    return (
      <div
        className={cn(
          "min-w-0 max-w-full font-mono font-medium tabular-nums tracking-tight",
          toneClass[tone],
          className,
        )}
      >
        <span className={cn("block leading-none", sizeClass[size])}>
          {formatted}
        </span>
        <span
          className={cn(
            "mt-1.5 block font-mono-label",
            currencyTone[tone],
          )}
        >
          {currency}
        </span>
      </div>
    );
  }

  return (
    <p
      className={cn(
        "inline-flex min-w-0 max-w-full flex-nowrap items-baseline gap-x-2 font-mono font-medium tabular-nums tracking-tight",
        toneClass[tone],
        className,
      )}
    >
      <span
        className={cn(
          "whitespace-nowrap leading-none",
          sizeClass[size],
        )}
      >
        {formatted}
      </span>
      <span className={cn("shrink-0 font-mono-label", currencyTone[tone])}>
        {currency}
      </span>
    </p>
  );
}
