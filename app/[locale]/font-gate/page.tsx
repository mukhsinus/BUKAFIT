import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Font gate",
};

type Props = { params: Promise<{ locale: string }> };

/**
 * Временная страница проверки кириллицы/латиницы (Фаза 8 §3).
 * Не в сайт-лейауте — без хедера/футера.
 */
export default async function FontGatePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const samples = [
    {
      id: "display",
      label: "Geologica / display",
      className: "font-display text-2xl",
      ru: "Твой зал не закрывается. Абонемент · бассейн",
      uz: "Zaling ochiq. Abonement · basseyn · Qo‘ng‘iroq",
    },
    {
      id: "body",
      label: "Onest / body",
      className: "font-sans text-lg font-normal",
      ru: "Фитнес-территория 2000 м². Не закрывается.",
      uz: "2000 m² fitnes hududi. Yopilmaydi. O‘zbekiston",
    },
    {
      id: "mono",
      label: "JetBrains Mono / utility",
      className: "font-mono-label",
      ru: "ТАШКЕНТ · 04:37 · ОТКРЫТО · СУМ · М²",
      uz: "TOSHKENT · 04:37 · OCHIQ · SO‘M · M²",
    },
  ] as const;

  return (
    <main className="mx-auto max-w-3xl space-y-10 bg-chalk px-6 py-16 text-ink">
      <h1 className="font-display text-3xl">Font gate · {locale}</h1>
      <p className="text-sm text-ink/70">
        RU (кириллица) + UZ (латиница с диакритикой). Проверка subsets latin +
        cyrillic.
      </p>

      {samples.map((sample) => (
        <section key={sample.id} data-font={sample.id} className="space-y-3">
          <p className="font-mono-label text-pool">{sample.label}</p>
          <p
            data-sample="ru"
            data-expected-family={
              sample.id === "display"
                ? "Geologica"
                : sample.id === "body"
                  ? "Onest"
                  : "JetBrains Mono"
            }
            className={sample.className}
          >
            {sample.ru}
          </p>
          <p
            data-sample="uz"
            data-expected-family={
              sample.id === "display"
                ? "Geologica"
                : sample.id === "body"
                  ? "Onest"
                  : "JetBrains Mono"
            }
            className={sample.className}
          >
            {sample.uz}
          </p>
        </section>
      ))}

      <canvas id="font-gate-canvas" width="1" height="1" className="hidden" />
    </main>
  );
}
