/**
 * IPW-25: Mobile navbar links not accessible to scroll-spy
 *         Skills and Experience active states broken on mobile
 *
 * Root cause: mobile dropdown <button> elements have no aria-current attribute,
 * so the scroll-spy active state is never surfaced to assistive technology
 * (or to any assertion checking aria-current on mobile).
 *
 * AC:
 * 1. When Skills section is in view on mobile, the Skills button in the mobile
 *    menu has aria-current="page" and Experience does NOT.
 * 2. When Experience section is in view on mobile, the Experience button has
 *    aria-current="page" and Skills does NOT.
 * 3. Every section activates its own mobile nav button correctly via scroll-spy.
 * 4. Regression — clicking mobile nav buttons still scrolls to the correct section.
 * 5. Desktop aria-current behaviour is unchanged (regression guard).
 */

import { test, expect } from '../fixtures/index.js'
import { goToSite } from '../utils/helpers.js'

const SCROLL_SETTLE = 900 // ms — enough for smooth-scroll + scroll-spy debounce

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Scroll a section to the top of the viewport instantly */
async function scrollToSection(page, id) {
  await page.evaluate((sectionId) => {
    const el = document.getElementById(sectionId)
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' })
  }, id)
  await page.waitForTimeout(SCROLL_SETTLE)
}

/** Open the hamburger menu if it is not already open */
async function openMobileMenu(page) {
  const hamburger = page.getByRole('button', { name: /open menu/i })
  if (await hamburger.isVisible()) {
    await hamburger.click()
    await page.waitForTimeout(300)
  }
}

/** Return true if the mobile dropdown button for `label` has aria-current="page" */
async function isMobileButtonActive(page, label) {
  return page.evaluate((btnLabel) => {
    const buttons = [...document.querySelectorAll('nav button')]
    const btn = buttons.find(
      (b) => b.textContent.trim().toLowerCase() === btnLabel.toLowerCase()
    )
    return btn ? btn.getAttribute('aria-current') === 'page' : false
  }, label)
}

// ─── Test suite — mobile viewport (375 × 812) ────────────────────────────────

