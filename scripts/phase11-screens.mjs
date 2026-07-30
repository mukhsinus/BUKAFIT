import { chromium } from "playwright";
import fs from "fs";

const base = process.env.BASE_URL ?? "http://127.0.0.1:3000/ru";
const outDir = "docs/phase11";

fs.mkdirSync(outDir, { recursive: true });

const hideChrome = `
  header, [data-sticky], .fixed { visibility: hidden !important; }
`;

async function shot(width, height, name, fn) {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  await page.goto(base, { waitUntil: "networkidle", timeout: 60_000 });
  await page.addStyleTag({ content: hideChrome });
  await page.waitForTimeout(800);
  await fn(page, name);
  await browser.close();
}

async function captureTicker(page, name) {
  const section = page.locator('[aria-label="Facts"]');
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);

  // Crop: bottom of hero + ticker + top of pricing
  const box = await section.boundingBox();
  if (!box) throw new Error("Facts strip not found");

  const clipY = Math.max(0, box.y - 80);
  const clipH = Math.min(box.height + 160, page.viewportSize().height - clipY);

  await page.screenshot({
    path: `${outDir}/${name}`,
    clip: {
      x: 0,
      y: clipY,
      width: page.viewportSize().width,
      height: clipH,
    },
  });
  console.log("wrote", name, {
    y: Math.round(box.y),
    h: Math.round(box.height),
    w: Math.round(box.width),
  });
}

for (const [w, h, file] of [
  [1440, 900, "ticker-1440.png"],
  [768, 900, "ticker-768.png"],
  [390, 844, "ticker-390.png"],
  [360, 800, "ticker-360.png"],
]) {
  await shot(w, h, file, captureTicker);
}

console.log("done");
