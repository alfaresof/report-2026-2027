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
await page.setViewport({ width: 1200, height: 1600 });
await page.goto("http://localhost:3000/report/tech-structure/", {
  waitUntil: "networkidle0",
});
await page.evaluate(() => {
  const buttons = [...document.querySelectorAll("button")];
  buttons.find((b) => b.textContent?.includes("٢٠٢٦"))?.click();
});
await new Promise((r) => setTimeout(r, 400));

const data = await page.evaluate(() => {
  const rect = (el) => {
    const r = el.getBoundingClientRect();
    return { x: Math.round(r.x), w: Math.round(r.width), center: Math.round(r.x + r.width / 2) };
  };
  const people = [...document.querySelectorAll('[class*="currentPerson"]')].map(rect);
  const drops = [...document.querySelectorAll('[class*="railDrop"]')].map(rect);
  const rail = document.querySelector('[class*="dashedRail"]');
  const railRect = rail ? rect(rail) : null;
  return { people, drops, railRect };
});
console.log(JSON.stringify(data, null, 2));
await browser.close();