test.describe('IPW-25 — Mobile scroll-spy: aria-current on mobile nav buttons', () => {
  test.use({ viewport: { width: 375, height: 812 } })

  test.beforeEach(async ({ page }) => {
    await goToSite(page)
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
    await page.waitForTimeout(400)
  })

  // TC-01: Skills active on mobile when Skills section is in view
  test('TC-01 Skills button is aria-current="page" when Skills section is in view', async ({ page }) => {
    await scrollToSection(page, 'skills')
    await openMobileMenu(page)

    const skillsActive = await isMobileButtonActive(page, 'Skills')
    expect(skillsActive, 'Skills mobile button should have aria-current="page"').toBe(true)
  })

  // TC-02: Experience button NOT active when Skills is in view
  test('TC-02 Experience button is NOT active when Skills section is in view', async ({ page }) => {
    await scrollToSection(page, 'skills')
    await openMobileMenu(page)

    const expActive = await isMobileButtonActive(page, 'Experience')
    expect(expActive, 'Experience mobile button must NOT be active when Skills is in view').toBe(false)
  })

  // TC-03: Experience active on mobile when Experience section is in view
  test('TC-03 Experience button is aria-current="page" when Experience section is in view', async ({ page }) => {
    await scrollToSection(page, 'experience')
    await openMobileMenu(page)

    const expActive = await isMobileButtonActive(page, 'Experience')
    expect(expActive, 'Experience mobile button should have aria-current="page"').toBe(true)
  })

  // TC-04: Skills button NOT active when Experience is in view
  test('TC-04 Skills button is NOT active when Experience section is in view', async ({ page }) => {
    await scrollToSection(page, 'experience')
    await openMobileMenu(page)

    const skillsActive = await isMobileButtonActive(page, 'Skills')
    expect(skillsActive, 'Skills mobile button must NOT be active when Experience is in view').toBe(false)
  })

  // TC-05: About activates About button correctly
  test('TC-05 About button is aria-current="page" when About section is in view', async ({ page }) => {
    await scrollToSection(page, 'about')
    await openMobileMenu(page)

    const aboutActive = await isMobileButtonActive(page, 'About')
    expect(aboutActive, 'About mobile button should be active').toBe(true)

    const skillsActive = await isMobileButtonActive(page, 'Skills')
    const expActive = await isMobileButtonActive(page, 'Experience')
    expect(skillsActive).toBe(false)
    expect(expActive).toBe(false)
  })

  // TC-06: Current Focus activates correctly on mobile
  test('TC-06 Current Focus button is aria-current="page" when Current Focus is in view', async ({ page }) => {
    await scrollToSection(page, 'current-focus')
    await openMobileMenu(page)

    const cfActive = await isMobileButtonActive(page, 'Current Focus')
    expect(cfActive, 'Current Focus mobile button should be active').toBe(true)

    const skillsActive = await isMobileButtonActive(page, 'Skills')
    const expActive = await isMobileButtonActive(page, 'Experience')
    expect(skillsActive).toBe(false)
    expect(expActive).toBe(false)
  })

  // TC-07: Contact activates correctly on mobile
  test('TC-07 Contact button is aria-current="page" when Contact section is in view', async ({ page }) => {
    await scrollToSection(page, 'contact')
    await openMobileMenu(page)

    const contactActive = await isMobileButtonActive(page, 'Contact')
    expect(contactActive, 'Contact mobile button should be active').toBe(true)
  })

  // TC-08: Full scroll-through — every section activates its mobile button in DOM order
  test('TC-08 Scrolling through all sections activates each mobile button in correct order', async ({ page }) => {
    const sectionsInOrder = [
      { id: 'about', label: 'About' },
      { id: 'skills', label: 'Skills' },
      { id: 'experience', label: 'Experience' },
      { id: 'current-focus', label: 'Current Focus' },
      { id: 'contact', label: 'Contact' },
    ]

    for (const { id, label } of sectionsInOrder) {
      await scrollToSection(page, id)
      await openMobileMenu(page)
      const active = await isMobileButtonActive(page, label)
      expect(active, `${label} mobile button should be active when scrolled to #${id}`).toBe(true)
      // Close menu before next scroll so hamburger is available again
      const closeBtn = page.getByRole('button', { name: /close menu/i })
      if (await closeBtn.isVisible()) await closeBtn.click()
      await page.waitForTimeout(200)
    }
  })

  // TC-09: Regression — clicking Skills button scrolls to #skills
  test('TC-09 Clicking Skills mobile button scrolls to #skills section', async ({ page }) => {
    await openMobileMenu(page)
    await page.getByRole('button', { name: /^skills$/i }).click()
    await page.waitForTimeout(SCROLL_SETTLE)
    await expect(page.locator('#skills')).toBeInViewport()
  })

  // TC-10: Regression — clicking Experience button scrolls to #experience
  test('TC-10 Clicking Experience mobile button scrolls to #experience section', async ({ page }) => {
    await openMobileMenu(page)
    await page.getByRole('button', { name: /^experience$/i }).click()
    await page.waitForTimeout(SCROLL_SETTLE)
    await expect(page.locator('#experience')).toBeInViewport()
  })
})

// ─── Regression guard — desktop aria-current unchanged ───────────────────────

test.describe('IPW-25 regression — desktop aria-current unaffected', () => {
  test.use({ viewport: { width: 1280, height: 800 } })

  test.beforeEach(async ({ page }) => {
    await goToSite(page)
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
    await page.waitForTimeout(400)
  })

  test('Desktop: Skills link aria-current="page" when Skills is in view', async ({ page }) => {
    await scrollToSection(page, 'skills')
    const active = await page.evaluate(() => {
      const links = [...document.querySelectorAll('nav a')]
      const link = links.find(a => a.textContent.trim().toLowerCase() === 'skills')
      return link ? link.getAttribute('aria-current') === 'page' : false
    })
    expect(active).toBe(true)
  })

  test('Desktop: Experience link aria-current="page" when Experience is in view', async ({ page }) => {
    await scrollToSection(page, 'experience')
    const active = await page.evaluate(() => {
      const links = [...document.querySelectorAll('nav a')]
      const link = links.find(a => a.textContent.trim().toLowerCase() === 'experience')
      return link ? link.getAttribute('aria-current') === 'page' : false
    })
    expect(active).toBe(true)
  })
})
