import { test, expect } from '../fixtures/index.js'
import { goToSite, checkNoHorizontalScroll } from '../utils/helpers.js'

test.describe('IPS-1 — GitHub link in "Where to start" section', () => {

  test.beforeEach(async ({ page }) => {
    await goToSite(page)
  })

  // TC-01 — P1 Critical | Positive
  test('TC-01: GitHub link is visible in "Where to start" section @P1 @Smoke', async ({ page, heroPage }) => {
    await expect(heroPage.whereToStartLabel()).toBeVisible()
    await expect(heroPage.githubLink()).toBeVisible()
    await page.screenshot({ path: 'failure-TC-01.png' }).catch(() => {})
  })

  // TC-02 — P1 Critical | Positive
  test('TC-02: GitHub link href points to https://github.com/InderNz @P1 @Smoke', async ({ page, heroPage }) => {
    const link = heroPage.githubLink()
    await expect(link).toBeVisible()
    const href = await link.getAttribute('href')
    expect(href).toBe('https://github.com/InderNz')
    await page.screenshot({ path: 'failure-TC-02.png' }).catch(() => {})
  })

  // TC-03 — P1 High | Positive
  test('TC-03: GitHub link opens in new tab with rel=noopener @P1', async ({ page, heroPage }) => {
    const link = heroPage.githubLink()
    await expect(link).toBeVisible()
    const target = await link.getAttribute('target')
    const rel = await link.getAttribute('rel')
    expect(target).toBe('_blank')
    expect(rel).toContain('noopener')
    expect(rel).toContain('noreferrer')
    await page.screenshot({ path: 'failure-TC-03.png' }).catch(() => {})
  })

  // TC-04 — P1 High | Positive
  test('TC-04: GitHub SVG icon is present inside the link @P1', async ({ page, heroPage }) => {
    const link = heroPage.githubLink()
    await expect(link).toBeVisible()
    const svg = link.locator('svg')
    await expect(svg).toBeVisible()
    await page.screenshot({ path: 'failure-TC-04.png' }).catch(() => {})
  })

  // TC-05 — P2 Medium | Positive
  test('TC-05: GitHub link has same transition style as other "Where to start" links @P2', async ({ page, heroPage }) => {
    const githubLink = heroPage.githubLink()
    await expect(githubLink).toBeVisible()
    // Verify the transition CSS property is present (same pattern as other links)
    const transition = await githubLink.evaluate(el => getComputedStyle(el).transition)
    expect(transition).toContain('0.2s')
    await page.screenshot({ path: 'failure-TC-05.png' }).catch(() => {})
  })

  // TC-06 — P1 Critical | Regression
  test('TC-06: All 5 existing "Where to start" links still present @P1 @Regression', async ({ page, heroPage }) => {
    await expect(heroPage.backgroundLink()).toBeVisible()
    await expect(heroPage.workHistoryLink()).toBeVisible()
    await expect(heroPage.skillsLink()).toBeVisible()
    await expect(heroPage.currentFocusLink()).toBeVisible()
    await expect(heroPage.getInTouchLink()).toBeVisible()
    await page.screenshot({ path: 'failure-TC-06.png' }).catch(() => {})
  })

  // TC-07 — P2 Medium | Edge Case
  test('TC-07: GitHub link visible on iPhone 375x812 mobile viewport @P2 @Mobile', async ({ page, heroPage }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await goToSite(page)
    await expect(heroPage.whereToStartLabel()).toBeVisible()
    await expect(heroPage.githubLink()).toBeVisible()
    await page.screenshot({ path: 'failure-TC-07.png' }).catch(() => {})
  })

  // TC-08 — P2 Medium | Edge Case
  test('TC-08: No horizontal scroll introduced on any viewport @P2', async ({ page }) => {
    for (const width of [375, 768, 1280]) {
      await page.setViewportSize({ width, height: 812 })
      await goToSite(page)
      const noScroll = await checkNoHorizontalScroll(page)
      expect(noScroll, `Horizontal scroll detected at ${width}px viewport`).toBe(true)
    }
    await page.screenshot({ path: 'failure-TC-08.png' }).catch(() => {})
  })

})
