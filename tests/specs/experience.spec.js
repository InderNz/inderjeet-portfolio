import { test, expect } from '../fixtures/index.js'
import { goToSite } from '../utils/helpers.js'

test.describe('@Regression Experience Section', () => {
  test.beforeEach(async ({ page }) => {
    await goToSite(page)
  })

  test('@P0 experience heading is visible', async ({ experiencePage }) => {
    await expect(experiencePage.heading()).toBeVisible()
  })

  test('@P0 Quinnox role is visible', async ({ experiencePage }) => {
    await expect(experiencePage.quinnoxTitle()).toBeVisible()
    await expect(experiencePage.quinnoxCompany()).toBeVisible()
    await expect(experiencePage.quinnoxDate()).toBeVisible()
  })

  test('@P1 Shawbrook Bank engagement is visible', async ({ experiencePage }) => {
    await expect(experiencePage.shawbrookName()).toBeVisible()
    await expect(experiencePage.shawbrookDate()).toBeVisible()
    await expect(experiencePage.shawbrook120()).toBeVisible()
  })

  test('@P1 HAY Bank engagement is visible', async ({ experiencePage }) => {
    await expect(experiencePage.hayBankName()).toBeVisible()
    await expect(experiencePage.hayBankDate()).toBeVisible()
    await expect(experiencePage.hayBankAPRA()).toBeVisible()
  })

  test('@P1 Waste Management engagement is visible', async ({ experiencePage }) => {
    await expect(experiencePage.wmName()).toBeVisible()
    await expect(experiencePage.wmDate()).toBeVisible()
    await expect(experiencePage.wmFortune()).toBeVisible()
  })

  test('@P2 earlier career is visible', async ({ experiencePage }) => {
    await expect(experiencePage.intelText()).toBeVisible()
    await expect(experiencePage.netcradleText()).toBeVisible()
  })

  test('@P2 education section is visible', async ({ experiencePage }) => {
    await expect(experiencePage.educationMSS()).toBeVisible()
    await expect(experiencePage.educationUni()).toBeVisible()
  })
})
