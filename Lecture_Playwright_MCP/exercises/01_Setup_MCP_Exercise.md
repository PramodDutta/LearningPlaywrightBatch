# Exercise 1: Setting Up MCP

## Objective
Learn how to configure and verify MCP servers in your development environment.

## Prerequisites
- Node.js 18+ installed
- Claude Code or Claude Desktop installed

## Tasks

### Task 1: Install Playwright MCP

```bash
npm install @playwright/mcp
```

Verify the installation by checking `node_modules/@playwright/mcp` exists.

### Task 2: Configure MCP Server

Add the Playwright MCP server to your Claude Code settings:

1. Open your project's `.claude/settings.json`
2. Add the Playwright MCP configuration
3. Restart Claude Code

**Your config should look like:**
```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

### Task 3: Verify MCP Connection

In Claude Code, ask:
- "List all available Playwright MCP tools"
- Verify you see tools like `browser_navigate`, `browser_click`, etc.

### Task 4: Run Your First MCP Command

Ask Claude to:
1. Navigate to `https://example.com`
2. Take a snapshot of the page
3. Tell you the page title

## Expected Outcome
- MCP server is configured and running
- You can see available tools
- Claude can navigate and interact with web pages

## Verification Questions
1. How many Playwright MCP tools are available?
2. What transport does Playwright MCP use? (stdio or HTTP)
3. What's the difference between a snapshot and a screenshot?
