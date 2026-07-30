import { chromium } from "playwright";
import fs from "fs";

const widths = [360, 1440];
const base = process.env.BASE_URL ?? "http://127.0.0.1:3457/ru";
const outDir = "docs/phase8-4b";

const sections = [
  { id: "pricing", file: "pricing", note: "Year CTA flush" },
  { id: "services", file: "services" },
  { id: "schedule", file: "schedule" },
  { id: "gallery", file: "gallery" },
  { id: "faq", file: "faq" },
  { id: "contacts", file: "contacts" },
];

fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();

for (const w of widths) {
  const page = await browser.newPage({
    viewport: { width: w, height: w === 360 ? 800 : 900 },
    deviceScaleFactor: 1,
  });
  await page.goto(base, { waitUntil: "networkidle", timeout: 60_000 });
  await page.waitForTimeout(1000);

  // Header hamburger (mobile only)
  if (w === 360) {
    await page.screenshot({ path: `${outDir}/header-${w}.png`, fullPage: false });
    await page.locator('button[aria-controls="mobile-nav"]').click();
    await page.waitForTimeout(400);
    await page.screenshot({ path: `${outDir}/menu-${w}.png`, fullPage: false });
    await page.locator('button[aria-controls="mobile-nav"]').click();
    await page.waitForTimeout(300);
  }

  for (const section of sections) {
    const loc = page.locator(`#${section.id}`);
    await loc.scrollIntoViewIfNeeded();
    await page.waitForTimeout(350);
    await loc.screenshot({ path: `${outDir}/${section.file}-${w}.png` });
  }

  await page.close();
}

await browser.close();
console.log("ok", outDir);
