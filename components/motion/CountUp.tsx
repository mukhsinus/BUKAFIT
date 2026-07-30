"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type CountUpProps = {
  value: number;
  suffix?: string;
  className?: string;
  durationMs?: number;
};

export function CountUp({
  value,
  suffix = "",
  className,
  durationMs = 1100,
}: CountUpProps) {
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? value : 0);
  const [progress, setProgress] = useState(reduce ? 1 : 0);
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (reduce) {
      setDisplay(value);
      setProgress(1);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || started.current) return;
        started.current = true;
        setActive(true);

        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / durationMs);
          const eased = 1 - (1 - t) ** 3;
          setDisplay(Math.round(value * eased));
          setProgress(eased);
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, durationMs, reduce]);

  const scale = active || progress > 0 ? 1.05 - 0.05 * progress : 1;
  const blur = active || progress > 0 ? 2 * (1 - progress) : 0;

  return (
    <span
      ref={ref}
      className={cn("inline-block tabular-nums origin-left", className)}
      style={
        reduce
          ? undefined
          : {
              transform: `scale(${scale})`,
              filter: blur > 0.05 ? `blur(${blur}px)` : undefined,
            }
      }
    >
      {display.toLocaleString("ru-RU")}
      {suffix}
    </span>
  );
}
