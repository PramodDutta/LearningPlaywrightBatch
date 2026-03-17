/**
 * Mock Jira REST API Server
 *
 * A lightweight mock of Jira's REST API for development and learning.
 * Supports creating, reading, and listing issues.
 * No external dependencies - uses Node's built-in http module.
 *
 * START: node jira_mock_server.js
 * PORT: 3001 (default) or set PORT env variable
 *
 * ENDPOINTS:
 *   POST   /rest/api/2/issue          - Create an issue
 *   GET    /rest/api/2/issue/:key     - Get an issue by key
 *   GET    /rest/api/2/search         - List all issues
 *   GET    /health                    - Health check
 */

const http = require('http');

const PORT = process.env.PORT || 3001;
const PROJECT_KEY = process.env.PROJECT_KEY || 'STLC';

// In-memory issue storage
const issues = [];
let issueCounter = 0;

/**
 * Parse the request body as JSON
 */
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => { body += chunk; });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        reject(new Error('Invalid JSON'));
      }
    });
    req.on('error', reject);
  });
}

/**
 * Send a JSON response
 */
function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data, null, 2));
}

/**
 * Handle incoming requests
 */
async function handleRequest(req, res) {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const path = url.pathname;
  const method = req.method;

  // CORS headers for browser-based clients
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Health check
  if (path === '/health') {
    sendJSON(res, 200, { status: 'ok', issues: issues.length });
    return;
  }

  // CREATE ISSUE - POST /rest/api/2/issue
  if (method === 'POST' && path === '/rest/api/2/issue') {
    try {
      const body = await parseBody(req);
      const fields = body.fields || {};

      issueCounter++;
      const key = `${PROJECT_KEY}-${issueCounter}`;

      const issue = {
        id: String(issueCounter),
        key,
        self: `http://localhost:${PORT}/rest/api/2/issue/${key}`,
        fields: {
          project: fields.project || { key: PROJECT_KEY },
          summary: fields.summary || 'No summary',
          description: fields.description || '',
          issuetype: fields.issuetype || { name: 'Bug' },
          priority: fields.priority || { name: 'Medium' },
          status: { name: 'Open' },
          created: new Date().toISOString(),
          labels: fields.labels || [],
          assignee: fields.assignee || null,
        },
      };

      issues.push(issue);

      // Pretty print the created ticket
      console.log('\n\x1b[32m================================\x1b[0m');
      console.log(`\x1b[32m  TICKET CREATED: ${key}\x1b[0m`);
      console.log('\x1b[32m================================\x1b[0m');
      console.log(`  Summary:  ${issue.fields.summary}`);
      console.log(`  Type:     ${issue.fields.issuetype.name}`);
      console.log(`  Priority: ${issue.fields.priority.name}`);
      console.log(`  Status:   ${issue.fields.status.name}`);
      if (issue.fields.description) {
        const desc = issue.fields.description.substring(0, 100);
        console.log(`  Desc:     ${desc}${issue.fields.description.length > 100 ? '...' : ''}`);
      }
      console.log('\x1b[32m================================\x1b[0m\n');

      sendJSON(res, 201, { id: issue.id, key: issue.key, self: issue.self });
    } catch (e) {
      sendJSON(res, 400, { errorMessages: [e.message] });
    }
    return;
  }

  // GET ISSUE - GET /rest/api/2/issue/:key
  const issueMatch = path.match(/^\/rest\/api\/2\/issue\/(.+)$/);
  if (method === 'GET' && issueMatch) {
    const key = issueMatch[1];
    const issue = issues.find((i) => i.key === key);

    if (issue) {
      sendJSON(res, 200, issue);
    } else {
      sendJSON(res, 404, { errorMessages: [`Issue ${key} not found`] });
    }
    return;
  }

  // SEARCH ISSUES - GET /rest/api/2/search
  if (method === 'GET' && path === '/rest/api/2/search') {
    const maxResults = parseInt(url.searchParams.get('maxResults') || '50', 10);
    sendJSON(res, 200, {
      startAt: 0,
      maxResults,
      total: issues.length,
      issues: issues.slice(0, maxResults),
    });
    return;
  }

  // 404 for unknown routes
  sendJSON(res, 404, { errorMessages: [`Route not found: ${method} ${path}`] });
}

// Create and start the server
const server = http.createServer(handleRequest);

server.listen(PORT, () => {
  console.log('\n\x1b[36m========================================\x1b[0m');
  console.log('\x1b[36m  Mock Jira Server Running\x1b[0m');
  console.log('\x1b[36m========================================\x1b[0m');
  console.log(`  URL:      http://localhost:${PORT}`);
  console.log(`  Project:  ${PROJECT_KEY}`);
  console.log(`  Health:   http://localhost:${PORT}/health`);
  console.log('\x1b[36m========================================\x1b[0m');
  console.log('\nEndpoints:');
  console.log('  POST /rest/api/2/issue     - Create issue');
  console.log('  GET  /rest/api/2/issue/:key - Get issue');
  console.log('  GET  /rest/api/2/search    - List issues');
  console.log('\nWaiting for requests...\n');
});
