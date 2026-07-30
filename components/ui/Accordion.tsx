"use client";

import {
  createContext,
  useContext,
  useId,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type AccordionContextValue = {
  openId: string | null;
  setOpenId: (id: string | null) => void;
  baseId: string;
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

  return (
    <AccordionContext.Provider value={{ openId, setOpenId, baseId }}>
      <div className={cn("divide-y divide-line border-y border-line", className)}>
        {children}
      </div>
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

  return (
    <div>
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full items-center justify-between gap-4 py-4 text-left text-base font-medium text-smoke"
          onClick={() => ctx.setOpenId(open ? null : id)}
        >
          <span>{title}</span>
          <span
            className={cn(
              "text-brass transition-transform",
              open && "rotate-45",
            )}
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
        hidden={!open}
        className="pb-4 text-sm text-smoke-muted"
      >
        {open ? children : null}
      </div>
    </div>
  );
}
