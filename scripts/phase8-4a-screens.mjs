import { chromium } from "playwright";
import fs from "fs";

const widths = [360, 1440];
const base = process.env.BASE_URL ?? "http://127.0.0.1:3456/ru";
const outDir = "docs/phase8-4a";

fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const report = [];

for (const w of widths) {
  const page = await browser.newPage({
    viewport: { width: w, height: w === 360 ? 780 : 900 },
    deviceScaleFactor: 1,
  });
  await page.goto(base, { waitUntil: "networkidle", timeout: 60_000 });
  await page.waitForTimeout(1200);

  await page.screenshot({
    path: `${outDir}/hero-${w}.png`,
    fullPage: false,
  });

  const headlineLines = await page.evaluate(() => {
    const h1 = document.querySelector("h1");
    if (!h1) return null;
    const lines = [...h1.querySelectorAll(":scope > span")].map((el) => ({
      text: el.textContent?.trim(),
      height: Math.round(el.getBoundingClientRect().height),
      width: Math.round(el.getBoundingClientRect().width),
    }));
    return { lineCount: lines.length, lines };
  });

  await page.locator("#pricing").scrollIntoViewIfNeeded();
  await page.waitForTimeout(350);

  if (w === 360) {
    const vip = page.locator("#pricing li").filter({ hasText: "Год VIP" });
    await vip.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
  }

  const priceMetrics = await page.evaluate(() => {
    const rows = [...document.querySelectorAll("#pricing li")];
    return rows.map((row) => {
      const amount = row.querySelector(".whitespace-nowrap");
      const root = row.querySelector(".font-mono");
      const box = row.getBoundingClientRect();
      const pbox = root?.getBoundingClientRect();
      const style = amount ? getComputedStyle(amount) : null;
      return {
        text: root?.textContent?.replace(/\s+/g, " ").trim() ?? null,
        amountFontSize: style?.fontSize ?? null,
        amountFont: style?.fontFamily ?? null,
        priceW: pbox ? Math.round(pbox.width) : null,
        rowW: Math.round(box.width),
        overflows: pbox ? pbox.right > box.right + 1 : null,
      };
    });
  });

  await page.screenshot({
    path: `${outDir}/pricing-${w}.png`,
    fullPage: false,
  });

  if (w === 360) {
    await page.locator("#pricing").scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    await page.locator("#pricing").screenshot({
      path: `${outDir}/pricing-${w}-full.png`,
    });
  }

  const overflowX = await page.evaluate(() => {
    const doc = document.documentElement;
    return (
      Math.max(doc.scrollWidth, document.body.scrollWidth) > doc.clientWidth + 1
    );
  });

  report.push({ width: w, overflowX, headlineLines, prices: priceMetrics });
  await page.close();
}

await browser.close();
fs.writeFileSync(`${outDir}/metrics.json`, JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
