import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/ui/SectionHeading";

const GALLERY_SLOTS = [
  { src: "/media/placeholders/gym.svg", key: "gym" },
  { src: "/media/placeholders/pool.svg", key: "pool" },
  { src: "/media/placeholders/group.svg", key: "group" },
  { src: "/media/placeholders/spa.svg", key: "spa" },
  { src: "/media/placeholders/massage.svg", key: "massage" },
  { src: "/media/placeholders/cafe.svg", key: "cafe" },
] as const;

export async function Gallery() {
  const t = await getTranslations("home.gallery");

  return (
    <section className="border-t border-line py-[clamp(4rem,10vw,7.5rem)]">
      <div className="container-content">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <ul className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3">
          {GALLERY_SLOTS.map((slot) => (
            <li
              key={slot.key}
              className="relative aspect-[4/3] overflow-hidden bg-graphite-elevated"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slot.src}
                alt={t(`slots.${slot.key}`)}
                className="h-full w-full object-cover"
              />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-graphite/80 to-transparent px-3 py-2 text-xs text-smoke">
                {t(`slots.${slot.key}`)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
