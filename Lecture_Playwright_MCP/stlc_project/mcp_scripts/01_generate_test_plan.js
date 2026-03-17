/**
 * STLC Pipeline - Step 1: Generate Test Plan
 *
 * Reads the test plan template and populates it with project data.
 * Simulates what an AI agent would do via MCP file operations.
 */

const fs = require('fs');
const path = require('path');

const projectDir = path.resolve(__dirname, '..');
const config = require(path.join(projectDir, 'config', 'project_config.js'));

function generateTestPlan() {
  console.log('\n--- Step 1: Generating Test Plan ---\n');

  // Read the template
  const templatePath = path.join(projectDir, 'templates', 'test_plan_template.md');
  let template = fs.readFileSync(templatePath, 'utf-8');

  // Populate template with project data
  const replacements = {
    '{{PROJECT_NAME}}': config.app.name,
    '{{VERSION}}': config.testPlan.version,
    '{{AUTHOR}}': config.testPlan.author,
    '{{DATE}}': new Date().toISOString().split('T')[0],
    '{{ENVIRONMENT}}': config.testPlan.environment,
    '{{BROWSER}}': config.testPlan.browser,
    '{{BASE_URL}}': config.app.baseURL,
    '{{IN_SCOPE}}': [
      '- Homepage loading and content verification',
      '- Navigation between pages',
      '- Form input and submission',
      '- Authentication (login/logout) with valid and invalid credentials',
      '- Link validation',
      '- Page title verification',
      '- Element visibility and timeout handling',
      '- Visual element checks',
    ].join('\n'),
    '{{OUT_OF_SCOPE}}': [
      '- Performance testing',
      '- Security testing',
      '- API testing',
      '- Cross-browser testing (Chromium only)',
      '- Mobile responsiveness',
    ].join('\n'),
    '{{SCHEDULE}}': [
      '| Test Planning | 1 day |',
      '| Test Case Design | 1 day |',
      '| Test Execution | 1 day |',
      '| Defect Reporting | Ongoing |',
      '| Test Closure | 1 day |',
    ].join('\n'),
    '{{TEST_CASES_SUMMARY}}': [
      '| TC ID | Title | Priority | Expected |',
      '|-------|-------|----------|----------|',
      '| TC-001 | Homepage loads correctly | High | PASS |',
      '| TC-002 | Navigation links work | High | PASS |',
      '| TC-003 | Input fields accept text | Medium | PASS |',
      '| TC-004 | Form Authentication works | High | PASS |',
      '| TC-005 | Valid login succeeds | High | PASS |',
      '| TC-006 | Invalid login shows error | High | PASS |',
      '| TC-007 | Broken link detection | Medium | FAIL (intentional) |',
      '| TC-008 | Page title verification | Medium | FAIL (intentional) |',
      '| TC-009 | Timeout handling | Low | FAIL (intentional) |',
      '| TC-010 | Visual elements present | Medium | PASS |',
    ].join('\n'),
  };

  for (const [placeholder, value] of Object.entries(replacements)) {
    template = template.replaceAll(placeholder, value);
  }

  // Write the final test plan
  const outputPath = path.join(projectDir, 'documents', 'test_plan.md');
  fs.writeFileSync(outputPath, template);

  console.log(`  Test plan generated: ${outputPath}`);
  console.log(`  Project: ${config.app.name}`);
  console.log(`  Author: ${config.testPlan.author}`);
  console.log(`  Test cases: 10`);

  return outputPath;
}

// Run if called directly
if (require.main === module) {
  generateTestPlan();
}

module.exports = { generateTestPlan };
