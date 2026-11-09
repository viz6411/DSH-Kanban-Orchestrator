// R3.9 follow-up: which node actually dies when a name is edited — the whole row, or only the input?
// Marks every row and every name field, types one key at a time, and dumps the surviving markers in DOM order.
import { openGui } from './lab.mjs';

const mod = process.env.PLAYWRIGHT_MODULE || 'playwright';
const { chromium } = await import(mod);
const out = [];
const say = (line) => { out.push(line); console.log(line); };

const browser = await chromium.launch();
const { page } = await openGui({ width: 1440, height: 900 });
await page.waitForTimeout(2000);
if ((await page.locator('.kanban-toolbar').count()) === 0) {
  await page.locator('[aria-label="Board"]').first().click();
  await page.waitForSelector('.kanban-toolbar button', { timeout: 10000 });
  await page.waitForTimeout(1200);
}
await page.locator('.kanban-toolbar button').nth(1).click();
await page.waitForTimeout(600);
await page.locator('[role="menuitem"]').filter({ hasText: /Workflow|Конвейер/i }).first().click();
await page.waitForSelector('.kanban-wf-row', { timeout: 10000 });
await page.waitForTimeout(800);

const snapshot = () => page.evaluate(() => {
  const rows = Array.from(document.querySelectorAll('.kanban-wf-row')).map((r) => (r.dataset.probeRow || '?') + ':' + (r.querySelector('.kanban-wf-a-name') || {}).value);
  const live = Array.from(document.querySelectorAll('.kanban-wf-a-name')).map((i) => i.dataset.probeIn || '?');
  const act = document.activeElement;
  return {
    rows: rows.join(' '),
    inputs: 'inputs=' + live.join(' '),
    active: act ? (act.className || act.tagName) + (act.dataset && act.dataset.probeIn ? '/' + act.dataset.probeIn : '') : 'none',
  };
});

async function mark() {
  await page.evaluate(() => {
    Array.from(document.querySelectorAll('.kanban-wf-row')).forEach((r, i) => { r.dataset.probeRow = 'r' + i; const f = r.querySelector('.kanban-wf-a-name'); if (f) f.dataset.probeIn = 'i' + i; });
  });
}
await mark();
say('marked: ' + JSON.stringify(await snapshot()));

for (const idx of [0, 1, 3]) {
  const input = page.locator('.kanban-wf-a-name').nth(idx);
  const before = await input.inputValue();
  await input.click();
  await input.press('End');
  say(`row ${idx + 1} (value "${before}") clicked, caret in ${(await page.evaluate(() => document.activeElement.className))}`);
  for (const key of ['a', 'b']) {
    await page.keyboard.press(key);
    await page.waitForTimeout(160);
    const s = await snapshot();
    const val = await page.evaluate((i) => (document.querySelectorAll('.kanban-wf-a-name')[i] || {}).value, idx);
    say(`  after '${key}' on row ${idx + 1}: value="${val}" | ${s.rows} | ${s.inputs} | active=${s.active}`);
  }
  await mark();
}
await page.keyboard.press('Escape');
await page.waitForTimeout(400);
const btn = page.locator('button').filter({ hasText: /Discard|Сбросить/ }).first();
if (await btn.isVisible().catch(() => false)) { await btn.click(); await page.waitForTimeout(500); }
say('closed, rows left: ' + await page.locator('.kanban-wf-row').count());
await browser.close();
