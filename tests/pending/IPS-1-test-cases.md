# IPS-1 — Test Cases
## "Where to start" section — Add GitHub link

**Ticket:** IPS-1  
**Summary:** At home page in where to start section add a link to my Git  
**Type:** Task  
**Priority:** Medium  
**Generated:** 2026-04-16  
**Screenshots:** None attached

---

## Acceptance Criteria (parsed from ticket)

1. Link should have a GitHub icon in SVG format like other links
2. Link should lead to https://github.com/InderNz
3. Link should have same font, animations as other links in "Where to start" section
4. Do not change anything else on the page

---

## Test Cases

### TC-01 — GitHub link is visible in "Where to start" section [P1 — Critical | Positive]
**Objective:** Verify the GitHub link appears in the "Where to start" navigation block on the Hero section.  
**Steps:**
1. Navigate to http://localhost:5173
2. Wait for page to load (networkidle)
3. Locate the "Where to start" label
4. Confirm a link with text matching "GitHub" (or similar) is visible in that section

**Expected:** A GitHub link is rendered and visible within the "Where to start" block alongside the existing 5 links.

---

### TC-02 — GitHub link href points to https://github.com/InderNz [P1 — Critical | Positive]
**Objective:** Verify the link navigates to the correct GitHub profile URL.  
**Steps:**
1. Navigate to http://localhost:5173
2. Locate the GitHub link in the "Where to start" section
3. Read the `href` attribute value

**Expected:** `href` equals `https://github.com/InderNz`

---

### TC-03 — GitHub link opens in a new tab [P1 — High | Positive]
**Objective:** Verify the link opens in a new browser tab (standard behaviour for external links).  
**Steps:**
1. Navigate to http://localhost:5173
2. Locate the GitHub link in the "Where to start" section
3. Check the `target` attribute

**Expected:** `target="_blank"` and `rel` includes `noopener noreferrer`

---

### TC-04 — GitHub SVG icon is present and visible [P1 — High | Positive]
**Objective:** Verify an SVG icon is rendered inline before the link label, matching the icon pattern of other links.  
**Steps:**
1. Navigate to http://localhost:5173
2. Locate the GitHub link in the "Where to start" section
3. Confirm an `<svg>` element is present within the link

**Expected:** An inline SVG element is visible inside the GitHub link element, sized consistently with other icons (12×12).

---

### TC-05 — GitHub link hover animation matches other "Where to start" links [P2 — Medium | Positive]
**Objective:** Verify that hovering the GitHub link produces the same translateX(4px) slide and colour change as other links.  
**Steps:**
1. Navigate to http://localhost:5173
2. Hover over an existing link (e.g., "My background")
3. Observe colour and transform change
4. Hover over the GitHub link
5. Compare visual behaviour

**Expected:** GitHub link changes colour to `#b84a0a` and slides right by 4px on hover, identical to existing links.

---

### TC-06 — All existing "Where to start" links still present (regression) [P1 — Critical | Negative / Regression]
**Objective:** Verify that adding the GitHub link does not remove or break any of the 5 existing "Where to start" links.  
**Steps:**
1. Navigate to http://localhost:5173
2. Locate the "Where to start" block
3. Confirm all 5 existing links are still visible: "My background", "My work history", "Skills & certifications", "Explore my current focus", "Get in touch"

**Expected:** All 5 existing links remain visible and functional. No regressions.

---

### TC-07 — GitHub link visible on mobile (375×812 iPhone) [P2 — Medium | Edge Case]
**Objective:** Verify the GitHub link is visible and not clipped or hidden on a small mobile viewport.  
**Steps:**
1. Set viewport to 375×812 (iPhone SE/14)
2. Navigate to http://localhost:5173
3. Scroll to the Hero section
4. Locate the "Where to start" block
5. Confirm GitHub link is visible and fully readable

**Expected:** GitHub link renders fully within the mobile viewport, icon and label both visible, no overflow or clipping.

---

### TC-08 — No horizontal scroll introduced on any viewport [P2 — Medium | Edge Case]
**Objective:** Adding the new link must not break the layout and cause horizontal scrolling.  
**Steps:**
1. Navigate to http://localhost:5173 at 375px, 768px and 1280px widths
2. Check `document.body.scrollWidth <= document.body.clientWidth`

**Expected:** `scrollWidth <= clientWidth` at all 3 viewport widths. No horizontal scroll.

---

## Summary

| # | Test Case | Priority | Type |
|---|---|---|---|
| TC-01 | GitHub link visible in "Where to start" | P1 Critical | Positive |
| TC-02 | Link href = https://github.com/InderNz | P1 Critical | Positive |
| TC-03 | Link opens in new tab (target=_blank) | P1 High | Positive |
| TC-04 | GitHub SVG icon present and visible | P1 High | Positive |
| TC-05 | Hover animation matches other links | P2 Medium | Positive |
| TC-06 | All 5 existing links still present | P1 Critical | Regression |
| TC-07 | Visible on iPhone 375×812 viewport | P2 Medium | Edge Case |
| TC-08 | No horizontal scroll on any viewport | P2 Medium | Edge Case |
