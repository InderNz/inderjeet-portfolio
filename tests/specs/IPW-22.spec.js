import { test, expect } from '../fixtures/index.js'
import { goToSite, SCROLL_WAIT } from '../utils/helpers.js'

/** Helper — returns whether the current viewport is mobile-sized */
async function isMobileViewport(page) {
  return page.viewportSize()?.width < 768
}

/** Helper — on mobile, opens the hamburger menu so nav buttons are visible */
async function openMobileMenuIfNeeded(page) {
  const mobile = await isMobileViewport(page)
  if (mobile) {
    const hamburger = page.getByRole('button', { name: /open menu/i })
    if (await hamburger.isVisible()) {
      await hamburger.click()
      await page.waitForTimeout(300)
    }
  }
}

/**
 * Helper — returns ordered nav label texts.
 * Desktop: reads <a href> links inside <nav>.
 * Mobile:  reads <button> elements inside the mobile dropdown after opening it.
 */
async function getNavOrder(page) {
  const mobile = await isMobileViewport(page)
  if (mobile) {
    await openMobileMenuIfNeeded(page)
    const buttons = page.locator('nav button')
    const count = await buttons.count()
    const labels = []
    for (let i = 0; i < count; i++) {
      const text = (await buttons.nth(i).innerText()).trim().toLowerCase()
      if (text && !text.includes('close') && !text.includes('open')) labels.push(text)
    }
    return labels
  } else {
    const navLinks = page.locator('nav a[href]')
    const count = await navLinks.count()
    const labels = []
    for (let i = 0; i < count; i++) {
      const text = (await navLinks.nth(i).innerText()).trim().toLowerCase()
      if (text) labels.push(text)
    }
    return labels
  }
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
    await openMobileMenuIfNeeded(page)
    const mobile = await isMobileViewport(page)

    if (mobile) {
      // Mobile: nav items are buttons
      await expect(page.getByRole('button', { name: /about/i }).first()).toBeVisible()
      await expect(page.getByRole('button', { name: /skills/i }).first()).toBeVisible()
      await expect(page.getByRole('button', { name: /experience/i }).first()).toBeVisible()
      await expect(page.getByRole('button', { name: /current focus/i }).first()).toBeVisible()
      await expect(page.getByRole('button', { name: /contact/i }).first()).toBeVisible()
    } else {
      // Desktop: nav items are <a> links
      await expect(page.getByRole('link', { name: /^about$/i })).toBeVisible()
      await expect(page.getByRole('link', { name: /^skills$/i })).toBeVisible()
      await expect(page.getByRole('link', { name: /^experience$/i })).toBeVisible()
      await expect(page.getByRole('link', { name: /^current focus$/i })).toBeVisible()
      await expect(page.getByRole('link', { name: /^contact$/i })).toBeVisible()
    }
  })

  test('@P1 clicking Skills scrolls to the skills section', async ({ page }) => {
    await openMobileMenuIfNeeded(page)
    const mobile = await isMobileViewport(page)

    if (mobile) {
      await page.getByRole('button', { name: /^skills$/i }).click()
    } else {
      await page.getByRole('link', { name: /^skills$/i }).click()
    }
    await page.waitForTimeout(SCROLL_WAIT)
    await expect(page.locator('#skills')).toBeInViewport()
  })

  test('@P1 clicking Experience scrolls to the experience section', async ({ page }) => {
    await openMobileMenuIfNeeded(page)
    const mobile = await isMobileViewport(page)

    if (mobile) {
      await page.getByRole('button', { name: /^experience$/i }).click()
    } else {
      await page.getByRole('link', { name: /^experience$/i }).click()
    }
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
