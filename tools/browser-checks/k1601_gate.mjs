// k1601 / R3.9c: the screen must refuse a bad Model value and a fractional WIP limit BEFORE a request is sent,
// and show the reason. Typing is done character by character with the node identity checked after every key
// (fill() and fast pressSequentially are not accepted evidence in this environment).
import { openGui } from './lab.mjs'

const log = (k, v) => console.log(k + ': ' + JSON.stringify(v))
const { browser, page, context } = await openGui({ width: 1440, height: 900 })

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

let saveCalls = 0
context.on('request', (r) => {
  if (r.method() === 'POST' && /api\/kanban-orch/.test(r.url())) {
    try { if (JSON.parse(r.postData() || '{}').method === 'saveColumns') saveCalls++ } catch (ignored) {}
  }
})

// One value typed key by key; the field must stay the same DOM node and keep the caret after every character.
async function typeInto(field, text) {
  await field.click()
  await page.keyboard.press('Control+A')
  await page.keyboard.press('Delete')
  const node = await field.evaluateHandle((el) => el)
  const out = []
  for (const ch of text) {
    await page.keyboard.press(ch === ' ' ? 'Space' : ch)
    await page.waitForTimeout(170)
    out.push(await field.evaluate((el) => ({ v: el.value, caret: [el.selectionStart, el.selectionEnd] })))
    const sameNode = await page.evaluate((el) => document.contains(el), node)
    if (!sameNode) out.push({ lostNode: true })
  }
  return out
}

const errText = () => page.evaluate(() => { const e = document.querySelector('.kanban-wf-error[role="alert"]'); return e ? (e.textContent || '').trim() : null })
const save = async () => {
  // A disabled Save button IS the block: nothing is clicked and nothing is sent.
  const btn = page.locator('button').filter({ hasText: /Save for all boards|Сохранить/ }).first()
  if (!(await btn.count())) return { clicked: false, disabled: null }
  const disabled = await btn.isDisabled()
  if (disabled) return { clicked: false, disabled: true }
  await btn.click()
  await page.waitForTimeout(700)
  return { clicked: true, disabled: false }
}

let fails = 0
try {
  await openPanel()

  // Model: three broken shapes, then a legal a/b/c.
  for (const bad of ['noseparator', 'acme/', '/model']) {
    const modelField = page.locator('input[aria-label="Model"], input[placeholder="provider/model"]').first()
    const typed = await typeInto(modelField, bad)
    const before = saveCalls
    const state = await save()
    const msg = await errText()
    const ok = msg !== null && /provider\/model/.test(msg) && saveCalls === before && typed.every((t) => !t.lostNode)
    if (!ok) fails++
    log('model ' + JSON.stringify(bad), { typedValue: typed[typed.length - 1].v, errorShown: msg, saveButtonDisabled: state.disabled, saveColumnsCalls: saveCalls - before, ok })
  }

  // WIP limit: a fractional value must be refused by the screen before it is sent.
  const wip = page.locator('input[type="number"]').first()
  const step = await wip.getAttribute('step')
  const typedWip = await typeInto(wip, '1.5')
  const beforeWip = saveCalls
  await save()
  const wipMsg = await errText()
  const wipOk = /whole number|целым|整数/.test(wipMsg || '') && saveCalls === beforeWip && step === '1'
  if (!wipOk) fails++
  log('wipLimit 1.5', { typedValue: typedWip[typedWip.length - 1].v, errorShown: wipMsg, stepAttribute: step, saveBlocked: saveCalls === beforeWip, ok: wipOk })

  // A legal value must clear the gate - without ever pressing Save for the good case, so this script cannot
  // touch the shared policy file at all.
  const modelField2 = page.locator('input[aria-label="Model"], input[placeholder="provider/model"]').first()
  await typeInto(modelField2, 'a/b/c')
  const wip2 = page.locator('input[type="number"]').first()
  await typeInto(wip2, '1')
  const cleanMsg = await errText()
  const cleanOk = cleanMsg === null
  if (!cleanOk) fails++
  log('clean panel (not saved)', { modelValue: await modelField2.inputValue(), wipValue: await wip2.inputValue(), errorShown: cleanMsg, saveCalls, ok: cleanOk })

  log('SUMMARY', { failures: fails, saveColumnsRequests: saveCalls })
} catch (e) {
  log('ERROR', String(e).slice(0, 300))
} finally {
  try {
    const discard = page.locator('button').filter({ hasText: /Discard|Сбросить/ }).first()
    if (await discard.count()) await discard.click()
  } catch (ignored) {}
  await browser.close()
}
