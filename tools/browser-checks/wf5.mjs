import { openGui } from './lab.mjs'
const { browser, page } = await openGui({ width: 1440, height: 900 })
try {
  await page.locator('[aria-label="Board"]').first().click()
  await page.waitForTimeout(4000)
  await page.locator('.kanban-toolbar button').nth(1).click()
  await page.waitForTimeout(1000)
  await page.locator('[role="menuitem"]').filter({ hasText: /Workflow/i }).first().click()
  await page.waitForTimeout(2500)
  await page.screenshot({ path: '/home/viz/work/shots/43-workflow-polished.png' })
  await page.setViewportSize({ width: 900, height: 720 })
  await page.waitForTimeout(900)
  const narrow = await page.evaluate(() => {
    const p = document.querySelector('.kanban-wf'); if (!p) return null
    const b = p.querySelector('.kanban-wf-body'); const r = p.getBoundingClientRect()
    return { height: Math.round(r.height), bottom: Math.round(r.bottom), viewport: window.innerHeight, inside: r.bottom <= window.innerHeight, bodyScrollX: b.scrollWidth > b.clientWidth, docScrollX: document.documentElement.scrollWidth > document.documentElement.clientWidth }
  })
  console.log('at 900px width: ' + JSON.stringify(narrow))
  await page.screenshot({ path: '/home/viz/work/shots/44-workflow-900px.png' })
} catch (e) { console.log('ERROR ' + e.message) } finally { await browser.close() }
