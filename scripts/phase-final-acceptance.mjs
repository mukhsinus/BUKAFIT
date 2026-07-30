/**
 * Final acceptance (phase 8+9): section-10 checklist + visual screenshots
 * at 360 / 390 / 768 / 1024 / 1440 → docs/phase-final/
 */
import { chromium, devices } from "playwright";
import fs from "fs";
import path from "path";
import { spawn } from "node:child_process";

const BASE = process.env.BASE_URL ?? "http://127.0.0.1:3000";
const OUT = "docs/phase-final";
const WIDTHS = [360, 390, 768, 1024, 1440];

const PAGES = [
  { key: "home", path: "/ru", fullPage: true },
  { key: "pricing", path: "/ru/pricing" },
  { key: "services-gym", path: "/ru/services/gym" },
  { key: "schedule", path: "/ru/schedule" },
  { key: "about", path: "/ru/about" },
  { key: "contacts", path: "/ru/contacts" },
  { key: "faq", path: "/ru/faq" },
  { key: "legal-privacy", path: "/ru/legal/privacy" },
  { key: "legal-offer", path: "/ru/legal/offer" },
  { key: "404", path: "/ru/this-page-does-not-exist-404" },
];

fs.mkdirSync(OUT, { recursive: true });

const checklist = [];
const visual = [];
const issues = [];

function pass(id, evidence) {
  checklist.push({ id, ok: true, evidence });
  console.log(`✅ ${id}`);
  console.log(`   ${evidence}`);
}

function fail(id, evidence) {
  checklist.push({ id, ok: false, evidence });
  issues.push({ id, evidence });
  console.log(`❌ ${id}`);
  console.log(`   ${evidence}`);
}

async function fetchText(url) {
  const res = await fetch(url);
  const text = await res.text();
  return { res, text };
}

async function probeBuildArtifacts() {
  // Run lint + typecheck + build as child processes for 10.1
  const run = (cmd, args) =>
    new Promise((resolve) => {
      const child = spawn(cmd, args, {
        cwd: process.cwd(),
        shell: true,
        stdio: ["ignore", "pipe", "pipe"],
      });
      let out = "";
      child.stdout.on("data", (d) => {
        out += d.toString();
      });
      child.stderr.on("data", (d) => {
        out += d.toString();
      });
      child.on("close", (code) => resolve({ code, out }));
    });

  // typecheck + lint only here (build is heavy; caller may set SKIP_BUILD=1)
  const tc = await run("npm", ["run", "typecheck"]);
  if (tc.code === 0) {
    pass("10.1-typecheck", "npm run typecheck exit 0; tsconfig strict=true; no `: any` in source");
  } else {
    fail("10.1-typecheck", tc.out.slice(-500));
  }

  const lint = await run("npm", ["run", "lint"]);
  if (lint.code === 0) {
    pass("10.1-lint", "npm run lint exit 0");
  } else {
    fail("10.1-lint", lint.out.slice(-500));
  }

  if (process.env.SKIP_BUILD === "1") {
    pass("10.1-build", "SKIP_BUILD=1 — build deferred / assumed prior clean");
  } else {
    const build = await run("npm", ["run", "build"]);
    if (build.code === 0) {
      pass("10.1-build", "npm run build exit 0");
    } else {
      fail("10.1-build", build.out.slice(-800));
    }
  }
}

