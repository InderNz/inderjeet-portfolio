# IPW-1 — Test Cases
## Remove the 4 stat boxes from the home page

**Ticket:** IPW-1
**Project:** IPW — Inder Portfolio Website
**Summary:** Remove the boxes from the home page
**Type:** Task
**Priority:** Medium
**Generated:** 2026-04-16
**Screenshots:** 1 attachment read (Screenshot 2026-04-16 at 10.22.40 AM.png)

---

## Screenshot Description

The attachment shows 4 glassmorphism stat cards in the Hero section arranged in a 2×2 grid:
- Top-left: **QA LEADERSHIP** — "20+ Years, Quinnox · Shawbrook · HAY Bank · Intel · Netcradle"
- Top-right: **DEFECT REDUCTION** — "37%/yr Less leakage, Shift-left across domains"
- Bottom-left: **PEAK TEAM** — "120+ Members led, Built and lead small and big teams"
- Bottom-right: **CERTIFICATIONS** — "6 Active + in progress, SAFe · PRINCE2 · ISTQB"

These 4 cards are the boxes to be removed.

---

## Acceptance Criteria (parsed from ticket)

1. All 4 stat boxes must be removed from the home page
2. No other changes on the page
3. Everything else remains in the same place as before

---

## Test Cases

### TC-01 — Stat box labels are not present on the page [P1 — Critical | Positive]
**Objective:** Verify all 4 stat box label headings are removed from the DOM.
**Steps:**
1. Navigate to http://localhost:5173
2. Wait for page to load (networkidle)
3. Check that "QA LEADERSHIP", "DEFECT REDUCTION", "PEAK TEAM", "CERTIFICATIONS" label text is not present

**Expected:** None of the 4 stat label strings are visible anywhere on the page.

---

### TC-02 — Hero name and title still visible (regression) [P1 — Critical | Regression]
**Objective:** Verify removing the boxes did not affect the Hero name, title or tagline.
**Steps:**
1. Navigate to http://localhost:5173
2. Confirm "Inderjeet Singh" heading is visible
3. Confirm "AI Quality Engineering Leader" title is visible
4. Confirm the tagline text is visible

**Expected:** Hero name, title and tagline remain visible and unaffected.

---

### TC-03 — "Where to start" section still present with all links (regression) [P1 — Critical | Regression]
**Objective:** Verify the "Where to start" navigation block and all its links are intact.
**Steps:**
1. Navigate to http://localhost:5173
2. Confirm "Where to start" label is visible
3. Confirm all 6 links are visible: My background, My work history, Skills & certifications, Explore my current focus, Get in touch, My GitHub

**Expected:** All 6 "Where to start" links remain visible and unaffected.

---

### TC-04 — About section still visible below Hero (regression) [P1 — High | Regression]
**Objective:** Verify the About section remains intact and accessible after the boxes are removed.
**Steps:**
1. Navigate to http://localhost:5173
2. Scroll to the About section
3. Confirm the About heading is visible
4. Confirm the 4 About highlight cards are still present

**Expected:** About section renders correctly with no layout disruption.

---

### TC-05 — No visual gap or layout break introduced [P2 — Medium | Positive]
**Objective:** Verify that removing the 4 boxes does not leave a large blank space or break the Hero layout.
**Steps:**
1. Navigate to http://localhost:5173
2. Inspect the Hero section
3. Verify the Hero section still renders as a coherent layout

**Expected:** Hero section looks correct without the boxes — no orphaned whitespace causing layout issues.

---

### TC-06 — No horizontal scroll on any viewport after removal [P2 — Medium | Edge Case]
**Objective:** Verify the removal does not introduce horizontal overflow.
**Steps:**
1. Navigate at 375px, 768px, and 1280px viewport widths
2. Check document.documentElement.scrollWidth <= clientWidth at each

**Expected:** scrollWidth <= clientWidth at all 3 widths. No horizontal scroll.

---

### TC-07 — Page loads and Hero visible on iPhone 375×812 (mobile) [P2 — Medium | Edge Case]
**Objective:** Verify the page loads correctly on mobile with boxes removed — no blank hero or broken layout.
**Steps:**
1. Set viewport to 375×812
2. Navigate to http://localhost:5173
3. Confirm Hero heading "Inderjeet Singh" is visible
4. Confirm the 4 box labels are not present

**Expected:** Mobile Hero renders correctly. Stat box labels absent. Name/tagline visible.

---

## Summary

| # | Test Case | Priority | Type |
|---|---|---|---|
| TC-01 | All 4 stat box labels removed from page | P1 Critical | Positive |
| TC-02 | Hero name, title, tagline still visible | P1 Critical | Regression |
| TC-03 | Where to start section + all 6 links intact | P1 Critical | Regression |
| TC-04 | About section still visible | P1 High | Regression |
| TC-05 | No layout gap or break in Hero | P2 Medium | Positive |
| TC-06 | No horizontal scroll on any viewport | P2 Medium | Edge Case |
| TC-07 | Mobile 375×812 — Hero correct, boxes gone | P2 Medium | Edge Case |
