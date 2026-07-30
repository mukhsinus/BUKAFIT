import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { club } from "@/content/club";
import { FEATURES } from "@/content/features";
import { FooterClock } from "@/components/layout/FooterClock";
import type { AppLocale } from "@/lib/i18n/routing";

const footerNav = [
  { href: "/pricing" as const, key: "pricing" as const },
  { href: "/schedule" as const, key: "schedule" as const },
  { href: "/services" as const, key: "services" as const },
  ...(FEATURES.trainers
    ? [{ href: "/trainers" as const, key: "trainers" as const }]
    : []),
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
    <footer className="bg-ink text-chalk">
      <div className="container-content py-12 md:py-16">
        <p className="font-display text-display-section w-full text-chalk">
          {club.name}
        </p>

        <div className="mt-12 grid gap-10 border-t border-[rgba(244,245,243,0.14)] pt-10 md:grid-cols-3 md:gap-8">
          <div className="min-w-0">
            <p className="font-mono-label text-chalk/55">{tNav("home")}</p>
            <ul className="mt-4 space-y-3">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-chalk/85 transition-colors hover:text-chalk"
                  >
                    {tNav(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <p className="font-mono-label text-chalk/55">{t("address")}</p>
            <p className="mt-4 text-sm text-chalk/85">{address}</p>
            <a
              href={club.phone.telHref}
              className="mt-3 block text-sm text-chalk/85 transition-colors hover:text-chalk"
            >
              {club.phone.display}
            </a>
            <a
              href={club.social.telegramChannelUrl}
              className="mt-2 block text-sm text-chalk/85 transition-colors hover:text-chalk"
              target="_blank"
              rel="noopener noreferrer"
            >
              Telegram @{club.social.telegramChannel}
            </a>
            <a
              href={club.social.instagramUrl}
              className="mt-2 block text-sm text-chalk/85 transition-colors hover:text-chalk"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram @{club.social.instagram}
            </a>
            <a
              href={club.social.salesManagerUrl}
              className="mt-4 inline-flex text-sm font-medium text-pool transition-colors hover:text-chalk"
              target="_blank"
              rel="noopener noreferrer"
            >
              {tCta("writeTelegram")}
            </a>
          </div>

          <div className="min-w-0">
            <p className="font-mono-label text-chalk/55">{t("legal")}</p>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/legal/privacy"
                  className="break-words text-sm text-chalk/85 transition-colors hover:text-chalk"
                >
                  {t("privacy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/offer"
                  className="break-words text-sm text-chalk/85 transition-colors hover:text-chalk"
                >
                  {t("offer")}
                </Link>
              </li>
            </ul>
            <p className="mt-6 text-sm text-chalk/70">{t("tagline")}</p>
            <p className="mt-2 font-mono-label text-chalk/55">{t("hours")}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-[rgba(244,245,243,0.14)]">
        <div className="container-content flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
          <FooterClock />
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-chalk/55">
            <p>{t("rights")}</p>
            <Link href="/legal/privacy" className="hover:text-chalk">
              {t("privacy")}
            </Link>
            <Link href="/legal/offer" className="hover:text-chalk">
              {t("offer")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
