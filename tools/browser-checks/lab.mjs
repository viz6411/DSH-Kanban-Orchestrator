import { execSync } from 'node:child_process'

// Playwright is resolved from wherever it is installed; PLAYWRIGHT_MODULE lets the checks run from any directory.
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright')

export function launchToken() {
  const out = execSync('journalctl --user -u dsh-web.service --no-pager -n 4000 2>/dev/null | grep -oE "\\?token=[A-Za-z0-9_-]{16,}" | tail -1', { encoding: 'utf8' })
  return out.trim().replace(/^\?token=/, '')
}
export async function openGui({ width = 1440, height = 900, locale = null } = {}) {
  // The checks run next to the Harness on a small machine and the Harness sits close to its own heap ceiling:
  // two of its restarts today coincided with a browser check. Keep the renderer cheap.
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage', '--force-color-profile=srgb', '--renderer-process-limit=1', '--disable-gpu', '--js-flags=--max-old-space-size=256'] })
  const options = { viewport: { width, height }, deviceScaleFactor: 1 }
  if (locale) options.locale = locale
  const context = await browser.newContext(options)
  const page = await context.newPage()
  const token = launchToken()
  if (!token) throw new Error('no dsh web launch token found in the user journal')
  await page.goto(`http://192.168.64.230:3080/?token=${token}`, { waitUntil: 'domcontentloaded', timeout: 45000 })
  await page.addStyleTag({ content: 'html,body{font-family:"DejaVu Sans","Noto Sans",sans-serif !important}' })
  await page.waitForTimeout(7000)
  return { browser, context, page }
}
