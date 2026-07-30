import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { MediaImage, type MediaSlot } from "@/components/media/MediaImage";
import { Reveal } from "@/components/motion/Reveal";
import { services, type ServiceSlug } from "@/content/services";
import type { AppLocale } from "@/lib/i18n/routing";
import { cn } from "@/lib/utils";

type ServicesGridProps = {
  showAllLink?: boolean;
};

const FEATURED: ServiceSlug[] = ["gym", "pool"];

function tileClass(slug: ServiceSlug): string {
  if (slug === "gym") return "sm:col-span-2 sm:row-span-2";
  if (slug === "pool") return "sm:col-span-2";
  return "";
}

/**
 * Inverse mid-page section: light surface, dark text.
 * Asymmetric editorial grid — not equal cards.
 */
export async function ServicesGrid({ showAllLink = true }: ServicesGridProps) {
  const t = await getTranslations("home.services");
  const locale = (await getLocale()) as AppLocale;
  const featured = services.filter((s) => FEATURED.includes(s.slug));
  const rest = services.filter((s) => !FEATURED.includes(s.slug));
  const ordered = [...featured, ...rest];

  return (
    <section className="surface-inverse section-y">
      <div className="container-content">
        <Reveal>
          <div className="mb-7 flex flex-col gap-3 md:mb-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#8a7040]">
                {t("eyebrow")}
              </p>
              <h2 className="font-display text-display-section uppercase text-ink">
                {t("title")}
              </h2>
              <p className="mt-2 text-sm text-[#5c574f] md:text-base">
                {t("description")}
              </p>
            </div>
            {showAllLink ? (
              <Link
                href="/services"
                className="shrink-0 text-sm font-semibold text-[#8a7040] hover:text-ink"
              >
                {t("all")}
              </Link>
            ) : null}
          </div>
        </Reveal>

        <ul className="grid auto-rows-[minmax(9.5rem,auto)] gap-2.5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3">
          {ordered.map((service) => {
            const large = FEATURED.includes(service.slug);
            return (
              <li
                key={service.slug}
                className={cn(tileClass(service.slug), large && "min-h-[18rem]")}
              >
                <Link
                  href={`/services/${service.slug}`}
                  className={cn(
                    "group relative flex h-full min-h-[9.5rem] flex-col overflow-hidden border border-inverse-line bg-inverse-muted/50",
                    large && "min-h-[18rem] sm:min-h-full",
                  )}
                >
                  <MediaImage
                    slot={service.mediaSlot as MediaSlot}
                    alt=""
                    sizes={
                      large
                        ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                        : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    }
                    className="absolute inset-0"
                    overlay="full"
                  />
                  <div className="relative mt-auto flex flex-col gap-1.5 p-4 md:p-5">
                    <h3
                      className={cn(
                        "font-display uppercase text-smoke",
                        large ? "text-2xl md:text-3xl" : "text-lg",
                      )}
                    >
                      {service.title[locale]}
                    </h3>
                    <p
                      className={cn(
                        "text-smoke/85",
                        large ? "max-w-md text-sm md:text-base" : "text-xs md:text-sm",
                      )}
                    >
                      {service.short[locale]}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
