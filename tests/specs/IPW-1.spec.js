import { test, expect } from '../fixtures/index.js'
import { goToSite, checkNoHorizontalScroll } from '../utils/helpers.js'

test.describe('IPW-1 — Remove 4 stat boxes from home page', () => {

  test.beforeEach(async ({ page }) => {
    await goToSite(page)
  })

  // TC-01 — P1 Critical | Positive
  test('TC-01: All 4 stat box labels are not present on the page @P1 @Smoke', async ({ page, heroPage }) => {
    await expect(heroPage.statLabelQaLeadership()).not.toBeAttached()
    await expect(heroPage.statLabelDefectReduction()).not.toBeAttached()
    await expect(heroPage.statLabelPeakTeam()).not.toBeAttached()
    await expect(heroPage.statLabelCertifications()).not.toBeAttached()
    await page.screenshot({ path: 'failure-TC-01.png' }).catch(() => {})
  })

  // TC-02 — P1 Critical | Regression
  test('TC-02: Hero name, title and tagline still visible @P1 @Regression', async ({ page, heroPage }) => {
    await expect(heroPage.firstName()).toBeVisible()
    await expect(heroPage.lastName()).toBeVisible()
    await expect(heroPage.titleLabel()).toBeVisible()
    await expect(heroPage.tagline()).toBeVisible()
    await page.screenshot({ path: 'failure-TC-02.png' }).catch(() => {})
  })

  // TC-03 — P1 Critical | Regression
  test('TC-03: Where to start section and all 6 links still intact @P1 @Regression', async ({ page, heroPage }) => {
    await expect(heroPage.whereToStartLabel()).toBeVisible()
    await expect(heroPage.backgroundLink()).toBeVisible()
    await expect(heroPage.workHistoryLink()).toBeVisible()
    await expect(heroPage.skillsLink()).toBeVisible()
    await expect(heroPage.currentFocusLink()).toBeVisible()
    await expect(heroPage.getInTouchLink()).toBeVisible()
    await expect(heroPage.githubLink()).toBeVisible()
    await page.screenshot({ path: 'failure-TC-03.png' }).catch(() => {})
  })

  // TC-04 — P1 High | Regression
  test('TC-04: About section still visible @P1 @Regression', async ({ page, aboutPage }) => {
    await aboutPage.aboutSection().scrollIntoViewIfNeeded()
    await expect(aboutPage.heading()).toBeVisible()
    await expect(aboutPage.leadershipCard()).toBeVisible()
    await expect(aboutPage.aiTestingCard()).toBeVisible()
    await page.screenshot({ path: 'failure-TC-04.png' }).catch(() => {})
  })

  // TC-05 — P2 Medium | Positive
  test('TC-05: Hero section renders without layout gap after box removal @P2', async ({ page }) => {
    const heroHeight = await page.locator('#home').evaluate(el => el.getBoundingClientRect().height)
    expect(heroHeight, 'Hero section height should be > 200px').toBeGreaterThan(200)
    // Verify Where to start is still within the hero viewport area
    await expect(page.getByText('Where to start')).toBeVisible()
    await page.screenshot({ path: 'failure-TC-05.png' }).catch(() => {})
  })

  // TC-06 — P2 Medium | Edge Case
  test('TC-06: No horizontal scroll on any viewport @P2', async ({ page }) => {
    for (const width of [375, 768, 1280]) {
      await page.setViewportSize({ width, height: 812 })
      await goToSite(page)
      const noScroll = await checkNoHorizontalScroll(page)
      expect(noScroll, `Horizontal scroll detected at ${width}px`).toBe(true)
    }
    await page.screenshot({ path: 'failure-TC-06.png' }).catch(() => {})
  })

  // TC-07 — P2 Medium | Edge Case
  test('TC-07: Mobile 375x812 — Hero correct and boxes gone @P2 @Mobile', async ({ page, heroPage }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await goToSite(page)
    await expect(heroPage.firstName()).toBeVisible()
    await expect(heroPage.statLabelQaLeadership()).not.toBeAttached()
    await expect(heroPage.statLabelDefectReduction()).not.toBeAttached()
    await expect(heroPage.statLabelPeakTeam()).not.toBeAttached()
    await expect(heroPage.statLabelCertifications()).not.toBeAttached()
    await page.screenshot({ path: 'failure-TC-07.png' }).catch(() => {})
  })

})
