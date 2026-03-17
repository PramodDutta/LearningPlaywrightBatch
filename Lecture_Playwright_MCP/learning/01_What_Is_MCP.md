# What is MCP (Model Context Protocol)?

## Introduction

**MCP (Model Context Protocol)** is an open standard created by **Anthropic** that enables AI models (like Claude) to connect to external tools, data sources, and services through a unified protocol.

### The USB-C Analogy

Think of MCP like a **USB-C port** for AI:
- Before USB-C, every device had its own charger/connector
- USB-C provides ONE standard port that works with everything
- Similarly, MCP provides ONE standard protocol for AI to connect to ANY tool

**Without MCP:**
```
AI <--custom code--> Tool A
AI <--different API--> Tool B
AI <--another adapter--> Tool C
```

**With MCP:**
```
AI <--MCP--> Tool A
AI <--MCP--> Tool B
AI <--MCP--> Tool C
```

## Why Does MCP Matter?

### The Problem It Solves

Before MCP, connecting AI to external tools required:
1. Custom API integrations for each tool
2. Different authentication methods for each service
3. Unique data formats and protocols
4. Maintaining N different integrations

### The MCP Solution

MCP provides:
- **One protocol** to connect AI to any tool
- **Standardized tool discovery** - AI can ask "what tools are available?"
- **Consistent request/response format** - same structure for every tool
- **Security built-in** - controlled access to tools and data

## The Three Roles in MCP

### 1. Host (The AI Application)

The host is the application that runs the AI model. Examples:
- **Claude Desktop** - Anthropic's desktop app
- **Claude Code** - CLI tool for developers
- **VS Code with Claude extension**
- **Your custom AI application**

The host is responsible for:
- Managing MCP client connections
- Presenting tool results to the AI model
- Handling user permissions and approvals

### 2. Client (The Protocol Handler)

The client lives inside the host and handles the MCP protocol:
- Discovers available servers
- Sends tool call requests
- Receives and parses responses
- Maintains connection state

Think of the client as the **translator** between the AI and the tools.

### 3. Server (The Tool Provider)

The server exposes tools that the AI can use. Examples:
- **Playwright MCP Server** - provides browser automation tools
- **Jira MCP Server** - provides issue tracking tools
- **File System MCP Server** - provides file read/write tools
- **GitHub MCP Server** - provides repository management tools

Each server:
- Declares what tools it offers (tool schemas)
- Handles tool execution requests
- Returns results in MCP format

## How MCP Communication Works

### Step 1: Discovery
```
Host: "What tools do you have?"
Server: "I have: browser_navigate, browser_click, browser_fill_form, ..."
```

### Step 2: Tool Call
```
AI: "I need to navigate to example.com"
Host -> Client -> Server: { tool: "browser_navigate", args: { url: "https://example.com" } }
```

### Step 3: Result
```
Server -> Client -> Host -> AI: { result: "Navigated to https://example.com successfully" }
```

## Transport Mechanisms

MCP supports two transport methods:

### stdio (Standard Input/Output)
- Server runs as a **child process**
- Communication through stdin/stdout pipes
- Best for **local tools** (file system, local databases)
- Most common for desktop applications

```
Host Process
  └── spawns Server Process
       ├── stdin  (Host -> Server)
       └── stdout (Server -> Host)
```

### HTTP with SSE (Server-Sent Events)
- Server runs as a **web service**
- Communication over HTTP
- Best for **remote tools** (cloud APIs, shared services)
- Supports multiple concurrent clients

```
Host ──HTTP POST──> Server (tool calls)
Host <──SSE──────── Server (results, notifications)
```

## MCP vs Traditional API Integration

| Feature | Traditional API | MCP |
|---------|----------------|-----|
| Discovery | Read docs manually | Automatic tool discovery |
| Format | Different per API | Standardized JSON-RPC |
| Auth | API keys, OAuth, etc. | Handled by host |
| AI-Friendly | Must write prompts | Native tool schemas |
| Multi-tool | N integrations | 1 protocol |

## MCP in Test Automation

MCP is particularly powerful for test automation because it allows AI to:

1. **Plan Tests** - Read requirements and generate test plans
2. **Write Tests** - Create test cases based on application behavior
3. **Execute Tests** - Drive browsers, APIs, and databases
4. **Report Defects** - Create tickets in Jira/GitHub Issues
5. **Generate Reports** - Create test execution summaries

This is exactly what we'll build in the STLC project in this lecture!

## Key Terminology

| Term | Definition |
|------|-----------|
| **MCP** | Model Context Protocol - the open standard |
| **Host** | Application running the AI model |
| **Client** | Protocol handler inside the host |
| **Server** | Tool provider (e.g., Playwright MCP) |
| **Tool** | A specific capability (e.g., `browser_click`) |
| **Resource** | Data the server can provide (e.g., file contents) |
| **Prompt** | Pre-built templates the server offers |
| **Transport** | Communication method (stdio or HTTP/SSE) |

## Summary

- MCP is the **universal connector** for AI tools
- It has three roles: **Host**, **Client**, **Server**
- Tools are **discovered automatically** - no manual setup per tool
- It supports **stdio** (local) and **HTTP/SSE** (remote) transports
- For testing, MCP enables **full STLC automation** through AI agents
