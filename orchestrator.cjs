// orchestrator.js — AutoSDLC for inderjeet-portfolio
// Polls Jira every 30s. Your Mac calls Jira. Jira never calls your Mac.
// Run: node orchestrator.js

const { execSync, spawn } = require('child_process');
const https = require('https');
const path = require('path');
const fs = require('fs');

// ─── CONFIG ────────────────────────────────────────────────────────────────
const JIRA_HOST    = 'inderprofile.atlassian.net';
const JIRA_EMAIL   = process.env.JIRA_EMAIL;
const JIRA_TOKEN   = process.env.JIRA_API_TOKEN;
const PROJECT_KEY  = 'IPW';
const PORTFOLIO    = '/Users/inder/inderjeet-portfolio';
const POLL_MS      = 30_000;

// Transition IDs — confirmed from your Jira board
const T = {
  SELECTED_FOR_DEV : '21',
  IN_PROGRESS      : '31',   // used as "Waiting for Approval"
  IN_TEST          : '61',
  COMPLETED        : '51',
};

// ─── VALIDATION ─────────────────────────────────────────────────────────────
if (!JIRA_EMAIL || !JIRA_TOKEN) {
  console.error('[ERROR] JIRA_EMAIL or JIRA_API_TOKEN not set. Run: export $(grep -v "^#" .env | xargs)');
  process.exit(1);
}

