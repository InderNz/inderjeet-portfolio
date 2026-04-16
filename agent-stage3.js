#!/usr/bin/env node
// agent-stage3.js
// Polls Jira every 30 seconds for APPROVE comments on tickets in Waiting for Approval
// When found — triggers Claude Code Stage 3 automatically

import { exec, execSync } from 'child_process'
import fs from 'fs'

const PORTFOLIO   = '/Users/inder/inderjeet-portfolio'
const JIRA_HOST   = 'https://inderprofile.atlassian.net'
const PROJECT_KEY = 'IPW'
const POLL_MS     = 30000
const LOG         = `${PORTFOLIO}/.jira-agent/agent.log`
const APPROVED    = `${PORTFOLIO}/.jira-agent/approved.json`

function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}`
  console.log(line)
  fs.mkdirSync(`${PORTFOLIO}/.jira-agent`, { recursive: true })
  fs.appendFileSync(LOG, line + '\n')
}

// Load .env credentials
function loadEnv() {
  const env = fs.readFileSync(`${PORTFOLIO}/.env`, 'utf8')
  env.split('\n').forEach(line => {
    if (line.startsWith('#') || !line.includes('=')) return
    const [k, ...v] = line.split('=')
    process.env[k.trim()] = v.join('=').trim()
  })
}

function getApproved() {
  try { return JSON.parse(fs.readFileSync(APPROVED, 'utf8')) } catch { return {} }
}

function saveApproved(data) {
  fs.writeFileSync(APPROVED, JSON.stringify(data, null, 2))
}

// Find tickets in "Waiting for Approval" column (status = In Progress, id 31)
function getWaitingTickets() {
  try {
    const cmd = `curl -s -u "${process.env.JIRA_EMAIL}:${process.env.JIRA_API_TOKEN}" \
      -H "Accept: application/json" \
      "${JIRA_HOST}/rest/api/3/search?jql=project=${PROJECT_KEY}+AND+status='In+Progress'+AND+issuetype=Story&fields=key,summary,comment"`
    const out = execSync(cmd, { timeout: 15000 }).toString()
    const data = JSON.parse(out)
    return data.issues || []
  } catch (e) {
    log(`Error fetching tickets: ${e.message}`)
    return []
  }
}

// Check if ticket has APPROVE comment
function hasApproval(issue) {
  const comments = issue.fields?.comment?.comments || []
  return comments.some(c => {
    const text = JSON.stringify(c.body || '')
    return text.toUpperCase().includes('APPROVE')
  })
}

function triggerStage3(ticketId) {
  log(`APPROVE detected on ${ticketId} — triggering Stage 3`)

  const cmd = [
    `cd ${PORTFOLIO}`,
    `export $(grep -v '^#' .env | xargs)`,
    `claude --print --dangerously-skip-permissions "approve ${ticketId}"`
  ].join(' && ')

  exec(cmd, { timeout: 600000 }, (err, out) => {
    if (err) log(`Stage 3 error: ${err.message}`)
    if (out) log(`Stage 3 output: ${out.substring(0, 500)}`)
    log(`Stage 3 complete for ${ticketId}`)
  })
}

async function poll() {
  log('Polling Jira for APPROVE comments...')
  const approved = getApproved()
  const tickets = getWaitingTickets()

  if (tickets.length === 0) {
    log('No tickets in Waiting for Approval')
    return
  }

  log(`Found ${tickets.length} ticket(s) waiting: ${tickets.map(t => t.key).join(', ')}`)

  for (const issue of tickets) {
    const id = issue.key

    if (approved[id]) {
      log(`${id} already approved — skipping`)
      continue
    }

    if (hasApproval(issue)) {
      approved[id] = new Date().toISOString()
      saveApproved(approved)
      triggerStage3(id)
    } else {
      log(`${id} — no APPROVE yet`)
    }
  }
}

// Start
loadEnv()
log('Stage 3 approval watcher started')
log(`Polling every ${POLL_MS / 1000}s for APPROVE comments`)

poll()
setInterval(poll, POLL_MS)
