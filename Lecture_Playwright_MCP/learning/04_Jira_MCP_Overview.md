# Jira MCP Overview

## What is Jira MCP?

**Jira MCP** is an MCP server that exposes Jira's issue tracking capabilities as tools that an AI agent can use. It enables automatic defect reporting, issue searching, and project management through MCP.

## Why Jira MCP for Test Automation?

In a typical STLC, when tests fail:
1. QA manually reviews the failure
2. QA creates a Jira ticket with details
3. QA assigns the ticket and sets priority
4. This process repeats for every failure

**With Jira MCP:**
1. Tests run automatically
2. AI agent detects failures
3. AI creates Jira tickets instantly with full context
4. AI can even suggest priority based on error type

## Conceptual Jira MCP Tools

A Jira MCP server would expose these tools:

| Tool | Description | Parameters |
|------|-------------|------------|
| `create_issue` | Create a new Jira issue | `project`, `summary`, `description`, `type`, `priority` |
| `search_issues` | Search issues with JQL | `jql`, `maxResults` |
| `get_issue` | Get issue details | `issueKey` |
| `update_issue` | Update an existing issue | `issueKey`, `fields` |
| `add_comment` | Add comment to issue | `issueKey`, `body` |
| `transition_issue` | Change issue status | `issueKey`, `transition` |
| `assign_issue` | Assign issue to user | `issueKey`, `accountId` |
| `attach_file` | Attach file to issue | `issueKey`, `filePath` |

## Setting Up Jira MCP

### Option 1: Using an Existing Jira MCP Package

Several community MCP servers exist for Jira:

```json
{
  "mcpServers": {
    "jira": {
      "command": "npx",
      "args": ["@anthropic/jira-mcp"],
      "env": {
        "JIRA_URL": "https://your-company.atlassian.net",
        "JIRA_EMAIL": "your-email@company.com",
        "JIRA_API_TOKEN": "your-api-token"
      }
    }
  }
}
```

### Option 2: Using Jira REST API Directly

If no MCP server is available, you can use Jira's REST API:

```javascript
// Create an issue via Jira REST API
const response = await fetch('https://your-company.atlassian.net/rest/api/2/issue', {
  method: 'POST',
  headers: {
    'Authorization': `Basic ${Buffer.from(`${email}:${apiToken}`).toString('base64')}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    fields: {
      project: { key: 'STLC' },
      summary: 'Test Failure: Login page title mismatch',
      description: 'Expected: "Login Page"\nActual: "Wrong Title"\nTest: 08_wrong_title.spec.js',
      issuetype: { name: 'Bug' },
      priority: { name: 'High' },
    },
  }),
});
```

### Option 3: Mock Jira Server (Used in This Project)

For learning and development, we use a mock Jira server:

```bash
# Start the mock server
node stlc_project/jira_mock/jira_mock_server.js

# It runs on http://localhost:3001
# Supports the same REST API endpoints as real Jira
```

See `stlc_project/jira_mock/README.md` for details.

## Getting a Jira API Token

1. Go to https://id.atlassian.com/manage-profile/security/api-tokens
2. Click "Create API token"
3. Give it a label (e.g., "MCP Integration")
4. Copy the token
5. Set environment variables:
   ```bash
   export JIRA_URL="https://your-company.atlassian.net"
   export JIRA_EMAIL="your-email@company.com"
   export JIRA_API_TOKEN="your-token-here"
   ```

## How Jira MCP Fits in STLC

```
Test Execution (Playwright MCP)
        │
        ▼
   Tests Fail
        │
        ▼
Parse Failure Details
   - Test name
   - Error message
   - Screenshot path
   - Stack trace
        │
        ▼
Create Jira Ticket (Jira MCP)
   - Summary: "Test Failure: {test name}"
   - Description: Full error details
   - Type: Bug
   - Priority: Based on severity
   - Attachments: Screenshots
        │
        ▼
Ticket Created: STLC-123
```

## Mapping Test Failures to Jira Fields

| Test Failure Info | Jira Field | Example |
|-------------------|------------|---------|
| Test name | Summary | "Test Failure: Login page title mismatch" |
| Error + stack trace | Description | Full error details with formatting |
| Test category | Labels | ["automation", "regression"] |
| Failure screenshot | Attachment | `test-results/screenshot.png` |
| First failure | Priority | High |
| Flaky/intermittent | Priority | Medium |
| Test file path | Custom Field | `tests/08_wrong_title.spec.js` |

## Best Practices

1. **Check for duplicates** before creating tickets - search JQL for similar issues
2. **Include context** - error messages, screenshots, steps to reproduce
3. **Set appropriate priority** - not every test failure is critical
4. **Link related tickets** - if multiple tests fail from the same cause
5. **Auto-close tickets** - when tests pass again in the next run
6. **Use labels** - tag tickets as "automation-reported" for easy filtering

## Summary

- Jira MCP automates defect reporting from test failures
- It uses the same REST API as Jira Cloud
- Our project uses a mock server for learning (zero setup required)
- The mock can be swapped for real Jira by changing env variables
