// R3.9 follow-up: character-by-character typing probe. Marks the input node, types one key at a time, and
// reports after every key what the value is, whether the same DOM node is still there, and where the caret is.
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

for (const idx of [1, 3]) {
  const sel = `.kanban-wf-a-name`;
  const input = page.locator(sel).nth(idx);
  await input.evaluate((el) => { el.dataset.probe = 'alive'; });
  await input.click();
  await input.press('End');
  say(`row ${idx + 1} start value "${await input.inputValue()}"`);
  for (const key of ['a', 'b', 'c']) {
    await page.keyboard.press(key);
    await page.waitForTimeout(140);
    const state = await page.evaluate(({ s, idx }) => {
      const el = document.querySelectorAll(s)[idx];
      const act = document.activeElement;
      return {
        value: el ? el.value : '(field gone)',
        sameNode: !!(el && el.dataset.probe === 'alive'),
        caretInField: !!(act && act.classList && act.classList.contains('kanban-wf-a-name')),
        active: act ? (act.className || act.tagName) : 'none',
        selectionStart: el && act === el ? el.selectionStart : null,
      };
    }, { s: sel, idx });
    say(`  after '${key}': value "${state.value}" sameNode=${state.sameNode} caret=${state.caretInField} pos=${state.selectionStart} active=${state.active}`);
  }
}
await page.keyboard.press('Escape');
await page.waitForTimeout(400);
const btn = page.locator('button').filter({ hasText: /Discard|Сбросить/ }).first();
if (await btn.isVisible().catch(() => false)) { await btn.click(); await page.waitForTimeout(500); }
say('closed, rows left in the panel: ' + await page.locator('.kanban-wf-row').count());
await browser.close();
