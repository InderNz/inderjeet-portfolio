import { test, expect } from '../fixtures/index.js'
import { goToSite, checkImageLoaded, checkNoHorizontalScroll } from '../utils/helpers.js'

test.describe('@Regression Links and Layout', () => {
  test.beforeEach(async ({ page }) => {
    await goToSite(page)
  })

  test('@P0 email mailto link has correct href', async ({ page }) => {
    const href = await page.locator('a[href^="mailto"]').getAttribute('href')
    expect(href).toBe('mailto:nz.inderjeet@gmail.com')
  })

  test('@P0 LinkedIn link points to correct profile', async ({ page }) => {
    const href = await page.locator('a[href*="linkedin.com"]').getAttribute('href')
    expect(href).toContain('inderjeet-singh-24485b32')
  })

  test('@P1 no broken images on page', async ({ page }) => {
    const images = page.locator('img')
    const count = await images.count()
    for (let i = 0; i < count; i++) {
      const loaded = await checkImageLoaded(images.nth(i))
      expect(loaded).toBe(true)
    }
  })

  test('@P1 no horizontal scrollbar on desktop', async ({ page }) => {
    const noScroll = await checkNoHorizontalScroll(page)
    expect(noScroll).toBe(true)
  })

  test('@P2 footer is visible with copyright text', async ({ page }) => {
    await expect(page.getByText(/Inderjeet Singh/i).last()).toBeVisible()
    await expect(page.getByText(/Palmerston North/i).last()).toBeVisible()
  })
})
