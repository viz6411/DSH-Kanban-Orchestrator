// R3.9: the column table without the per-row step select, and the two settings that replaced it.
import { openGui } from './lab.mjs';
import fs from 'node:fs';

const mod = process.env.PLAYWRIGHT_MODULE || 'playwright';
const { chromium } = await import(mod);
const shots = process.env.SHOTS_DIR || '/home/viz/work/shots';
const out = [];
const say = (line) => { out.push(line); console.log(line); };

const browser = await chromium.launch();
const { page } = await openGui({ width: 1440, height: 900 });
await page.waitForTimeout(2000);
async function openWorkflow() {
  if ((await page.locator('.kanban-toolbar').count()) === 0) {
    await page.locator('[aria-label="Board"]').first().click();
    await page.waitForSelector('.kanban-toolbar button', { timeout: 10000 });
    await page.waitForTimeout(1200);
  }
  await page.locator('.kanban-toolbar button').nth(1).click();
  await page.waitForTimeout(600);
  await page.locator('[role="menuitem"]').filter({ hasText: /Workflow|Конвейер/i }).first().click();
  await page.waitForSelector('.kanban-wf-row', { timeout: 10000 });
  await page.waitForTimeout(700);
}
async function discard() {
  await page.keyboard.press('Escape');
  await page.waitForTimeout(400);
  const btn = page.locator('button').filter({ hasText: /Discard|Сбросить/ }).first();
  if (await btn.isVisible().catch(() => false)) { await btn.click(); await page.waitForTimeout(500); }
}
const liveText = async () => (await page.locator('.kanban-wf-live').textContent().catch(() => '') || '').trim();
const names = async () => page.locator('.kanban-wf-a-name').evaluateAll((e) => e.map((x) => x.value));

await openWorkflow();
say('headers: ' + JSON.stringify(await page.locator('.kanban-wf-headrow span').evaluateAll((e) => e.map((x) => x.textContent.trim()).filter(Boolean))));
say('step selects in the table: ' + await page.locator('.kanban-wf-a-step').count() + ' | name fields: ' + await page.locator('.kanban-wf-a-name').count() + ' | role selects: ' + await page.locator('.kanban-wf-a-role').count());
const picks = page.locator('.kanban-wf-picks select');
say('the two settings: ' + JSON.stringify(await picks.evaluateAll((e) => e.map((x) => ({ label: x.getAttribute('aria-label'), value: x.value, options: x.querySelectorAll('option').length })))));
await page.screenshot({ path: shots + '/52-workflow-two-settings.png' });

// Typing still works after the table lost a column.
for (const idx of [1, 3]) {
  const input = page.locator('.kanban-wf-a-name').nth(idx);
  const before = await input.inputValue();
  await input.click(); await input.press('End');
  await input.pressSequentially('qz', { delay: 70 });
  await page.waitForTimeout(250);
  const after = await input.inputValue();
  say(`typing row ${idx + 1}: "${before}" -> "${after}" expected "${before}qz"`);
}
await discard();

// A grab still reorders, and the promised position is where the row lands.
await openWorkflow();
const grip = page.locator('.kanban-wf-a-grip').nth(1);
await grip.focus();
await page.keyboard.press(' ');
await page.waitForTimeout(250);
await page.keyboard.press('ArrowDown');
await page.waitForTimeout(180);
await page.keyboard.press('ArrowDown');
await page.waitForTimeout(180);
const promised = await liveText();
await page.keyboard.press('Enter');
await page.waitForTimeout(500);
const done = await liveText();
const order = await names();
const landed = order.indexOf('Ready') + 1;
const promisedN = Number((promised.match(/position (\d+)/) || [])[1] || -1);
say(`grab: "${promised}" -> "${done}" | order ${JSON.stringify(order)} | promised ${promisedN} landed ${landed} -> ${promisedN === landed ? 'MATCH' : 'MISMATCH'}`);
await discard();

// The narrow layout: the remaining header labels must stay on one line.
for (const [w, h, tag] of [[1440, 900, 'wide'], [900, 720, 'narrow'], [760, 720, 'narrower']]) {
  await page.setViewportSize({ width: w, height: h });
  await openWorkflow();
  const head = await page.locator('.kanban-wf-headrow span').evaluateAll((els) => els
    .filter((e) => e.textContent.trim())
    .map((e) => ({ t: e.textContent.trim(), w: Math.round(e.getBoundingClientRect().width), lines: e.getClientRects().length, clipped: e.scrollWidth > e.clientWidth + 1 })));
  const panel = await page.locator('.kanban-wf').boundingBox();
  const overflow = await page.locator('.kanban-wf-headrow').evaluateAll((els) => els.map((e) => e.scrollWidth > e.clientWidth + 1)[0]);
  say(`${tag} ${w}x${h}: panel ${Math.round(panel.width)}px headers ${JSON.stringify(head)} rowOverflow ${overflow}`);
  if (tag === 'narrow') await page.screenshot({ path: shots + '/53-workflow-900px.png' });
  await discard();
}

// Accessible names of everything in the panel.
await openWorkflow();
const controls = await page.locator('.kanban-wf input, .kanban-wf select, .kanban-wf button, .kanban-wf [role="button"]').evaluateAll((els) => els.map((el) => ({
  tag: el.tagName.toLowerCase(), aria: el.getAttribute('aria-label') || null,
  name: (el.getAttribute('aria-label') || (el.labels && el.labels[0] && el.labels[0].textContent) || el.textContent || '').trim(),
})));
say(`controls ${controls.length} | explicit aria-label ${controls.filter((c) => c.aria).length} | without a name ${controls.filter((c) => !c.name).length}`);
await discard();
await browser.close();
