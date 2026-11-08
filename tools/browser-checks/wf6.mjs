// R3.8 (k1601): live check of the reordering by dragging a row, of the header row, and of the plain-language
// step labels. Does not press Save, so the shared policy file is not touched.
import { openGui } from './lab.mjs';
import fs from 'node:fs';

const mod = process.env.PLAYWRIGHT_MODULE || 'playwright';
const { chromium } = await import(mod);

const shots = process.env.SHOTS_DIR || '/home/viz/work/shots';
const out = [];
const say = (line) => { out.push(line); console.log(line); };

const browser = await chromium.launch();
const { page, token } = await openGui({ width: 1440, height: 900 });
page.on('request', (req) => {
  if (req.url().includes('/api/kanban-orch') && req.postData() && req.postData().includes('saveColumns')) {
    say('FAIL a saveColumns request happened: ' + req.url());
  }
});
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
  await page.waitForSelector('.kanban-wf-row', { timeout: 8000 });
  await page.waitForTimeout(500);
}

await openWorkflow();

// 1. header row + no arrow buttons + grip present + plain-language step labels
const head = await page.locator('.kanban-wf-headrow span').allInnerTexts();
say('header labels: ' + JSON.stringify(head.filter(Boolean)));
const arrows = await page.locator(".kanban-wf-row button[title*='Move'], .kanban-wf-row button[aria-label*='Move']").count();
say('arrow buttons in rows (must be 0): ' + arrows);
say('grip per row: ' + (await page.locator('.kanban-wf-row .kanban-wf-grip').count()) + ' rows=' + (await page.locator('.kanban-wf-row').count()));
const stepOptions = await page.locator('.kanban-wf-row .kanban-wf-a-step option').allInnerTexts();
say('step options: ' + JSON.stringify([...new Set(stepOptions)]));
const hint = await page.locator('.kanban-wf-section-sub').allInnerTexts();
say('section hints: ' + JSON.stringify(hint.slice(0, 2)));
await page.screenshot({ path: shots + '/49-workflow-headers.png' });

const titles = async () => page.locator('.kanban-wf-row .kanban-wf-a-name').evaluateAll((els) => els.map((e) => String(e.value).trim()));
const before = await titles();
say('order before: ' + JSON.stringify(before));

// 2. real mouse drag: grab the empty gap between the name field and the role select of row 2 (Ready)
async function gapPoint(rowIndex) {
  const row = page.locator('.kanban-wf-row').nth(rowIndex);
  const name = row.locator('.kanban-wf-a-name');
  const role = row.locator('.kanban-wf-a-role');
  const nb = await name.boundingBox();
  const rb = await role.boundingBox();
  const gb = await row.boundingBox();
  return { x: Math.round((nb.x + nb.width + rb.x) / 2), y: Math.round(gb.y + gb.height / 2), rowBottom: Math.round(gb.y + gb.height) };
}
const src = await gapPoint(1);
const dst = await gapPoint(3);
await page.mouse.move(src.x, src.y);
await page.mouse.down();
await page.mouse.move(src.x + 14, src.y + 4, { steps: 4 });
await page.waitForTimeout(250);
say('dragging class active: ' + (await page.locator('.kanban-wf-row.is-dragging').count()));
await page.mouse.move(src.x + 14, dst.y + 12, { steps: 12 });
await page.waitForTimeout(250);
const line = await page.locator('.kanban-wf-dropline').boundingBox();
const active = await page.locator('.kanban-wf-dropline.is-active').count();
say('dropline visible: ' + active + ' top offset: ' + (line ? Math.round(line.y) : 'none'));
const liveWhileDragging = await page.locator('.kanban-wf-live').innerText();
say('live region while dragging: ' + JSON.stringify(liveWhileDragging));
await page.screenshot({ path: shots + '/50-workflow-dragging.png' });
await page.mouse.move(src.x + 14, dst.y + 14, { steps: 4 });
await page.mouse.up();
await page.waitForTimeout(400);
const after = await titles();
say('order after drag: ' + JSON.stringify(after));
say('drag changed the order: ' + (JSON.stringify(after) !== JSON.stringify(before)));
say('live region after drop: ' + JSON.stringify(await page.locator('.kanban-wf-live').innerText()));
const saveEnabled = await page.locator('.kanban-wf-foot button').last().isEnabled();
say('Save became enabled after drop (dirty): ' + saveEnabled);

