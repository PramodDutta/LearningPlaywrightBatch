# Exercise 5: STLC Mini Project

## Objective
Build your own end-to-end STLC automation pipeline for a different website.

## Target Website
Choose one:
- `https://the-internet.herokuapp.com/dropdown` (Dropdown page)
- `https://the-internet.herokuapp.com/checkboxes` (Checkboxes page)
- `https://the-internet.herokuapp.com/add_remove_elements/` (Add/Remove Elements)

## Tasks

### Task 1: Test Planning (15 minutes)
1. Visit your chosen page
2. Identify 5 test scenarios
3. Create a test plan document using the template
4. Include in-scope, out-of-scope, and risk assessment

### Task 2: Test Case Design (20 minutes)
1. Write 5 Playwright test specs (at least 1 intentional failure)
2. Follow the naming convention: `XX_description.spec.js`
3. Include clear assertions and console.log messages

### Task 3: Test Execution (10 minutes)
1. Run your tests with `npx playwright test`
2. Verify the HTML report is generated
3. Review the JSON report

### Task 4: Defect Reporting (10 minutes)
1. Start the mock Jira server
2. Modify the pipeline scripts to work with your test results
3. Create Jira tickets for failures

### Task 5: Pipeline Integration (15 minutes)
1. Create a master script that runs all steps
2. Print a summary at the end
3. Verify the complete pipeline works

## Deliverables
- [ ] Test plan document
- [ ] 5 test spec files
- [ ] JSON report with results
- [ ] HTML report
- [ ] Jira tickets for failures
- [ ] Pipeline summary output

## Evaluation Criteria
- All 5 tests run without errors (failures are ok if intentional)
- Test plan covers the chosen feature
- At least 1 intentional failure generates a Jira ticket
- Pipeline runs end-to-end without manual intervention
