import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { club } from "@/content/club";
import type { AppLocale } from "@/lib/i18n/routing";

const footerNav = [
  { href: "/pricing" as const, key: "pricing" as const },
  { href: "/schedule" as const, key: "schedule" as const },
  { href: "/services" as const, key: "services" as const },
  { href: "/trainers" as const, key: "trainers" as const },
  { href: "/about" as const, key: "about" as const },
  { href: "/faq" as const, key: "faq" as const },
  { href: "/contacts" as const, key: "contacts" as const },
];

export async function Footer() {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const tCta = await getTranslations("cta");
  const locale = (await getLocale()) as AppLocale;
  const address = club.address.full[locale];

  return (
    <footer className="border-t border-line bg-graphite-elevated">
      <div className="container-content grid gap-10 py-12 md:grid-cols-12 md:gap-8 md:py-16">
        <div className="md:col-span-4">
          <p className="font-display text-2xl uppercase tracking-[0.04em] text-smoke">
            {club.name}
          </p>
          <p className="mt-3 max-w-sm text-sm text-smoke-muted">{t("tagline")}</p>
          <p className="mt-4 text-sm font-medium text-brass">{t("hours")}</p>
        </div>

        <div className="md:col-span-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-smoke-muted">
            {tNav("home")}
          </p>
          <ul className="mt-3 space-y-2">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-smoke hover:text-brass"
                >
                  {tNav(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-smoke-muted">
            {t("address")}
          </p>
          <p className="mt-3 text-sm text-smoke">{address}</p>
          <a
            href={club.phone.telHref}
            className="mt-3 block text-sm text-smoke hover:text-brass"
          >
            {club.phone.display}
          </a>
          <a
            href={club.social.telegramChannelUrl}
            className="mt-2 block text-sm text-smoke hover:text-brass"
            target="_blank"
            rel="noopener noreferrer"
          >
            Telegram @{club.social.telegramChannel}
          </a>
          <a
            href={club.social.instagramUrl}
            className="mt-2 block text-sm text-smoke hover:text-brass"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram @{club.social.instagram}
          </a>
          <a
            href={club.social.salesManagerUrl}
            className="mt-4 inline-flex text-sm font-semibold text-brass hover:text-brass-hover"
            target="_blank"
            rel="noopener noreferrer"
          >
            {tCta("writeTelegram")}
          </a>
        </div>

        <div className="md:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-smoke-muted">
            {t("legal")}
          </p>
          <ul className="mt-3 space-y-2">
            <li>
              <Link
                href="/legal/privacy"
                className="text-sm text-smoke hover:text-brass"
              >
                {t("privacy")}
              </Link>
            </li>
            <li>
              <Link
                href="/legal/offer"
                className="text-sm text-smoke hover:text-brass"
              >
                {t("offer")}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-content flex flex-col gap-2 py-5 text-xs text-smoke-muted sm:flex-row sm:items-center sm:justify-between">
          <p>{t("rights")}</p>
          <p>{club.phone.display}</p>
        </div>
      </div>
    </footer>
  );
}
