import fs from "fs";
import puppeteer from "puppeteer-core";
const axeSource = fs.readFileSync("./node_modules/axe-core/axe.min.js", "utf8");
const browser = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: "new", args:["--no-sandbox", "--hide-scrollbars"] });
const page = await browser.newPage();
const errors = [];
page.on("console", m => { if (m.type() === "error") errors.push(m.text()); });
page.on("pageerror", e => errors.push(e.message));
await page.setViewport({ width: 1440, height: 1200 });
await page.goto("http://localhost:3000/report/plan-2027/", { waitUntil: "networkidle2" });
await new Promise(r => setTimeout(r, 500));
const read = () => page.evaluate(() => {
  const lib = document.querySelector("[aria-label='قائمة المشاريع']");
  const planner = document.querySelector("[class*='planner']");
  const staff = [...document.querySelectorAll("[class*='role']")].map(e=>e.textContent?.replace(/\s+/g," ").trim());
  return {
    stats: [...document.querySelectorAll("[id='plan-summary'] [class*='statValue']")].map(e=>e.textContent),
    planCards: document.querySelectorAll("[class*='planCards'] [class*='projectCard']").length,
    libraryCards: document.querySelectorAll("[class*='libraryList'] [class*='projectCard']").length,
    emptyPlan: !!document.querySelector("[class*='emptyPlan']"),
    emptyLibrary: document.querySelector("[class*='emptyLibrary']")?.textContent,
    addAllClass: [...document.querySelectorAll("button")].find(b=>b.textContent?.includes("أضف الكل"))?.className,
    addAllText: [...document.querySelectorAll("button")].find(b=>b.textContent?.includes("أضف الكل"))?.textContent,
    staff,
    lib: lib ? { w: Math.round(lib.getBoundingClientRect().width), h: Math.round(lib.getBoundingClientRect().height) } : null,
    plan: planner ? { w: Math.round(planner.getBoundingClientRect().width), h: Math.round(planner.getBoundingClientRect().height) } : null,
  };
});
console.log("INITIAL", JSON.stringify(await read(), null, 2));
await page.screenshot({ path: "/tmp/plan-empty-1440.png", fullPage: true });
// add all
for (const b of await page.$$("button")) { const t = await page.evaluate(el=>el.textContent,b); if (t?.includes("أضف الكل")) { await b.click(); break; } }
await new Promise(r=>setTimeout(r,200));
console.log("ADD ALL", JSON.stringify(await read(), null, 2));
await page.screenshot({ path: "/tmp/plan-all-1440.png", fullPage: true });
// empty
for (const b of await page.$$("button")) { const t = await page.evaluate(el=>el.textContent,b); if (t?.includes("إفراغ الخطة")) { await b.click(); break; } }
await new Promise(r=>setTimeout(r,150));
// add first library card
for (const b of await page.$$("button")) { const t = await page.evaluate(el=>el.textContent,b); if (t?.includes("أضف إلى الخطة")) { await b.click(); break; } }
await new Promise(r=>setTimeout(r,150));
console.log("ADD ONE", JSON.stringify(await read(), null, 2));
// remove via plan x
await page.click("[class*='planCards'] [class*='removeButton']");
await new Promise(r=>setTimeout(r,150));
console.log("REMOVE ONE", JSON.stringify(await read(), null, 2));
// drag library -> plan
await page.evaluate(() => {
  const item = document.querySelector("[class*='libraryList'] [class*='projectCard']");
  const dt = new DataTransfer(); window.__dt = dt;
  item.dispatchEvent(new DragEvent("dragstart", { bubbles:true, cancelable:true, dataTransfer:dt }));
});
await new Promise(r=>setTimeout(r,150));
await page.evaluate(() => {
  const plan = document.querySelector("[class*='dropZone']");
  const dt = window.__dt;
  plan.dispatchEvent(new DragEvent("dragenter", { bubbles:true, cancelable:true, dataTransfer:dt }));
  plan.dispatchEvent(new DragEvent("dragover", { bubbles:true, cancelable:true, dataTransfer:dt }));
  plan.dispatchEvent(new DragEvent("drop", { bubbles:true, cancelable:true, dataTransfer:dt }));
});
await new Promise(r=>setTimeout(r,200));
console.log("DRAG LIB→PLAN", JSON.stringify(await read(), null, 2));
// drag plan -> library
await page.evaluate(() => {
  const item = document.querySelector("[class*='planCards'] [class*='projectCard']");
  const dt = new DataTransfer(); window.__dt2 = dt;
  item.dispatchEvent(new DragEvent("dragstart", { bubbles:true, cancelable:true, dataTransfer:dt }));
});
await new Promise(r=>setTimeout(r,150));
await page.evaluate(() => {
  const lib = document.querySelector("[aria-label='قائمة المشاريع']");
  const dt = window.__dt2;
  lib.dispatchEvent(new DragEvent("dragenter", { bubbles:true, cancelable:true, dataTransfer:dt }));
  lib.dispatchEvent(new DragEvent("dragover", { bubbles:true, cancelable:true, dataTransfer:dt }));
  lib.dispatchEvent(new DragEvent("drop", { bubbles:true, cancelable:true, dataTransfer:dt }));
});
await new Promise(r=>setTimeout(r,200));
console.log("DRAG PLAN→LIB", JSON.stringify(await read(), null, 2));
console.log("ERRORS", errors);
await page.addScriptTag({ content: axeSource });
console.log("AXE", JSON.stringify(await page.evaluate(async () => (await window.axe.run(document, { runOnly: ["wcag2a","wcag2aa","wcag21a","wcag21aa"] })).violations.map(v=>({id:v.id,nodes:v.nodes.length})))));
const mobile = await browser.newPage();
await mobile.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
await mobile.goto("http://localhost:3000/report/plan-2027/", { waitUntil: "networkidle2" });
await new Promise(r=>setTimeout(r,300));
await mobile.screenshot({ path: "/tmp/plan-final-390.png", fullPage: true });
console.log("MOBILE OVERFLOW", await mobile.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth));
await page.pdf({ path: "/tmp/plan-final-detail2.pdf", format: "A4", printBackground: true, margin: { top: "16mm", right: "15mm", bottom: "16mm", left: "15mm" } });
await page.goto("http://localhost:3000/print/", { waitUntil: "networkidle2" });
await page.pdf({ path: "/tmp/plan-final-full2.pdf", format: "A4", printBackground: true, margin: { top: "16mm", right: "15mm", bottom: "16mm", left: "15mm" } });
await browser.close();