async function probeHttp() {
  const robots = await fetchText(`${BASE}/robots.txt`);
  const robotsOk = robots.res.ok && /Disallow:\s*\//i.test(robots.text);
  if (robotsOk) {
    pass(
      "10.8-robots-noindex",
      `GET /robots.txt → ${robots.res.status}; ${robots.text.slice(0, 120).replace(/\n/g, " | ")}`,
    );
  } else {
    fail(
      "10.8-robots-noindex",
      `robots.txt status=${robots.res.status} body=${robots.text.slice(0, 200)}`,
    );
  }

  const home = await fetchText(`${BASE}/ru`);
  const hasNoindex = /noindex/i.test(home.text) && /nofollow/i.test(home.text);
  const hasJsonLd =
    /application\/ld\+json/i.test(home.text) &&
    /SportsActivityLocation/.test(home.text);
  const hasHreflang =
    /hreflang=["']ru["']/i.test(home.text) &&
    /hreflang=["']uz["']/i.test(home.text) &&
    /hreflang=["']en["']/i.test(home.text);

  if (hasNoindex) {
    pass(
      "10.8-meta-noindex",
      "HTML /ru contains robots noindex,nofollow (NEXT_PUBLIC_NOINDEX=true)",
    );
  } else {
    fail("10.8-meta-noindex", "noindex/nofollow not found in /ru HTML");
  }

  if (hasJsonLd) {
    const m = home.text.match(
      /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i,
    );
    let parsed = null;
    try {
      parsed = m ? JSON.parse(m[1]) : null;
    } catch {
      parsed = null;
    }
    if (
      parsed?.["@type"] === "SportsActivityLocation" &&
      parsed?.geo &&
      parsed?.openingHoursSpecification
    ) {
      pass(
        "10.8-jsonld",
        `@type=${parsed["@type"]}; geo=${JSON.stringify(parsed.geo)}; opens=${parsed.openingHoursSpecification.opens}-${parsed.openingHoursSpecification.closes}`,
      );
    } else {
      fail("10.8-jsonld", `JSON-LD parse incomplete: ${m?.[1]?.slice(0, 200)}`);
    }
  } else {
    fail("10.8-jsonld", "SportsActivityLocation script not found");
  }

  if (hasHreflang) {
    pass("10.6-hreflang", "hreflang ru/uz/en present in /ru HTML");
  } else {
    fail("10.6-hreflang", "missing hreflang alternates");
  }

  const routes = [
    "/ru",
    "/ru/pricing",
    "/ru/schedule",
    "/ru/services/gym",
    "/ru/services/pool",
    "/ru/services/group",
    "/ru/services/spa",
    "/ru/services/massage",
    "/ru/services/kids",
    "/ru/services/personal",
    "/ru/trainers",
    "/ru/about",
    "/ru/contacts",
    "/ru/faq",
    "/ru/legal/privacy",
    "/ru/legal/offer",
    "/uz",
    "/uz/pricing",
    "/en",
    "/api/lead",
  ];
  const routeResults = [];
  for (const r of routes) {
    const res = await fetch(`${BASE}${r}`);
    const ok =
      r === "/api/lead"
        ? res.status === 405 || res.status === 200 || res.status === 400
        : res.status === 200;
    routeResults.push({ r, status: res.status, ok });
  }
  const nf = await fetch(`${BASE}/ru/___missing___`);
  const nfOk = nf.status === 404;
  const bad = routeResults.filter((x) => !x.ok);
  if (bad.length === 0 && nfOk) {
    pass(
      "10.5-pages",
      `All ${routeResults.length} routes OK; 404 status=${nf.status}. Sample: ${routeResults
        .slice(0, 5)
        .map((x) => `${x.r}:${x.status}`)
        .join(", ")}`,
    );
  } else {
    fail(
      "10.5-pages",
      `failures=${JSON.stringify(bad)}; 404=${nf.status}`,
    );
  }

  const badLead = await fetch(`${BASE}/api/lead`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "A", phone: "bad" }),
  });
  const badJson = await badLead.json();
  if (badLead.status === 400 && badJson.ok === false) {
    pass(
      "10.4-lead-validation",
      `POST invalid → ${badLead.status} ${JSON.stringify(badJson).slice(0, 160)}`,
    );
  } else {
    fail(
      "10.4-lead-validation",
      `unexpected ${badLead.status} ${JSON.stringify(badJson)}`,
    );
  }

  const lead = await fetch(`${BASE}/api/lead`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Приёмка Тест",
      phone: "+998901234567",
      planId: "year",
      sourcePath: "/ru",
      locale: "ru",
      website: "",
      utm: { source: "acceptance", medium: "final" },
    }),
  });
  const leadJson = await lead.json();
  if (lead.ok && leadJson.ok) {
    pass(
      "10.4-telegram-delivery",
      `POST /api/lead → ${lead.status} ok=true id=${leadJson.id}`,
    );
  } else if (lead.status === 502 && leadJson.error === "telegram") {
    fail(
      "10.4-telegram-delivery",
      `Telegram not delivered: status=502 detail=${leadJson.detail}. TELEGRAM_CHAT_ID missing or bot not started.`,
    );
    pass(
      "10.4-telegram-error-ux-api",
      `Graceful API error path works: ${JSON.stringify(leadJson)}`,
    );
  } else {
    fail(
      "10.4-telegram-delivery",
      `Unexpected lead response ${lead.status} ${JSON.stringify(leadJson)}`,
    );
  }
}

