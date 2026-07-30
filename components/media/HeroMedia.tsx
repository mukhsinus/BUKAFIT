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
 * Full-bleed hero media.
 * Default `mode="image"`. Video later: `mode="video" src="..." poster="..."`.
 */
export function HeroMedia({
  alt,
  className,
  mode = "image",
  src = "/media/placeholders/hero.svg",
  poster,
}: HeroMediaProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden bg-graphite-elevated",
        className,
      )}
    >
      {mode === "video" && poster ? (
        <video
          className="h-full w-full object-cover"
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
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="100vw"
          className="object-cover motion-safe:animate-ken-burns"
        />
      )}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-graphite via-graphite/70 to-graphite/35"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-graphite/55 via-transparent to-transparent"
        aria-hidden
      />
    </div>
  );
}
