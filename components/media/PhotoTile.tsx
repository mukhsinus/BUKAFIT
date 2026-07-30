"use client";

import { useRef, type MouseEvent } from "react";
import Image from "next/image";
import { Link } from "@/lib/i18n/navigation";
import { useCanHover } from "@/hooks/useCanHover";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

type PhotoTileProps = {
  title: string;
  short?: string;
  href?: string;
  src?: string;
  sizes: string;
  viewLabel?: string;
  placeholderLabel: string;
  className?: string;
  aspectClass?: string;
};

/**
 * Фотоплитка §4.4 — full-bleed без рамки/радиуса, нижний скрим, белый текст.
 * Без href — статичная плитка (about); с href — ссылка (мозаика услуг).
 * Реальное фото: параллакс 4–6px за курсором (desktop).
 */
export function PhotoTile({
  title,
  short,
  href,
  src,
  sizes,
  viewLabel,
  placeholderLabel,
  className,
  aspectClass = "aspect-[4/5] lg:aspect-auto",
}: PhotoTileProps) {
  const canHover = useCanHover();
  const reduce = usePrefersReducedMotion();
  const mediaRef = useRef<HTMLDivElement>(null);
  const hasRealPhoto = Boolean(src && !src.endsWith(".svg"));

  const onMove = (e: MouseEvent<HTMLElement>) => {
    if (!canHover || reduce || !hasRealPhoto || !mediaRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    const max = 5;
    mediaRef.current.style.transform = `translate(${nx * max}px, ${ny * max}px) scale(1.06)`;
  };

  const onLeave = () => {
    if (!mediaRef.current) return;
    mediaRef.current.style.transform = canHover
      ? "translate(0px, 0px) scale(1.03)"
      : "translate(0px, 0px) scale(1)";
  };

  const inner = (
    <>
      <div
        ref={mediaRef}
        className={cn(
          "absolute inset-[-6px]",
          "transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          canHover && !hasRealPhoto && "group-hover:scale-[1.03]",
        )}
        style={
          canHover && hasRealPhoto && !reduce
            ? { transform: "translate(0px, 0px) scale(1.03)" }
            : undefined
        }
      >
        {src ? (
          <Image
            src={src}
            alt=""
            fill
            sizes={sizes}
            className="object-cover brightness-[0.92]"
          />
        ) : (
          <div
            className="absolute inset-0 bg-mineral"
            aria-label={placeholderLabel}
          />
        )}
      </div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(16,20,24,0.88) 0%, rgba(16,20,24,0.35) 42%, transparent 62%)",
        }}
        aria-hidden
      />

      <div
        className={cn(
          "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          canHover && "group-hover:opacity-100",
        )}
        style={{
          background:
            "linear-gradient(to top, rgba(16,20,24,0.96) 0%, rgba(16,20,24,0.55) 48%, transparent 72%)",
        }}
        aria-hidden
      />

      <div className="absolute inset-x-0 bottom-0 z-[1] flex flex-col p-5 md:p-6">
        <h3 className="font-display text-display-h3 text-steam">{title}</h3>
        {short ? (
          <p className="mt-1.5 max-w-md text-[15px] leading-snug text-steam/85">
            {short}
          </p>
        ) : null}
        {viewLabel ? (
          <span
            className={cn(
              "mt-3 font-mono-label text-steam transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
              canHover ? "opacity-0 group-hover:opacity-100" : "opacity-100",
            )}
          >
            {viewLabel}
          </span>
        ) : null}
      </div>
    </>
  );

  const shell = cn(
    "group relative block overflow-hidden bg-mineral",
    aspectClass,
    className,
  );

  if (href) {
    return (
      <Link
        href={href}
        className={shell}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        {inner}
      </Link>
    );
  }

  return (
    <div className={shell} onMouseMove={onMove} onMouseLeave={onLeave}>
      {inner}
    </div>
  );
}