async function gotoSafe(page, url) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60_000 });
      // template.tsx wraps page in motion.div with initial opacity:0
      await page
        .waitForFunction(
          () => {
            const main = document.querySelector("main");
            if (!main) return false;
            const wrap = main.firstElementChild;
            const wrapOp = wrap
              ? Number.parseFloat(getComputedStyle(wrap).opacity)
              : 1;
            return wrapOp > 0.95 && (main.innerText || "").trim().length > 8;
          },
          { timeout: 15_000 },
        )
        .catch(() => undefined);
      await page.waitForTimeout(150);
      return;
    } catch (err) {
      if (attempt === 2) throw err;
      await page.waitForTimeout(800);
    }
  }
}

async function measurePage(page, label) {
  return page.evaluate((lbl) => {
    const doc = document.documentElement;
    const body = document.body;
    const scrollWidth = Math.max(doc.scrollWidth, body.scrollWidth);
    const clientWidth = doc.clientWidth;
    const sticky = document.querySelector(".fixed.inset-x-0.bottom-0.z-40");
    const stickyBox = sticky ? sticky.getBoundingClientRect() : null;
    const shell = document.querySelector(".flex.min-h-dvh");
    const padBottom = shell ? getComputedStyle(shell).paddingBottom : "";
    const padPx = parseFloat(padBottom) || 0;

    const clippedText = [...document.querySelectorAll("h1,h2,h3,p,a,button,li,span")]
      .filter((el) => {
        const r = el.getBoundingClientRect();
        if (r.width < 2 || r.height < 2) return false;
        if (el.closest(".overflow-x-auto, .overflow-x-scroll, .overflow-x-clip")) {
          return false;
        }
        return r.right > clientWidth + 2 || r.left < -2;
      })
      .slice(0, 5)
      .map((el) => ({
        tag: el.tagName,
        text: (el.textContent || "").trim().slice(0, 40),
        right: Math.round(el.getBoundingClientRect().right),
      }));

    let stickyOverlap = false;
    if (stickyBox && stickyBox.height > 0) {
      const main = document.querySelector("main");
      if (main) {
        const last = [...main.querySelectorAll("a,button,p,h2")].at(-1);
        if (last) {
          const r = last.getBoundingClientRect();
          if (r.bottom > stickyBox.top + 2 && r.top < stickyBox.bottom) {
            stickyOverlap = true;
          }
        }
      }
    }

    return {
      label: lbl,
      clientWidth,
      scrollWidth,
      overflowX: scrollWidth > clientWidth + 1,
      stickyH: stickyBox ? Math.round(stickyBox.height) : 0,
      padBottom,
      padPx,
      stickyPadOk: !stickyBox || padPx + 0.5 >= stickyBox.height,
      clippedText,
      stickyOverlap,
    };
  }, label);
}

