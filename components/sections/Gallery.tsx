import { getTranslations } from "next-intl/server";
import { MediaImage, type MediaSlot } from "@/components/media/MediaImage";
import { Reveal } from "@/components/motion/Reveal";

const GALLERY_SLOTS: { slot: MediaSlot; key: string }[] = [
  { slot: "gym", key: "gym" },
  { slot: "pool", key: "pool" },
  { slot: "group", key: "group" },
  { slot: "spa", key: "spa" },
  { slot: "massage", key: "massage" },
  { slot: "cafe", key: "cafe" },
];

export async function Gallery() {
  const t = await getTranslations("home.gallery");

  return (
    <section className="border-t border-line section-y !pb-0">
      <div className="container-content mb-5 md:mb-6">
        <Reveal>
          <h2 className="font-display text-display-section uppercase text-smoke">
            {t("title")}
          </h2>
          <p className="mt-2 max-w-lg text-sm text-smoke-muted">
            {t("description")}
          </p>
        </Reveal>
      </div>

      <ul className="grid grid-cols-2 gap-0 md:grid-cols-3">
        {GALLERY_SLOTS.map((item) => (
          <li key={item.key} className="flex flex-col">
            <div className="relative aspect-[4/3] overflow-hidden bg-graphite-elevated md:aspect-[3/2]">
              <MediaImage
                slot={item.slot}
                alt=""
                sizes="(max-width: 768px) 50vw, 33vw"
                className="absolute inset-0"
              />
            </div>
            <p className="border-b border-line bg-graphite-mid px-3 py-2 text-xs text-smoke-muted md:px-4 md:text-sm">
              {t(`slots.${item.key}`)}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
