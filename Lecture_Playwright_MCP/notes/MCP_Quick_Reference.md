# MCP Quick Reference

## What is MCP?
- **Model Context Protocol** - open standard by Anthropic
- Connects AI models to external tools and data sources
- One protocol for all tool integrations (like USB-C for AI)

## Three Roles
| Role | What it does | Example |
|------|-------------|---------|
| **Host** | Runs the AI model | Claude Code, Claude Desktop |
| **Client** | Handles MCP protocol | Built into the host |
| **Server** | Provides tools | Playwright MCP, Jira MCP |

## Transports
| Transport | Best for | How it works |
|-----------|----------|-------------|
| **stdio** | Local tools | Child process, stdin/stdout |
| **HTTP/SSE** | Remote tools | HTTP POST + Server-Sent Events |

## MCP Message Format (JSON-RPC 2.0)
```json
// Request
{ "jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": { "name": "tool_name", "arguments": {} } }

// Response
{ "jsonrpc": "2.0", "id": 1, "result": { "content": [{ "type": "text", "text": "result" }] } }
```

## Key Methods
| Method | Purpose |
|--------|---------|
| `initialize` | Establish connection |
| `tools/list` | Discover available tools |
| `tools/call` | Execute a tool |
| `resources/list` | List available data resources |
| `resources/read` | Read a resource |

## MCP Server Config Format
```json
{
  "mcpServers": {
    "server-name": {
      "command": "npx",
      "args": ["@package/mcp-server"],
      "env": { "KEY": "value" }
    }
  }
}
```

## Common MCP Servers
| Server | Package | Purpose |
|--------|---------|---------|
| Playwright | `@playwright/mcp` | Browser automation |
| GitHub | `@modelcontextprotocol/server-github` | Repository management |
| Filesystem | `@modelcontextprotocol/server-filesystem` | File operations |
| Slack | `@modelcontextprotocol/server-slack` | Messaging |
