// k1601 / R3.9c (mandated proof for F1): for every row and every boundary the live promise and the DOM landing
// are measured. They must be equal, or there must be no promise at all. Keyboard route is re-checked too.
// Offsets are relative to the dragged row; "above the table" / "below the table" are outside the whole band.
import { openGui } from './lab.mjs'

const log = (k, v) => console.log(k + ': ' + JSON.stringify(v))
const { browser, page } = await openGui({ width: 1440, height: 900 })

const openPanel = async () => {
  await page.locator('[aria-label="Board"]').first().click()
  await page.waitForTimeout(4500)
  const idx = await page.evaluate(() => [...document.querySelectorAll('.kanban-toolbar button')]
    .findIndex((b) => /settings|настрой/i.test((b.getAttribute('title') || '') + (b.getAttribute('aria-label') || '') + (b.textContent || ''))))
  await page.locator('.kanban-toolbar button').nth(idx).click()
  await page.waitForTimeout(1500)
  await page.locator('[role="menuitem"]').filter({ hasText: /Workflow|Конвейер/i }).first().click()
  await page.waitForTimeout(3500)
  await page.waitForSelector('.kanban-wf-row', { timeout: 15000 })
}

const geo = () => page.evaluate(() => [...document.querySelectorAll('.kanban-wf-row')].map((r, i) => {
  const b = r.getBoundingClientRect()
  return { i, name: r.querySelector('input').value, top: Math.round(b.y), bottom: Math.round(b.bottom) }
}))
const names = () => page.evaluate(() => [...document.querySelectorAll('.kanban-wf-row input')].map((x) => x.value))
const liveLast = () => page.evaluate(() => [...document.querySelectorAll('.kanban-wf [aria-live]')]
  .map((e) => (e.textContent || '').replace(/\s+/g, ' ').trim()).filter(Boolean))
const activeLines = () => page.evaluate(() => [...document.querySelectorAll('.kanban-wf-dropline')]
  .filter((d) => d.classList.contains('is-active')).map((d) => Math.round(d.getBoundingClientRect().y)))

let fails = 0
let cases = 0

async function dragTo(fromIndex, targetY, label) {
  const rows = await geo()
  const moving = rows[fromIndex].name
  const grip = await page.evaluate((i) => {
    const el = [...document.querySelectorAll('.kanban-wf-row')][i].querySelector('.kanban-wf-grip, .kanban-wf-a-grip').getBoundingClientRect()
    return { x: Math.round(el.x + el.width / 2), y: Math.round(el.y + el.height / 2) }
  }, fromIndex)
  await page.mouse.move(grip.x, grip.y)
  await page.mouse.down()
  for (let s = 1; s <= 12; s++) {
    await page.mouse.move(grip.x, grip.y + ((targetY - grip.y) * s) / 12)
    await page.waitForTimeout(60)
  }
  // Chromium delivers dragover with a coalesced lag on a long jump. A human pauses and jitters the pointer
  // before releasing; the same small final movements are made here so that the measured promise is the promise
  // the panel actually had on screen when the button was released.
  for (const dy of [-2, 0, 1]) {
    await page.mouse.move(grip.x, targetY + dy)
    await page.waitForTimeout(160)
  }
  await page.waitForTimeout(400)
  const live = (await liveLast()).slice(-1)[0] || ''
  const m = live.match(/position (\d+) of (\d+)/)
  const promised = m ? Number(m[1]) : null
  const lines = await activeLines()
  await page.mouse.up()
  await page.waitForTimeout(450)
  const after = await names()
  const landed = after.indexOf(moving) + 1
  const afterLive = (await liveLast()).slice(-1)[0] || ''
  const outcome = /moved/.test(afterLive) ? 'moved' : 'cancelled'
  const afterMatch = afterLive.match(/moved to position (\d+)/)
  const announcedAfter = afterMatch ? Number(afterMatch[1]) : null
  const ok = promised === null || promised === landed
  const saidTrue = announcedAfter === null || announcedAfter === landed
  cases++
  if (!ok || !saidTrue) fails++
  log(label, { moving, promised, activeLine: lines, landed, outcome, announcedAfter, ok: ok && saidTrue })
  return ok
}

try {
  await openPanel()
  const rows = await geo()
  const firstTop = rows[0].top
  const lastBottom = rows[rows.length - 1].bottom
  log('geometry', { rows: rows.map((r) => `${r.name} ${r.top}-${r.bottom}`), firstTop, lastBottom })

  // Every row, every mandated boundary.
  for (let i = 0; i < rows.length; i++) {
    const r = rows[i]
    const points = [
      [r.top - 10, 'above its top edge -10px'],
      [r.top - 6, 'above its top edge -6px'],
      [r.top - 1, 'above its top edge -1px'],
      [r.top + 2, 'inside near the top edge'],
      [r.bottom - 2, 'inside near the bottom edge'],
      [r.bottom + 1, 'below its bottom edge +1px'],
      [r.bottom + 2, 'below its bottom edge +2px'],
      [r.bottom + 6, 'below its bottom edge +6px'],
      [r.bottom + 10, 'below its bottom edge +10px'],
      [lastBottom + 5, 'below the whole table'],
      [firstTop - 5, 'above the whole table'],
    ]
    for (const [y, tag] of points) await dragTo(i, y, `row ${i} (${r.name}) -> ${tag}`)
  }

  // Keyboard regression: grab with Space, move down with an arrow, commit with Enter.
  const before = await names()
  const gripHandle = await page.locator('.kanban-wf-grip, .kanban-wf-a-grip').nth(2)
  await gripHandle.focus()
  await page.keyboard.press('Space')
  await page.waitForTimeout(200)
  const grabLive = (await liveLast()).slice(-1)[0] || ''
  const grabLines = await activeLines()
  await page.keyboard.press('ArrowDown')
  await page.waitForTimeout(200)
  const kbLive = (await liveLast()).slice(-1)[0] || ''
  const kbMatch = kbLive.match(/position (\d+) of (\d+)/)
  const kbPromised = kbMatch ? Number(kbMatch[1]) : null
  await page.keyboard.press('Enter')
  await page.waitForTimeout(350)
  const after = await names()
  const kbLanded = after.indexOf(before[2]) + 1
  log('keyboard', { grabbed: before[2], grabLive, grabActiveLine: grabLines, promised: kbPromised, landed: kbLanded, ok: kbPromised === kbLanded })
  if (kbPromised !== kbLanded) fails++

  log('SUMMARY', { cases, failures: fails })
} catch (e) {
  log('ERROR', String(e).slice(0, 300))
} finally {
  // The draft is never saved: the shared policy file stays byte-identical.
  try {
    const closeBtn = await page.locator('[aria-label="Close"], .kanban-wf [aria-label="Close"]').first()
    await closeBtn.click()
    await page.waitForTimeout(400)
    const discard = page.locator('button').filter({ hasText: /Discard|Сбросить/ }).first()
    if (await discard.count()) await discard.click()
  } catch (ignored) {}
  await browser.close()
}
