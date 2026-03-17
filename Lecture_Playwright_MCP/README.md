# Lecture - Playwright MCP: End-to-End STLC Automation

## Overview

This lecture covers the **Model Context Protocol (MCP)** and how to use it with **Playwright** to automate the entire **Software Testing Life Cycle (STLC)**. You'll learn how AI agents use MCP to plan tests, create test cases, execute them, report defects, and generate reports -- all automatically.

## What You'll Learn

1. **What is MCP** - The protocol that connects AI to tools
2. **Playwright MCP** - Browser automation through AI agents
3. **Jira MCP** - Automated defect reporting
4. **Document MCP** - Generating test plans and test cases
5. **Full STLC Pipeline** - End-to-end automation project

## Folder Structure

```
learning/           - Core concepts, architecture, examples
stlc_project/       - Complete STLC automation project
exercises/          - Hands-on practice exercises
notes/              - Quick reference guides
interview_questions/ - Interview preparation Q&A
```

## Prerequisites

- Node.js 18+ installed
- Playwright installed (`npm install`)
- Basic understanding of JavaScript and testing concepts

## Quick Start

### Run the STLC Project

```bash
# 1. Navigate to lecture directory
cd Lecture_Playwright_MCP

# 2. Run all tests (expect 7 pass, 3 intentional failures)
npx playwright test

# 3. Run the full STLC pipeline
# Terminal 1: Start mock Jira server
node stlc_project/jira_mock/jira_mock_server.js

# Terminal 2: Run the pipeline
node stlc_project/mcp_scripts/06_full_stlc_pipeline.js
```

### View Reports

```bash
npx playwright show-report stlc_project/reports/html-report
```

## Learning Path

1. Start with `learning/01_What_Is_MCP.md` - understand the protocol
2. Read through all learning files in order (01-08)
3. Explore the `stlc_project/` to see MCP in action
4. Complete the exercises in `exercises/`
5. Review `notes/` for quick reference
6. Prepare for interviews with `interview_questions/`
