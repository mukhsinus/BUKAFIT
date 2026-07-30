import { chromium } from "playwright";
import fs from "fs";

const widths = [360, 390, 768, 1024, 1440];
const base = "http://127.0.0.1:3456/ru";
const outDir = "docs/phase7-responsive";

fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const report = [];

for (const w of widths) {
  const page = await browser.newPage({
    viewport: { width: w, height: 900 },
    deviceScaleFactor: 1,
  });
  await page.goto(base, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(900);

  const metrics = await page.evaluate(() => {
    const doc = document.documentElement;
    const body = document.body;
    const scrollWidth = Math.max(doc.scrollWidth, body.scrollWidth);
    const clientWidth = doc.clientWidth;
    const sticky = document.querySelector(".fixed.inset-x-0.bottom-0");
    const stickyH = sticky ? sticky.getBoundingClientRect().height : 0;
    const shell = document.querySelector(".flex.min-h-dvh");
    const padBottom = shell ? getComputedStyle(shell).paddingBottom : "";

    const prices = [...document.querySelectorAll("#pricing article")].map((el) => {
      const priceRoot = el.querySelector(".tabular-nums");
      const box = el.getBoundingClientRect();
      const pbox = priceRoot ? priceRoot.getBoundingClientRect() : null;
      return {
        overflowsCard: pbox ? pbox.right > box.right + 1 : null,
        priceW: pbox ? Math.round(pbox.width) : null,
        cardW: Math.round(box.width),
        text: priceRoot ? priceRoot.innerText.replace(/\n/g, " | ") : null,
      };
    });

    const clipped = [...document.querySelectorAll("h1, h2, h3")].some((el) => {
      const r = el.getBoundingClientRect();
      return r.right > clientWidth + 2 || r.left < -2;
    });

    return {
      clientWidth,
      scrollWidth,
      overflowX: scrollWidth > clientWidth + 1,
      stickyH: Math.round(stickyH),
      padBottom,
      clippedHeadings: clipped,
      prices,
    };
  });

  await page.screenshot({
    path: `${outDir}/home-${w}-top.png`,
    fullPage: false,
  });
  await page.locator("#pricing").scrollIntoViewIfNeeded();
  await page.waitForTimeout(350);
  await page.screenshot({
    path: `${outDir}/home-${w}-pricing.png`,
    fullPage: false,
  });

  report.push({ width: w, ...metrics });
  await page.close();
}

await browser.close();
fs.writeFileSync(`${outDir}/metrics.json`, JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
