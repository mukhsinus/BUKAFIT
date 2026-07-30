"use client";

import Image from "next/image";
import type { MediaSlot } from "@/components/media/MediaImage";

/** Реальные фото — public/media/{slot}.jpg */
const READY: Partial<Record<MediaSlot, string>> = {};

type ServiceHeroProps = {
  title: string;
  slot: MediaSlot | string;
  placeholderLabel: string;
};

/**
 * Фото-hero услуги: 16:9, скрим, заголовок белым внизу слева
 * (как hero главной, но короче — не 100svh).
 */
export function ServiceHero({
  title,
  slot,
  placeholderLabel,
}: ServiceHeroProps) {
  const src = READY[slot as MediaSlot];

  return (
    <section className="relative aspect-[16/9] min-h-[14rem] w-full overflow-hidden bg-ink sm:min-h-[18rem] lg:min-h-[22rem]">
      {src ? (
        <Image
          src={src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-[0.92]"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-mineral">
          <span className="font-mono-label text-ink/60">{placeholderLabel}</span>
        </div>
      )}

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(16,20,24,0.85) 0%, rgba(16,20,24,0.25) 45%, transparent 70%), linear-gradient(to bottom, rgba(16,20,24,0.45) 0%, transparent 28%)",
        }}
        aria-hidden
      />

      <div className="absolute inset-x-0 bottom-0 z-[1]">
        <div className="container-content pb-6 pt-16 md:pb-8 md:pt-20">
          <h1 className="max-w-[14ch] font-display text-[clamp(2rem,5vw,3.75rem)] leading-[0.95] tracking-[-0.03em] text-chalk">
            {title}
          </h1>
        </div>
      </div>
    </section>
  );
}
