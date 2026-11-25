import fs from "fs";
import puppeteer from "puppeteer-core";
const axeSource = fs.readFileSync("./node_modules/axe-core/axe.min.js", "utf8");
const browser = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: "new", args:["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1200 });
const pages = [
  ["plan","http://localhost:3000/report/plan-2027/"],
  ["associations","http://localhost:3000/report/associations/"],
  ["home","http://localhost:3000/"],
  ["youth","http://localhost:3000/report/youth-2026/"],
  ["tech-assets","http://localhost:3000/report/tech-assets/"],
  ["tech-structure","http://localhost:3000/report/tech-structure/"],
  ["topics","http://localhost:3000/topics/"],
];
for (const [name,url] of pages) {
  await page.goto(url, { waitUntil:"networkidle2" });
  await page.addScriptTag({ content: axeSource });
  const res = await page.evaluate(async () => {
    const r = await window.axe.run(document, { runOnly:["wcag2a","wcag2aa","wcag21a","wcag21aa"] });
    return r.violations.map(v=>({id:v.id,nodes:v.nodes.length,targets:v.nodes.slice(0,3).map(n=>n.target[0])}));
  });
  console.log(name, JSON.stringify(res));
}
await browser.close();
