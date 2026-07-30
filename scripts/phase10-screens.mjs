import { chromium } from "playwright";
import fs from "fs";

const base = process.env.BASE_URL ?? "http://127.0.0.1:3000/ru";
const outDir = "docs/phase10";

fs.mkdirSync(outDir, { recursive: true });

const hideChrome = `
  header, [data-sticky], .fixed { visibility: hidden !important; }
`;

async function withPage(width, height, fn) {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  await page.goto(base, { waitUntil: "networkidle", timeout: 60_000 });
  await page.addStyleTag({ content: hideChrome });
  await page.waitForTimeout(600);
  await fn(page);
  await browser.close();
}

/** Полный hero viewport — полоса «Сейчас в клубе» внизу */
await withPage(1440, 900, async (page) => {
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${outDir}/04-hero-1440.png`, fullPage: false });
  console.log("wrote 04-hero-1440.png");
});

/** Весь ряд карточек на 1440 */
await withPage(1440, 1100, async (page) => {
  const section = page.locator("#pricing");
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);

  const widths = await page.locator("#pricing article").evaluateAll((els) =>
    els.map((el) => Math.round(el.getBoundingClientRect().width)),
  );
  console.log("card widths:", widths);

  const paddings = await page.locator("#pricing article").evaluateAll((els) =>
    els.map((el) => {
      const s = getComputedStyle(el);
      return {
        pl: s.paddingLeft,
        pr: s.paddingRight,
        pt: s.paddingTop,
        pb: s.paddingBottom,
      };
    }),
  );
  console.log("card paddings:", JSON.stringify(paddings));

  await section.screenshot({ path: `${outDir}/01-grid-1440.png` });
  console.log("wrote 01-grid-1440.png");
});

await withPage(360, 2400, async (page) => {
  const section = page.locator("#pricing");
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  await section.screenshot({ path: `${outDir}/02-grid-360.png` });
  console.log("wrote 02-grid-360.png");
});

await withPage(1440, 900, async (page) => {
  const section = page.locator("#pricing");
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  const card = section
    .locator("article")
    .filter({ hasText: "Выгодный выбор" })
    .first();
  await card.screenshot({ path: `${outDir}/03-recommended-closeup.png` });
  console.log("wrote 03-recommended-closeup.png");
});

console.log("ok", outDir, fs.readdirSync(outDir));
