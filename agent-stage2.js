#!/usr/bin/env node
// agent-stage2.js
// Runs when n8n detects a ticket moved to "Selected for Development"
// Calls Claude Code to process the ticket — no permission prompts

import http from 'http'
import { exec } from 'child_process'
import fs from 'fs'

const PORT = 3456
const PORTFOLIO = '/Users/inder/inderjeet-portfolio'
const LOG = `${PORTFOLIO}/.jira-agent/agent.log`

function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}`
  console.log(line)
  fs.mkdirSync(`${PORTFOLIO}/.jira-agent`, { recursive: true })
  fs.appendFileSync(LOG, line + '\n')
}

const server = http.createServer((req, res) => {
  let body = ''
  req.on('data', d => body += d)
  req.on('end', () => {
    log(`Received: ${body}`)
    try {
      const data = JSON.parse(body || '{}')
      const ticket = data.issue?.key || data.key || ''

      if (!ticket) {
        log('No ticket ID found — ignoring')
        res.writeHead(200)
        res.end('ok - no ticket')
        return
      }

      log(`Processing ticket: ${ticket}`)

      const cmd = [
        `cd ${PORTFOLIO}`,
        `export $(grep -v '^#' .env | xargs)`,
        `claude --print --dangerously-skip-permissions "Process Jira ticket ${ticket}"`
      ].join(' && ')

      exec(cmd, { timeout: 300000 }, (err, out, stderr) => {
        if (err) log(`Error: ${err.message}`)
        if (out) log(`Output: ${out.substring(0, 500)}`)
        if (stderr) log(`Stderr: ${stderr.substring(0, 200)}`)
        log(`Finished processing ${ticket}`)
      })

      res.writeHead(200)
      res.end('ok')

    } catch (e) {
      log(`Parse error: ${e.message}`)
      res.writeHead(200)
      res.end('ok')
    }
  })
})

server.listen(PORT, () => {
  log(`Stage 2 agent listening on port ${PORT}`)
  log(`Portfolio: ${PORTFOLIO}`)
  log(`Waiting for Jira webhook...`)
})
