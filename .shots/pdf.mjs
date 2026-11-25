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
await page.goto("http://localhost:3000/print/", { waitUntil: "networkidle0" });
await page.pdf({
  path: ".shots/full-report.pdf",
  format: "A4",
  printBackground: true,
  preferCSSPageSize: true,
});

await page.goto("http://localhost:3000/report/tech-structure/", {
  waitUntil: "networkidle0",
});
await page.pdf({
  path: ".shots/tech-topic.pdf",
  format: "A4",
  printBackground: true,
  preferCSSPageSize: true,
});

await browser.close();
