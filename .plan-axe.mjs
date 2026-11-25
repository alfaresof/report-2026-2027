import fs from "fs";
import puppeteer from "puppeteer-core";
const axeSource = fs.readFileSync("./node_modules/axe-core/axe.min.js", "utf8");
const browser = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: "new", args:["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1200 });
await page.goto("http://localhost:3000/report/plan-2027/", { waitUntil: "networkidle2" });
await new Promise(r=>setTimeout(r,400));
await page.addScriptTag({ content: axeSource });
const res = await page.evaluate(async () => {
  const r = await window.axe.run(document, { runOnly:["wcag2a","wcag2aa","wcag21a","wcag21aa"] });
  return r.violations.map(v => ({ id:v.id, impact:v.impact, nodes:v.nodes.map(n=>({target:n.target, summary:n.failureSummary?.split("\n").slice(0,3).join(" | ")})) }));
});
console.log(JSON.stringify(res, null, 2));
await browser.close();
