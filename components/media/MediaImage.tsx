"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

export type MediaSlot =
  | "hero"
  | "gym"
  | "pool"
  | "group"
  | "spa"
  | "massage"
  | "kids"
  | "personal"
  | "cafe"
  | "trainers";

const SLOT_SRC: Record<MediaSlot, string> = {
  hero: "/media/placeholders/hero.svg",
  gym: "/media/placeholders/gym.svg",
  pool: "/media/placeholders/pool.svg",
  group: "/media/placeholders/group.svg",
  spa: "/media/placeholders/spa.svg",
  massage: "/media/placeholders/massage.svg",
  kids: "/media/placeholders/kids.svg",
  personal: "/media/placeholders/personal.svg",
  cafe: "/media/placeholders/cafe.svg",
  trainers: "/media/placeholders/trainers/placeholder.svg",
};

type MediaImageProps = {
  slot: MediaSlot;
  alt: string;
  sizes: string;
  className?: string;
  /** Absolute fill parent (parent must be position:relative) */
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  /** Soft gradient under text overlays */
  overlay?: "bottom" | "full" | "none";
};

/**
 * Slot for real photos in public/media/. Until replaced, uses light marked
 * placeholders so they never read as finished photography.
 */
export function MediaImage({
  slot,
  alt,
  sizes,
  className,
  fill = true,
  width,
  height,
  priority,
  overlay = "none",
}: MediaImageProps) {
  const src = SLOT_SRC[slot];

  return (
    <div className={cn("relative overflow-hidden bg-surface-muted", className)}>
      {fill ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width ?? 1600}
          height={height ?? 1200}
          sizes={sizes}
          priority={priority}
          className="h-full w-full object-cover"
        />
      )}
      {overlay === "bottom" ? (
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-graphite/75 via-graphite/20 to-transparent"
          aria-hidden
        />
      ) : null}
      {overlay === "full" ? (
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-graphite via-graphite/55 to-graphite/20"
          aria-hidden
        />
      ) : null}
    </div>
  );
}
