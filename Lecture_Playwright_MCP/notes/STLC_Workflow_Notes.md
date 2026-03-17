# STLC Workflow Notes

## STLC Phases

| Phase | Traditional | With MCP Automation |
|-------|------------|-------------------|
| **1. Planning** | QA writes test plan manually | AI generates test plan from template |
| **2. Design** | QA writes test cases manually | AI generates test cases from requirements |
| **3. Environment** | DevOps sets up environment | Already configured in playwright.config.js |
| **4. Execution** | QA runs tests, records results | Playwright runs tests, generates JSON/HTML |
| **5. Defect Reporting** | QA creates Jira tickets manually | Pipeline creates tickets automatically |
| **6. Closure** | QA compiles report, presents findings | HTML report + summary auto-generated |

## Our Pipeline Mapping

```
Phase 1 (Planning)    → 01_generate_test_plan.js
Phase 2 (Design)      → 02_generate_test_cases.js
Phase 3 (Environment) → playwright.config.js + project_config.js
Phase 4 (Execution)   → 03_run_tests.js
Phase 5 (Defects)     → 04_parse_results.js + 05_create_jira_tickets.js
Phase 6 (Closure)     → 06_full_stlc_pipeline.js (summary)
```

## Key STLC Concepts

### Entry Criteria
- Requirements are finalized
- Test environment is ready
- Test data is available
- Resources are allocated

### Exit Criteria
- All tests executed
- No critical open defects
- Test report reviewed
- Sign-off from stakeholders

### Test Plan Components
1. Introduction & objectives
2. Scope (in/out)
3. Test strategy & approach
4. Environment details
5. Entry/exit criteria
6. Risk assessment
7. Schedule & milestones
8. Deliverables

### Test Case Components
1. Test case ID
2. Title/description
3. Preconditions
4. Test steps
5. Expected result
6. Actual result
7. Status (Pass/Fail)
8. Priority & category

## Automation Benefits

| Manual STLC | Automated STLC |
|-------------|----------------|
| Hours to create test plan | Seconds with templates |
| Minutes per test case | Generated in bulk |
| Manual test execution | Automated with Playwright |
| Manual bug filing | Auto-created Jira tickets |
| Manual report compilation | HTML report auto-generated |
| Prone to human error | Consistent and repeatable |

## When to Automate vs Manual

**Automate:**
- Repetitive regression tests
- Data-driven tests
- Cross-browser/device testing
- Smoke tests for CI/CD
- Standard STLC document generation

**Keep Manual:**
- Exploratory testing
- Usability testing
- One-time edge case testing
- Visual design review
- Accessibility audits (use tools to assist)
