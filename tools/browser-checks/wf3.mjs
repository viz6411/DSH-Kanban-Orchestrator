import { openGui } from './lab.mjs'
import fs from 'node:fs'
const shot = (p, name) => p.screenshot({ path: '/home/viz/work/shots/' + name })
const { browser, page } = await openGui({ width: 1440, height: 900 })
const reqs = []
page.on('request', (r) => { if (r.url().includes('/api/kanban')) reqs.push((r.postData() || '').slice(0, 60)) })
const log = (k, v) => console.log(k + ': ' + JSON.stringify(v))
const orchCalls = () => reqs.filter((b) => b.includes('saveColumns')).length
const toggleCalls = () => reqs.filter((b) => b.includes('setEnabled')).length
try {
  await page.locator('[aria-label="Board"]').first().click()
  await page.waitForTimeout(4000)
  log('chip', await page.evaluate(() => { const c = document.querySelector('.kanban-toolbar-board-name'); if (!c) return null; const r = c.getBoundingClientRect(); return { text: c.textContent, cls: c.className, title: c.getAttribute('title'), width: Math.round(r.width) } }))
  const settings = page.locator('.kanban-toolbar button').nth(1)
  await settings.click()
  await page.waitForTimeout(1500)
  log('menu after real click', await page.evaluate(() => [...document.querySelectorAll('[role="menuitem"], [role="menu"] button, [data-radix-popper-content-wrapper] *')].map((m) => (m.textContent || '').trim()).filter((t) => t && t.length < 40).slice(0, 14)))
  await shot(page, '30-board-menu.png')
  const wfItem = page.locator('[role="menuitem"]').filter({ hasText: /Workflow/i }).first()
  const found = await wfItem.count()
  log('workflow menu item present', found)
  if (!found) {
    const anyItem = page.locator('[role="menuitem"]').first()
    log('menu item texts available', await page.locator('[role="menuitem"]').allTextContents())
    if (await anyItem.count()) { await anyItem.click(); await page.waitForTimeout(2500) }
  } else {
    await wfItem.click()
    await page.waitForTimeout(2600)
  }
  const panel = await page.evaluate(() => {
    const p = document.querySelector('.kanban-wf')
    if (!p) return null
    return {
      aria: p.getAttribute('aria-label'),
      title: p.querySelector('.kanban-wf-title').textContent,
      subtitle: p.querySelector('.kanban-wf-sub').textContent,
      badges: [...p.querySelectorAll('.kanban-wf-scope')].map((b) => b.textContent),
      sections: [...p.querySelectorAll('.kanban-wf-section')].map((s) => s.querySelector('.kanban-wf-caption').textContent),
      rows: [...p.querySelectorAll('.kanban-wf-row')].map((r) => ({ name: r.querySelector('input').value, role: r.querySelectorAll('select')[0].value, kind: r.querySelectorAll('select')[1].value, filled: r.querySelector('.kanban-wf-dot').getAttribute('data-filled'), dotAria: r.querySelector('.kanban-wf-dot').getAttribute('aria-label') })),
      roleOptions: [...p.querySelector('.kanban-wf-row select').options].map((o) => o.value).filter(Boolean),
      saveText: p.querySelector('.kanban-wf-foot button').textContent,
      saveDisabled: p.querySelector('.kanban-wf-foot button').disabled,
      bodyScrollX: (() => { const b = p.querySelector('.kanban-wf-body'); return b.scrollWidth > b.clientWidth })(),
      panelOverflow: (() => { const r = p.getBoundingClientRect(); return { top: Math.round(r.top), bottom: Math.round(r.bottom), innerH: p.querySelector('.kanban-wf-body').scrollHeight > p.querySelector('.kanban-wf-body').clientHeight } })()
    }
  })
  log('panel', panel)
  await shot(page, '31-workflow-panel.png')
  if (!panel) throw new Error('panel did not open')
  const rowInputs = page.locator('.kanban-wf-row input')
  const firstName = await rowInputs.nth(0).inputValue()
  const secondName = await rowInputs.nth(1).inputValue()
  await rowInputs.nth(0).fill(secondName)
  await page.waitForTimeout(400)
  const dup = await page.evaluate(() => {
    const p = document.querySelector('.kanban-wf')
    const save = p.querySelector('.kanban-wf-foot button')
    return { invalidRows: p.querySelectorAll('.kanban-wf-row-invalid').length, error: (p.querySelector('.kanban-wf-error') || {}).textContent, saveEnabled: !save.disabled }
  })
  log('duplicate rows detected inline', dup)
  const beforeDup = orchCalls()
  if (!dup.saveEnabled) { await page.locator('.kanban-wf-foot button').click(); await page.waitForTimeout(1200) }
  log('saveColumns fired while a duplicate exists', orchCalls() - beforeDup)
  await shot(page, '32-workflow-duplicate.png')
  await rowInputs.nth(0).fill(firstName)
  await page.waitForTimeout(300)
  const beforeSave = orchCalls()
  await page.locator('.kanban-wf-foot button').click()
  await page.waitForTimeout(3200)
  log('saveColumns fired after a valid edit', orchCalls() - beforeSave)
  log('save feedback', await page.evaluate(() => { const p = document.querySelector('.kanban-wf'); const ok = p.querySelector('.kanban-wf-ok'); return { foot: ok ? ok.textContent : null, dots: [...p.querySelectorAll('.kanban-wf-dot')].map((d) => d.getAttribute('data-filled')), saveDisabledNow: p.querySelector('.kanban-wf-foot button').disabled } }))
  await shot(page, '33-workflow-saved.png')
  const beforeToggle = reqs.length
  await page.locator('.kanban-wf-section').last().locator('input[type=checkbox]').first().click()
  await page.waitForTimeout(1800)
  log('board toggle status', await page.evaluate(() => { const s = [...document.querySelectorAll('.kanban-wf-section')].pop(); const t = s.querySelector('.kanban-wf-ok') || s.querySelector('.kanban-wf-error'); return { text: t ? t.textContent : null, checked: s.querySelector('input[type=checkbox]').checked, sectionCaption: s.querySelector('.kanban-wf-caption').textContent, badge: s.querySelector('.kanban-wf-scope').textContent } }))
  log('setEnabled calls', toggleCalls())
  await shot(page, '34-board-toggle.png')
  await rowInputs.nth(0).fill(firstName + '  ')
  await page.waitForTimeout(300)
  await page.locator('.kanban-wf-head button').click()
  await page.waitForTimeout(700)
  log('dirty close bar', await page.evaluate(() => { const bar = document.querySelector('.kanban-wf-close'); return bar ? { text: bar.textContent, buttons: [...bar.querySelectorAll('button')].map((b) => b.textContent) } : 'NO CONFIRM BAR' }))
  await shot(page, '35-dirty-close.png')
  const beforeDiscard = reqs.length
  await page.locator('.kanban-wf-close button').first().click()
  await page.waitForTimeout(1000)
  log('discard closes panel without api calls', await page.evaluate(() => !document.querySelector('.kanban-wf')))
  log('api calls during discard', reqs.length - beforeDiscard)
  log('board tab labels', await page.evaluate(() => [...document.querySelectorAll('[role="tab"]')].map((t) => t.textContent.trim()).filter((t) => /board|доска|看板/i.test(t))))
  fs.writeFileSync('/tmp/wf3_result.json', JSON.stringify({ reqs: reqs.slice(-10) }, null, 1))
} catch (e) {
  console.log('ERROR ' + (e && e.message))
  try { await shot(page, '36-error.png') } catch {}
} finally { await browser.close() }
