# Jira MCP Setup Guide

## Option 1: Mock Server (No Setup Required)

```bash
node stlc_project/jira_mock/jira_mock_server.js
# Runs on http://localhost:3001
```

**Endpoints:**
- `POST /rest/api/2/issue` - Create issue
- `GET /rest/api/2/issue/:key` - Get issue
- `GET /rest/api/2/search` - List issues
- `GET /health` - Health check

---

## Option 2: Real Jira Cloud

### Step 1: Get API Token
1. Go to https://id.atlassian.com/manage-profile/security/api-tokens
2. Click "Create API token"
3. Label: "STLC Automation"
4. Copy the token

### Step 2: Set Environment Variables
```bash
export JIRA_URL="https://your-company.atlassian.net"
export JIRA_EMAIL="your-email@company.com"
export JIRA_API_TOKEN="your-token-here"
```

### Step 3: Create a Project
- Create a project in Jira with key `STLC`
- Or change `projectKey` in `config/project_config.js`

### Step 4: Update Config
```javascript
// config/project_config.js
jira: {
  useMock: false,  // Switch to real Jira
}
```

---

## Option 3: Jira MCP Server

### Configure
```json
{
  "mcpServers": {
    "jira": {
      "command": "npx",
      "args": ["@anthropic/jira-mcp"],
      "env": {
        "JIRA_URL": "https://company.atlassian.net",
        "JIRA_EMAIL": "email@company.com",
        "JIRA_API_TOKEN": "token"
      }
    }
  }
}
```

### Available Tools
| Tool | Purpose |
|------|---------|
| `create_issue` | Create bug/task/story |
| `search_issues` | Search with JQL |
| `get_issue` | Get issue details |
| `update_issue` | Update fields |
| `add_comment` | Add comment |
| `transition_issue` | Change status |

---

## Quick Test (curl)

```bash
# Create issue
curl -X POST http://localhost:3001/rest/api/2/issue \
  -H "Content-Type: application/json" \
  -d '{"fields":{"summary":"Test","issuetype":{"name":"Bug"}}}'

# Get issue
curl http://localhost:3001/rest/api/2/issue/STLC-1

# List all
curl http://localhost:3001/rest/api/2/search
```
