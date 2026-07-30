type SectionAtmosphereProps = {
  /** Сдвиг пятен, чтобы соседние секции не выглядели одинаково */
  variant?: "a" | "b";
};

/**
 * Мягкий pool-aurora на chalk — атмосфера светлых секций.
 * Только декор, без интерактива.
 */
export function SectionAtmosphere({ variant = "a" }: SectionAtmosphereProps) {
  return (
    <div
      className={[
        "section-atmosphere pointer-events-none absolute inset-0",
        variant === "b" && "section-atmosphere-b",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden
    >
      <div className="section-orb section-orb-a" />
      <div className="section-orb section-orb-b" />
      <div className="section-orb section-orb-c" />
    </div>
  );
}
