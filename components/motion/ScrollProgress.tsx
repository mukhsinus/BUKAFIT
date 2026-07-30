"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/** Тонкая полоса pool 2px — прогресс скролла страницы */
export function ScrollProgress() {
  const reduce = useReducedMotion();
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce) return;

    const bar = barRef.current;
    if (!bar) return;

    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      bar.style.transform = `scaleX(${Math.min(1, Math.max(0, p))})`;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [reduce]);

  if (reduce) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent"
      aria-hidden
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-pool"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
