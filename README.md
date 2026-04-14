# Learning Playwright Batch

<div align="center">

![Playwright](https://img.shields.io/badge/Playwright-45ba4b?style=for-the-badge&logo=playwright&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![License](https://img.shields.io/badge/License-ISC-blue?style=for-the-badge)

**A comprehensive learning resource covering JavaScript fundamentals and Playwright testing**

*From zero to automation hero - 17 JavaScript chapters + 3 TypeScript chapters + 3 specialized Playwright lectures*

[Getting Started](#-quick-start) | [JS Chapters](#-javascript-chapters-1-17) | [TS Chapters](#-typescript-chapters-18-20) | [Playwright Lectures](#-playwright-lectures) | [Learning Path](#-learning-path)

</div>

---

## Overview

This repository is a complete curriculum designed for **SDET (Software Development Engineer in Test)** roles, covering:

- **17 JavaScript Chapters** - From basics to OOP & async programming
- **3 TypeScript Chapters** - Type safety, interfaces, and enums
- **3 Playwright Lectures** - CLI mastery, AI Agents, and MCP automation
- **100+ Code Examples** - Real-world, runnable scripts
- **Interview Prep** - Coding challenges and Q&A collections

---

## Repository Structure

```mermaid
graph TB
    subgraph root["LearningPlaywrightBatch"]
        direction TB

        subgraph js["JavaScript Fundamentals (Ch 1-10)"]
            ch1["Ch 1: Basics"]
            ch2["Ch 2: Variables & Hoisting"]
            ch3["Ch 3: Identifiers & Literals"]
            ch4["Ch 4: Operators"]
            ch5["Ch 5: If/Else Statements"]
            ch6["Ch 6: Switch Statements"]
            ch7["Ch 7: Loops"]
            ch8["Ch 8: Arrays"]
            ch9["Ch 9: Functions"]
            ch10["Ch 10: Strings"]
        end

        subgraph adv["Advanced JavaScript (Ch 11-17)"]
            ch11["Ch 11: Objects"]
            ch12["Ch 12: Multi-Dimensional Arrays"]
            ch13["Ch 13: Callbacks"]
            ch14["Ch 14: Promises"]
            ch15["Ch 15: Async/Await"]
            ch16["Ch 16: OOP (Classes)"]
            ch17["Ch 17: Inheritance"]
        end

        subgraph ts["TypeScript (Ch 18-20)"]
            ch18["Ch 18: TS Fundamentals"]
            ch19["Ch 19: Interfaces"]
            ch20["Ch 20: Enums"]
        end

        subgraph pw["Playwright Lectures"]
            cli["CLI Mastery"]
            ai["AI Agents"]
            mcp["MCP Protocol"]
        end

        subgraph extra["Extras"]
            tasks["Interview Questions"]
            tests["PW Test Examples"]
        end
    end

    js --> adv
    adv --> ts
    ts --> pw
    pw --> extra

    style js fill:#e1f5fe,stroke:#01579b
    style adv fill:#fff3e0,stroke:#e65100
    style ts fill:#e0f7fa,stroke:#00838f
    style pw fill:#f3e5f5,stroke:#7b1fa2
    style extra fill:#e8f5e9,stroke:#2e7d32
```

---

## Folder Structure

```
LearningPlaywrightBatch/
├── chapter_01_Basics/                  # Getting started with JavaScript
├── chapter_02_Java_Concepts/           # Variables, hoisting, var/let/const
├── chapter_03_Identifier_Literal_.../  # Identifiers, literals, operators
├── chapter_04_Operators/               # All JavaScript operators
├── chapter_05_Statements/              # If/else conditional statements
├── chapter_06_Switch_Statements/       # Switch case patterns
├── chapter_07_Loops/                   # For, while, do-while loops
├── chapter_08_Arrays/                  # Array methods and manipulation
├── chapter_09_Functions/               # Functions, closures, callbacks
├── chapter_10_Strings/                 # String manipulation methods
├── chapter_11_Objects/                 # Object-oriented programming basics
├── chapter_12_Multi_Dimension_Array/   # 2D arrays and patterns
├── chapter_13_Callback/                # Callback patterns & callback hell
├── chapter_14_Promise/                 # Promise API deep dive
├── chapter_15_Async_Await/             # Modern async programming
├── chapter_16_OOps/                    # Classes, encapsulation, ES6 modules
├── chapter_17_OOPs_Inheritance/        # Inheritance patterns
├── chapter_18_Typescript/              # TypeScript fundamentals & types
├── chapter_19_Typescript_Interface/    # TypeScript interfaces
├── chapter_20_Typescript_ENUM/         # TypeScript enums
├── Lecture_Playwright_CLI/             # Playwright CLI commands & tools
├── Lecture_Playwright_AI_Agents/       # AI-powered test automation
├── Lecture_Playwright_MCP/             # Model Context Protocol integration
├── Task_Interview_Coding_Questions/    # Coding challenges
├── PW_JS_Test_1/                       # Playwright test examples
└── specs/                              # Additional test specifications
```

---

## Quick Start

### Prerequisites

- **Node.js** 18+ (recommended)
- **npm** or **yarn**
- **VS Code** (recommended editor)

### Installation

```bash
# Clone the repository
git clone https://github.com/PramodDutta/LearningPlaywrightBatch.git

# Navigate to the project
cd LearningPlaywrightBatch

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Run Examples

```bash
# Run a JavaScript file
node chapter_01_Basics/01_basic.js

# Run Playwright tests
npx playwright test

# Open Playwright UI mode
npx playwright test --ui
```

---

## JavaScript Chapters (1-17)

### Learning Flow

```mermaid
flowchart LR
    subgraph Foundation["Foundation"]
        A[Ch 1: Basics] --> B[Ch 2: Variables]
        B --> C[Ch 3: Identifiers]
        C --> D[Ch 4: Operators]
    end

    subgraph Control["Control Flow"]
        D --> E[Ch 5: If/Else]
        E --> F[Ch 6: Switch]
        F --> G[Ch 7: Loops]
    end

    subgraph DataStructures["Data Structures"]
        G --> H[Ch 8: Arrays]
        H --> I[Ch 9: Functions]
        I --> J[Ch 10: Strings]
        J --> K[Ch 11: Objects]
        K --> L[Ch 12: 2D Arrays]
    end

    subgraph Async["Async Programming"]
        L --> M[Ch 13: Callbacks]
        M --> N[Ch 14: Promises]
        N --> O[Ch 15: Async/Await]
    end

    subgraph OOP["Object-Oriented"]
        O --> P[Ch 16: Classes]
        P --> Q[Ch 17: Inheritance]
    end

    subgraph TypeScript["TypeScript"]
        Q --> R[Ch 18: TS Basics]
        R --> S[Ch 19: Interfaces]
        S --> T[Ch 20: Enums]
    end

    style Foundation fill:#e3f2fd
    style Control fill:#fff8e1
    style DataStructures fill:#f3e5f5
    style Async fill:#e8f5e9
    style OOP fill:#fce4ec
    style TypeScript fill:#e0f7fa
```

---

### Chapter 1: Basics
**Files:** `01_basic.js` to `04_hot_code.js`

| Topic | Description |
|-------|-------------|
| Environment Setup | Verifying Node.js installation |
| Hot Code Reloading | Live development workflow |
| First JavaScript | Hello World and basic syntax |

```javascript
// Example: 01_basic.js
console.log("Hello, Playwright Learner!");
```

---

### Chapter 2: Variables & Hoisting
**Files:** `05_Core_Comments_JS.js` to `18_const.js` (14 files)

```mermaid
graph TD
    A[Variable Declaration] --> B{Which keyword?}
    B -->|var| C[Function Scoped<br/>Hoisted with undefined]
    B -->|let| D[Block Scoped<br/>Temporal Dead Zone]
    B -->|const| E[Block Scoped<br/>Cannot reassign]

    style C fill:#ffcdd2
    style D fill:#c8e6c9
    style E fill:#bbdefb
```

**Key Concepts:**
- `var` vs `let` vs `const` differences
- Hoisting behavior for each keyword
- Temporal Dead Zone (TDZ)
- Block vs function scope

---

### Chapter 3: Identifiers, Literals & Operators
**Files:** `19_Identifier.js` to `25_IQ.js` (7 files)

| Concept | Example |
|---------|---------|
| Identifiers | `userName`, `_private`, `$jquery` |
| String Literals | `"Hello"`, `'World'`, `` `Template` `` |
| Number Literals | `42`, `3.14`, `0xFF` |
| Boolean Literals | `true`, `false` |
| Null vs Undefined | `null` (intentional), `undefined` (uninitialized) |
| Equality | `==` (loose) vs `===` (strict) |

---

### Chapter 4: Operators
**Files:** `26_Assigned_Operator.js` to `32_Null_Optinal_Value.js` (8 files)

```mermaid
mindmap
  root((Operators))
    Assignment
      =
      +=, -=
      *=, /=
    Comparison
      ==, ===
      !=, !==
      >, <, >=, <=
    Logical
      && AND
      || OR
      ! NOT
    Ternary
      condition ? true : false
    Type
      typeof
      instanceof
    Nullish
      ?? coalescing
      ?. optional chaining
```

---

### Chapter 5: If/Else Statements
**Files:** `33_Statement.js` to `41_IQ.js` (9 files)

**Key Topics:**
- Simple if/else branching
- If-else-if chains
- Nested conditions
- Real-world API response handling
- Interview questions patterns

```javascript
// Example: API status code validation
const statusCode = 200;
if (statusCode >= 200 && statusCode < 300) {
    console.log("Success!");
} else if (statusCode >= 400) {
    console.log("Error!");
}
```

---

### Chapter 6: Switch Statements
**Files:** `42_Switch.js` to `52_User_Input.js` (11 files)

```mermaid
flowchart TD
    A[Switch Expression] --> B{Case 1?}
    B -->|Match| C[Execute Code]
    B -->|No Match| D{Case 2?}
    D -->|Match| E[Execute Code]
    D -->|No Match| F{Case 3?}
    F -->|Match| G[Execute Code]
    F -->|No Match| H[Default Case]

    C --> I{break?}
    I -->|Yes| J[Exit Switch]
    I -->|No| K[Fall Through to Next Case]
```

**Key Topics:**
- Switch syntax and break statements
- Default case handling
- Grouped cases (multiple cases, one action)
- When switch beats if-else

---

### Chapter 7: Loops
**Files:** `53_Loops.js` to `62_DO_while_2.js` (10 files)

| Loop Type | Use Case | Syntax |
|-----------|----------|--------|
| `for` | Known iterations | `for (let i=0; i<n; i++)` |
| `while` | Condition-based | `while (condition)` |
| `do-while` | Run at least once | `do { } while (condition)` |

```javascript
// For loop example
for (let i = 1; i <= 5; i++) {
    console.log(`Test case ${i}`);
}
```

---

### Chapter 8: Arrays
**Files:** `63_Arrays_Creation.js` to `75_Task.js` (13 files)

```mermaid
graph LR
    subgraph Creation
        A[Array Literal]
        B[new Array]
        C[Array.from]
        D[Array.of]
    end

    subgraph Mutation
        E[push/pop]
        F[shift/unshift]
        G[splice]
    end

    subgraph Transform
        H[map]
        I[filter]
        J[reduce]
    end

    subgraph Search
        K[find]
        L[indexOf]
        M[includes]
    end

    Creation --> Mutation --> Transform --> Search
```

**Key Concepts:**
- Array creation methods
- Adding/removing elements (`push`, `pop`, `shift`, `unshift`, `splice`)
- Searching (`find`, `indexOf`, `includes`)
- Iterating (`forEach`, `map`, `filter`, `reduce`)
- Sorting and slicing
- Shallow vs deep copying
- Array destructuring

---

### Chapter 9: Functions
**Files:** `76_Functions.js` to `101_Callback_me.js` (26 files)

```mermaid
graph TB
    subgraph Types["Function Types"]
        A[Declaration] --> B["function name() {}"]
        C[Expression] --> D["const fn = function() {}"]
        E[Arrow] --> F["const fn = () => {}"]
        G[IIFE] --> H["(function() {})()"]
    end

    subgraph Concepts["Advanced Concepts"]
        I[Closures]
        J[Higher-Order Functions]
        K[Pure Functions]
        L[Callbacks]
    end

    subgraph Parameters["Parameters"]
        M[Default Parameters]
        N[Rest Parameters ...args]
        O[Spread Operator]
    end
```

**Key Topics:**
- 4 function types (declaration, expression, arrow, IIFE)
- Parameters: default, rest (`...args`), spread
- Scope and hoisting
- Closures (4-part deep dive)
- Higher-order functions
- Pure functions
- Callback patterns

---

### Chapter 10: Strings
**Files:** `102_Strings.js` to `107_String_Conversion.js` (6 files)

| Category | Methods |
|----------|---------|
| Creation | Single quotes, double quotes, template literals |
| Properties | `length`, index access `str[0]` |
| Search | `includes()`, `indexOf()`, `startsWith()`, `endsWith()` |
| Transform | `toUpperCase()`, `toLowerCase()`, `trim()`, `replace()` |
| Split/Join | `split()`, `join()`, `slice()`, `substring()` |

---

### Chapter 11: Objects
**Files:** `108_Objects.js` to `119_Let_const_Objects.js` (12 files)

```javascript
// Object creation and manipulation
const user = {
    name: "Pramod",
    role: "SDET",
    getInfo() {
        return `${this.name} - ${this.role}`;
    }
};

// Spread operator
const extendedUser = { ...user, company: "TTA" };
```

**Key Topics:**
- Object creation and property access
- Primitive vs reference types
- Property descriptors
- Spread operator with objects
- Getters and setters
- Object methods

---

### Chapter 12: Multi-Dimensional Arrays
**Files:** `120_MD_Array.js` to `125_Pyramid_Pattern.js` (6 files)

```mermaid
graph TD
    A["2D Array"] --> B["matrix[row][col]"]
    B --> C["Nested Loops"]
    C --> D["Patterns"]
    D --> E["Right Triangle"]
    D --> F["Left Triangle"]
    D --> G["Pyramid"]
```

**Key Topics:**
- 2D array creation and access
- Matrix manipulation
- Pattern printing (right, left, pyramid)
- Nested loop techniques

---

### Chapter 13: Callbacks
**Files:** `126_Callback.js` to `132_Py_of_DON.js` (7 files)

```mermaid
sequenceDiagram
    participant Main
    participant Callback

    Main->>Main: Execute code
    Main->>Callback: Pass function
    Main->>Main: Continue execution
    Callback-->>Main: Execute when ready

    Note over Main,Callback: Asynchronous Flow
```

**Key Topics:**
- Synchronous vs asynchronous callbacks
- Callback patterns
- **Callback Hell** (Pyramid of Doom)
- Real-world examples

---

### Chapter 14: Promises
**Files:** `133_Promise.js` to `141_Promise_IQ.js` (9 files)

```mermaid
stateDiagram-v2
    [*] --> Pending
    Pending --> Fulfilled: resolve()
    Pending --> Rejected: reject()
    Fulfilled --> [*]: .then()
    Rejected --> [*]: .catch()

    note right of Pending
        Initial state
    end note

    note right of Fulfilled
        Operation succeeded
    end note

    note right of Rejected
        Operation failed
    end note
```

**Key Topics:**
- Promise states (pending, fulfilled, rejected)
- `.then()`, `.catch()`, `.finally()`
- `Promise.all()` - Wait for all
- `Promise.allSettled()` - Get all results
- `Promise.race()` - First to complete
- Interview questions

---

### Chapter 15: Async/Await
**Files:** `142_Async_Await.js` to `149_API_REAL_FLAKY.js` (8 files)

```javascript
// Modern async pattern
async function fetchUserData() {
    try {
        const response = await fetch('/api/user');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed:', error);
    }
}
```

**Key Topics:**
- Converting Promises to async/await
- Try/catch error handling
- Sequential vs parallel execution
- Real-world API examples
- Handling flaky tests

---

### Chapter 16: OOP - Classes & Encapsulation
**Files:** `150_Export_import.js` to `163_Bank.js` (14 files)

```
chapter_16_OOps/
├── EXPORT_IMPORT/           # ES6 module system
│   ├── 150_Export_import.js
│   ├── 151_Export_Import.js
│   └── 152_Loggger.js
├── CLASS_OBJECT/            # Class fundamentals
│   ├── 153_Class_Objects.js
│   ├── 154_Car.js
│   ├── 155_Class_Object_Browser.js
│   ├── 156_Browser.js
│   ├── 157_IQ.js
│   ├── 158_Private_Public.js
│   ├── 159_Static.js
│   ├── 160_Static_p2.js
│   └── Encapsulation/
│       ├── 161_Pramod_Child.js
│       ├── 162_Car.js
│       └── 163_Bank.js
├── logger.js
├── testutil.js
└── utils.js
```

**Key Topics:**
- ES6 import/export modules
- Class syntax and constructors
- Public vs private fields (`#private`)
- Static methods and properties
- Encapsulation patterns
- Real-world examples (Browser, Car, Bank)

---

### Chapter 17: OOP - Inheritance
**Files:** `164_Inheritance.js` to `174_HI.js` (11 files)

```mermaid
graph TB
    subgraph Single["Single Inheritance"]
        A[Animal] --> B[Dog]
    end

    subgraph Multi["Multi-Level Inheritance"]
        C[Vehicle] --> D[Car]
        D --> E[SportsCar]
    end

    subgraph Hierarchical["Hierarchical Inheritance"]
        F[Shape] --> G[Circle]
        F --> H[Rectangle]
        F --> I[Triangle]
    end

    subgraph Multiple["Multiple Inheritance (Mixins)"]
        J[Flyable] -.-> L[Airplane]
        K[Driveable] -.-> L
    end
```

```
chapter_17_OOPs_Inheritance/
├── Single_Inheritance/       # Parent -> Child
│   ├── 164_Inheritance.js
│   ├── 165_SI.js
│   ├── 166_Method_Overriding.js
│   ├── 167_MO_IQ.js
│   ├── 168_MO_BIG.js
│   ├── 169_PageObject.js
│   └── 170_RO.js
├── Multi_Level_Inheritance/  # Grandparent -> Parent -> Child
│   └── 171_MI.js
├── Multiple_Inheritance/     # Using mixins
│   └── 172.js
├── Hierarchial_Inheritance/  # One parent, many children
│   └── 174_HI.js
└── Exporting_Class/          # Module patterns
    ├── Basepage.js
    ├── LoginPage.js
    └── 173_Test_2.js
```

**Key Topics:**
- Single inheritance (`extends`)
- Method overriding (`super`)
- Multi-level inheritance chains
- Hierarchical inheritance
- Multiple inheritance via mixins
- Page Object Model pattern

---

## TypeScript Chapters (18-20)

### Chapter 18: TypeScript Fundamentals
**Files:** `175_TS.js` to `183_Filter_Array.ts` (9 files)

```mermaid
graph TD
    A[JavaScript] --> B[TypeScript]
    B --> C{Type System}
    C --> D[Primitive Types<br/>string, number, boolean]
    C --> E[Special Types<br/>any, unknown, void, never]
    C --> F[Type Annotations<br/>variables, functions]

    style B fill:#3178c6,color:#fff
    style D fill:#e0f7fa
    style E fill:#fff3e0
    style F fill:#e8f5e9
```

**Key Topics:**
- TypeScript setup and compilation
- Basic types (`string`, `number`, `boolean`)
- Special types (`any`, `unknown`, `void`, `never`)
- Type annotations for variables and functions
- Type inference
- Array typing

```typescript
// Example: Type annotations
let testName: string = "Login Test";
let testCount: number = 42;
let isEnabled: boolean = true;

function runTest(name: string): void {
    console.log("Running: " + name);
}
```

---

### Chapter 19: TypeScript Interfaces
**Files:** `184_TS_Interface.ts` to `192_Index_TS_Sing.ts` (9 files)

```mermaid
graph TB
    subgraph Interface["Interface Definition"]
        A[Properties] --> B["id: number"]
        A --> C["name: string"]
        A --> D["optional?: string"]
    end

    subgraph Usage["Interface Usage"]
        E[Object Typing]
        F[Function Parameters]
        G[Class Implementation]
    end

    subgraph RealWorld["QA Use Cases"]
        H[TestCase Interface]
        I[BugReport Interface]
        J[PageObject Interface]
        K[TestConfig Interface]
    end

    Interface --> Usage --> RealWorld
```

**Key Topics:**
- Interface basics and syntax
- Optional and required properties
- Method signatures in interfaces
- Interfaces for test configuration
- Real-world QA interfaces (BugReport, TestCase, PageObject)
- Class implementing interfaces
- Index signatures

```typescript
// Example: BugReport interface for QA
interface BugReport {
    id: number;
    title: string;
    severity: string;
    stepsToReproduce: string[];
}

function logBug(bug: BugReport): void {
    console.log(`BUG-${bug.id} [${bug.severity}] ${bug.title}`);
}
```

---

### Chapter 20: TypeScript Enums
**Files:** `193_ENUM.ts` to `196_ENUM_API_example.ts` (4 files)

```mermaid
graph LR
    subgraph Enum["Enum Types"]
        A[String Enum]
        B[Numeric Enum]
    end

    subgraph Examples["QA Examples"]
        C[TestStatus<br/>Pass, Fail, Skip]
        D[Browser<br/>Chrome, Firefox, Safari]
        E[HTTPStatus<br/>200, 404, 500]
    end

    Enum --> Examples

    style A fill:#e8f5e9
    style B fill:#fff3e0
```

**Key Topics:**
- String enums vs numeric enums
- Enum in function parameters
- Switch statements with enums
- Real-world examples (TestStatus, Browser selection)
- API response status enums

```typescript
// Example: Browser selection enum
enum Browser {
    Chrome = "chrome",
    Firefox = "firefox",
    Safari = "safari",
    Edge = "edge"
}

function launchBrowser(browser: Browser): void {
    console.log("Launching: " + browser);
}

launchBrowser(Browser.Chrome);
```

---

## Playwright Lectures

### Lecture Overview

```mermaid
graph LR
    subgraph CLI["Playwright CLI"]
        A[Commands]
        B[Codegen]
        C[Debug Mode]
        D[Trace Viewer]
    end

    subgraph AI["AI Agents"]
        E[Planner]
        F[Generator]
        G[Healer]
    end

    subgraph MCP["MCP Protocol"]
        H[Playwright MCP]
        I[Jira MCP]
        J[STLC Pipeline]
    end

    CLI --> AI --> MCP

    style CLI fill:#e1f5fe
    style AI fill:#f3e5f5
    style MCP fill:#fff3e0
```

---

### Lecture: Playwright CLI

**Master every command-line tool Playwright offers.**

| Command | Purpose |
|---------|---------|
| `npx playwright test` | Run tests |
| `npx playwright codegen` | Record tests |
| `npx playwright test --ui` | Interactive UI mode |
| `npx playwright test --debug` | Debug with inspector |
| `npx playwright show-report` | View HTML report |
| `npx playwright show-trace` | Analyze trace files |

**Folder Structure:**
```
Lecture_Playwright_CLI/
├── learning/              # 10 learning modules
├── cli_project/           # Demo scripts and tests
├── Project_1_VWO_Login/   # VWO login automation
├── Project_2_TTA_BANK/    # Banking app tests
├── exercises/             # Hands-on practice
├── notes/                 # Quick reference
└── interview_questions/   # 60+ interview Q&A
```

---

### Lecture: Playwright AI Agents

**The future of test automation - AI that plans, generates, and heals tests.**

```mermaid
flowchart LR
    A[Application] --> B[Planner Agent]
    B -->|Test Plan| C[Generator Agent]
    C -->|Test Code| D[Execute Tests]
    D -->|Failures| E[Healer Agent]
    E -->|Fixed Tests| D

    style B fill:#e3f2fd
    style C fill:#e8f5e9
    style E fill:#fff3e0
```

**3 Built-in Agents:**

| Agent | Role | What It Does |
|-------|------|-------------|
| **Planner** | Explores | Crawls app, identifies test scenarios |
| **Generator** | Writes | Converts plans to Playwright code |
| **Healer** | Fixes | Diagnoses and repairs broken tests |

**7 AI Projects Included:**

1. **Natural Language Test Writer** - English to Playwright specs
2. **Self-Healing Locators** - Auto-fixes broken selectors
3. **AI Visual Regression** - Screenshot comparison
4. **Smart Test Reporter** - AI-generated summaries
5. **Accessibility Audit Agent** - WCAG compliance
6. **Autonomous Explorer** - Bug hunting without scripts
7. **AI API Testing** - Contract validation

**Folder Structure:**
```
Lecture_Playwright_AI_Agents/
├── learning/              # 13 learning modules
├── agents_project/        # Agent pipeline demos
├── ai_projects/           # 7 practical AI projects
├── exercises/             # Hands-on practice
├── notes/                 # Quick reference
└── interview_questions/   # 60+ interview Q&A
```

---

### Lecture: Playwright MCP (Model Context Protocol)

**Automate the entire Software Testing Life Cycle with AI.**

```mermaid
flowchart TD
    subgraph STLC["Full STLC Automation"]
        A[Requirements] --> B[Test Planning]
        B --> C[Test Case Design]
        C --> D[Test Execution]
        D --> E[Defect Reporting]
        E --> F[Reporting]
    end

    subgraph MCP["MCP Integration"]
        G[Playwright MCP<br/>Browser Control]
        H[Jira MCP<br/>Defect Tracking]
        I[Document MCP<br/>Report Generation]
    end

    B -.-> G
    D -.-> G
    E -.-> H
    F -.-> I
```

**Key Components:**
- **Playwright MCP** - Browser automation via AI
- **Jira MCP** - Automated defect reporting
- **Document MCP** - Test plan and report generation

**Folder Structure:**
```
Lecture_Playwright_MCP/
├── learning/           # 8 learning modules
├── stlc_project/       # Full STLC pipeline
│   ├── mcp_scripts/    # MCP automation scripts
│   └── jira_mock/      # Mock Jira server
├── exercises/          # Hands-on practice
├── notes/              # Quick reference
└── interview_questions/ # Interview Q&A
```

---

## Learning Path

### Recommended Progression

```mermaid
journey
    title Learning Journey
    section JavaScript Basics (Week 1-2)
        Setup Environment: 5: Ch1
        Variables & Hoisting: 4: Ch2
        Operators & Statements: 4: Ch3-4
        Control Flow: 4: Ch5-6
        Loops: 3: Ch7
    section Data Structures (Week 3-4)
        Arrays: 5: Ch8
        Functions: 5: Ch9
        Strings: 3: Ch10
        Objects: 4: Ch11
        2D Arrays: 3: Ch12
    section Async JavaScript (Week 5)
        Callbacks: 4: Ch13
        Promises: 5: Ch14
        Async/Await: 5: Ch15
    section OOP (Week 6)
        Classes: 4: Ch16
        Inheritance: 4: Ch17
    section TypeScript (Week 7)
        TS Fundamentals: 4: Ch18
        Interfaces: 5: Ch19
        Enums: 3: Ch20
    section Playwright (Week 8-9)
        CLI Mastery: 5: CLI
        AI Agents: 5: AI
        MCP Automation: 4: MCP
```

### Quick Reference

| Phase | Chapters | Focus |
|-------|----------|-------|
| **Beginner** | 1-7 | Syntax, control flow, loops |
| **Intermediate** | 8-12 | Data structures, functions |
| **Advanced JS** | 13-17 | Async, OOP patterns |
| **TypeScript** | 18-20 | Types, interfaces, enums |
| **Playwright** | CLI, AI, MCP | Test automation |

---

## Interview Preparation

### Coding Challenges

Located in `Task_Interview_Coding_Questions/`:

| File | Challenge |
|------|-----------|
| `01_grade_calc.js` | Grade calculator from scores |
| `02_fizz_buzz.js` | Classic FizzBuzz problem |

### Interview Questions

Each lecture folder contains `interview_questions/` with **60+ Q&A** covering:
- JavaScript fundamentals
- Playwright concepts
- AI/ML in testing
- MCP architecture

---

## Running Tests

```bash
# Run all Playwright tests
npx playwright test

# Run with UI mode (interactive)
npx playwright test --ui

# Run specific test file
npx playwright test specs/sample.spec.js

# Run with debug mode
npx playwright test --debug

# Generate HTML report
npx playwright test --reporter=html

# View last report
npx playwright show-report
```

---

## Project Information

| | |
|---|---|
| **Author** | Pramod Dutta |
| **Organization** | The Testing Academy |
| **License** | ISC |
| **Playwright Version** | 1.58.2+ |
| **Node.js** | 18+ recommended |

---

## Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [The Testing Academy](https://thetestingacademy.com)
- [GitHub Repository](https://github.com/PramodDutta/LearningPlaywrightBatch)

---

<div align="center">

**Happy Learning!**

*Built with dedication for the SDET community*

![The Testing Academy](sdet.live.png)

</div>
