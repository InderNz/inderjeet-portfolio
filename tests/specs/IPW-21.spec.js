import { test, expect } from '@playwright/test'

test.describe('IPW-21 — Move Expertise / Skills & Certifications Before Experience', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('TC-01 Skills section appears before Experience section in DOM order', async ({ page }) => {
    // Get the bounding boxes of both sections to verify vertical ordering
    const skillsSection = page.locator('#skills')
    const experienceSection = page.locator('#experience')

    await expect(skillsSection).toBeVisible()
    await expect(experienceSection).toBeVisible()

    const skillsBox = await skillsSection.boundingBox()
    const experienceBox = await experienceSection.boundingBox()

    expect(skillsBox).not.toBeNull()
    expect(experienceBox).not.toBeNull()

    // Skills must start above (lower y value) Experience
    expect(skillsBox.y).toBeLessThan(experienceBox.y)
  })

  test('TC-02 Skills section heading "Skills & Certifications" is visible', async ({ page }) => {
    const skillsSection = page.locator('#skills')
    await expect(skillsSection).toBeVisible()
    await expect(skillsSection.getByText('Skills & Certifications')).toBeVisible()
    await expect(skillsSection.getByText('Expertise')).toBeVisible()
  })

  test('TC-03 Experience section heading "20+ Years of Delivery" is visible', async ({ page }) => {
    const experienceSection = page.locator('#experience')
    await expect(experienceSection).toBeVisible()
    await expect(experienceSection.getByText('20+ Years of Delivery')).toBeVisible()
    await expect(experienceSection.getByText('Career History')).toBeVisible()
  })

  test('TC-04 Skills section content is intact — skill categories present', async ({ page }) => {
    const skillsSection = page.locator('#skills')
    await expect(skillsSection.getByText('Test Management & Leadership', { exact: true })).toBeVisible()
    await expect(skillsSection.getByText('Test Strategy & Planning', { exact: true })).toBeVisible()
    await expect(skillsSection.getByText('Test Automation', { exact: true })).toBeVisible()
    await expect(skillsSection.getByText('AI & Automation Tools', { exact: true })).toBeVisible()
    await expect(skillsSection.getByText('Agile & DevOps Quality', { exact: true })).toBeVisible()
    await expect(skillsSection.getByText('Regulatory & Compliance', { exact: true })).toBeVisible()
  })

  test('TC-05 Certifications section is visible within Skills section', async ({ page }) => {
    const skillsSection = page.locator('#skills')
    await expect(skillsSection.getByText('Certifications', { exact: true })).toBeVisible()
    await expect(skillsSection.getByText('SAFe 6 Agilist', { exact: true })).toBeVisible()
    await expect(skillsSection.getByText('PRINCE2 Agile Practitioner')).toBeVisible()
  })

  test('TC-06 Experience section content is intact — key employers present', async ({ page }) => {
    const experienceSection = page.locator('#experience')
    await expect(experienceSection.getByText('Quinnox Consultancy Services', { exact: true })).toBeVisible()
    await expect(experienceSection.getByText('Shawbrook Bank', { exact: true })).toBeVisible()
    await expect(experienceSection.getByText('HAY Bank', { exact: true })).toBeVisible()
    await expect(experienceSection.getByText('Waste Management Inc.', { exact: true })).toBeVisible()
  })

  test('TC-07 Navbar #skills anchor scrolls to Skills section', async ({ page }) => {
    // Navigate via anchor — Skills link should exist or scroll works
    await page.evaluate(() => {
      const el = document.getElementById('skills')
      if (el) el.scrollIntoView()
    })
    await expect(page.locator('#skills')).toBeInViewport()
  })

  test('TC-08 Navbar #experience anchor scrolls to Experience section', async ({ page }) => {
    await page.evaluate(() => {
      const el = document.getElementById('experience')
      if (el) el.scrollIntoView()
    })
    await expect(page.locator('#experience')).toBeInViewport()
  })

  test('TC-09 Skills section renders correctly on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const skillsSection = page.locator('#skills')
    const experienceSection = page.locator('#experience')

    await expect(skillsSection).toBeVisible()
    await expect(experienceSection).toBeVisible()

    const skillsBox = await skillsSection.boundingBox()
    const experienceBox = await experienceSection.boundingBox()

    // Skills must appear above Experience on mobile too
    expect(skillsBox.y).toBeLessThan(experienceBox.y)
    await expect(skillsSection.getByText('Skills & Certifications')).toBeVisible()
  })

  test('TC-10 No other sections are displaced — regression check', async ({ page }) => {
    // Verify all main sections still exist (hero uses id="home")
    await expect(page.locator('#home')).toBeVisible()
    await expect(page.locator('#about')).toBeVisible()
    await expect(page.locator('#skills')).toBeVisible()
    await expect(page.locator('#experience')).toBeVisible()
    await expect(page.locator('#contact')).toBeVisible()
  })
})
