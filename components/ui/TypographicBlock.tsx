import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type TypographicBlockProps = {
  eyebrow?: string;
  title: string;
  titleAs?: "h1" | "h2";
  lead?: string;
  children?: ReactNode;
  className?: string;
  /** Макс. ширина текстовой колонки (~62ch) */
  measure?: boolean;
};

/**
 * Типографический блок без карточек/рамок — заголовок + lead + контент.
 * Sentence case, display для заголовка, mono только для eyebrow.
 */
export function TypographicBlock({
  eyebrow,
  title,
  titleAs = "h1",
  lead,
  children,
  className,
  measure = true,
}: TypographicBlockProps) {
  const TitleTag = titleAs;

  return (
    <div className={cn(measure && "max-w-[62ch]", className)}>
      {eyebrow ? (
        <p className="mb-3 font-mono-label text-ink/55">{eyebrow}</p>
      ) : null}
      <TitleTag className="font-display text-display-section text-ink">
        {title}
      </TitleTag>
      {lead ? (
        <p className="mt-5 text-body-lg text-ink/75">{lead}</p>
      ) : null}
      {children ? (
        <div className="mt-8 space-y-5 text-[0.9375rem] leading-[1.65] text-ink/80 md:text-base">
          {children}
        </div>
      ) : null}
    </div>
  );
}
