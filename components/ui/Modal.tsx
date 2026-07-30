"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { bindFocusTrap, getFocusableElements } from "@/lib/focus";
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
  const previousFocus = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    previousFocus.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const panel = panelRef.current;

    requestAnimationFrame(() => {
      const list = getFocusableElements(panel);
      (list[0] ?? panel)?.focus();
    });

    const unbind = panel
      ? bindFocusTrap(panel, onClose)
      : () => undefined;

    return () => {
      document.body.style.overflow = previousOverflow;
      unbind();
      previousFocus.current?.focus?.();
    };
  }, [open, onClose]);

  if (!mounted || !open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
      <button
        type="button"
        tabIndex={-1}
        className="absolute inset-0 bg-ink/70"
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
          "relative z-10 max-h-[min(92dvh,720px)] w-full overflow-y-auto rounded-none border border-mineral bg-steam p-5 text-ink sm:max-w-md sm:p-6",
          "pb-[max(1.25rem,env(safe-area-inset-bottom))]",
          className,
        )}
      >
        <div className="mb-5 flex items-start justify-between gap-3">
          <h2
            id={titleId}
            className="font-display text-xl tracking-[-0.035em] text-ink"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-none border border-mineral text-ink/55 transition-colors hover:text-ink"
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
