/**
 * IPW-23: Navbar active state incorrectly highlights Skills when Experience section is in view
 *
 * Root cause: scroll detection array in Navbar.jsx iterates ['home','about','experience','skills',...]
 * but the DOM order is home → about → skills → experience → current-focus → contact.
 * Because the last matching section wins, scrolling to Experience causes Skills
 * (which sits above it in the DOM, so its rect.top is also ≤ 50%) to be set active last.
 *
 * AC:
 * 1. When Experience section is scrolled into view, Experience link is active — Skills is NOT.
 * 2. When Skills section is scrolled into view, Skills link is active — Experience is NOT.
 * 3. Every other section activates its own nav link correctly.
 * 4. Regression — clicking navbar links still scrolls to the correct sections.
 */

import { test, expect } from '../fixtures/index.js'
import { goToSite } from '../utils/helpers.js'

const SCROLL_SETTLE = 900 // ms — enough for smooth-scroll + IntersectionObserver debounce

/** Scroll a section to the top of the viewport (instant, no animation) */
async function scrollToSection(page, id) {
  await page.evaluate((sectionId) => {
    const el = document.getElementById(sectionId)
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' })
  }, id)
  await page.waitForTimeout(SCROLL_SETTLE)
}

/** Return the computed background-color of a nav link (resolves CSS variables) */
async function navLinkBg(page, linkText) {
  return page.evaluate((text) => {
    const links = [...document.querySelectorAll('nav a')]
    const link = links.find(a => a.textContent.trim().toLowerCase() === text.toLowerCase())
    return link ? window.getComputedStyle(link).backgroundColor : null
  }, linkText)
}

/** Return true if the nav link has aria-current="page" */
async function isNavLinkActive(page, linkText) {
  return page.evaluate((text) => {
    const links = [...document.querySelectorAll('nav a')]
    const link = links.find(a => a.textContent.trim().toLowerCase() === text.toLowerCase())
    return link ? link.getAttribute('aria-current') === 'page' : false
  }, linkText)
}

test.describe('IPW-23 — Navbar active state: Experience vs Skills', () => {
  test.beforeEach(async ({ page }) => {
    await goToSite(page)
    // Ensure we start from the very top
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
    await page.waitForTimeout(400)
  })

  // ─── TC-01: Core bug reproduction ────────────────────────────────────────────
  test('TC-01 Experience active — Skills NOT active — when Experience is in view', async ({ page }) => {
    await scrollToSection(page, 'experience')

    const expActive = await isNavLinkActive(page, 'Experience')
    const skillsActive = await isNavLinkActive(page, 'Skills')

    expect(expActive, 'Experience nav link should be aria-current="page"').toBe(true)
    expect(skillsActive, 'Skills nav link must NOT be active when Experience is in view').toBe(false)
  })

  // ─── TC-02: Inverse — Skills active when Skills is in view ───────────────────
  test('TC-02 Skills active — Experience NOT active — when Skills is in view', async ({ page }) => {
    await scrollToSection(page, 'skills')

    const skillsActive = await isNavLinkActive(page, 'Skills')
    const expActive = await isNavLinkActive(page, 'Experience')

    expect(skillsActive, 'Skills nav link should be aria-current="page"').toBe(true)
    expect(expActive, 'Experience nav link must NOT be active when Skills is in view').toBe(false)
  })

  // ─── TC-03: About section activates About link ───────────────────────────────
  test('TC-03 About link is active when About section is in view', async ({ page }) => {
    await scrollToSection(page, 'about')

    const aboutActive = await isNavLinkActive(page, 'About')
    expect(aboutActive, 'About nav link should be active when About is in view').toBe(true)

    // No other link should be active simultaneously
    const expActive = await isNavLinkActive(page, 'Experience')
    const skillsActive = await isNavLinkActive(page, 'Skills')
    expect(expActive).toBe(false)
    expect(skillsActive).toBe(false)
  })

  // ─── TC-04: Current Focus activates correctly ────────────────────────────────
  test('TC-04 Current Focus link is active when Current Focus section is in view', async ({ page }) => {
    await scrollToSection(page, 'current-focus')

    const cfActive = await isNavLinkActive(page, 'Current Focus')
    expect(cfActive, 'Current Focus nav link should be active').toBe(true)

    const skillsActive = await isNavLinkActive(page, 'Skills')
    const expActive = await isNavLinkActive(page, 'Experience')
    expect(skillsActive).toBe(false)
    expect(expActive).toBe(false)
  })

  // ─── TC-05: Contact activates correctly ──────────────────────────────────────
  test('TC-05 Contact link is active when Contact section is in view', async ({ page }) => {
    await scrollToSection(page, 'contact')

    const contactActive = await isNavLinkActive(page, 'Contact')
    expect(contactActive, 'Contact nav link should be active').toBe(true)

    const skillsActive = await isNavLinkActive(page, 'Skills')
    expect(skillsActive).toBe(false)
  })

  // ─── TC-06: Full scroll-through — every section activates in DOM order ────────
  test('TC-06 Scrolling through all sections activates each in correct order', async ({ page }) => {
    const sectionsInOrder = [
      { id: 'about', label: 'About' },
      { id: 'skills', label: 'Skills' },
      { id: 'experience', label: 'Experience' },
      { id: 'current-focus', label: 'Current Focus' },
      { id: 'contact', label: 'Contact' },
    ]

    for (const { id, label } of sectionsInOrder) {
      await scrollToSection(page, id)
      const active = await isNavLinkActive(page, label)
      expect(active, `${label} should be active when scrolled to #${id}`).toBe(true)
    }
  })

  // ─── TC-07: Regression — clicking Experience still scrolls to experience ──────
  test('TC-07 Clicking Experience nav link scrolls to #experience section', async ({ page }) => {
    await scrollToSection(page, 'contact') // start at bottom
    const expLink = page.getByRole('link', { name: /^experience$/i })
    await expLink.click()
    await page.waitForTimeout(SCROLL_SETTLE)
    await expect(page.locator('#experience')).toBeInViewport()
  })

  // ─── TC-08: Regression — clicking Skills still scrolls to skills ─────────────
  test('TC-08 Clicking Skills nav link scrolls to #skills section', async ({ page }) => {
    await scrollToSection(page, 'contact') // start at bottom
    const skillsLink = page.getByRole('link', { name: /^skills$/i })
    await skillsLink.click()
    await page.waitForTimeout(SCROLL_SETTLE)
    await expect(page.locator('#skills')).toBeInViewport()
  })
})
