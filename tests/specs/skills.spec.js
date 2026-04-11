import { test, expect } from '../fixtures/index.js'
import { goToSite } from '../utils/helpers.js'

test.describe('@Regression Skills Section', () => {
  test.beforeEach(async ({ page }) => {
    await goToSite(page)
  })

  test('@P0 skills heading is visible', async ({ skillsPage }) => {
    await expect(skillsPage.heading()).toBeVisible()
  })

  test('@P1 all six skill categories are visible', async ({ skillsPage }) => {
    await expect(skillsPage.testManagementRow()).toBeVisible()
    await expect(skillsPage.testStrategyRow()).toBeVisible()
    await expect(skillsPage.testAutomationRow()).toBeVisible()
    await expect(skillsPage.aiToolsRow()).toBeVisible()
    await expect(skillsPage.agileRow()).toBeVisible()
    await expect(skillsPage.regulatoryRow()).toBeVisible()
  })

  test('@P1 AI focus banner tags are visible', async ({ skillsPage }) => {
    await expect(skillsPage.hallucinationTag()).toBeVisible()
    await expect(skillsPage.biasTag()).toBeVisible()
    await expect(skillsPage.langSmithTag()).toBeVisible()
    await expect(skillsPage.nistTag()).toBeVisible()
  })

  test('@P1 certifications are visible', async ({ skillsPage }) => {
    await expect(skillsPage.safeCert()).toBeVisible()
    await expect(skillsPage.prince2Cert()).toBeVisible()
    await expect(skillsPage.csmCert()).toBeVisible()
    await expect(skillsPage.istqbCtAI()).toBeVisible()
    await expect(skillsPage.azureAI()).toBeVisible()
  })

  test('@P2 active badges count is at least 5', async ({ skillsPage }) => {
    const count = await skillsPage.activeBadges().count()
    expect(count).toBeGreaterThanOrEqual(5)
  })

  test('@P2 in progress badges count is at least 3', async ({ skillsPage }) => {
    const count = await skillsPage.inProgressBadges().count()
    expect(count).toBeGreaterThanOrEqual(3)
  })
})
