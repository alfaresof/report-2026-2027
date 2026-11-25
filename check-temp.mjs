import puppeteer from "puppeteer-core";

const executablePath =
  process.env.HOME +
  "/Library/Caches/ms-playwright/chromium-1248/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing";

const browser = await puppeteer.launch({
  executablePath,
  headless: "shell",
  args: ["--no-sandbox", "--disable-gpu"],
});

for (const path of ["/", "/report/december-leave/", "/report/tech-structure/", "/print/"]) {
  const page = await browser.newPage();
  const errors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(err.message));
  const res = await page.goto("http://localhost:3000" + path, {
    waitUntil: "networkidle0",
  });
  const info = await page.evaluate(() => ({
    h1: document.querySelector("h1")?.innerText ?? null,
    header: Boolean(document.querySelector(".site-header")),
    footer: Boolean(document.querySelector(".site-footer")),
    logo: Boolean(document.querySelector('img[src*="riyadh"]')),
  }));
  console.log(path, res?.status(), JSON.stringify(info), errors.slice(0, 3));
  await page.close();
}

await browser.close();
