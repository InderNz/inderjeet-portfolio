# QA Agent Pipeline — Inderjeet Singh
# AI QA Specialist Portfolio Project — NZ 2026
# Project: Inder Portfolio Site | inderjeetsingh.nz

---

## Portfolio Site — Everything Codex Needs to Know

**Live URL:**        https://inderjeetsingh.nz
**Dev server:**      http://localhost:5173  (Vite default — NOT 3000)
**GitHub repo:**     https://github.com/InderNz/inderjeet-portfolio-
**Hosting:**         Netlify — auto-deploys on every push to main branch
**Domain:**          inderjeetsingh.nz (DNS via domains.co.nz → Netlify)

**Tech stack:**
- React + Vite (JavaScript — NOT TypeScript)
- Tailwind CSS
- Framer Motion
- Single-page continuous scroll (NOT multi-page routing)
- All sections live in src/pages/Home.jsx
- Navbar scrolls using scrollIntoView and anchor links (#hero, #about etc.)

**Site sections (in order):**
- Hero — name, tagline, animated gyroscope, stats
- About — quality philosophy, 4 highlight cards
- Current Focus — AI QA specialisation, skill pills
- Experience — Quinnox (18 yrs employer) + Shawbrook, HAY Bank, Waste Management (clients)
- Skills — two-column table, 6 categories + certifications
- Contact — email, LinkedIn, location, roles wanted, availability

**Key content facts (never get these wrong):**
- 18 years at Quinnox (Jun 2006 – Mar 2024)
- Total career: 20+ years including Intel Technologies India and Netcradle India
- Shawbrook Bank: Jan 2019 – Mar 2024 (client under Quinnox)
- HAY Bank: Oct 2018 – Dec 2019 (client under Quinnox)
- Waste Management Inc: Feb 2011 – Aug 2017 (client under Quinnox)
- Location: Palmerston North → Auckland, New Zealand
- Tagline: "I am energised by two things: building, leading and growing great testing teams, and helping organisations ship software they can trust — especially as AI systems become central to how products work."

**Test framework:**
- Playwright (JavaScript, NOT TypeScript)
- Tests in: tests/specs/*.spec.js
- Page objects in: tests/pages/*Page.js
- Fixtures in: tests/fixtures/index.js
- Utilities in: tests/utils/helpers.js
- Config: playwright.config.js (baseURL: https://inderjeetsingh.nz for CI, http://localhost:5173 for local)
- CI/CD: .github/workflows/playwright.yml — triggers on every push to main

---

## Jira Connection — Inder Portfolio Site Space

**Host:**        https://inderprofile.atlassian.net
**Space name:**  Inder Portfolio Site
**Project key:** IPS  (if still KAN, use KAN until confirmed)
**Board URL:**   https://inderprofile.atlassian.net/jira/software/projects/IPS/boards

**Note on Jira UI:** Atlassian renamed "Projects" to "Spaces" in late 2025.
Functionality and APIs are unchanged. All REST API calls still use /rest/api/3/.

### Load credentials (run this first, every time before any Jira call)
```bash
export $(grep -v '^#' .env | xargs)
```

### Read a ticket
```bash
curl -s \
  -u "$JIRA_EMAIL:$JIRA_API_TOKEN" \
  -H "Accept: application/json" \
  "https://inderprofile.atlassian.net/rest/api/3/issue/[TICKET-ID]"
```

### Post a comment to a ticket
```bash
curl -s -X POST \
  -u "$JIRA_EMAIL:$JIRA_API_TOKEN" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  "https://inderprofile.atlassian.net/rest/api/3/issue/[TICKET-ID]/comment" \
  -d '{
    "body": {
      "type": "doc",
      "version": 1,
      "content": [{
        "type": "paragraph",
        "content": [{ "type": "text", "text": "[YOUR MESSAGE HERE]" }]
      }]
    }
  }'
```

### Create a sub-task
```bash
curl -s -X POST \
  -u "$JIRA_EMAIL:$JIRA_API_TOKEN" \
  -H "Content-Type: application/json" \
  "https://inderprofile.atlassian.net/rest/api/3/issue" \
  -d '{
    "fields": {
      "project": { "key": "IPS" },
      "parent": { "key": "[TICKET-ID]" },
      "summary": "[TC SUMMARY]",
      "issuetype": { "name": "Subtask" },
      "priority": { "name": "[High|Medium|Low]" },
      "labels": ["ai-generated", "test-case"]
    }
  }'
```

### Get transitions (to move ticket status)
```bash
curl -s \
  -u "$JIRA_EMAIL:$JIRA_API_TOKEN" \
  -H "Accept: application/json" \
  "https://inderprofile.atlassian.net/rest/api/3/issue/[TICKET-ID]/transitions"
```

### Apply a transition (move to Done — ID is usually "31")
```bash
curl -s -X POST \
  -u "$JIRA_EMAIL:$JIRA_API_TOKEN" \
  -H "Content-Type: application/json" \
  "https://inderprofile.atlassian.net/rest/api/3/issue/[TICKET-ID]/transitions" \
  -d '{ "transition": { "id": "31" } }'
```

### Fetch attachments (screenshots pasted into tickets)
```bash
curl -s \
  -u "$JIRA_EMAIL:$JIRA_API_TOKEN" \
  -H "Accept: application/json" \
  "https://inderprofile.atlassian.net/rest/api/3/issue/[TICKET-ID]" \
  | python3 -c "import sys,json; [print(a['content']) for a in json.load(sys.stdin)['fields'].get('attachment',[])]"
```
Download each image URL and read it visually before generating test cases or writing code.
Screenshots may show: UI bugs, design mockups, error messages, mobile layout issues.

---

## CRITICAL RULES — Read Before Every Task

- Always load .env credentials before any Jira API call
- Always work in JavaScript — never TypeScript
- Never skip the human approval gate between Stage 2 and Stage 3
- Always save test cases to tests/pending/ before writing automation
- Always link output back to the Jira ticket ID
- Dev server runs on port 5173 (Vite) — never assume 3000
- Site is single-page scroll — never add separate routes or new pages
- Shawbrook / HAY Bank / Waste Management are CLIENT engagements under Quinnox, not separate employers
- Never push to GitHub without confirmation from Inderjeet
- AC is written in paragraph format — never ask for Given/When/Then, never require it, always parse plain sentences into test conditions
- When in doubt, ask — never guess at AC or content

---

## What Types of Tickets This Pipeline Handles

| Ticket type | Example | What Codex does |
|---|---|---|
| Story | "Add testimonials section" | Generates test cases → writes React component → Playwright tests |
| Bug | "Hero text misaligned on mobile" + screenshot | Reads screenshot → finds CSS → fixes it → regression test |
| Task | "Update LinkedIn URL in footer" | Finds the element → makes the change → smoke test |
| Improvement | "Rewrite hero tagline" | Updates the text → visual regression check |
| Content | "Add HAY Bank to experience" | Finds the section → updates data → content test |

---

## Stage 2 — Jira Ticket → Manual Test Cases

### Trigger
"Process Jira ticket [TICKET-ID]" or new file in .jira-agent/incoming/

### Steps

**Step 1 — Load credentials**
```bash
export $(grep -v '^#' .env | xargs)
```

**Step 2 — Read the ticket**
Use the read curl command above. Extract: summary, description, acceptance criteria, attachments.

**AC format note:** Inderjeet writes acceptance criteria in plain paragraph format, not Given/When/Then.
Example of what you will see:
"The login button should be disabled until both email and password fields have content.
Error messages must appear inline below the relevant field, not as a popup.
On success the user lands on the dashboard within 2 seconds."
Read each sentence as a separate testable condition and generate test cases from it.
Do not ask for Given/When/Then — accept and work with paragraph AC always.

**Step 3 — Read any screenshots**
If the ticket has attachments (screenshots), download and read them visually.
Describe what you see in the screenshot before generating test cases.

**Step 4 — Generate test cases**
Structure:
- TC-01: Happy path
- TC-02 to TC-N: Negative / edge cases
- TC-LAST: Edge cases specific to the portfolio site (mobile, cross-browser)

**Step 5 — Save to disk**
tests/pending/[TICKET-ID]-test-cases.md

**Step 6 — Post summary comment to Jira**
Post this format using the comment curl command:
```
AI QA Agent — Test Cases Generated for [TICKET-ID]

[N] test cases created. Review below and reply APPROVE or REJECT.

| # | Test Case | Priority | Type |
|---|---|---|---|
| TC-01 | [name] | P1 Critical | Positive |
| TC-02 | [name] | P2 High | Negative |

Screenshots read: [yes/no — describe what was seen]
Full test cases: tests/pending/[TICKET-ID]-test-cases.md

Reply APPROVE to generate Playwright scripts
Reply REJECT with feedback to revise
```

**Step 7 — Create sub-tasks**
One per TC using the sub-task curl command.
Priority mapping: P1 → High, P2 → Medium, P3 → Low.
Save returned IDs to: .jira-agent/[TICKET-ID]-subtasks.json

**Step 8 — Stop and wait**
Print:
```
Stage 2 complete for [TICKET-ID]
[N] test cases posted to Jira
[N] sub-tasks created on the board
Review at: https://inderprofile.atlassian.net/browse/[TICKET-ID]
Type: approve [TICKET-ID]
```

---

## Stage 3 — Test Cases → Playwright Automation + Jira Updated

### Trigger
Only after: "approve [TICKET-ID]"

### Steps

**Step 1 — Load credentials**
```bash
export $(grep -v '^#' .env | xargs)
```

**Step 2 — Acknowledge in Jira**
Post comment: "AI QA Agent — Approval received. Writing Playwright scripts now."

**Step 3 — Read test cases**
Read: tests/pending/[TICKET-ID]-test-cases.md

**Step 4 — Start dev server if not running**
```bash
npm run dev &
sleep 3
```

**Step 5 — Write Playwright spec**
Save to: tests/specs/[TICKET-ID].spec.js

Rules:
- JavaScript only — no TypeScript
- One describe() block per ticket
- One test() per TC
- Use page.getByTestId() where possible
- Use expect(locator).toBeVisible()
- await page.waitForLoadState('networkidle') after every navigation
- No page.waitForTimeout() — use proper assertions
- Screenshot on failure: await page.screenshot({ path: `failure-${tcId}.png` })
- baseURL: http://localhost:5173 for local runs

**Step 6 — Write or update Page Object**
Save to: tests/pages/[FeatureName]Page.js
Locators only. If file exists — extend it, never replace.

**Step 7 — Run the tests**
```bash
npx playwright test tests/specs/[TICKET-ID].spec.js --reporter=html
```

**Step 8 — Update sub-tasks in Jira**
Load IDs from: .jira-agent/[TICKET-ID]-subtasks.json
PASSED → transition to Done | FAILED → post error comment

**Step 9 — Post final results to parent ticket and print terminal summary**

---

## Stage 4 — Build the Feature (Portfolio Site Changes)

### Trigger
Only after Stage 3 passes AND "build [TICKET-ID]" is said

### Rules
- All site content lives in src/pages/Home.jsx
- Design: background #f0ede6, accent #c2714f, fonts: Playfair Display / DM Sans / DM Mono
- Never add new routes — single-page scroll only
- Never change anything not mentioned in the ticket
- After changes: verify visually at localhost:5173
- After tests pass: git add . → git commit -m "[TICKET-ID] [summary]" → await push confirmation from Inderjeet

---

## Stage 5 — Test Report
```bash
npx playwright show-report
```

---

## Folder Structure

```
inderjeet-portfolio-/
├── AGENTS.md
├── .env                          (never commit)
├── .gitignore
├── .jira-agent/
│   └── incoming/
│   └── [TICKET-ID]-subtasks.json
├── src/
│   ├── components/
│   └── pages/
│       └── Home.jsx              (ALL sections here)
├── tests/
│   ├── pending/                  (Stage 2 output)
│   ├── specs/                    (Stage 3 output)
│   ├── pages/                    (Page Objects)
│   ├── fixtures/index.js
│   └── utils/helpers.js
├── .github/workflows/playwright.yml
├── playwright.config.js
└── package.json                  ("type": "module" must exist)
```

---

## Command Reference

| You say | What happens |
|---|---|
| "Process Jira ticket IPS-1" | Stage 2 runs |
| "approve IPS-1" | Stage 3 runs |
| "build IPS-1" | Stage 4 runs |
| "show report" | Opens Playwright HTML report |
| "status" | Shows pending/approved/complete |
| "run smoke tests" | Runs all specs against live site |

---

## Error Handling

| Error | Fix |
|---|---|
| 401 Unauthorized | Run: export $(grep -v '^#' .env | xargs) |
| 404 Not Found | Check ticket ID and project key (IPS not KAN) |
| ERR_CONNECTION_REFUSED | Run: npm run dev |
| Port 5173 in use | Run: pkill -f vite then npm run dev |
| Sub-task creation fails | Post test cases as comment table instead |
| Test fails | Fix the code, never skip or xtest |
| AC is ambiguous | Stop and ask Inderjeet |

---

## NZ Context

Quality bar: "Would this impress a CTO at a NZ fintech?" — answer must always be yes.

Inderjeet Singh | inderjeetsingh.nz | Senior QE Leader → AI QA Specialist
20+ years enterprise experience | Palmerston North → Auckland, NZ | 2026
