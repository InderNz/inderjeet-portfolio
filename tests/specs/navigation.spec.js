import { test, expect } from '../fixtures/index.js'
import { goToSite, SCROLL_WAIT } from '../utils/helpers.js'

test.describe('@Regression @Smoke Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await goToSite(page)
  })

  test('@P0 navbar is visible', async ({ navbarPage }) => {
    await expect(navbarPage.navbar()).toBeVisible()
  })

  test('@P0 navbar contains all links', async ({ navbarPage }) => {
    await expect(navbarPage.aboutLink()).toBeVisible()
    await expect(navbarPage.experienceLink()).toBeVisible()
    await expect(navbarPage.skillsLink()).toBeVisible()
    await expect(navbarPage.currentFocusLink()).toBeVisible()
    await expect(navbarPage.contactLink()).toBeVisible()
  })

  test('@P1 clicking About scrolls to about section', async ({ page, navbarPage }) => {
    await navbarPage.clickAbout()
    await page.waitForTimeout(SCROLL_WAIT)
    await expect(page.locator('#about')).toBeInViewport()
  })

  test('@P1 clicking Experience scrolls to experience section', async ({ page, navbarPage }) => {
    await navbarPage.clickExperience()
    await page.waitForTimeout(SCROLL_WAIT)
    await expect(page.locator('#experience')).toBeInViewport()
  })

  test('@P1 clicking Skills scrolls to skills section', async ({ page, navbarPage }) => {
    await navbarPage.clickSkills()
    await page.waitForTimeout(SCROLL_WAIT)
    await expect(page.locator('#skills')).toBeInViewport()
  })

  test('@P1 clicking Current Focus scrolls to section', async ({ page, navbarPage }) => {
    await navbarPage.clickCurrentFocus()
    await page.waitForTimeout(SCROLL_WAIT)
    await expect(page.locator('#current-focus')).toBeInViewport()
  })

  test('@P1 clicking Contact scrolls to contact section', async ({ page, navbarPage }) => {
    await navbarPage.clickContact()
    await page.waitForTimeout(SCROLL_WAIT)
    await expect(page.locator('#contact')).toBeInViewport()
  })
})
