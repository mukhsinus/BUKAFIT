"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

type HeroMediaProps = {
  alt: string;
  className?: string;
  mode?: "image" | "video";
  src?: string;
  poster?: string;
};

/**
 * Full-bleed hero media over ink.
 * Double scrim: bottom for copy, light top under header. No placeholder text overlay.
 */
export function HeroMedia({
  alt,
  className,
  mode = "image",
  src = "/media/placeholders/hero.svg",
  poster,
}: HeroMediaProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden bg-ink", className)}>
      {mode === "video" && poster ? (
        <video
          className="h-full w-full object-cover brightness-[0.92]"
          autoPlay
          muted
          loop
          playsInline
          poster={poster}
          preload="none"
          aria-label={alt}
        >
          <source src={src} />
        </video>
      ) : src.endsWith(".svg") ? (
        /* Flat SVG placeholder: CSS bg avoids next/image decode on LCP path */
        <div
          className="absolute inset-0 bg-ink motion-safe:animate-ken-burns"
          style={{
            backgroundImage: `linear-gradient(180deg, #1a2228 0%, #101418 55%)`,
          }}
          aria-hidden
        />
      ) : (
        <Image
          src={src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-[0.92] motion-safe:animate-ken-burns"
          aria-hidden
          fetchPriority="high"
        />
      )}
      {/* Bottom scrim ≥55% for copy */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(16,20,24,0.85) 0%, rgba(16,20,24,0.45) 35%, transparent 55%)",
        }}
        aria-hidden
      />
      {/* Light top scrim under header */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[28%]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(16,20,24,0.55) 0%, transparent 100%)",
        }}
        aria-hidden
      />
      <span className="sr-only">{alt}</span>
    </div>
  );
}
