import { chromium } from "playwright";
import fs from "fs";

const base = process.env.BASE_URL ?? "http://127.0.0.1:3000/ru";
const outDir = "docs/phase9";

fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
  recordVideo: {
    dir: outDir,
    size: { width: 1440, height: 900 },
  },
});

const page = await context.newPage();
await page.goto(base, { waitUntil: "networkidle", timeout: 60_000 });
await page.waitForTimeout(1200);

// ── 1. Hero + cursor glow ──────────────────────────────────────────
const hero = page.locator("section").first();
await hero.scrollIntoViewIfNeeded();
await page.waitForTimeout(800);

// Move cursor across hero so glow is visible
const box = await hero.boundingBox();
if (box) {
  await page.mouse.move(box.x + box.width * 0.25, box.y + box.height * 0.4);
  await page.waitForTimeout(200);
  await page.mouse.move(box.x + box.width * 0.55, box.y + box.height * 0.5, {
    steps: 18,
  });
  await page.waitForTimeout(250);
}
await page.screenshot({ path: `${outDir}/01-hero-cursor.png`, fullPage: false });

// Short cursor sweep for video
if (box) {
  for (const [nx, ny] of [
    [0.3, 0.35],
    [0.7, 0.45],
    [0.45, 0.6],
    [0.65, 0.35],
  ]) {
    await page.mouse.move(box.x + box.width * nx, box.y + box.height * ny, {
      steps: 12,
    });
    await page.waitForTimeout(180);
  }
}

// ── 2. Year row with gradient ──────────────────────────────────────
const yearRow = page.locator("#pricing li").filter({ hasText: "Год" }).first();
await yearRow.scrollIntoViewIfNeeded();
await page.waitForTimeout(900);
await yearRow.hover();
await page.waitForTimeout(400);
await yearRow.screenshot({ path: `${outDir}/02-year-gradient.png` });

// ── 3. Map placeholder (new pin design) ────────────────────────────
const contacts = page.locator("#contacts");
await contacts.scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
const mapTile = contacts.locator("button").filter({ hasText: "Показать карту" });
await mapTile.hover();
await page.waitForTimeout(500);
await contacts.screenshot({ path: `${outDir}/03-map-pin.png` });

await page.close();
await context.close();
await browser.close();

// Rename recorded video if present
const videos = fs.readdirSync(outDir).filter((f) => f.endsWith(".webm"));
if (videos[0]) {
  fs.renameSync(`${outDir}/${videos[0]}`, `${outDir}/01-hero-cursor.webm`);
}

console.log("ok", outDir, fs.readdirSync(outDir));
