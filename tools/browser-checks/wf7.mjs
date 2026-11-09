// R3.8c (k1601): accessible names of every control in the Workflow panel, and the panel still behaves.
// Does not press Save, so the shared policy file is not touched.
import { openGui } from './lab.mjs';

const mod = process.env.PLAYWRIGHT_MODULE || 'playwright';
const { chromium } = await import(mod);

const out = [];
const say = (line) => { out.push(line); console.log(line); };

const browser = await chromium.launch();
const { page } = await openGui({ width: 1440, height: 900 });
page.on('request', (req) => {
  if (req.url().includes('/api/kanban-orch') && (req.postData() || '').includes('saveColumns')) {
    say('FAIL a saveColumns request happened');
  }
});
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
await page.waitForTimeout(700);

const controls = await page.locator('.kanban-wf input, .kanban-wf select, .kanban-wf button, .kanban-wf [role="button"]').evaluateAll((els) =>
  els.map((el) => ({
    tag: el.tagName.toLowerCase(),
    type: el.getAttribute('type') || '',
    role: el.getAttribute('role') || '',
    aria: el.getAttribute('aria-label') || null,
    name: (el.getAttribute('aria-label') || el.labels && el.labels[0] && el.labels[0].textContent || el.textContent || '').trim().slice(0, 40),
    area: el.className || '',
  })),
);

const noName = controls.filter((c) => !c.name);
const explicit = controls.filter((c) => c.aria);
say('controls in the panel: ' + controls.length);
say('controls with an explicit aria-label: ' + explicit.length);
say('controls with no accessible name at all: ' + noName.length + (noName.length ? ' -> ' + JSON.stringify(noName) : ''));

const wip = controls.find((c) => c.tag === 'input' && c.type === 'number');
say('WIP limit field: aria-label ' + JSON.stringify(wip && wip.aria));
const pulls = controls.filter((c) => c.tag === 'select' && (c.name || '').toLowerCase().includes('pull'));
say('Pull order select: ' + JSON.stringify(pulls.map((c) => c.aria)));
const switches = controls.filter((c) => c.tag === 'input' && c.type === 'checkbox');
say('switch inputs (' + switches.length + ') aria-labels: ' + JSON.stringify(switches.map((c) => c.aria)));
say('pull order options: ' + JSON.stringify(await page.locator('.kanban-wf select').nth(1).locator('option').evaluateAll((o) => o.map((x) => x.textContent.trim()))));

// The panel must still work after the change: a drag is started and cancelled with Escape, nothing is saved.
const row = page.locator('.kanban-wf-row').nth(1);
const box = await row.boundingBox();
await page.mouse.move(box.x + box.width * 0.62, box.y + box.height / 2);
await page.mouse.down();
await page.mouse.move(box.x + box.width * 0.62, box.y + box.height / 2 - 60, { steps: 8 });
const draggingMid = await page.locator('.kanban-wf-row.is-dragging').count();
await page.keyboard.press('Escape');
await page.mouse.up();
await page.waitForTimeout(400);
say('drag states: is-dragging=' + draggingMid + ' droplineActive=' + await page.locator('.kanban-wf-dropline.is-active').count());
const names = await page.locator('.kanban-wf-a-name').evaluateAll((els) => els.map((e) => e.value));
say('order after the cancelled drag: ' + JSON.stringify(names));
const saveDisabled = await page.locator('.kanban-wf button').filter({ hasText: /Save|Сохранить/ }).first().isDisabled().catch(() => null);
say('Save still disabled after the cancel: ' + saveDisabled);

await browser.close();
