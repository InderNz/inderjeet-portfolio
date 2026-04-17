/**
 * IPW-25: Mobile navbar links not accessible to scroll-spy
 *         Skills and Experience active states broken on mobile
 *
 * Root cause: mobile dropdown <button> elements had no aria-current attribute.
 * Fix (IPW-23): mobile nav now renders always-visible <a> links with aria-current.
 *
 * AC:
 * 1. When Skills section is in view on mobile, the Skills link in the mobile
 *    nav has aria-current="page" and Experience does NOT.
 * 2. When Experience section is in view on mobile, the Experience link has
 *    aria-current="page" and Skills does NOT.
 * 3. Every section activates its own mobile nav link correctly via scroll-spy.
 * 4. Regression — clicking mobile nav links still scrolls to the correct section.
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

/** Return true if the mobile nav <a> link for `label` has aria-current="page" */
async function isMobileLinkActive(page, label) {
  return page.evaluate((linkLabel) => {
    const links = [...document.querySelectorAll('nav a')]
    const link = links.find(
      (a) => a.textContent.trim().toLowerCase() === linkLabel.toLowerCase()
    )
    return link ? link.getAttribute('aria-current') === 'page' : false
  }, label)
}

// ─── Test suite — mobile viewport (375 × 812) ────────────────────────────────

test.describe('IPW-25 — Mobile scroll-spy: aria-current on mobile nav links', () => {
  test.use({ viewport: { width: 375, height: 812 } })

  test.beforeEach(async ({ page }) => {
    await goToSite(page)
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
    await page.waitForTimeout(400)
  })

  // TC-01: Skills active on mobile when Skills section is in view
  test('TC-01 Skills link is aria-current="page" when Skills section is in view', async ({ page }) => {
    await scrollToSection(page, 'skills')

    const skillsActive = await isMobileLinkActive(page, 'Skills')
    expect(skillsActive, 'Skills mobile link should have aria-current="page"').toBe(true)
  })

  // TC-02: Experience link NOT active when Skills is in view
  test('TC-02 Experience link is NOT active when Skills section is in view', async ({ page }) => {
    await scrollToSection(page, 'skills')

    const expActive = await isMobileLinkActive(page, 'Experience')
    expect(expActive, 'Experience mobile link must NOT be active when Skills is in view').toBe(false)
  })

  // TC-03: Experience active on mobile when Experience section is in view
  test('TC-03 Experience link is aria-current="page" when Experience section is in view', async ({ page }) => {
    await scrollToSection(page, 'experience')

    const expActive = await isMobileLinkActive(page, 'Experience')
    expect(expActive, 'Experience mobile link should have aria-current="page"').toBe(true)
  })

  // TC-04: Skills link NOT active when Experience is in view
  test('TC-04 Skills link is NOT active when Experience section is in view', async ({ page }) => {
    await scrollToSection(page, 'experience')

    const skillsActive = await isMobileLinkActive(page, 'Skills')
    expect(skillsActive, 'Skills mobile link must NOT be active when Experience is in view').toBe(false)
  })

  // TC-05: About activates About link correctly
  test('TC-05 About link is aria-current="page" when About section is in view', async ({ page }) => {
    await scrollToSection(page, 'about')

    const aboutActive = await isMobileLinkActive(page, 'About')
    expect(aboutActive, 'About mobile link should be active').toBe(true)

    const skillsActive = await isMobileLinkActive(page, 'Skills')
    const expActive = await isMobileLinkActive(page, 'Experience')
    expect(skillsActive).toBe(false)
    expect(expActive).toBe(false)
  })

  // TC-06: Current Focus activates correctly on mobile
  test('TC-06 Current Focus link is aria-current="page" when Current Focus is in view', async ({ page }) => {
    await scrollToSection(page, 'current-focus')

    const cfActive = await isMobileLinkActive(page, 'Current Focus')
    expect(cfActive, 'Current Focus mobile link should be active').toBe(true)

    const skillsActive = await isMobileLinkActive(page, 'Skills')
    const expActive = await isMobileLinkActive(page, 'Experience')
    expect(skillsActive).toBe(false)
    expect(expActive).toBe(false)
  })

  // TC-07: Contact activates correctly on mobile
  test('TC-07 Contact link is aria-current="page" when Contact section is in view', async ({ page }) => {
    await scrollToSection(page, 'contact')

    const contactActive = await isMobileLinkActive(page, 'Contact')
    expect(contactActive, 'Contact mobile link should be active').toBe(true)
  })

  // TC-08: Full scroll-through — every section activates its mobile link in DOM order
  test('TC-08 Scrolling through all sections activates each mobile link in correct order', async ({ page }) => {
    const sectionsInOrder = [
      { id: 'about', label: 'About' },
      { id: 'skills', label: 'Skills' },
      { id: 'experience', label: 'Experience' },
      { id: 'current-focus', label: 'Current Focus' },
      { id: 'contact', label: 'Contact' },
    ]

    for (const { id, label } of sectionsInOrder) {
      await scrollToSection(page, id)
      const active = await isMobileLinkActive(page, label)
      expect(active, `${label} mobile link should be active when scrolled to #${id}`).toBe(true)
    }
  })

  // TC-09: Regression — clicking Skills link scrolls to #skills
  test('TC-09 Clicking Skills mobile link scrolls to #skills section', async ({ page }) => {
    await page.getByRole('link', { name: /^skills$/i }).click()
    await page.waitForTimeout(SCROLL_SETTLE)
    await expect(page.locator('#skills')).toBeInViewport()
  })

  // TC-10: Regression — clicking Experience link scrolls to #experience
  test('TC-10 Clicking Experience mobile link scrolls to #experience section', async ({ page }) => {
    await page.getByRole('link', { name: /^experience$/i }).click()
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
