import { test, expect } from '../fixtures/index.js'
import { goToSite } from '../utils/helpers.js'

test.describe('@Regression Contact Section', () => {
  test.beforeEach(async ({ page }) => {
    await goToSite(page)
  })

  test('@P0 contact heading is visible', async ({ contactPage }) => {
    await expect(contactPage.heading()).toBeVisible()
  })

  test('@P0 email is present and correct', async ({ contactPage }) => {
    await expect(contactPage.emailText()).toBeVisible()
    await expect(contactPage.emailLink()).toBeVisible()
  })

  test('@P0 LinkedIn link is present', async ({ contactPage }) => {
    await expect(contactPage.linkedinLink()).toBeVisible()
  })

  test('@P1 location is visible', async ({ contactPage }) => {
    await expect(contactPage.location()).toBeVisible()
  })

  test('@P1 all role cards are visible', async ({ contactPage }) => {
    await expect(contactPage.seniorQARole()).toBeVisible()
    await expect(contactPage.headOfQualityRole()).toBeVisible()
    await expect(contactPage.aiQALeadRole()).toBeVisible()
    await expect(contactPage.qaConsultantRole()).toBeVisible()
  })

  test('@P2 availability card is visible', async ({ contactPage }) => {
    await expect(contactPage.availabilityText()).toBeVisible()
  })
})
