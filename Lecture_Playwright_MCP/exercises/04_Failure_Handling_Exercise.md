# Exercise 4: Handling Test Failures

## Objective
Learn how to parse test failures and create Jira tickets automatically.

## Tasks

### Task 1: Run the Tests

```bash
cd Lecture_Playwright_MCP
npx playwright test
```

**Record the results:**
- Total tests: ___
- Passed: ___
- Failed: ___
- Which tests failed? ___________

### Task 2: Examine the JSON Report

Open `stlc_project/reports/results.json` and answer:
1. What is the top-level structure of the JSON report?
2. Where are the test results located in the JSON?
3. What information is available for each failed test?

### Task 3: Run the Result Parser

```bash
node stlc_project/mcp_scripts/04_parse_results.js
```

**What output do you see?** Document the failure details.

### Task 4: Create Mock Jira Tickets

```bash
# Terminal 1
node stlc_project/jira_mock/jira_mock_server.js

# Terminal 2
node stlc_project/mcp_scripts/05_create_jira_tickets.js
```

**Questions:**
1. How many tickets were created?
2. What are the ticket keys?
3. What information is included in each ticket?

### Task 5: Verify Tickets

Using curl, retrieve the created tickets:

```bash
curl http://localhost:3001/rest/api/2/search | json_pp
```

## Bonus Challenge

Modify `05_create_jira_tickets.js` to:
1. Set different priorities based on the test category
2. Add a custom label with the current date

## Expected Outcome
- Understanding of Playwright JSON report structure
- Ability to parse failures and extract details
- Experience creating automated bug tickets