// 3. cancel with Escape: drag again, press Escape, order must stay as after the first drop
const beforeEsc = await titles();
const src2 = await gapPoint(0);
const dst2 = await gapPoint(2);
await page.mouse.move(src2.x, src2.y);
await page.mouse.down();
await page.mouse.move(src2.x + 12, dst2.y + 10, { steps: 10 });
await page.waitForTimeout(200);
await page.keyboard.press('Escape');
await page.waitForTimeout(300);
const afterEsc = await titles();
say('Escape cancelled the move (order unchanged): ' + (JSON.stringify(afterEsc) === JSON.stringify(beforeEsc)));
say('live region after cancel: ' + JSON.stringify(await page.locator('.kanban-wf-live').innerText()));

// 4. keyboard route: focus the grip of row 1, Space, ArrowDown, Enter
const kbBefore = await titles();
await page.locator('.kanban-wf-row .kanban-wf-grip').nth(0).focus();
await page.keyboard.press('Space');
await page.waitForTimeout(250);
say('keyboard grab shows dropline: ' + (await page.locator('.kanban-wf-dropline.is-active').count()));
await page.keyboard.press('ArrowDown');
await page.waitForTimeout(200);
say('live after ArrowDown: ' + JSON.stringify(await page.locator('.kanban-wf-live').innerText()));
await page.keyboard.press('Enter');
await page.waitForTimeout(300);
const kbAfter = await titles();
say('keyboard move changed the order: ' + (JSON.stringify(kbAfter) !== JSON.stringify(kbBefore)) + ' -> ' + JSON.stringify(kbAfter));

// 5. text editing is not a drag: click inside the name field and select text, nothing must move
const guardBefore = await titles();
const nameBox = await page.locator('.kanban-wf-row .kanban-wf-a-name').nth(1).boundingBox();
await page.mouse.move(nameBox.x + 20, nameBox.y + nameBox.height / 2);
await page.mouse.down();
await page.mouse.move(nameBox.x + 90, nameBox.y + nameBox.height / 2, { steps: 8 });
await page.mouse.up();
await page.waitForTimeout(300);
say('text selection did not reorder: ' + (JSON.stringify(await titles()) === JSON.stringify(guardBefore)));
say('dragging class after a selection attempt: ' + (await page.locator('.kanban-wf-row.is-dragging').count()));

// 6. close with unsaved changes -> confirmation bar, discard closes without a save call
await page.locator('.kanban-wf-head button').last().click();
await page.waitForTimeout(400);
const bar = await page.locator('.kanban-wf-close').count();
say('unsaved-changes bar shown on close: ' + (bar > 0));
if (bar) {
  await page.locator('.kanban-wf-close button').first().click();
  await page.waitForTimeout(400);
}
say('panel closed: ' + ((await page.locator('.kanban-wf').count()) === 0));

// 7. narrow window: header labels still aligned and visible, no horizontal scroll
await page.setViewportSize({ width: 900, height: 720 });
await page.waitForTimeout(500);
await openWorkflow();
const headNarrow = await page.locator('.kanban-wf-headrow span').allInnerTexts();
say('narrow header labels: ' + JSON.stringify(headNarrow.filter(Boolean)));
const scroll = await page.evaluate(() => ({
  bodyScrollsX: document.documentElement.scrollWidth > document.documentElement.clientWidth,
  panelScrollX: (() => { const b = document.querySelector('.kanban-wf-body'); return !!b && b.scrollWidth > b.clientWidth; })(),
  panelFitsViewport: (() => { const el = document.querySelector('.kanban-wf'); if (!el) return false; const r = el.getBoundingClientRect(); return r.left >= 0 && r.right <= window.innerWidth + 1 && r.bottom <= window.innerHeight + 1; })(),
}));
say('narrow layout: ' + JSON.stringify(scroll));
await page.screenshot({ path: shots + '/51-workflow-900px.png' });
await page.locator('.kanban-wf-head button').last().click();
await page.waitForTimeout(400);
if (await page.locator('.kanban-wf-close').count()) await page.locator('.kanban-wf-close button').first().click();
await page.waitForTimeout(300);

fs.writeFileSync(shots + '/wf6-result.txt', out.join('\n') + '\n');
say('saved ' + shots + '/wf6-result.txt');
await browser.close();
