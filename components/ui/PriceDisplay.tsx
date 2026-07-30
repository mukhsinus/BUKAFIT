import { cn, formatPriceParts } from "@/lib/utils";

type PriceDisplayProps = {
  amount: number;
  locale: string;
  className?: string;
  /** Accent color for the amount (default brass). Use graphite on brass surfaces. */
  tone?: "brass" | "graphite" | "smoke";
  size?: "sm" | "md" | "lg";
};

const sizeClass = {
  sm: "text-[clamp(1.15rem,3vw,1.35rem)]",
  md: "text-[clamp(1.25rem,3.2vw,1.65rem)]",
  lg: "text-[clamp(1.35rem,3.5vw,1.85rem)]",
} as const;

const toneClass = {
  brass: "text-brass",
  graphite: "text-graphite",
  smoke: "text-smoke",
} as const;

/**
 * Prices use Manrope + tabular-nums — Unbounded is too wide for UZS amounts
 * like «15 000 000» at 360px / 4-col cards.
 */
export function PriceDisplay({
  amount,
  locale,
  className,
  tone = "brass",
  size = "md",
}: PriceDisplayProps) {
  const { amount: formatted, currency } = formatPriceParts(amount, locale);

  return (
    <div
      className={cn(
        "min-w-0 max-w-full font-sans font-semibold tabular-nums tracking-tight",
        toneClass[tone],
        className,
      )}
    >
      <span
        className={cn(
          "block w-full truncate leading-none",
          sizeClass[size],
        )}
      >
        {formatted}
      </span>
      <span className="mt-1.5 block text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-smoke-muted">
        {currency}
      </span>
    </div>
  );
}
