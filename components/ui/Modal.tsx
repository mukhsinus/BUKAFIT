"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
};

export function Modal({ open, onClose, title, children, className }: ModalProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKey);
    panelRef.current?.focus();

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!mounted || !open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
      <button
        type="button"
        className="absolute inset-0 bg-graphite/80 backdrop-blur-sm"
        aria-label="Close"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={cn(
          "relative z-10 max-h-[min(92dvh,720px)] w-full overflow-y-auto rounded-t-lg border border-line bg-graphite-elevated p-5 shadow-2xl sm:max-w-md sm:rounded-lg sm:p-6",
          "pb-[max(1.25rem,env(safe-area-inset-bottom))]",
          className,
        )}
      >
        <div className="mb-5 flex items-start justify-between gap-3">
          <h2
            id={titleId}
            className="font-display text-xl uppercase tracking-[0.02em] text-smoke"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-line text-smoke-muted hover:text-smoke"
            aria-label="Close"
          >
            <span aria-hidden>×</span>
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body,
  );
}
