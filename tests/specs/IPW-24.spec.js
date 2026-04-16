/**
 * IPW-24: Scroll-spy active state stuck on Skills when scrolling through Experience section
 *
 * Root cause: The scroll-spy threshold in Navbar.jsx is `window.innerHeight * 0.5`.
 * A section only becomes active when its top edge crosses the MIDDLE of the viewport.
 * While scrolling from Skills → Experience, Experience is visibly entering the viewport
 * from the bottom but its top has not yet reached 50% — so Skills stays highlighted.
 *
 * Fix: Lower the threshold so sections activate when their top is near the top of the
 * viewport (just past the navbar, ~80px), not at the midpoint.
 *
 * AC:
 * 1. When the Experience section top is visible near the top of the viewport, the
 *    Experience nav link is active and Skills is NOT.
 * 2. When the Skills section top is visible near the top of the viewport, the Skills
 *    nav link is active and Experience is NOT.
 * 3. The transition from Skills → Experience is clean: no "stuck on Skills" state
 *    once Experience's top has entered the visible area past the navbar.
 * 4. Regression: all other sections (About, Current Focus, Contact) activate correctly.
 * 5. Regression: clicking navbar links still scrolls to the correct sections.
 */

import { test, expect } from '../fixtures/index.js'
import { goToSite } from '../utils/helpers.js'

const SCROLL_SETTLE = 900

/** Scroll a section's top to the top of the viewport (instant, no animation) */
async function scrollSectionToTop(page, id) {
  await page.evaluate((sectionId) => {
    const el = document.getElementById(sectionId)
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' })
  }, id)
  await page.waitForTimeout(SCROLL_SETTLE)
}

/**
 * Scroll so that a section's top is at a specific fraction of the viewport height.
 * fraction=0   → section top at viewport top
 * fraction=0.6 → section top at 60% of viewport (below midpoint)
 */
async function scrollSectionTopToFraction(page, id, fraction) {
  await page.evaluate(({ sectionId, f }) => {
    const el = document.getElementById(sectionId)
    if (!el) return
    const elTop = el.getBoundingClientRect().top + window.scrollY
    const targetScroll = elTop - window.innerHeight * f
    window.scrollTo({ top: targetScroll, behavior: 'instant' })
  }, { sectionId: id, f: fraction })
  await page.waitForTimeout(SCROLL_SETTLE)
}

/** Return true if the nav link (by visible text) has aria-current="page" */
async function isNavLinkActive(page, linkText) {
  return page.evaluate((text) => {
    const links = [...document.querySelectorAll('nav a')]
    const link = links.find(a => a.textContent.trim().toLowerCase() === text.toLowerCase())
    return link ? link.getAttribute('aria-current') === 'page' : false
  }, linkText)
}

