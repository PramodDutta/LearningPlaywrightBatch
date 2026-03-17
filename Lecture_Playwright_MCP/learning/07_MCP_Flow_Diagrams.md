# MCP Flow Diagrams

## 1. Complete STLC Pipeline with MCP

```mermaid
flowchart TD
    START([Start STLC Pipeline]) --> PLAN

    subgraph PLAN["Phase 1: Test Planning"]
        P1[Read test plan template] --> P2[Populate with project data]
        P2 --> P3[Write test_plan.md]
    end

    PLAN --> DESIGN

    subgraph DESIGN["Phase 2: Test Case Design"]
        D1[Read test case template] --> D2[Generate test cases from requirements]
        D2 --> D3[Write test_cases.md]
    end

    DESIGN --> EXEC

    subgraph EXEC["Phase 3: Test Execution"]
        E1[Run Playwright tests] --> E2[Capture results as JSON]
        E2 --> E3[Generate HTML report]
    end

    EXEC --> ANALYZE

    subgraph ANALYZE["Phase 4: Result Analysis"]
        E3 --> A1{All tests passed?}
        A1 -->|Yes| REPORT
        A1 -->|No| DEFECT
    end

    subgraph DEFECT["Phase 5: Defect Reporting"]
        DF1[Parse failure details] --> DF2[Create Jira tickets]
        DF2 --> DF3[Attach screenshots]
    end

    DEFECT --> REPORT

    subgraph REPORT["Phase 6: Reporting"]
        R1[Compile execution summary]
        R2[Open HTML report]
    end

    REPORT --> END([Pipeline Complete])

    style START fill:#4CAF50,color:#fff
    style END fill:#4CAF50,color:#fff
    style DEFECT fill:#ff6b6b,color:#fff
```

---

## 2. MCP Tool Call Flow

```mermaid
sequenceDiagram
    participant U as User
    participant H as Host (Claude Code)
    participant C as MCP Client
    participant S as MCP Server
    participant B as Browser/Tool

    U->>H: "Test the login page"

    rect rgb(230, 245, 255)
        Note over H,S: Tool Discovery (happens once at startup)
        H->>C: Connect to Playwright MCP
        C->>S: initialize
        S-->>C: capabilities
        C->>S: tools/list
        S-->>C: [browser_navigate, browser_click, ...]
    end

    rect rgb(255, 245, 230)
        Note over H,B: Navigation
        H->>C: browser_navigate("/login")
        C->>S: tools/call
        S->>B: page.goto("/login")
        B-->>S: Page loaded
        S-->>C: Result
        C-->>H: "Navigated to /login"
    end

    rect rgb(230, 255, 230)
        Note over H,B: Interaction
        H->>C: browser_snapshot()
        C->>S: tools/call
        S->>B: page.accessibility.snapshot()
        B-->>S: DOM tree
        S-->>C: Accessibility tree
        C-->>H: Form fields and refs

        H->>C: browser_fill_form(username, "tomsmith")
        C->>S: tools/call
        S->>B: page.fill("#username", "tomsmith")
        B-->>S: Filled
        S-->>C: Result
        C-->>H: "Filled username"
    end

    H->>U: "Login test complete - PASSED"
```

---

## 3. Failure Detection and Jira Ticket Flow

```mermaid
flowchart LR
    subgraph TestExecution["Test Execution"]
        T1[Test 1: PASS] --> R
        T2[Test 2: PASS] --> R
        T3[Test 3: FAIL] --> R
        T4[Test 4: PASS] --> R
        T5[Test 5: FAIL] --> R
        R[Results JSON]
    end

    subgraph Parsing["Parse Results"]
        R --> P[Read results.json]
        P --> F{Filter failures}
        F --> F1[Failure 1:\nTest 3 details]
        F --> F2[Failure 2:\nTest 5 details]
    end

    subgraph JiraCreation["Jira Ticket Creation"]
        F1 --> J1[Create STLC-1:\nTest 3 bug report]
        F2 --> J2[Create STLC-2:\nTest 5 bug report]
    end

    subgraph Output["Output"]
        J1 --> SUM[Summary:\n2 tickets created\nSTLC-1, STLC-2]
        J2 --> SUM
    end

    style T3 fill:#ff6b6b,color:#fff
    style T5 fill:#ff6b6b,color:#fff
    style T1 fill:#4CAF50,color:#fff
    style T2 fill:#4CAF50,color:#fff
    style T4 fill:#4CAF50,color:#fff
```

