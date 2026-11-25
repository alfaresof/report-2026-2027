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
  const article = document.querySelector(".topic-page");
  const q = document.querySelector(".questions-block");
  const layout = document.querySelector(".topic-layout");
  return {
    articleClass: article?.className,
    layoutPaddingTop: layout ? getComputedStyle(layout).paddingTop : null,
    qMarginTop: q ? getComputedStyle(q).marginTop : null,
    qTop: q ? q.getBoundingClientRect().top : null,
    qHeight: q ? q.getBoundingClientRect().height : null,
    bodyHeight: document.body.scrollHeight,
  };
});
console.log(JSON.stringify(data, null, 2));
await browser.close();