test.describe('IPW-24 — Scroll-spy: no "stuck on Skills" when in Experience', () => {
  test.beforeEach(async ({ page }) => {
    await goToSite(page)
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
    await page.waitForTimeout(400)
  })

  // ── TC-01: Core bug — Experience top at viewport top → Experience active ────────
  test('TC-01 Experience active when its top is at the top of the viewport', async ({ page }) => {
    await scrollSectionToTop(page, 'experience')

    const expActive = await isNavLinkActive(page, 'Experience')
    const skillsActive = await isNavLinkActive(page, 'Skills')

    expect(expActive, 'Experience link should be aria-current="page" when scrolled to top').toBe(true)
    expect(skillsActive, 'Skills link must NOT be active when Experience is at viewport top').toBe(false)
  })

  // ── TC-02: Core bug — Experience entering from below (below midpoint) → Experience active ─
  test('TC-02 Experience active when its top is entering the upper viewport area (below midpoint)', async ({ page }) => {
    // Position experience's top at 40% of viewport — below 50% midpoint, clearly entering view
    await scrollSectionTopToFraction(page, 'experience', 0.4)

    const expActive = await isNavLinkActive(page, 'Experience')
    const skillsActive = await isNavLinkActive(page, 'Skills')

    expect(expActive, 'Experience should be active once its top is in the upper viewport').toBe(true)
    expect(skillsActive, 'Skills must NOT be stuck as active when Experience is entering view').toBe(false)
  })

  // ── TC-03: Skills active when Skills top is at viewport top ─────────────────────
  test('TC-03 Skills active — Experience NOT active — when Skills top is at viewport top', async ({ page }) => {
    await scrollSectionToTop(page, 'skills')

    const skillsActive = await isNavLinkActive(page, 'Skills')
    const expActive = await isNavLinkActive(page, 'Experience')

    expect(skillsActive, 'Skills link should be active when scrolled to #skills').toBe(true)
    expect(expActive, 'Experience link must NOT be active when viewing Skills').toBe(false)
  })

  // ── TC-04: Scrolled deep into Experience → Experience still active ───────────────
  test('TC-04 Experience remains active when scrolled deep into the Experience section', async ({ page }) => {
    // Scroll so experience top is well above the viewport (deeply inside the section)
    await page.evaluate(() => {
      const el = document.getElementById('experience')
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY
        // Move 400px past the experience section top
        window.scrollTo({ top: top + 400, behavior: 'instant' })
      }
    })
    await page.waitForTimeout(SCROLL_SETTLE)

    const expActive = await isNavLinkActive(page, 'Experience')
    const skillsActive = await isNavLinkActive(page, 'Skills')

    expect(expActive, 'Experience should still be active when scrolled deeply within it').toBe(true)
    expect(skillsActive, 'Skills must not become active while inside Experience section').toBe(false)
  })

  // ── TC-05: About activates correctly (regression) ────────────────────────────────
  test('TC-05 About link is active when About section is at the viewport top', async ({ page }) => {
    await scrollSectionToTop(page, 'about')

    const aboutActive = await isNavLinkActive(page, 'About')
    const skillsActive = await isNavLinkActive(page, 'Skills')
    const expActive = await isNavLinkActive(page, 'Experience')

    expect(aboutActive, 'About link should be active').toBe(true)
    expect(skillsActive).toBe(false)
    expect(expActive).toBe(false)
  })

  // ── TC-06: Current Focus activates correctly (regression) ────────────────────────
  test('TC-06 Current Focus link is active when Current Focus is at the viewport top', async ({ page }) => {
    await scrollSectionToTop(page, 'current-focus')

    const cfActive = await isNavLinkActive(page, 'Current Focus')
    const expActive = await isNavLinkActive(page, 'Experience')
    const skillsActive = await isNavLinkActive(page, 'Skills')

    expect(cfActive, 'Current Focus link should be active').toBe(true)
    expect(expActive).toBe(false)
    expect(skillsActive).toBe(false)
  })

  // ── TC-07: Full scroll-through in DOM order (regression) ─────────────────────────
  test('TC-07 Each section activates its nav link in DOM order', async ({ page }) => {
    const sections = [
      { id: 'about', label: 'About' },
      { id: 'skills', label: 'Skills' },
      { id: 'experience', label: 'Experience' },
      { id: 'current-focus', label: 'Current Focus' },
      { id: 'contact', label: 'Contact' },
    ]

    for (const { id, label } of sections) {
      await scrollSectionToTop(page, id)
      const active = await isNavLinkActive(page, label)
      expect(active, `${label} should be active when scrolled to #${id}`).toBe(true)
    }
  })

  // ── TC-08: Clicking Experience nav link scrolls to #experience (regression) ──────
  test('TC-08 Clicking Experience nav link scrolls to the Experience section', async ({ page }) => {
    await scrollSectionToTop(page, 'contact') // start at bottom
    const expLink = page.getByRole('link', { name: /^experience$/i })
    await expLink.click()
    await page.waitForTimeout(SCROLL_SETTLE)
    await expect(page.locator('#experience')).toBeInViewport()
  })

  // ── TC-09: Clicking Skills nav link scrolls to #skills (regression) ──────────────
  test('TC-09 Clicking Skills nav link scrolls to the Skills section', async ({ page }) => {
    await scrollSectionToTop(page, 'contact') // start at bottom
    const skillsLink = page.getByRole('link', { name: /^skills$/i })
    await skillsLink.click()
    await page.waitForTimeout(SCROLL_SETTLE)
    await expect(page.locator('#skills')).toBeInViewport()
  })
})
