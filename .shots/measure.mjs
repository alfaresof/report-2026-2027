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

const data = await page.evaluate(() => {
  const rect = (el) => {
    const r = el.getBoundingClientRect();
    return { x: Math.round(r.x), w: Math.round(r.width), center: Math.round(r.x + r.width / 2) };
  };
  const stage = document.querySelector('[class*="stage"]');
  const people = [...document.querySelectorAll('[class*="currentPeople"] li')].map(rect);
  const drops = [...document.querySelectorAll('[class*="railDrop"]')].map(rect);
  const departments = [...document.querySelectorAll('[class*="departments"] section')].map(rect);
  const solidDrops = [...document.querySelectorAll('[class*="solidDrop"]')].map(rect);
  const director = document.querySelector('[class*="directorNext"]') || document.querySelector('[class*="director"]');
  return {
    stage: rect(stage),
    people,
    drops,
    departments,
    solidDrops,
    director: director ? rect(director) : null,
    htmlDir: document.documentElement.dir,
  };
});
console.log(JSON.stringify(data, null, 2));
await browser.close();
