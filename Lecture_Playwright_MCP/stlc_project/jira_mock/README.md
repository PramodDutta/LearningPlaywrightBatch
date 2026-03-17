# Jira Integration

## Mock Jira Server (Default)

The mock server simulates Jira's REST API for local development. No Jira account required.

### Start the Mock Server

```bash
node jira_mock_server.js
```

Runs on `http://localhost:3001` by default.

### Test with curl

```bash
# Create an issue
curl -X POST http://localhost:3001/rest/api/2/issue \
  -H "Content-Type: application/json" \
  -d '{"fields": {"summary": "Test bug", "description": "Found a bug", "issuetype": {"name": "Bug"}}}'

# Get an issue
curl http://localhost:3001/rest/api/2/issue/STLC-1

# List all issues
curl http://localhost:3001/rest/api/2/search
```

---

## Connecting to Real Jira Cloud

### 1. Get an API Token

1. Go to https://id.atlassian.com/manage-profile/security/api-tokens
2. Click "Create API token"
3. Copy the token

### 2. Set Environment Variables

```bash
export JIRA_URL="https://your-company.atlassian.net"
export JIRA_EMAIL="your-email@company.com"
export JIRA_API_TOKEN="your-api-token-here"
```

### 3. Update Project Config

In `stlc_project/config/project_config.js`, set:

```javascript
jira: {
  useMock: false,  // Switch to real Jira
}
```

### 4. Create a Jira Project

Create a project with key `STLC` in your Jira instance, or change the `projectKey` in the config.

---

## Using Jira MCP (Future)

When a Jira MCP server is available, add to your MCP settings:

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

Then the AI agent can create tickets directly via MCP tool calls instead of REST API.
