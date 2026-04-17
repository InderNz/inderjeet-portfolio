import { test, expect } from '../fixtures/index.js'
import { goToSite, SCROLL_WAIT } from '../utils/helpers.js'

/**
 * Helper — returns ordered nav section-link label texts.
 * Both mobile and desktop use <a href="#..."> anchor links in the navbar.
 */
async function getNavOrder(page) {
  const navLinks = page.locator('nav a[href^="#"]')
  const count = await navLinks.count()
  const labels = []
  for (let i = 0; i < count; i++) {
    const text = (await navLinks.nth(i).innerText()).trim().toLowerCase()
    if (text) labels.push(text)
  }
  return labels
}

test.describe('IPW-22 — Navbar order: Skills before Experience', () => {
  test.beforeEach(async ({ page }) => {
    await goToSite(page)
  })

  test('@P1 Skills appears before Experience in the navbar', async ({ page }) => {
    const labels = await getNavOrder(page)

    const skillsIdx = labels.findIndex(l => l.includes('skills'))
    const experienceIdx = labels.findIndex(l => l.includes('experience'))

    expect(skillsIdx, `skills not found in nav labels: ${labels}`).toBeGreaterThanOrEqual(0)
    expect(experienceIdx, `experience not found in nav labels: ${labels}`).toBeGreaterThanOrEqual(0)
    expect(skillsIdx, `skills (${skillsIdx}) must come before experience (${experienceIdx})`).toBeLessThan(experienceIdx)
  })

  test('@P1 all nav links are still present after reorder', async ({ page }) => {
    // Both mobile and desktop use <a href="#..."> anchor links
    const nav = page.locator('nav')
    await expect(nav.getByRole('link', { name: /^about$/i })).toBeVisible()
    await expect(nav.getByRole('link', { name: /^skills/i }).first()).toBeVisible()
    await expect(nav.getByRole('link', { name: /^experience$/i })).toBeVisible()
    await expect(nav.getByRole('link', { name: /^current focus$/i })).toBeVisible()
    await expect(nav.getByRole('link', { name: /^contact$/i })).toBeVisible()
  })

  test('@P1 clicking Skills scrolls to the skills section', async ({ page }) => {
    await page.locator('nav').getByRole('link', { name: /^skills/i }).first().click()
    await page.waitForTimeout(SCROLL_WAIT)
    await expect(page.locator('#skills')).toBeInViewport()
  })

  test('@P1 clicking Experience scrolls to the experience section', async ({ page }) => {
    await page.locator('nav').getByRole('link', { name: /^experience$/i }).click()
    await page.waitForTimeout(SCROLL_WAIT)
    await expect(page.locator('#experience')).toBeInViewport()
  })

  test('@P2 navbar order is About → Skills → Experience → Current Focus → Contact', async ({ page }) => {
    const labels = await getNavOrder(page)
    const expectedOrder = ['about', 'skills', 'experience', 'current focus', 'contact']
    let lastIdx = -1
    for (const expected of expectedOrder) {
      const idx = labels.findIndex(l => l.includes(expected))
      expect(idx, `"${expected}" not found after position ${lastIdx} in: ${labels}`).toBeGreaterThan(lastIdx)
      lastIdx = idx
    }
  })
})