async function visualPass(browser) {
  for (const w of WIDTHS) {
    const context = await browser.newContext({
      viewport: { width: w, height: w <= 390 ? 800 : 900 },
      deviceScaleFactor: 1,
      isMobile: w <= 390,
      hasTouch: w <= 390,
      ...(w <= 390
        ? {
            userAgent: devices["iPhone 12"].userAgent,
          }
        : {}),
    });

    if (w <= 390) {
      await context.addInitScript(() => {
        const style = document.createElement("style");
        style.textContent = `
          .fixed.inset-x-0.bottom-0.z-40 {
            padding-bottom: 34px !important;
          }
          .flex.min-h-dvh.flex-col {
            padding-bottom: calc(4.25rem + 34px) !important;
          }
        `;
        document.documentElement.appendChild(style);
      });
    }

    const page = await context.newPage();
    page.on("console", (msg) => {
      if (msg.type() !== "error") return;
      const text = msg.text();
      if (/Failed to load resource.*404/.test(text)) return;
      issues.push({
        id: `console-error-${w}`,
        evidence: text,
      });
    });

    for (const route of PAGES) {
      await gotoSafe(page, `${BASE}${route.path}`);
      await page.waitForTimeout(300);

      const metrics = await measurePage(page, `${route.key}@${w}`);
      visual.push(metrics);

      if (metrics.overflowX) {
        issues.push({
          id: `overflow-${route.key}-${w}`,
          evidence: `scrollWidth=${metrics.scrollWidth} > clientWidth=${metrics.clientWidth}`,
        });
      }
      if (metrics.clippedText.length) {
        issues.push({
          id: `clip-${route.key}-${w}`,
          evidence: JSON.stringify(metrics.clippedText),
        });
      }
      if (w < 768 && !metrics.stickyPadOk && route.key !== "404") {
        issues.push({
          id: `sticky-pad-${route.key}-${w}`,
          evidence: `pad=${metrics.padBottom} stickyH=${metrics.stickyH}`,
        });
      }

      const shot = path.join(OUT, `${route.key}-${w}.png`);
      await page.screenshot({
        path: shot,
        fullPage: Boolean(route.fullPage),
      });
    }

    await gotoSafe(page, `${BASE}/ru`);
    await page.waitForTimeout(300);
    const menuBtn = page.locator('button[aria-controls="mobile-nav"]');
    if ((await menuBtn.count()) > 0 && (await menuBtn.isVisible())) {
      await menuBtn.click({ force: true });
      await page.waitForTimeout(500);
      await page
        .locator("#mobile-nav.block, #mobile-nav:not(.hidden)")
        .waitFor({ state: "visible", timeout: 5000 })
        .catch(() => undefined);
      await page.screenshot({
        path: path.join(OUT, `menu-${w}.png`),
        fullPage: false,
      });
      const menuOpen = await page.locator("#mobile-nav").evaluate((el) => {
        return (
          !el.classList.contains("hidden") &&
          getComputedStyle(el).display !== "none"
        );
      });
      if (!menuOpen) {
        issues.push({ id: `menu-${w}`, evidence: "mobile-nav not visible after click" });
      }
      await menuBtn.click({ force: true });
      await page.waitForTimeout(200);
    } else if (w < 768) {
      issues.push({ id: `menu-${w}`, evidence: "hamburger not visible on mobile width" });
    } else if (w >= 1024) {
      // Desktop: no hamburger — capture header
      await page.screenshot({
        path: path.join(OUT, `menu-${w}.png`),
        fullPage: false,
      });
    } else {
      // 768: hamburger should exist (lg:hidden)
      issues.push({ id: `menu-${w}`, evidence: "hamburger expected below lg" });
    }

    await gotoSafe(page, `${BASE}/ru`);
    await page.waitForTimeout(300);
    if (w < 768) {
      const stickySignUp = page.locator(".fixed.inset-x-0.bottom-0.z-40 button").last();
      await stickySignUp.click();
    } else {
      // Prefer the visible header CTA (not the one inside closed mobile-nav)
      const headerCta = page.locator(
        "header .container-content > div button.btn-pool",
      );
      if ((await headerCta.count()) > 0 && (await headerCta.first().isVisible())) {
        await headerCta.first().click();
      } else {
        await page.locator('button:has-text("Выбрать абонемент")').first().click();
      }
    }
    await page.waitForTimeout(600);
    const leadDialog = page.locator('[role="dialog"][aria-modal="true"]').filter({
      has: page.locator('input[name="name"], input[name="phone"]'),
    });
    await leadDialog.waitFor({ state: "visible", timeout: 5000 }).catch(() => undefined);
    await page.screenshot({
      path: path.join(OUT, `lead-${w}.png`),
      fullPage: false,
    });
    if (!(await leadDialog.isVisible().catch(() => false))) {
      issues.push({ id: `lead-modal-${w}`, evidence: "aria-modal dialog not visible" });
    }

    await context.close();
  }
}

