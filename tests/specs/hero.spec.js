import { test, expect } from '../fixtures/index.js'
import { goToSite, checkImageLoaded } from '../utils/helpers.js'

test.describe('@Regression @Smoke Hero Section', () => {
  test.beforeEach(async ({ page }) => {
    await goToSite(page)
  })

  test('@P0 name is visible', async ({ heroPage }) => {
    await expect(heroPage.firstName()).toBeVisible()
    await expect(heroPage.lastName()).toBeVisible()
  })

  test('@P0 title label is visible', async ({ heroPage }) => {
    await expect(heroPage.titleLabel()).toBeVisible()
  })

  test('@P0 tagline is visible', async ({ heroPage }) => {
    await expect(heroPage.tagline()).toBeVisible()
  })

  test('@P0 profile photo loads without error', async ({ heroPage }) => {
    await expect(heroPage.profilePhoto()).toBeVisible()
    const loaded = await checkImageLoaded(heroPage.profilePhoto())
    expect(loaded).toBe(true)
  })

  test('@P1 stat card 20+ years is visible', async ({ heroPage }) => {
    await expect(heroPage.stat20Years()).toBeVisible()
  })

  test('@P1 stat card 37% defect reduction is visible', async ({ heroPage }) => {
    await expect(heroPage.stat37Percent()).toBeVisible()
  })

  test('@P1 stat card 120+ team is visible', async ({ heroPage }) => {
    await expect(heroPage.stat120Team()).toBeVisible()
  })

  test('@P1 stat card 6 certifications is visible', async ({ heroPage }) => {
    await expect(heroPage.stat6Certs()).toBeVisible()
  })

  test('@P1 where to start links are visible', async ({ heroPage }) => {
    await expect(heroPage.backgroundLink()).toBeVisible()
    await expect(heroPage.workHistoryLink()).toBeVisible()
    await expect(heroPage.getInTouchLink()).toBeVisible()
  })

  test('@P2 background link scrolls to about', async ({ page, heroPage }) => {
    await heroPage.backgroundLink().click()
    await page.waitForTimeout(800)
    await expect(page.locator('#about')).toBeInViewport()
  })
})
