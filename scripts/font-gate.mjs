/**
 * Фаза 8 §3 — фактическая проверка кириллицы у Geologica / Onest / JetBrains Mono.
 * Запуск при поднятом next: node scripts/font-gate.mjs
 */
import { chromium } from "playwright";

const BASE = process.env.FONT_GATE_URL ?? "http://127.0.0.1:3000/ru/font-gate";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

try {
  await page.goto(BASE, { waitUntil: "networkidle", timeout: 90_000 });
  await page.waitForFunction(() => document.fonts?.status === "loaded");
  await page.waitForTimeout(500);

  const report = await page.evaluate(async () => {
    await document.fonts.ready;

    const probes = [
      {
        family: "Geologica",
        weight: "600",
        chars: ["Ж", "ё", "ы", "Ъ", "я", "А"],
        sample: "ru-cyrillic",
      },
      {
        family: "Onest",
        weight: "400",
        chars: ["Ж", "ё", "ы", "ф", "ю", "Щ"],
        sample: "ru-cyrillic",
      },
      {
        family: "JetBrains Mono",
        weight: "500",
        chars: ["Ж", "ё", "ы", "М", "С", "У"],
        sample: "ru-cyrillic",
      },
      {
        family: "Geologica",
        weight: "600",
        chars: ["O", "‘", "g", "ʻ", "a", "i"],
        sample: "uz-latin-diacritic",
      },
      {
        family: "Onest",
        weight: "400",
        chars: ["O", "‘", "g", "ʻ", "Y", "o"],
        sample: "uz-latin-diacritic",
      },
      {
        family: "JetBrains Mono",
        weight: "500",
        chars: ["O", "‘", "T", "S", "H", "K"],
        sample: "uz-latin",
      },
    ];

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const results = [];

    for (const probe of probes) {
      const missing = [];
      const widths = {};

      for (const ch of probe.chars) {
        const css = `${probe.weight} 72px "${probe.family}"`;
        const check = document.fonts.check(css, ch);
        ctx.font = css;
        const w = ctx.measureText(ch).width;
        widths[ch] = Number(w.toFixed(2));

        // .notdef / missing often ~0 or far thinner than a normal letter
        ctx.font = `${probe.weight} 72px "${probe.family}", monospace`;
        const wWithFallback = ctx.measureText(ch).width;

        if (!check || w < 1 || (w < 8 && wWithFallback > w * 1.8)) {
          missing.push(ch);
        }
      }

      const el = [...document.querySelectorAll("[data-expected-family]")].find(
        (node) =>
          node.getAttribute("data-expected-family") === probe.family &&
          ((probe.sample.startsWith("ru") &&
            node.getAttribute("data-sample") === "ru") ||
            (probe.sample.startsWith("uz") &&
              node.getAttribute("data-sample") === "uz")),
      );

      const computed = el
        ? getComputedStyle(el).fontFamily.split(",")[0].replace(/["']/g, "").trim()
        : null;

      results.push({
        family: probe.family,
        sample: probe.sample,
        documentFontsCheck: missing.length === 0,
        missing,
        widths,
        computedFamily: computed,
        renderedText: el?.textContent?.trim() ?? null,
        ok: missing.length === 0 &&
          (!computed ||
            computed.toLowerCase().includes(probe.family.split(" ")[0].toLowerCase())),
      });
    }

    return results;
  });

  const failed = report.filter((r) => !r.ok);
  console.log(JSON.stringify({ url: BASE, report, failed: failed.length }, null, 2));

  if (failed.length) {
    console.error("\nFONT GATE FAILED");
    process.exit(1);
  }

  console.log("\nFONT GATE OK — all three faces render RU Cyrillic + UZ Latin.");
  process.exit(0);
} catch (error) {
  console.error("FONT GATE ERROR:", error);
  process.exit(1);
} finally {
  await browser.close();
}