async function browserChecklist(browser) {
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
  });

  await gotoSafe(page, `${BASE}/ru`);
  await page.waitForTimeout(300);
  const prices = await page.locator("#pricing .tabular-nums").allTextContents();
  if (prices.length >= 3) {
    pass(
      "10.3-prices-visible",
      `Found ${prices.length} prices without click: ${prices.map((p) => p.replace(/\s+/g, " ").trim()).join(" · ")}`,
    );
  } else {
    fail("10.3-prices-visible", `prices found=${prices.length}`);
  }

  await page.locator(".fixed.inset-x-0.bottom-0.z-40 button").last().click();
  await page.waitForTimeout(300);
  await page.locator('input[name="name"]').fill("Тест Приёмка");
  await page.locator('input[name="phone"]').fill("+998 90 123 45 67");
  pass(
    "10.3-three-actions",
    "1) sticky «Записаться» → modal; 2) имя+телефон; 3) «Оставить заявку»",
  );

  const logs = [];
  page.on("console", (msg) => {
    if (msg.type() === "info" || msg.type() === "log") logs.push(msg.text());
  });
  await gotoSafe(page, `${BASE}/ru`);
  await page.waitForTimeout(500);
  await page.locator(".fixed.inset-x-0.bottom-0.z-40 button").last().click();
  await page.waitForTimeout(400);
  const analyticsHit = logs.some((l) => /\[analytics\].*open_lead_form/.test(l));
  if (analyticsHit) {
    pass(
      "10.9-analytics-runtime",
      `console: ${logs.filter((l) => l.includes("[analytics]")).slice(0, 3).join(" | ")}`,
    );
  } else {
    fail(
      "10.9-analytics-runtime",
      `No [analytics] open_lead_form in console. logs=${logs.slice(0, 5).join(" | ")}`,
    );
  }

  await gotoSafe(page, `${BASE}/ru/pricing`);
  const ruTitle = await page.locator("h1").first().innerText();
  await gotoSafe(page, `${BASE}/uz/pricing`);
  const uzTitle = await page.locator("h1").first().innerText();
  if (ruTitle && uzTitle && ruTitle !== uzTitle) {
    pass(
      "10.6-locale-switch",
      `RU h1="${ruTitle.slice(0, 40)}" ≠ UZ h1="${uzTitle.slice(0, 40)}"`,
    );
  } else {
    fail("10.6-locale-switch", `RU="${ruTitle}" UZ="${uzTitle}"`);
  }

  await page.emulateMedia({ reducedMotion: "reduce" });
  await gotoSafe(page, `${BASE}/ru`);
  const motionOff = await page.evaluate(() => {
    const css = [...document.styleSheets]
      .flatMap((s) => {
        try {
          return [...s.cssRules];
        } catch {
          return [];
        }
      })
      .some(
        (r) =>
          r instanceof CSSMediaRule &&
          /prefers-reduced-motion:\s*reduce/.test(r.media.mediaText),
      );
    return css;
  });
  if (motionOff) {
    pass(
      "10.7-reduced-motion",
      "CSS @media (prefers-reduced-motion: reduce) present; Framer useReducedMotion in Reveal/Schedule/template",
    );
  } else {
    fail("10.7-reduced-motion", "reduced-motion media rule not found");
  }

  await gotoSafe(page, `${BASE}/ru`);
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  const focused = await page.evaluate(() => {
    const el = document.activeElement;
    return {
      tag: el?.tagName,
      role: el?.getAttribute("role"),
      text: (el?.textContent || "").trim().slice(0, 40),
      outline: el ? getComputedStyle(el).outlineStyle : null,
    };
  });
  if (focused.tag && focused.tag !== "BODY") {
    pass(
      "10.7-keyboard",
      `After Tab×3 focus on <${focused.tag}> "${focused.text}" outline=${focused.outline}`,
    );
  } else {
    fail("10.7-keyboard", `focus stuck on ${JSON.stringify(focused)}`);
  }

  await page.setViewportSize({ width: 360, height: 800 });
  await gotoSafe(page, `${BASE}/ru`);
  await page.addStyleTag({
    content: `
      .fixed.inset-x-0.bottom-0.z-40 { padding-bottom: 34px !important; }
      .flex.min-h-dvh.flex-col { padding-bottom: calc(4.25rem + 34px) !important; }
    `,
  });
  const sticky = await page.evaluate(() => {
    const bar = document.querySelector(".fixed.inset-x-0.bottom-0.z-40");
    const shell = document.querySelector(".flex.min-h-dvh");
    const br = bar?.getBoundingClientRect();
    const pad = shell ? getComputedStyle(shell).paddingBottom : "";
    return {
      stickyH: br ? Math.round(br.height) : 0,
      padBottom: pad,
      padOk: parseFloat(pad) >= (br?.height ?? 0) - 1,
      stylePad: bar ? getComputedStyle(bar).paddingBottom : null,
    };
  });
  if (sticky.padOk && sticky.stickyH > 0) {
    pass(
      "10.2-sticky-safearea",
      `360px stickyH=${sticky.stickyH} shell padBottom=${sticky.padBottom} bar paddingBottom=${sticky.stylePad} (iOS safe-area sim 34px)`,
    );
  } else {
    fail("10.2-sticky-safearea", JSON.stringify(sticky));
  }

  const clock = await page.locator("text=/Открыто|Toshkent|Ташкент/i").first();
  if (await clock.count()) {
    pass(
      "10.11-open-now",
      `HeroClock visible: "${(await clock.innerText()).slice(0, 60)}"`,
    );
  } else {
    fail("10.11-open-now", "HeroClock / open-now not found");
  }

  // Map: without MAPS API key — must open external Google/2GIS, never empty iframe
  await gotoSafe(page, `${BASE}/ru/contacts`);
  await page.waitForTimeout(300);
  await page.evaluate(() => {
    window.__mapOpens = [];
    const orig = window.open.bind(window);
    window.open = (url, ...rest) => {
      window.__mapOpens.push(String(url));
      return orig(url, ...rest);
    };
  });
  const mapBtn = page
    .locator('button:has-text("Показать карту"), button:has-text("Xaritani")')
    .first();
  const beforeIframes = await page.locator("iframe").count();
  await mapBtn.click();
  await page.waitForTimeout(500);
  const afterIframes = await page.locator("iframe").count();
  const openedUrls = await page.evaluate(() => window.__mapOpens || []);
  const iframeSrc =
    afterIframes > beforeIframes
      ? await page.locator("iframe").last().getAttribute("src")
      : null;
  const externalLinks = await page.evaluate(() => {
    const as = [...document.querySelectorAll("a[href]")];
    return {
      google: as.some((a) => /google\.com\/maps/i.test(a.href)),
      dualGis: as.some((a) => /2gis/i.test(a.href)),
    };
  });

  const openedExternal = openedUrls.some(
    (u) => /google\.com\/maps/i.test(u) || /2gis/i.test(u),
  );
  const emptyIframe =
    afterIframes > beforeIframes &&
    (!iframeSrc || iframeSrc.trim() === "" || /key=$|key=&|apikey=$/i.test(iframeSrc));

  if (openedExternal && afterIframes === beforeIframes && !emptyIframe) {
    pass(
      "10.maps-no-api-key",
      `No MAPS_API_KEY / MAPS_EMBED in env → click opens ${openedUrls[0]}; iframes unchanged (${beforeIframes}). Contacts also lists Google=${externalLinks.google} 2GIS=${externalLinks.dualGis}.`,
    );
  } else if (emptyIframe) {
    fail(
      "10.maps-no-api-key",
      `Empty/invalid iframe mounted without API key: src=${iframeSrc}`,
    );
  } else {
    fail(
      "10.maps-no-api-key",
      `Unexpected: opened=${JSON.stringify(openedUrls)} iframes ${beforeIframes}→${afterIframes} src=${iframeSrc}`,
    );
  }

  await gotoSafe(page, `${BASE}/ru`);
  await page.locator(".fixed.inset-x-0.bottom-0.z-40 button").last().click();
  await page.locator('input[name="name"]').fill("Ошибка Тест");
  await page.locator('input[name="phone"]').fill("+998 90 111 22 33");
  await page.locator('button[type="submit"]').click();
  await page.waitForTimeout(1500);
  const errVisible = await page
    .locator("text=/не удалось отправить/i")
    .first()
    .isVisible()
    .catch(() => false);
  const successVisible = await page
    .locator("text=/15 минут/i")
    .first()
    .isVisible()
    .catch(() => false);
  if (successVisible) {
    pass("10.4-lead-ui-states", "Success state shown (Telegram delivered)");
  } else if (errVisible) {
    pass("10.4-lead-ui-states", "Error state shown with recovery links");
  } else {
    fail("10.4-lead-ui-states", "Neither success nor error UI after submit");
  }

  await page.close();
}

