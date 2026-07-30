import { cn } from "@/lib/utils";

type HeroMediaProps = {
  alt: string;
  className?: string;
  /** Default: image (placeholder + ken burns). Switch to video later via one prop. */
  mode?: "image" | "video";
  /** Image src or video src depending on mode */
  src?: string;
  /** Required for mode="video" */
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
        // Placeholder SVG until real assets; next/image optional in Phase 3
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover motion-safe:animate-ken-burns"
        />
      )}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-graphite via-graphite/55 to-graphite/25"
        aria-hidden
      />
    </div>
  );
}
