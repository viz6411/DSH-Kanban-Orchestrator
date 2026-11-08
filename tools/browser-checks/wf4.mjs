import { openGui } from './lab.mjs'
const shot = (p, name) => p.screenshot({ path: '/home/viz/work/shots/' + name })
const { browser, page } = await openGui({ width: 1440, height: 900 })
const reqs = []
page.on('request', (r) => { if (r.url().includes('/api/kanban')) reqs.push((r.postData() || '').slice(0, 50)) })
const log = (k, v) => console.log(k + ': ' + JSON.stringify(v))
const orch = (m) => reqs.filter((b) => b.includes(m)).length
try {
  await page.locator('[aria-label="Board"]').first().click()
  await page.waitForTimeout(4000)
  await page.locator('.kanban-toolbar button').nth(1).click()
  await page.waitForTimeout(1200)
  log('menu items', await page.locator('[role="menuitem"]').allTextContents())
  await page.locator('[role="menuitem"]').filter({ hasText: /Workflow/i }).first().click()
  await page.waitForTimeout(2500)
  log('panel fits the viewport', await page.evaluate(() => {
    const p = document.querySelector('.kanban-wf'); if (!p) return null
    const cs = getComputedStyle(p); const r = p.getBoundingClientRect(); const b = p.querySelector('.kanban-wf-body')
    return { position: cs.position, height: Math.round(r.height), viewport: window.innerHeight, inside: r.bottom <= window.innerHeight, bodyScrollX: b.scrollWidth > b.clientWidth }
  }))
  await shot(page, '40-workflow-panel.png')
  const rowInputs = page.locator('.kanban-wf-row input')
  const firstName = await rowInputs.nth(0).inputValue()
  await rowInputs.nth(0).fill(await rowInputs.nth(1).inputValue())
  await page.waitForTimeout(500)
  log('duplicate caught while typing', await page.evaluate(() => {
    const p = document.querySelector('.kanban-wf')
    return { invalidRows: p.querySelectorAll('.kanban-wf-row-invalid').length, errorText: (p.querySelector('.kanban-wf-error') || {}).textContent || null, saveDisabled: p.querySelector('.kanban-wf-foot button').disabled }
  }))
  await shot(page, '41-workflow-invalid.png')
  await rowInputs.nth(0).fill(firstName)
  await page.waitForTimeout(400)
  log('valid draft enables save', await page.evaluate(() => { const p = document.querySelector('.kanban-wf'); return { saveDisabled: p.querySelector('.kanban-wf-foot button').disabled, error: (p.querySelector('.kanban-wf-error') || {}).textContent || null } }))
  const before = orch('saveColumns')
  await page.locator('.kanban-wf-foot button').click()
  await page.waitForTimeout(2500)
  log('saveColumns calls', orch('saveColumns') - before)
  const beforeToggle = orch('setEnabled')
  await page.locator('.kanban-wf-section').last().locator('input[type=checkbox]').first().click()
  await page.waitForTimeout(1800)
  log('setEnabled calls after the switch', orch('setEnabled') - beforeToggle)
  log('section 3 state', await page.evaluate(() => { const s = [...document.querySelectorAll('.kanban-wf-section')].pop(); return { status: (s.querySelector('.kanban-wf-ok') || s.querySelector('.kanban-wf-error') || {}).textContent || null, checked: s.querySelector('input[type=checkbox]').checked } }))
  await shot(page, '42-board-switch.png')
} catch (e) { console.log('ERROR ' + (e && e.message)); try { await shot(page, '43-error.png') } catch {} } finally { await browser.close() }
