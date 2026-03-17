# STLC Automation Project

## Overview

This project demonstrates a complete **Software Testing Life Cycle (STLC)** automation pipeline using Playwright and MCP concepts.

## Pipeline Flow

```
Test Planning → Test Case Design → Test Execution → Result Analysis → Defect Reporting → Summary
```

## Quick Start

### Run All Tests Only

```bash
cd Lecture_Playwright_MCP
npx playwright test
```

Expected: 7 passed, 3 failed (intentional failures)

### Run Full STLC Pipeline

```bash
# Terminal 1: Start mock Jira server
node stlc_project/jira_mock/jira_mock_server.js

# Terminal 2: Run the pipeline
node stlc_project/mcp_scripts/06_full_stlc_pipeline.js
```

### View HTML Report

```bash
npx playwright show-report stlc_project/reports/html-report
```

## Project Structure

| Folder | Purpose |
|--------|---------|
| `config/` | Project configuration (URLs, Jira settings) |
| `templates/` | Reusable test plan and test case templates |
| `documents/` | Generated test plans and test cases |
| `tests/` | 10 Playwright test spec files |
| `mcp_scripts/` | Pipeline automation scripts (6 steps) |
| `jira_mock/` | Mock Jira server and client |
| `reports/` | Generated HTML and JSON reports |

## Test Cases

| # | Test | Expected |
|---|------|----------|
| 01 | Homepage loads correctly | PASS |
| 02 | Navigation links work | PASS |
| 03 | Input fields accept text | PASS |
| 04 | Form Authentication page | PASS |
| 05 | Valid login | PASS |
| 06 | Invalid login error | PASS |
| 07 | Broken link detection | FAIL (intentional) |
| 08 | Wrong page title | FAIL (intentional) |
| 09 | Timeout handling | FAIL (intentional) |
| 10 | Visual elements check | PASS |

## Pipeline Steps

1. **01_generate_test_plan.js** - Creates test plan from template
2. **02_generate_test_cases.js** - Creates test cases document
3. **03_run_tests.js** - Executes Playwright tests
4. **04_parse_results.js** - Parses JSON report for failures
5. **05_create_jira_tickets.js** - Creates Jira tickets for failures
6. **06_full_stlc_pipeline.js** - Runs all steps in sequence
