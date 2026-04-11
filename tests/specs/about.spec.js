import { test, expect } from '../fixtures/index.js'
import { goToSite } from '../utils/helpers.js'

test.describe('@Regression About Section', () => {
  test.beforeEach(async ({ page }) => {
    await goToSite(page)
  })

  test('@P0 about heading is visible', async ({ aboutPage }) => {
    await expect(aboutPage.heading()).toBeVisible()
  })

  test('@P1 body text mentions key career facts', async ({ aboutPage }) => {
    await expect(aboutPage.bodyText20Years()).toBeVisible()
    await expect(aboutPage.bodyTextShawbrook()).toBeVisible()
    await expect(aboutPage.bodyTextHAY()).toBeVisible()
    await expect(aboutPage.bodyTextNZ()).toBeVisible()
  })

  test('@P1 all four highlight cards are visible', async ({ aboutPage }) => {
    await expect(aboutPage.leadershipCard()).toBeVisible()
    await expect(aboutPage.aiTestingCard()).toBeVisible()
    await expect(aboutPage.fintechCard()).toBeVisible()
    await expect(aboutPage.locationCard()).toBeVisible()
  })
})
