# MCP Architecture Diagrams

## 1. High-Level Architecture

```mermaid
graph TB
    subgraph Host["Host (AI Application)"]
        AI["AI Model (Claude)"]
        subgraph Clients["MCP Clients"]
            C1["Client 1"]
            C2["Client 2"]
            C3["Client 3"]
        end
    end

    subgraph Servers["MCP Servers"]
        S1["Playwright MCP Server"]
        S2["Jira MCP Server"]
        S3["File System MCP Server"]
    end

    AI --> C1
    AI --> C2
    AI --> C3
    C1 <-->|MCP Protocol| S1
    C2 <-->|MCP Protocol| S2
    C3 <-->|MCP Protocol| S3

    S1 --> Browser["Browser"]
    S2 --> Jira["Jira Cloud"]
    S3 --> FS["File System"]
```

**Key Insight:** One Host can connect to multiple Servers simultaneously. Each Server provides different tools, but they all speak the same MCP protocol.

---

## 2. MCP Request/Response Lifecycle

```mermaid
sequenceDiagram
    participant User
    participant AI as AI Model
    participant Client as MCP Client
    participant Server as MCP Server
    participant Tool as External Tool

    User->>AI: "Navigate to example.com and click login"

    Note over AI: Decides to use browser_navigate tool

    AI->>Client: Tool call: browser_navigate(url: "example.com")
    Client->>Server: JSON-RPC Request
    Server->>Tool: Execute browser navigation
    Tool-->>Server: Navigation complete
    Server-->>Client: JSON-RPC Response (success)
    Client-->>AI: Tool result: "Page loaded"

    Note over AI: Decides to use browser_click tool

    AI->>Client: Tool call: browser_click(selector: "#login")
    Client->>Server: JSON-RPC Request
    Server->>Tool: Execute click
    Tool-->>Server: Click complete
    Server-->>Client: JSON-RPC Response (success)
    Client-->>AI: Tool result: "Clicked login button"

    AI->>User: "Done! Navigated to example.com and clicked login."
```

---

## 3. Tool Discovery Flow

```mermaid
sequenceDiagram
    participant Host as Host Application
    participant Client as MCP Client
    participant Server as MCP Server

    Note over Host,Server: Initialization Phase

    Host->>Client: Initialize connection to server
    Client->>Server: initialize request
    Server-->>Client: Server capabilities & info
    Client->>Server: tools/list request
    Server-->>Client: Available tools with schemas

    Note over Host: Tools are now registered

    Note over Host,Server: Usage Phase

    Host->>Client: Call tool "browser_navigate"
    Client->>Server: tools/call request
    Server-->>Client: Tool execution result
    Client-->>Host: Formatted result
```

---

## 4. stdio Transport Architecture

```
┌──────────────────────────────────────┐
│           Host Process               │
│  ┌────────────────────────────────┐  │
│  │         AI Model               │  │
│  │    (Claude / GPT / etc.)       │  │
│  └──────────┬─────────────────────┘  │
│             │                        │
│  ┌──────────▼─────────────────────┐  │
│  │       MCP Client               │  │
│  │  - Serializes requests         │  │
│  │  - Parses responses            │  │
│  └──────────┬─────────────────────┘  │
│             │                        │
│     ┌───────┴───────┐                │
│     │ Child Process │                │
│     │  ┌─────────┐  │                │
│     │  │   MCP   │  │                │
│     │  │ Server  │  │                │
│     │  └─────────┘  │                │
│     │               │                │
│     │  stdin ◄──────│── Request      │
│     │  stdout ──────│──► Response    │
│     └───────────────┘                │
└──────────────────────────────────────┘
```

---

## 5. HTTP/SSE Transport Architecture

```
┌─────────────────┐          ┌─────────────────────┐
│  Host Process    │          │   MCP Server         │
│                  │          │   (Remote Service)   │
│  ┌────────────┐  │          │                     │
│  │  AI Model  │  │          │  ┌───────────────┐  │
│  └─────┬──────┘  │          │  │  Tool Handler  │  │
│        │         │          │  └───────────────┘  │
│  ┌─────▼──────┐  │  HTTP    │                     │
│  │ MCP Client ├──┼──POST───►│  /tools/call        │
│  │            │  │          │                     │
│  │            │◄─┼──SSE─────│  Event Stream       │
│  └────────────┘  │          │                     │
└─────────────────┘          └─────────────────────┘
```

---

## 6. Multiple MCP Servers in Test Automation

```mermaid
graph LR
    subgraph AI_Agent["AI Agent (Claude Code)"]
        Brain["AI Brain"]
    end

    subgraph MCP_Servers["Connected MCP Servers"]
        PW["Playwright MCP"]
        JIRA["Jira MCP"]
        FS["File System MCP"]
        GH["GitHub MCP"]
    end

    subgraph Actions["What Each Server Does"]
        A1["Navigate pages\nClick buttons\nFill forms\nTake screenshots"]
        A2["Create issues\nSearch tickets\nUpdate status"]
        A3["Read files\nWrite reports\nCreate test plans"]
        A4["Create PRs\nComment on issues\nRead code"]
    end

    Brain --> PW --> A1
    Brain --> JIRA --> A2
    Brain --> FS --> A3
    Brain --> GH --> A4
```

---

## 7. MCP Message Format (JSON-RPC 2.0)

### Tool List Request
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/list"
}
```

### Tool List Response
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "tools": [
      {
        "name": "browser_navigate",
        "description": "Navigate to a URL in the browser",
        "inputSchema": {
          "type": "object",
          "properties": {
            "url": { "type": "string", "description": "URL to navigate to" }
          },
          "required": ["url"]
        }
      }
    ]
  }
}
```

### Tool Call Request
```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "tools/call",
  "params": {
    "name": "browser_navigate",
    "arguments": {
      "url": "https://example.com"
    }
  }
}
```

### Tool Call Response
```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "result": {
    "content": [
      {
        "type": "text",
        "text": "Navigated to https://example.com"
      }
    ]
  }
}
```

---

## 8. STLC Automation Flow with MCP

```mermaid
graph TD
    A["Start STLC Pipeline"] --> B["Phase 1: Test Planning"]
    B --> |"File MCP: Read template"| C["Generate Test Plan"]
    C --> D["Phase 2: Test Case Design"]
    D --> |"File MCP: Write document"| E["Generate Test Cases"]
    E --> F["Phase 3: Test Execution"]
    F --> |"Playwright MCP: Run tests"| G["Execute 10 Test Cases"]
    G --> H{"All Tests Pass?"}
    H --> |"Yes"| I["Phase 5: Generate Report"]
    H --> |"No"| J["Phase 4: Defect Reporting"]
    J --> |"Jira MCP: Create tickets"| K["Create Jira Tickets for Failures"]
    K --> I
    I --> |"Generate HTML Report"| L["Open HTML Report"]
    L --> M["End STLC Pipeline"]

    style H fill:#ffcc00
    style J fill:#ff6666
    style I fill:#66cc66
```

This is the exact flow implemented in `stlc_project/mcp_scripts/06_full_stlc_pipeline.js`.
