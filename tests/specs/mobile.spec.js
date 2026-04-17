import { test, expect } from '../fixtures/index.js'
import { checkNoHorizontalScroll } from '../utils/helpers.js'

// Each describe group uses a viewport only (not full device preset)
// to avoid Playwright's restriction on defaultBrowserType inside describe.

test.describe('@Regression Mobile — iPhone 13 (375x812)', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('@P0 page loads on iPhone viewport', async ({ page }) => {
    await expect(page.getByText('Inderjeet').first()).toBeVisible()
  })

  test('@P0 no horizontal overflow on iPhone viewport', async ({ page }) => {
    const noScroll = await checkNoHorizontalScroll(page)
    expect(noScroll).toBe(true)
  })

  test('@P1 navbar is visible on iPhone viewport', async ({ page }) => {
    await expect(page.locator('nav')).toBeVisible()
  })

  test('@P1 hero content readable on iPhone viewport', async ({ page }) => {
    await expect(page.getByText('AI Quality Engineering Leader')).toBeVisible()
    await expect(page.getByText(/energised by two things/i)).toBeVisible()
  })

  test('@P1 experience visible on iPhone viewport', async ({ page }) => {
    await expect(page.getByText('20+ Years of Delivery')).toBeVisible()
    await expect(page.locator('#experience').getByText('Shawbrook Bank', { exact: true })).toBeVisible()
  })

  test('@P2 contact details visible on iPhone viewport', async ({ page }) => {
    await expect(page.getByText('nz.inderjeet@gmail.com')).toBeVisible()
  })
})

test.describe('@Regression Mobile — Android (360x800)', () => {
  test.use({ viewport: { width: 360, height: 800 } })

  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('@P0 page loads on Android viewport', async ({ page }) => {
    await expect(page.getByText('Inderjeet').first()).toBeVisible()
  })

  test('@P0 no horizontal overflow on Android viewport', async ({ page }) => {
    const noScroll = await checkNoHorizontalScroll(page)
    expect(noScroll).toBe(true)
  })

  test('@P1 key content visible on Android viewport', async ({ page }) => {
    await expect(page.getByText('AI Quality Engineering Leader')).toBeVisible()
    await expect(page.locator('#experience').getByText('Shawbrook Bank', { exact: true })).toBeVisible()
    await expect(page.getByText('nz.inderjeet@gmail.com')).toBeVisible()
  })
})

test.describe('@Regression Tablet — iPad (1024x1366)', () => {
  test.use({ viewport: { width: 1024, height: 1366 } })

  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('@P0 page loads on iPad viewport', async ({ page }) => {
    await expect(page.getByText('Inderjeet').first()).toBeVisible()
  })

  test('@P0 no horizontal overflow on iPad viewport', async ({ page }) => {
    const noScroll = await checkNoHorizontalScroll(page)
    expect(noScroll).toBe(true)
  })

  test('@P1 navbar visible on iPad viewport', async ({ page }) => {
    await expect(page.locator('nav')).toBeVisible()
  })
})
