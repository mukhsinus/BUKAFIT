"use client";

import {
  createContext,
  useContext,
  useId,
  useState,
  type ReactNode,
} from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

type AccordionContextValue = {
  openId: string | null;
  setOpenId: (id: string | null) => void;
  baseId: string;
  reduce: boolean;
};

const AccordionContext = createContext<AccordionContextValue | null>(null);

export function Accordion({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const [openId, setOpenId] = useState<string | null>(null);
  const baseId = useId();
  const reduce = usePrefersReducedMotion();

  return (
    <AccordionContext.Provider value={{ openId, setOpenId, baseId, reduce }}>
      <div className={cn("border-y border-mineral", className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error("AccordionItem must be inside Accordion");

  const open = ctx.openId === id;
  const buttonId = `${ctx.baseId}-btn-${id}`;
  const panelId = `${ctx.baseId}-panel-${id}`;
  const duration = ctx.reduce ? "0ms" : "250ms";

  return (
    <div className="border-b border-mineral last:border-b-0">
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full items-center justify-between gap-4 py-5 text-left md:py-6"
          onClick={() => ctx.setOpenId(open ? null : id)}
        >
          <span className="font-display text-[clamp(1.125rem,2vw,1.5rem)] font-medium leading-snug tracking-[-0.02em] text-ink">
            {title}
          </span>
          <span
            className="shrink-0 font-mono text-lg text-ink/50"
            style={{
              display: "inline-block",
              transform: open ? "rotate(45deg)" : "rotate(0deg)",
              transition: `transform ${duration} cubic-bezier(0.22, 1, 0.36, 1)`,
            }}
            aria-hidden
          >
            +
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className="grid"
        style={{
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: `grid-template-rows ${duration} cubic-bezier(0.22, 1, 0.36, 1)`,
        }}
      >
        <div className="overflow-hidden">
          <div
            className="pb-5 text-[0.9375rem] leading-[1.6] text-ink/75 md:pb-6"
            style={{
              opacity: open ? 1 : 0,
              transition: `opacity ${duration} cubic-bezier(0.22, 1, 0.36, 1)`,
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