// ─── JIRA API ────────────────────────────────────────────────────────────────
function jiraRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const auth = Buffer.from(`${JIRA_EMAIL}:${JIRA_TOKEN}`).toString('base64');
    const opts = {
      hostname: JIRA_HOST,
      path,
      method,
      headers: {
        'Authorization': `Basic ${auth}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    };
    const req = https.request(opts, (res) => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch { resolve(data); }
      });
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

function jiraGet(path)         { return jiraRequest('GET', path); }
function jiraPost(path, body)  { return jiraRequest('POST', path, body); }
function jiraPut(path, body)   { return jiraRequest('PUT', path, body); }

async function transitionTicket(key, transitionId) {
  await jiraPost(`/rest/api/3/issue/${key}/transitions`, {
    transition: { id: transitionId }
  });
  log(`[JIRA] ${key} → transition ${transitionId}`);
}

async function postComment(key, text) {
  await jiraPost(`/rest/api/3/issue/${key}/comment`, {
    body: {
      type: 'doc', version: 1,
      content: [{ type: 'paragraph', content: [{ type: 'text', text }] }]
    }
  });
}

async function createSubtask(parentKey, summary, tcId) {
  const res = await jiraPost('/rest/api/3/issue', {
    fields: {
      project:   { key: PROJECT_KEY },
      parent:    { key: parentKey },
      summary:   `${tcId} — ${summary}`,
      issuetype: { name: 'Subtask' },
      priority:  { name: 'High' },
    }
  });
  return res.key;
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function log(msg) {
  console.log(`[${new Date().toISOString()}] ${msg}`);
}

function runClaude(promptText, key) {
  return new Promise((resolve) => {
    log(`[CLAUDE] Running prompt for ${key} (${promptText.length} chars)`);
    const tmpFile = `/tmp/claude-prompt-${key}.txt`;
    fs.writeFileSync(tmpFile, promptText, { mode: 0o600 });

    const child = spawn('claude', ['--print', '--dangerously-skip-permissions'], {
      cwd: PORTFOLIO,
      env: { ...process.env },
      stdio: ['pipe', 'pipe', 'pipe'],
    });

    fs.createReadStream(tmpFile).pipe(child.stdin);

    let stdout = '';
    let stderr = '';
    child.stdout.on('data', d => { stdout += d; });
    child.stderr.on('data', d => { stderr += d; });

    const timer = setTimeout(() => {
      child.kill();
      log(`[CLAUDE] Timeout for ${key}`);
    }, 300_000);

    child.on('close', () => {
      clearTimeout(timer);
      try { fs.unlinkSync(tmpFile); } catch {}
      if (stderr) log(`[CLAUDE STDERR] ${stderr.slice(0, 200)}`);
      resolve(stdout);
    });
  });
}

function runPlaywright(specFile) {
  try {
    const out = execSync(
      `cd ${PORTFOLIO} && npx playwright test ${specFile} --reporter=json 2>/dev/null`,
      { timeout: 120_000, encoding: 'utf8' }
    );
    const report = JSON.parse(out);
    const passed = report.stats?.expected ?? 0;
    const failed = report.stats?.unexpected ?? 0;
    return { passed, failed, total: passed + failed };
  } catch (e) {
    const output = e.stdout || '';
    try {
      const report = JSON.parse(output);
      const passed = report.stats?.expected ?? 0;
      const failed = report.stats?.unexpected ?? 0;
      return { passed, failed, total: passed + failed };
    } catch {
      return { passed: 0, failed: -1, total: -1, error: e.message.slice(0, 200) };
    }
  }
}

// ─── STAGE 2: TICKET PICKED UP ───────────────────────────────────────────────
// Fires when ticket moves to "Selected for Development"
async function runStage2(ticket) {
  const key = ticket.key;
  if (!/^[A-Z]+-\d+$/.test(key)) {
    log(`[SECURITY] Rejected invalid issue key: ${key}`);
    return;
  }
  const summary = ticket.fields.summary;
  const description = ticket.fields.description?.content
    ?.flatMap(b => b.content?.map(c => c.text) ?? [])
    .join(' ') ?? 'No description provided.';

  log(`[STAGE 2] Starting for ${key}: ${summary}`);

  // Move to In Progress (Waiting for Approval)
  await transitionTicket(key, T.IN_PROGRESS);

  // Ask Claude to generate test cases as JSON
  const tcPrompt = [
    `You are a QA engineer. Read this Jira ticket and generate test cases.`,
    `Ticket: ${key}`,
    `Summary: ${summary}`,
    `Description: ${description}`,
    ``,
    `Return ONLY a JSON array, no other text, no markdown fences. Format:`,
    `[{"id":"TC-01","summary":"short test case title","steps":"what to do","expected":"what should happen"},...]`,
    `Generate between 4 and 8 test cases covering happy path, edge cases, and regression.`,
  ].join('\n');

  const claudeOut = await runClaude(tcPrompt, key);

  // Parse test cases — find the JSON array in Claude's output
  let testCases = [];
  try {
    const match = claudeOut.match(/\[[\s\S]*\]/);
    if (match) testCases = JSON.parse(match[0]);
  } catch {
    log(`[STAGE 2] Could not parse test cases from Claude output`);
    await postComment(key, `[AutoSDLC] Stage 2 failed: could not parse test cases. Raw output:\n${claudeOut.slice(0, 500)}`);
    return;
  }

  if (!testCases.length) {
    await postComment(key, `[AutoSDLC] Stage 2: Claude returned no test cases.`);
    return;
  }

  // Create subtasks in Jira
  const subtaskKeys = [];
  for (const tc of testCases) {
    const subKey = await createSubtask(key, tc.summary, tc.id);
    subtaskKeys.push({ tcId: tc.id, key: subKey, ...tc });
    log(`[STAGE 2] Created subtask ${subKey} for ${tc.id}`);
  }

  // Save subtask map locally so Stage 3 can update them
  const mapPath = path.join(PORTFOLIO, `.jira-agent/${key}-subtasks.json`);
  fs.mkdirSync(path.dirname(mapPath), { recursive: true });
  fs.writeFileSync(mapPath, JSON.stringify({ key, subtasks: subtaskKeys }, null, 2));

  // Post test cases as Jira comment
  const tcTable = testCases.map(tc =>
    `${tc.id}: ${tc.summary}\n  Steps: ${tc.steps}\n  Expected: ${tc.expected}`
  ).join('\n\n');

  await postComment(key, [
    `[AutoSDLC] Stage 2 complete — ${testCases.length} test cases generated.`,
    ``,
    tcTable,
    ``,
    `To proceed: reply APPROVE on this ticket.`,
    `To reject: reply REJECT with your feedback.`,
  ].join('\n'));

  log(`[STAGE 2] Done for ${key} — ${testCases.length} TCs, waiting for APPROVE`);
}

// ─── STAGE 3: APPROVED — WRITE TESTS + BUILD FEATURE ───────────────────────
async function runStage3(ticket) {
  const key = ticket.key;
  if (!/^[A-Z]+-\d+$/.test(key)) {
    log(`[SECURITY] Rejected invalid issue key: ${key}`);
    return;
  }
  const summary = ticket.fields.summary;

  log(`[STAGE 3] Starting for ${key}`);
  await transitionTicket(key, T.IN_TEST);

  const mapPath = path.join(PORTFOLIO, `.jira-agent/${key}-subtasks.json`);
  let subtasks = [];
  if (fs.existsSync(mapPath)) {
    subtasks = JSON.parse(fs.readFileSync(mapPath, 'utf8')).subtasks ?? [];
  }

  // Ask Claude to write Playwright tests AND implement the feature
  const buildPrompt = [
    `You are a full-stack developer and QA engineer working on the inderjeet-portfolio React/Vite site.`,
    ``,
    `Jira ticket: ${key}`,
    `Summary: ${summary}`,
    ``,
    `Your tasks in order:`,
    `1. Read CLAUDE.md for project context and rules`,
    `2. Write Playwright test specs in tests/specs/${key}.spec.js covering all acceptance criteria`,
    `3. Run the tests — they will fail because the feature does not exist yet`,
    `4. Implement the feature in the correct source file (check src/ for the right component)`,
    `5. Run the Playwright tests again until all pass`,
    `6. When all tests pass, stop and report: PASS:<n> FAIL:<n>`,
    ``,
    `Rules:`,
    `- This is a single-page scroll site — never add new routes`,
    `- Dev server runs on localhost:5173`,
    `- Keep all existing content intact — regression only`,
    `- Brand colours: #D4762A (orange), #1a1a2e (dark)`,
  ].join('\n');

  const claudeOut = await runClaude(buildPrompt, key);
  log(`[STAGE 3] Claude finished building`);

  // Run Playwright to get final results
  const specFile = `tests/specs/${key}.spec.js`;
  const specPath = path.join(PORTFOLIO, specFile);
  let results = { passed: 0, failed: 0, total: 0 };

  if (fs.existsSync(specPath)) {
    results = runPlaywright(specFile);
  } else {
    log(`[STAGE 3] No spec file found at ${specPath}`);
  }

  // Update subtask statuses
  for (const st of subtasks) {
    const passed = results.failed === 0;
    await transitionTicket(st.key, passed ? T.COMPLETED : T.IN_TEST);
    if (!passed) {
      await postComment(st.key, `[AutoSDLC] Test failed. Feature build in progress.`);
    }
  }

  // Post results to parent ticket
  const resultLine = results.total < 0
    ? `Tests could not run — check spec file.`
    : `${results.passed}/${results.total} tests passed.`;

  if (results.failed === 0 && results.total > 0) {
    await transitionTicket(key, T.COMPLETED);
    await postComment(key, [
      `[AutoSDLC] Stage 3 complete.`,
      resultLine,
      `All tests green. Feature is live at localhost:5173.`,
      `Review the changes then push to GitHub when ready.`,
    ].join('\n'));
    log(`[STAGE 3] COMPLETE for ${key} — ${results.passed}/${results.total} passing`);
  } else {
    await postComment(key, [
      `[AutoSDLC] Stage 3 finished with failures.`,
      resultLine,
      results.error ? `Error: ${results.error}` : '',
      `Claude output summary: ${claudeOut.slice(-400)}`,
    ].join('\n'));
    log(`[STAGE 3] Finished with failures for ${key} — ${results.passed}/${results.total}`);
  }
}

