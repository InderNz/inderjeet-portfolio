export const BASE_URL = process.env.BASE_URL || 'http://localhost:5173'
export const SCROLL_WAIT = 800

export async function scrollAndWait(page, sectionId) {
  const section = page.locator(sectionId)
  await section.scrollIntoViewIfNeeded()
  await page.waitForTimeout(SCROLL_WAIT)
  return section
}

export async function checkNoHorizontalScroll(page) {
  return await page.evaluate(
    () => document.documentElement.scrollWidth <= document.documentElement.clientWidth
  )
}

export async function checkImageLoaded(imageLocator) {
  return await imageLocator.evaluate(el => el.naturalWidth > 0)
}

export async function goToSite(page) {
  await page.goto('/')
  await page.waitForLoadState('networkidle')
}
