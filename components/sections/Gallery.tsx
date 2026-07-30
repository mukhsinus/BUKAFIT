"use client";

import {
  useCallback,
  useEffect,
  useRef,
  type PointerEvent as ReactPointerEvent,
} from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/Reveal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { MediaSlot } from "@/components/media/MediaImage";
import { cn } from "@/lib/utils";

const GALLERY_SLOTS: { slot: MediaSlot; key: string }[] = [
  { slot: "gym", key: "gym" },
  { slot: "pool", key: "pool" },
  { slot: "group", key: "group" },
  { slot: "spa", key: "spa" },
  { slot: "massage", key: "massage" },
  { slot: "cafe", key: "cafe" },
];

/** Реальные кадры — public/media/{slot}.jpg; пока пусто → mineral + mono */
const READY: Partial<Record<MediaSlot, string>> = {};

const FRAME_H = "h-[clamp(320px,42vh,560px)]";

function frameScrollTargets(el: HTMLElement): number[] {
  const frames = Array.from(el.querySelectorAll<HTMLElement>("[data-frame]"));
  const elLeft = el.getBoundingClientRect().left;
  return frames.map(
    (frame) =>
      frame.getBoundingClientRect().left - elLeft + el.scrollLeft,
  );
}

function nearestSnap(el: HTMLElement, from: number): number {
  const targets = frameScrollTargets(el);
  if (targets.length === 0) return from;
  const max = el.scrollWidth - el.clientWidth;
  let best = targets[0]!;
  let bestDist = Math.abs(from - best);
  for (const target of targets) {
    const dist = Math.abs(from - target);
    if (dist < bestDist) {
      bestDist = dist;
      best = target;
    }
  }
  return Math.max(0, Math.min(max, best));
}

export function Gallery() {
  const t = useTranslations("home.gallery");
  const reduce = usePrefersReducedMotion();
  const scrollerRef = useRef<HTMLUListElement>(null);
  const drag = useRef({
    active: false,
    startX: 0,
    scroll: 0,
    lastX: 0,
    lastT: 0,
    velocity: 0,
  });
  const rafRef = useRef(0);

  const cancelInertia = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
  }, []);

  useEffect(() => () => cancelInertia(), [cancelInertia]);

  /** Inertia coast (transform via scrollLeft) then snap to nearest frame. */
  const releaseWithInertia = useCallback(
    (velocityPxPerMs: number) => {
      const el = scrollerRef.current;
      if (!el) return;
      cancelInertia();

      const max = Math.max(0, el.scrollWidth - el.clientWidth);

      if (reduce) {
        el.scrollLeft = nearestSnap(el, el.scrollLeft);
        return;
      }

      let v = velocityPxPerMs;
      const friction = 0.0024; // px/ms²
      let last = performance.now();

      const tick = (now: number) => {
        const dt = Math.min(32, now - last);
        last = now;

        if (Math.abs(v) > 0.02) {
          el.scrollLeft = Math.max(0, Math.min(max, el.scrollLeft + v * dt));
          const sign = Math.sign(v);
          v -= sign * friction * dt;
          if (Math.sign(v) !== sign) v = 0;
          if (el.scrollLeft <= 0 || el.scrollLeft >= max) v = 0;
          rafRef.current = requestAnimationFrame(tick);
          return;
        }

        // Settle onto nearest frame (opacity/transform-only scroll animation)
        const start = el.scrollLeft;
        const target = nearestSnap(el, start);
        const startT = performance.now();
        const dur = 280;

        const settle = (t: number) => {
          const p = Math.min(1, (t - startT) / dur);
          const eased = 1 - Math.pow(1 - p, 4);
          el.scrollLeft = start + (target - start) * eased;
          if (p < 1) {
            rafRef.current = requestAnimationFrame(settle);
          } else {
            el.scrollLeft = target;
            rafRef.current = 0;
          }
        };
        rafRef.current = requestAnimationFrame(settle);
      };

      rafRef.current = requestAnimationFrame(tick);
    },
    [cancelInertia, reduce],
  );

  const onPointerDown = (e: ReactPointerEvent<HTMLUListElement>) => {
    // Touch: native overflow scroll + CSS snap. Pointer drag is for fine pointer.
    if (e.pointerType === "touch") return;
    const el = scrollerRef.current;
    if (!el) return;
    cancelInertia();
    const now = performance.now();
    drag.current = {
      active: true,
      startX: e.clientX,
      scroll: el.scrollLeft,
      lastX: e.clientX,
      lastT: now,
      velocity: 0,
    };
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLUListElement>) => {
    const el = scrollerRef.current;
    if (!el || !drag.current.active) return;
    el.scrollLeft = drag.current.scroll - (e.clientX - drag.current.startX);

    const now = performance.now();
    const dt = now - drag.current.lastT;
    if (dt > 0) {
      // scroll moves opposite to pointer
      drag.current.velocity = -(e.clientX - drag.current.lastX) / dt;
      drag.current.lastX = e.clientX;
      drag.current.lastT = now;
    }
  };

  const onPointerUp = (e: ReactPointerEvent<HTMLUListElement>) => {
    if (!drag.current.active) return;
    drag.current.active = false;
    scrollerRef.current?.releasePointerCapture(e.pointerId);
    releaseWithInertia(drag.current.velocity);
  };

  return (
    <section id="gallery" className="section-y overflow-x-clip">
      <div className="container-content mb-6 md:mb-8">
        <Reveal>
          <h2 className="font-display text-display-section text-ink">
            {t("title")}
          </h2>
        </Reveal>
      </div>

      <div className="relative">
        <ul
          ref={scrollerRef}
          className={cn(
            "flex snap-x snap-mandatory gap-3 overflow-x-auto px-[max(1.25rem,calc((100vw-90rem)/2+1.25rem))] pb-2 lg:px-[max(4rem,calc((100vw-90rem)/2+4rem))]",
            "cursor-grab active:cursor-grabbing",
            "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          )}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {GALLERY_SLOTS.map((item) => {
            const src = READY[item.slot];
            const label = t(`slots.${item.key}`);
            return (
              <li key={item.key} data-frame className="snap-start shrink-0">
                <div
                  className={cn(
                    FRAME_H,
                    "relative w-[min(72vw,336px)] overflow-hidden bg-mineral md:w-[min(40vw,420px)]",
                  )}
                >
                  {src ? (
                    <Image
                      src={src}
                      alt={label}
                      fill
                      sizes="(max-width: 768px) 72vw, 40vw"
                      className="object-cover brightness-[0.92]"
                      draggable={false}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-mineral px-4 text-center">
                      <span className="font-mono-label text-ink/70">
                        {t("photoLabel", { zone: label })}
                      </span>
                    </div>
                  )}
                </div>
                <p className="mt-2 font-mono-label text-ink/55">{label}</p>
              </li>
            );
          })}
          <li className="w-4 shrink-0" aria-hidden />
        </ul>
      </div>
    </section>
  );
}