// ─── POLLING LOOPS ────────────────────────────────────────────────────────────
const processing = new Set(); // prevent double-processing same ticket

async function pollForPickedUp() {
  try {
    const jql = encodeURIComponent(
      `project=${PROJECT_KEY} AND status="Selected for Development" AND issuetype=Story ORDER BY updated ASC`
    );
    const res = await jiraGet(`/rest/api/3/search/jql?jql=${jql}&fields=key,summary,description&maxResults=5`);
    const issues = res.issues ?? [];

    for (const issue of issues) {
      if (processing.has(issue.key)) continue;
      processing.add(issue.key);
      runStage2(issue).finally(() => processing.delete(issue.key));
    }
  } catch (e) {
    log(`[POLL] Error in stage2 poll: ${e.message}`);
  }
}

async function pollForApproval() {
  try {
    const jql = encodeURIComponent(
      `project=${PROJECT_KEY} AND status="In Progress" AND issuetype=Story ORDER BY updated ASC`
    );
    const res = await jiraGet(`/rest/api/3/search/jql?jql=${jql}&fields=key,summary,comment&maxResults=5`);
    const issues = res.issues ?? [];

    for (const issue of issues) {
      if (processing.has(issue.key)) continue;
      const comments = issue.fields?.comment?.comments ?? [];
      const hasApprove = comments.some(c => {
        const text = c.body?.content
          ?.flatMap(b => b.content?.map(x => x.text) ?? [])
          .join(' ') ?? '';
        return text.trim().toUpperCase().includes('APPROVE');
      });

      if (hasApprove) {
        processing.add(issue.key);
        log(`[POLL] APPROVE detected on ${issue.key}`);
        runStage3(issue).finally(() => processing.delete(issue.key));
      }
    }
  } catch (e) {
    log(`[POLL] Error in stage3 poll: ${e.message}`);
  }
}

// ─── STARTUP ──────────────────────────────────────────────────────────────────
log(`[AutoSDLC] Starting — project ${PROJECT_KEY}, polling every ${POLL_MS / 1000}s`);
log(`[AutoSDLC] Portfolio: ${PORTFOLIO}`);
log(`[AutoSDLC] Watching for: "Selected for Development" → Stage 2`);
log(`[AutoSDLC] Watching for: APPROVE comment → Stage 3`);
log(`[AutoSDLC] Press Ctrl+C to stop`);

pollForPickedUp();
pollForApproval();
setInterval(pollForPickedUp, POLL_MS);
setInterval(pollForApproval, POLL_MS);
