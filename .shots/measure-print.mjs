import puppeteer from "puppeteer-core";

const executablePath =
  process.env.HOME +
  "/Library/Caches/ms-playwright/chromium-1248/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing";

const browser = await puppeteer.launch({
  executablePath,
  headless: "shell",
  args: ["--no-sandbox", "--disable-gpu"],
});
const page = await browser.newPage();
await page.setViewport({ width: 794, height: 1123 });
await page.emulateMediaType("print");
await page.goto("http://localhost:3000/report/tech-structure/", {
  waitUntil: "networkidle0",
});
const data = await page.evaluate(() => {
  const rect = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return {
      top: Math.round(r.top + window.scrollY),
      height: Math.round(r.height),
      display: cs.display,
      marginTop: cs.marginTop,
      pageBreakInside: cs.pageBreakInside,
    };
  };
  return {
    pageHeight: document.documentElement.scrollHeight,
    hero: rect(".topic-hero"),
    layout: rect(".topic-layout"),
    techPrint: rect(".tech-print"),
    techBlock: rect(".tech-print-block"),
    questions: rect(".questions-block"),
  };
});
console.log(JSON.stringify(data, null, 2));
await browser.close();
