// R3.8e: proof for the reviewer's B1 (typing into a column name) and I-4 (the live position text during a drag).
// A and B never press Save. C does, and the policy file is restored from a copy right after by the runner.
import { openGui } from './lab.mjs';

const mod = process.env.PLAYWRIGHT_MODULE || 'playwright';
const { chromium } = await import(mod);

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
  const seen = await btn.isVisible().catch(() => false);
  if (seen) { await btn.click(); await page.waitForTimeout(600); }
  say('closed with Discard changes: ' + seen + ' | panel open after: ' + await page.locator('.kanban-wf-row').count());
}
const liveText = async () => (await page.locator('.kanban-wf-live').textContent().catch(() => '') || '').trim();
const orderNames = async () => page.locator('.kanban-wf-a-name').evaluateAll((els) => els.map((e) => e.value));

// A. the blocker: type into the 2nd and 4th column fields, character by character, as a person does.
await openWorkflow();
say('initial order: ' + JSON.stringify(await orderNames()));
for (const idx of [1, 3]) {
  const input = page.locator('.kanban-wf-a-name').nth(idx);
  const before = await input.inputValue();
  await input.click();
  await input.press('End');
  await input.pressSequentially('qz', { delay: 70 });
  await page.waitForTimeout(250);
  const after = await input.inputValue();
  const focus = await page.evaluate(() => {
    const el = document.activeElement;
    return el ? (el.className || el.tagName) + (el.classList && el.classList.contains('kanban-wf-a-name') ? ' (name field)' : '') : 'none';
  });
  say(`A row ${idx + 1}: "${before}" typed qz -> "${after}" expected "${before}qz" caret in ${focus}`);
}
await discard();

// B. a real drag downward: the position promised while hovering must be the position the row lands in.
await openWorkflow();
const row = page.locator('.kanban-wf-row').nth(1);
const b1 = await row.boundingBox();
const under = page.locator('.kanban-wf-row').nth(4);
const b3 = await under.boundingBox();
const nameBox = await page.locator('.kanban-wf-a-name').nth(1).boundingBox();
const grabX = nameBox.x - 12;
const grabY = nameBox.y + nameBox.height / 2;
await page.mouse.move(grabX, grabY);
await page.mouse.down();
await page.mouse.move(grabX, grabY - 6, { steps: 4 });
const dragging = await page.locator('.kanban-wf-row.is-dragging').count();
await page.mouse.move(b3.x + 819, b3.y + b3.height + 2, { steps: 12 });
await page.waitForTimeout(260);
const liveHover = await liveText();
await page.mouse.up();
await page.waitForTimeout(500);
const liveEnd = await liveText();
const names = await orderNames();
const landed = names.indexOf('Ready') + 1;
const promised = Number((liveHover.match(/position (\d+)/) || [])[1] || -1);
say('B dragging rows: ' + dragging + ' | hover text: ' + liveHover);
say('B drop text: ' + liveEnd + ' | order: ' + JSON.stringify(names));
say('B promised position ' + promised + ' vs landed position ' + landed + ' -> ' + (promised === landed ? 'MATCH' : 'MISMATCH'));
await discard();

// B2. the same question through the keyboard grab, where geometry cannot drift: the position promised by the
// arrow keys must be the position Enter puts the row in.
await openWorkflow();
const grip = page.locator('.kanban-wf-a-grip').nth(1);
await grip.focus();
await page.keyboard.press(' ');
await page.waitForTimeout(300);
const started = await liveText();
await page.keyboard.press('ArrowDown');
await page.waitForTimeout(200);
const first = await liveText();
await page.keyboard.press('ArrowDown');
await page.waitForTimeout(200);
const second = await liveText();
await page.keyboard.press('Enter');
await page.waitForTimeout(500);
const done = await liveText();
const kbNames = await orderNames();
const kbLanded = kbNames.indexOf('Ready') + 1;
const kbPromised = Number((second.match(/position (\d+)/) || [])[1] || -1);
say('B2 keyboard grab: start "' + started + '" -> arrow down "' + first + '" -> "' + second + '" -> enter "' + done + '"');
say('B2 order: ' + JSON.stringify(kbNames) + ' | promised ' + kbPromised + ' vs landed ' + kbLanded + ' -> ' + (kbPromised === kbLanded ? 'MATCH' : 'MISMATCH'));
await discard();

// C. the model field: type "provider/model", save, and let the runner read it back from the host.
await openWorkflow();
const model = page.locator('input[aria-label="Model"]');
say('C model field present: ' + await model.count() + ' placeholder ' + JSON.stringify(await model.getAttribute('placeholder')));
await model.fill('acme/test-model');
await page.waitForTimeout(300);
const saveBtn = page.locator('button').filter({ hasText: /Save|Сохранить/ }).first();
say('C Save enabled after the edit: ' + !(await saveBtn.isDisabled().catch(() => true)));
await saveBtn.click();
await page.waitForTimeout(1200);
const reloadBtn = page.locator('button').filter({ hasText: /Reload|Обновить|Discard/ }).first();
if (await reloadBtn.isVisible().catch(() => false)) { await reloadBtn.click(); await page.waitForTimeout(700); }
const shown = await page.locator('input[aria-label="Model"]').inputValue().catch(() => 'panel closed');
say('C model field after the save round trip: ' + JSON.stringify(shown));
await page.keyboard.press('Escape');
await page.waitForTimeout(400);
const btn = page.locator('button').filter({ hasText: /Discard|Сбросить/ }).first();
if (await btn.isVisible().catch(() => false)) await btn.click();
await browser.close();
