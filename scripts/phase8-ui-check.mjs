/**
 * Фаза 8 п.3 — фактический contrast на кнопке + focus-visible.
 * Нужен next dev: node scripts/phase8-ui-check.mjs
 */
import { chromium } from "playwright";

function relLum(hex) {
  const n = hex
    .replace("#", "")
    .match(/.{2}/g)
    .map((h) => parseInt(h, 16) / 255)
    .map((c) =>
      c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4),
    );
  return 0.2126 * n[0] + 0.7152 * n[1] + 0.0722 * n[2];
}

function contrast(a, b) {
  const L1 = relLum(a);
  const L2 = relLum(b);
  const [hi, lo] = L1 > L2 ? [L1, L2] : [L2, L1];
  return (hi + 0.05) / (lo + 0.05);
}

function rgbToHex(rgb) {
  const m = String(rgb).match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  if (!m) return String(rgb).toUpperCase();
  return (
    "#" +
    [m[1], m[2], m[3]]
      .map((v) => Number(v).toString(16).padStart(2, "0"))
      .join("")
  ).toUpperCase();
}

const BASE = process.env.UI_CHECK_URL ?? "http://127.0.0.1:3000/ru";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

try {
  await page.goto(BASE, { waitUntil: "networkidle", timeout: 90_000 });

  const measured = await page.evaluate(() => {
    const btn = document.createElement("button");
    btn.id = "phase8-probe-btn";
    btn.className = "btn-pool";
    btn.textContent = "Выбрать абонемент";
    btn.style.cssText =
      "position:fixed;left:8px;bottom:8px;z-index:9999;min-height:44px;padding:0 20px;border-radius:0;";
    document.body.appendChild(btn);

    const input = document.createElement("input");
    input.id = "phase8-probe-input";
    input.className =
      "min-h-11 rounded-none border border-mineral bg-steam px-3 text-ink";
    input.style.cssText =
      "position:fixed;left:8px;bottom:60px;z-index:9999;border-radius:0;";
    document.body.appendChild(input);

    const link = document.createElement("a");
    link.id = "phase8-probe-link";
    link.href = "#probe";
    link.textContent = "Абонементы";
    link.className = "text-[15px] text-ink";
    link.style.cssText = "position:fixed;left:8px;bottom:110px;z-index:9999;";
    document.body.appendChild(link);

    const cs = getComputedStyle(btn);
    return {
      button: {
        color: cs.color,
        backgroundColor: cs.backgroundColor,
        borderRadius: cs.borderRadius,
      },
      inputRadius: getComputedStyle(input).borderRadius,
    };
  });

  const btnFg = rgbToHex(measured.button.color);
  const btnBg = rgbToHex(measured.button.backgroundColor);

  async function focusVisibleOf(selector) {
    await page.locator(selector).focus();
    await page.keyboard.press("Tab");
    await page.keyboard.down("Shift");
    await page.keyboard.press("Tab");
    await page.keyboard.up("Shift");
    return page.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      if (document.activeElement !== el) el.focus();
      const cs = getComputedStyle(el);
      return {
        active: document.activeElement === el,
        outline: cs.outline,
        outlineWidth: cs.outlineWidth,
        outlineStyle: cs.outlineStyle,
        outlineColor: cs.outlineColor,
        outlineOffset: cs.outlineOffset,
      };
    }, selector);
  }

  await page.locator("#phase8-probe-link").focus();
  await page.keyboard.press("Tab");

  const focusButton = await focusVisibleOf("#phase8-probe-btn");
  const focusInput = await focusVisibleOf("#phase8-probe-input");
  const focusLink = await focusVisibleOf("#phase8-probe-link");

  // Header nav link focus (real)
  const headerNavFocus = await page.evaluate(() => {
    const navLink = document.querySelector('header nav a[href*="pricing"]');
    if (!navLink) return null;
    navLink.focus();
    const cs = getComputedStyle(navLink);
    return {
      outlineWidth: cs.outlineWidth,
      outlineColor: cs.outlineColor,
      outlineOffset: cs.outlineOffset,
    };
  });

  const tokenPairs = {
    "ink/chalk": contrast("#101418", "#F4F5F3"),
    "chalk/pool": contrast("#F4F5F3", "#0D6E7C"),
    "pool/steam": contrast("#0D6E7C", "#FFFFFF"),
    "button chalk-on-pool (computed)": contrast(btnFg, btnBg),
  };

  const report = {
    measuredButtonColors: { fg: btnFg, bg: btnBg },
    borderRadius: {
      button: measured.button.borderRadius,
      input: measured.inputRadius,
    },
    contrasts: Object.fromEntries(
      Object.entries(tokenPairs).map(([k, v]) => [k, `${v.toFixed(2)}:1`]),
    ),
    focusVisible: {
      button: focusButton,
      input: focusInput,
      link: focusLink,
      headerNav: headerNavFocus,
    },
  };

  console.log(JSON.stringify(report, null, 2));
  process.exit(0);
} catch (error) {
  console.error(error);
  process.exit(1);
} finally {
  await browser.close();
}
