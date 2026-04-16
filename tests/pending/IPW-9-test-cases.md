# IPW-9 — Test Cases
## move EXPERTISE Skills & Certifications section above Experience section

**Ticket:** IPW-9  
**Type:** Task  
**Priority:** Medium  
**Date generated:** 2026-04-16  

---

### Summary of Change
The Skills section (id="skills") currently renders after the Experience section (id="experience") in Home.jsx.
This task requires the Skills section to be moved above the Experience section.

**Current order:** Hero → About → Experience → Skills → Contact  
**Expected order:** Hero → About → Skills → Experience → Contact

---

### Acceptance Criteria (parsed from ticket)
1. The Skills/Expertise/Certifications section renders above the Experience section in page scroll order.
2. No other changes occur — all navigation links work, all section content is intact.

---

## Test Cases

### TC-01 — Skills section appears above Experience section in DOM order
**Priority:** P1 Critical  
**Type:** Positive  
**Description:** Verify the Skills section (id="skills") is positioned above the Experience section (id="experience") in the rendered page.  
**Steps:**
1. Navigate to http://localhost:5173
2. Wait for page to load (networkidle)
3. Get bounding box / offsetTop of #skills and #experience sections
**Expected:** The top Y position of #skills is less than the top Y position of #experience

---

### TC-02 — Navbar "Skills" link scrolls to the Skills section
**Priority:** P1 Critical  
**Type:** Positive  
**Description:** Clicking the Skills nav link scrolls to the correct Skills section.  
**Steps:**
1. Navigate to http://localhost:5173
2. Wait for page to load
3. Click the navbar link that targets #skills
4. Wait for scroll to complete
**Expected:** The Skills section heading (e.g. "Expertise, Skills & Certifications") is visible in the viewport

---

### TC-03 — Navbar "Experience" link scrolls to the Experience section
**Priority:** P1 Critical  
**Type:** Positive  
**Description:** Clicking the Experience nav link scrolls to the correct Experience section.  
**Steps:**
1. Navigate to http://localhost:5173
2. Wait for page to load
3. Click the navbar link that targets #experience
4. Wait for scroll to complete
**Expected:** The Experience section heading is visible in the viewport

---

### TC-04 — Skills section content is fully intact after reorder
**Priority:** P1 Critical  
**Type:** Positive  
**Description:** Moving the section must not lose any content — all skill categories and certifications must still render.  
**Steps:**
1. Navigate to http://localhost:5173
2. Scroll to the Skills section
**Expected:**
- Skills section is visible
- Key content present: skill categories (e.g. Test Strategy, AI/ML Testing, Automation, Tools) and certifications section
- No blank areas or missing content within the section

---

### TC-05 — Experience section content is fully intact after reorder
**Priority:** P1 Critical  
**Type:** Positive  
**Description:** The Experience section must still display all employer/client data correctly.  
**Steps:**
1. Navigate to http://localhost:5173
2. Scroll to the Experience section
**Expected:**
- Experience section is visible
- Quinnox (18 years) is shown
- Client engagements (Shawbrook Bank, HAY Bank, Waste Management) are shown
- No missing cards or blank content

---

### TC-06 — "See my skills →" inline link still navigates to Skills section
**Priority:** P2 High  
**Type:** Positive  
**Description:** The inline "See my skills →" anchor link (which appears in the Current Focus / About area) should still resolve correctly to the Skills section after the reorder.  
**Steps:**
1. Navigate to http://localhost:5173
2. Find and click the "See my skills →" link
3. Wait for scroll
**Expected:** Viewport scrolls to the Skills section and the section heading is visible

---

### TC-07 — Hero, About, Contact sections are unchanged
**Priority:** P2 High  
**Type:** Negative / Regression  
**Description:** Confirm that sections not mentioned in the ticket (Hero, About, Contact) are unaffected.  
**Steps:**
1. Navigate to http://localhost:5173
2. Verify Hero section is visible and contains name / tagline
3. Scroll to About section — verify it renders
4. Scroll to Contact section — verify it renders with email, LinkedIn, location
**Expected:** All three sections render correctly with original content

---

### TC-08 — All navbar links work after reorder (full smoke)
**Priority:** P2 High  
**Type:** Regression  
**Description:** Confirm every navbar anchor link navigates to the correct section.  
**Steps:**
1. Navigate to http://localhost:5173
2. Click each navbar link in sequence: About, Experience, Skills, Contact
3. After each click wait for scroll and confirm the target section is in viewport
**Expected:** Each link scrolls to the correct, uniquely identifiable section

---

### TC-09 — Section order is correct on mobile viewport (375px)
**Priority:** P2 High  
**Type:** Edge Case  
**Description:** Verify the section reorder is reflected on a mobile viewport.  
**Steps:**
1. Set viewport to 375x812 (iPhone SE)
2. Navigate to http://localhost:5173
3. Scroll through the page
**Expected:** Skills section appears before Experience section on mobile as well

---

### TC-10 — Page scroll order matches expected section sequence end-to-end
**Priority:** P3 Medium  
**Type:** Positive / Smoke  
**Description:** Scrolling from top to bottom of the page encounters sections in the new correct order.  
**Steps:**
1. Navigate to http://localhost:5173
2. Record the order of section ids encountered while scrolling (hero, about, skills, experience, contact)
**Expected:** Order is exactly: hero → about → skills → experience → contact
