import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/content/services";
import type { AppLocale } from "@/lib/i18n/routing";

type ServicesGridProps = {
  showAllLink?: boolean;
};

export async function ServicesGrid({ showAllLink = true }: ServicesGridProps) {
  const t = await getTranslations("home.services");
  const locale = (await getLocale()) as AppLocale;

  return (
    <section className="border-t border-line py-[clamp(4rem,10vw,7.5rem)]">
      <div className="container-content">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
          action={
            showAllLink ? (
              <Link
                href="/services"
                className="text-sm font-semibold text-brass hover:text-brass-hover"
              >
                {t("all")}
              </Link>
            ) : undefined
          }
        />

        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service) => (
            <li key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col border border-line bg-graphite-elevated p-4 transition-colors hover:border-brass/60"
              >
                <div className="mb-4 aspect-[4/3] overflow-hidden bg-graphite">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/media/placeholders/${service.mediaSlot}.svg`}
                    alt=""
                    className="h-full w-full object-cover opacity-90 transition-transform group-hover:scale-[1.03]"
                  />
                </div>
                <h3 className="font-display text-lg uppercase text-smoke">
                  {service.title[locale]}
                </h3>
                <p className="mt-2 flex-1 text-sm text-smoke-muted">
                  {service.short[locale]}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
