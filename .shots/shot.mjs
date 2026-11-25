import puppeteer from "puppeteer-core";

const executablePath =
  process.env.HOME +
  "/Library/Caches/ms-playwright/chromium-1248/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing";

const browser = await puppeteer.launch({
  executablePath,
  headless: "shell",
  args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"],
});

async function shot(name, width, height, action) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  await page.goto("http://localhost:3000/report/tech-structure/", {
    waitUntil: "networkidle0",
  });
  if (action) await action(page);
  await page.screenshot({ path: `.shots/${name}.png`, fullPage: false });
  await page.close();
}

await shot("tech-detail-next", 1200, 1700);
await shot("tech-detail-current", 1200, 1700, async (page) => {
  await page.evaluate(() => {
    const buttons = [...document.querySelectorAll("button")];
    const target = buttons.find((b) => b.textContent?.includes("٢٠٢٦"));
    target?.click();
  });
  await new Promise((r) => setTimeout(r, 500));
});
await shot("tech-mobile-next", 390, 2000);
await shot("tech-mobile-current", 390, 2000, async (page) => {
  await page.evaluate(() => {
    const buttons = [...document.querySelectorAll("button")];
    const target = buttons.find((b) => b.textContent?.includes("٢٠٢٦"));
    target?.click();
  });
  await new Promise((r) => setTimeout(r, 500));
});

await browser.close();
