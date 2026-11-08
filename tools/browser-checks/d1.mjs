import { openGui } from './lab.mjs'
const { browser, context, page } = await openGui({ width: 1280, height: 800 })
const log = (k, v) => console.log(k + ': ' + JSON.stringify(v))
try {
  await context.route('**/api/kanban', async (route, req) => {
    if ((req.postData() || '').includes('"method":"get"')) await new Promise((r) => setTimeout(r, 3000))
    await route.continue()
  })
  await page.reload({ waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(6000)
  await page.locator('[aria-label="Board"]').first().click()
  await page.waitForTimeout(1200)
  log('chip while the board request is still pending', await page.evaluate(() => {
    const c = document.querySelector('.kanban-toolbar-board-name')
    if (!c) return { chip: 'absent' }
    const r = c.getBoundingClientRect()
    return { chip: 'present', cls: c.className, width: Math.round(r.width), height: Math.round(r.height), text: c.textContent, root: !!document.querySelector('.kanban-loading') }
  }))
  await page.screenshot({ path: '/home/viz/work/shots/45-chip-skeleton.png' })
  await page.waitForTimeout(3500)
  log('chip after the board loaded', await page.evaluate(() => {
    const c = document.querySelector('.kanban-toolbar-board-name')
    if (!c) return { chip: 'absent' }
    return { chip: 'present', cls: c.className, text: c.textContent, title: c.getAttribute('title'), width: Math.round(c.getBoundingClientRect().width) }
  }))
  await page.screenshot({ path: '/home/viz/work/shots/46-chip-loaded.png' })
} catch (e) { console.log('ERROR ' + e.message) } finally { await browser.close() }