---

## 4. MCP Server Connection Types

```mermaid
graph TB
    subgraph Host["Host: Claude Code"]
        AI[AI Model]
    end

    subgraph Local["Local Servers (stdio)"]
        FS[File System MCP]
        PW[Playwright MCP]
    end

    subgraph Remote["Remote Servers (HTTP/SSE)"]
        JIRA[Jira MCP]
        GH[GitHub MCP]
        SLACK[Slack MCP]
    end

    AI ===|stdin/stdout| FS
    AI ===|stdin/stdout| PW
    AI -.-|HTTP POST + SSE| JIRA
    AI -.-|HTTP POST + SSE| GH
    AI -.-|HTTP POST + SSE| SLACK

    style Local fill:#e8f5e9
    style Remote fill:#fff3e0
```

---

## 5. Playwright MCP Snapshot Workflow

```mermaid
flowchart TD
    A[AI needs to interact with page] --> B[browser_snapshot]
    B --> C[Receives accessibility tree]
    C --> D{Can AI find the target element?}
    D -->|Yes| E[Get element ref from snapshot]
    D -->|No| F[browser_take_screenshot]
    F --> G[AI visually identifies element]
    G --> E
    E --> H{What action needed?}
    H -->|Click| I[browser_click with ref]
    H -->|Type| J[browser_fill_form with ref]
    H -->|Select| K[browser_select_option with ref]
    H -->|Hover| L[browser_hover with ref]
    I --> M[Action complete]
    J --> M
    K --> M
    L --> M
    M --> N{More actions needed?}
    N -->|Yes| A
    N -->|No| O[Done]
```

---

## 6. End-to-End STLC Pipeline Script Flow

```
06_full_stlc_pipeline.js
│
├── Step 1: Generate Test Plan
│   ├── Read: templates/test_plan_template.md
│   ├── Process: Replace placeholders with project data
│   └── Write: documents/test_plan.md
│
├── Step 2: Generate Test Cases
│   ├── Read: templates/test_case_template.md
│   ├── Process: Generate 10 test case entries
│   └── Write: documents/test_cases.md
│
├── Step 3: Execute Tests
│   ├── Run: npx playwright test
│   ├── Output: reports/results.json (JSON reporter)
│   └── Output: reports/html-report/ (HTML reporter)
│
├── Step 4: Parse Results
│   ├── Read: reports/results.json
│   ├── Extract: Failed test names, errors, file paths
│   └── Return: Array of failure objects
│
├── Step 5: Create Jira Tickets (if failures exist)
│   ├── Connect: Mock Jira server (localhost:3001)
│   ├── For each failure:
│   │   ├── Create ticket with summary + description
│   │   └── Log: "Created STLC-{N}: {summary}"
│   └── Return: Array of created ticket keys
│
└── Step 6: Print Summary
    ├── Total tests: 10
    ├── Passed: 7
    ├── Failed: 3
    ├── Jira tickets created: 3
    └── HTML report: stlc_project/reports/html-report/index.html
```

---

## 7. How to Render These Diagrams

These Mermaid diagrams can be viewed in:

1. **GitHub** - Renders Mermaid natively in markdown files
2. **VS Code** - Install "Markdown Preview Mermaid Support" extension
3. **Mermaid Live Editor** - https://mermaid.live (paste the diagram code)
4. **Notion** - Supports Mermaid in code blocks
5. **Obsidian** - Built-in Mermaid support
