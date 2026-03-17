/**
 * STLC Full Pipeline - Master Orchestrator
 *
 * Runs the complete Software Testing Life Cycle:
 * 1. Generate Test Plan (from template)
 * 2. Generate Test Cases (from template)
 * 3. Execute Playwright Tests
 * 4. Parse Test Results (JSON report)
 * 5. Create Jira Tickets (for failures)
 * 6. Print Summary & open HTML report
 *
 * USAGE:
 *   # Terminal 1: Start mock Jira server
 *   node stlc_project/jira_mock/jira_mock_server.js
 *
 *   # Terminal 2: Run pipeline
 *   node stlc_project/mcp_scripts/06_full_stlc_pipeline.js
 */

const path = require('path');
const { execSync } = require('child_process');

const { generateTestPlan } = require('./01_generate_test_plan');
const { generateTestCases } = require('./02_generate_test_cases');
const { runTests } = require('./03_run_tests');
const { parseResults } = require('./04_parse_results');
const { createJiraTickets } = require('./05_create_jira_tickets');

async function runSTLCPipeline() {
  const startTime = Date.now();

  console.log('\n\x1b[36m╔══════════════════════════════════════════════╗\x1b[0m');
  console.log('\x1b[36m║     STLC AUTOMATION PIPELINE                 ║\x1b[0m');
  console.log('\x1b[36m║     Powered by Playwright + MCP              ║\x1b[0m');
  console.log('\x1b[36m╚══════════════════════════════════════════════╝\x1b[0m');

  // Phase 1: Test Planning
  console.log('\n\x1b[33m▶ PHASE 1: Test Planning\x1b[0m');
  const testPlanPath = generateTestPlan();

  // Phase 2: Test Case Design
  console.log('\n\x1b[33m▶ PHASE 2: Test Case Design\x1b[0m');
  const testCasesPath = generateTestCases();

  // Phase 3: Test Execution
  console.log('\n\x1b[33m▶ PHASE 3: Test Execution\x1b[0m');
  const testResult = runTests();

  // Phase 4: Result Analysis
  console.log('\n\x1b[33m▶ PHASE 4: Result Analysis\x1b[0m');
  const results = parseResults();

  // Phase 5: Defect Reporting
  console.log('\n\x1b[33m▶ PHASE 5: Defect Reporting\x1b[0m');
  let tickets = [];
  if (results.failures.length > 0) {
    tickets = await createJiraTickets(results.failures);
  } else {
    console.log('\n  No failures detected. Skipping Jira ticket creation.');
  }

  // Phase 6: Summary
  const duration = ((Date.now() - startTime) / 1000).toFixed(1);
  const reportPath = path.resolve(__dirname, '..', 'reports', 'html-report', 'index.html');

  console.log('\n\x1b[36m╔══════════════════════════════════════════════╗\x1b[0m');
  console.log('\x1b[36m║           PIPELINE SUMMARY                   ║\x1b[0m');
  console.log('\x1b[36m╠══════════════════════════════════════════════╣\x1b[0m');
  console.log(`\x1b[36m║\x1b[0m  Duration:        ${duration}s`);
  console.log(`\x1b[36m║\x1b[0m  Total Tests:     ${results.total}`);
  console.log(`\x1b[36m║\x1b[0m  \x1b[32mPassed:\x1b[0m          ${results.passed}`);
  console.log(`\x1b[36m║\x1b[0m  \x1b[31mFailed:\x1b[0m          ${results.failed}`);
  console.log(`\x1b[36m║\x1b[0m  Jira Tickets:   ${tickets.length}`);
  if (tickets.length > 0) {
    console.log(`\x1b[36m║\x1b[0m  Ticket Keys:    ${tickets.join(', ')}`);
  }
  console.log(`\x1b[36m║\x1b[0m`);
  console.log(`\x1b[36m║\x1b[0m  Documents:`);
  console.log(`\x1b[36m║\x1b[0m    Test Plan:     ${testPlanPath}`);
  console.log(`\x1b[36m║\x1b[0m    Test Cases:    ${testCasesPath}`);
  console.log(`\x1b[36m║\x1b[0m    HTML Report:   ${reportPath}`);
  console.log('\x1b[36m╚══════════════════════════════════════════════╝\x1b[0m');

  // Try to open the HTML report
  console.log('\n  To view the HTML report, run:');
  console.log(`  npx playwright show-report ${path.resolve(__dirname, '..', 'reports', 'html-report')}`);

  return {
    duration,
    results,
    tickets,
    testPlanPath,
    testCasesPath,
    reportPath,
  };
}

// Run the pipeline
runSTLCPipeline().catch(console.error);
