"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useCanHover } from "@/hooks/useCanHover";

/**
 * Desktop-only: мягкое радиальное пятно pool, следующее за курсором с lerp.
 * Opacity 0.08 — живо, но не мешает читаемости.
 */
export function HeroCursorGlow() {
  const reduce = useReducedMotion();
  const canHover = useCanHover();
  const spotRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);
  const visible = useRef(false);

  useEffect(() => {
    if (reduce || !canHover) return;

    const spot = spotRef.current;
    if (!spot) return;

    const section = spot.closest("section");
    if (!section) return;

    const lerp = 0.12;

    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * lerp;
      current.current.y += (target.current.y - current.current.y) * lerp;
      spot.style.transform = `translate(${current.current.x}px, ${current.current.y}px) translate(-50%, -50%)`;
      raf.current = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      target.current.x = e.clientX - rect.left;
      target.current.y = e.clientY - rect.top;
      if (!visible.current) {
        visible.current = true;
        current.current.x = target.current.x;
        current.current.y = target.current.y;
        spot.style.opacity = "1";
      }
    };

    const onLeave = () => {
      visible.current = false;
      spot.style.opacity = "0";
    };

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    raf.current = requestAnimationFrame(tick);

    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf.current);
    };
  }, [reduce, canHover]);

  if (reduce || !canHover) return null;

  return (
    <div
      ref={spotRef}
      className="pointer-events-none absolute left-0 top-0 z-[2] h-[42vmin] w-[42vmin] rounded-full opacity-0 transition-opacity duration-500"
      style={{
        background:
          "radial-gradient(circle, rgba(13,110,124,0.14) 0%, transparent 68%)",
        willChange: "transform",
      }}
      aria-hidden
    />
  );
}