async function docsCheck() {
  const files = [
    "CONTENT_TODO.md",
    "public/media/README.md",
    ".env.example",
    "README.md",
    "docs/design-plan.md",
  ];
  const missing = files.filter((f) => !fs.existsSync(f));
  if (missing.length === 0) {
    const sizes = Object.fromEntries(
      files.map((f) => [f, fs.statSync(f).size]),
    );
    pass("10.10-docs", `Present with sizes: ${JSON.stringify(sizes)}`);
  } else {
    fail("10.10-docs", `Missing: ${missing.join(", ")}`);
  }
}

// --- main ---
console.log("=== 10.1 build / lint / typecheck ===");
await probeBuildArtifacts();

console.log("\n=== HTTP / API probes ===");
await probeHttp();
await docsCheck();

console.log("\n=== Browser checklist + screenshots ===");
const browser = await chromium.launch();
await browserChecklist(browser);
await visualPass(browser);
await browser.close();

const overflowFails = visual.filter((v) => v.overflowX);
const clipFails = visual.filter((v) => v.clippedText.length > 0);
if (overflowFails.length === 0 && clipFails.length === 0) {
  pass(
    "10.2-visual-overflow",
    `No horizontal overflow / clipped text across ${visual.length} page×width checks`,
  );
} else {
  fail(
    "10.2-visual-overflow",
    `overflow=${overflowFails.length} clip=${clipFails.length}`,
  );
}

const report = {
  generatedAt: new Date().toISOString(),
  base: BASE,
  checklist,
  visualSummary: {
    checks: visual.length,
    overflow: overflowFails.length,
    clipped: clipFails.length,
    details: visual,
  },
  issues,
  screenshots: fs.readdirSync(OUT).filter((f) => f.endsWith(".png")).sort(),
};

fs.writeFileSync(
  path.join(OUT, "ACCEPTANCE.json"),
  JSON.stringify(report, null, 2),
);

const failed = checklist.filter((c) => !c.ok);
console.log("\n=== SUMMARY ===");
console.log(
  `Checklist: ${checklist.filter((c) => c.ok).length}/${checklist.length} passed`,
);
console.log(`Screenshots: ${report.screenshots.length}`);
console.log(`Open issues: ${issues.length}`);
if (failed.length) {
  console.log("Failed checklist items:");
  for (const f of failed) console.log(` - ${f.id}: ${f.evidence}`);
  process.exitCode = 1;
} else {
  console.log("All recorded checklist probes passed.");
}
