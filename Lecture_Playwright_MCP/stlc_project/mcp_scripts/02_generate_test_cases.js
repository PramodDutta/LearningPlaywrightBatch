/**
 * STLC Pipeline - Step 2: Generate Test Cases
 *
 * Generates a structured test cases document from predefined test case data.
 * Simulates what an AI agent would do via MCP file operations.
 */

const fs = require('fs');
const path = require('path');

const projectDir = path.resolve(__dirname, '..');
const config = require(path.join(projectDir, 'config', 'project_config.js'));

// Test case definitions
const TEST_CASES = [
  {
    id: 'TC-001', title: 'Homepage Loads Correctly',
    priority: 'High', category: 'Smoke', specFile: '01_homepage.spec.js',
    preconditions: 'Browser is open, internet is accessible',
    steps: ['Navigate to homepage', 'Wait for page to load', 'Check page title', 'Verify heading is visible'],
    expected: 'Page loads with correct title "The Internet" and heading "Welcome to the-internet"',
  },
  {
    id: 'TC-002', title: 'Navigation Links Work',
    priority: 'High', category: 'Smoke', specFile: '02_navigation.spec.js',
    preconditions: 'Homepage is loaded',
    steps: ['Navigate to homepage', 'Verify links are present', 'Click "Form Authentication" link', 'Verify login page loads'],
    expected: 'Links navigate to correct pages',
  },
  {
    id: 'TC-003', title: 'Input Fields Accept Text',
    priority: 'Medium', category: 'Functional', specFile: '03_search.spec.js',
    preconditions: 'Application is accessible',
    steps: ['Navigate to /inputs', 'Locate number input', 'Type "42"', 'Verify value'],
    expected: 'Input field accepts and displays "42"',
  },
  {
    id: 'TC-004', title: 'Form Authentication Page',
    priority: 'High', category: 'Functional', specFile: '04_form_submit.spec.js',
    preconditions: 'Login page is accessible',
    steps: ['Navigate to /login', 'Verify form heading', 'Check username field', 'Check password field', 'Check login button'],
    expected: 'Login form has all required fields',
  },
  {
    id: 'TC-005', title: 'Valid Login Succeeds',
    priority: 'High', category: 'Functional', specFile: '05_login_valid.spec.js',
    preconditions: 'Login page is accessible',
    steps: ['Navigate to /login', 'Enter "tomsmith"', 'Enter "SuperSecretPassword!"', 'Click Login', 'Verify success message'],
    expected: 'User logs in, sees "You logged into a secure area!"',
  },
  {
    id: 'TC-006', title: 'Invalid Login Shows Error',
    priority: 'High', category: 'Negative', specFile: '06_login_invalid.spec.js',
    preconditions: 'Login page is accessible',
    steps: ['Navigate to /login', 'Enter "invaliduser"', 'Enter "invalidpass"', 'Click Login', 'Verify error message'],
    expected: 'Error "Your username is invalid!" appears',
  },
  {
    id: 'TC-007', title: 'Broken Link Detection [EXPECTED FAIL]',
    priority: 'Medium', category: 'Functional', specFile: '07_broken_link.spec.js',
    preconditions: 'Application is accessible',
    steps: ['Navigate to /broken_images', 'Find broken image', 'Assert image returns 200'],
    expected: 'INTENTIONAL FAILURE - broken image returns 404 not 200',
  },
  {
    id: 'TC-008', title: 'Page Title Verification [EXPECTED FAIL]',
    priority: 'Medium', category: 'Functional', specFile: '08_wrong_title.spec.js',
    preconditions: 'Application is accessible',
    steps: ['Navigate to homepage', 'Assert title is "Wrong Title That Does Not Exist"'],
    expected: 'INTENTIONAL FAILURE - actual title is "The Internet"',
  },
  {
    id: 'TC-009', title: 'Timeout Handling [EXPECTED FAIL]',
    priority: 'Low', category: 'Negative', specFile: '09_timeout_page.spec.js',
    preconditions: 'Application is accessible',
    steps: ['Navigate to /dynamic_loading/1', 'Wait for non-existent element with 1ms timeout'],
    expected: 'INTENTIONAL FAILURE - timeout waiting for element',
  },
  {
    id: 'TC-010', title: 'Visual Elements Present',
    priority: 'Medium', category: 'Functional', specFile: '10_visual_check.spec.js',
    preconditions: 'Application is accessible',
    steps: ['Navigate to homepage', 'Verify heading', 'Verify sub-heading', 'Verify link list', 'Verify footer'],
    expected: 'All key visual elements are present',
  },
];

function generateTestCases() {
  console.log('\n--- Step 2: Generating Test Cases ---\n');

  // Read template
  const templatePath = path.join(projectDir, 'templates', 'test_case_template.md');
  let template = fs.readFileSync(templatePath, 'utf-8');

  // Generate test cases markdown
  const testCasesMd = TEST_CASES.map((tc) => {
    return [
      `### ${tc.id}: ${tc.title}`,
      '',
      `| Field | Value |`,
      `|-------|-------|`,
      `| **Priority** | ${tc.priority} |`,
      `| **Category** | ${tc.category} |`,
      `| **Spec File** | \`${tc.specFile}\` |`,
      '',
      `**Preconditions:** ${tc.preconditions}`,
      '',
      '**Steps:**',
      ...tc.steps.map((step, i) => `${i + 1}. ${step}`),
      '',
      `**Expected Result:** ${tc.expected}`,
      '',
      '---',
      '',
    ].join('\n');
  }).join('\n');

  // Count priorities and categories
  const counts = {
    high: TEST_CASES.filter((t) => t.priority === 'High').length,
    medium: TEST_CASES.filter((t) => t.priority === 'Medium').length,
    low: TEST_CASES.filter((t) => t.priority === 'Low').length,
    smoke: TEST_CASES.filter((t) => t.category === 'Smoke').length,
    functional: TEST_CASES.filter((t) => t.category === 'Functional').length,
    negative: TEST_CASES.filter((t) => t.category === 'Negative').length,
  };

  // Populate template
  const replacements = {
    '{{PROJECT_NAME}}': config.app.name,
    '{{VERSION}}': config.testPlan.version,
    '{{AUTHOR}}': config.testPlan.author,
    '{{DATE}}': new Date().toISOString().split('T')[0],
    '{{TOTAL_TESTS}}': String(TEST_CASES.length),
    '{{TEST_CASES}}': testCasesMd,
    '{{HIGH_COUNT}}': String(counts.high),
    '{{MEDIUM_COUNT}}': String(counts.medium),
    '{{LOW_COUNT}}': String(counts.low),
    '{{SMOKE_COUNT}}': String(counts.smoke),
    '{{FUNCTIONAL_COUNT}}': String(counts.functional),
    '{{NEGATIVE_COUNT}}': String(counts.negative),
  };

  for (const [placeholder, value] of Object.entries(replacements)) {
    template = template.replaceAll(placeholder, value);
  }

  // Write the test cases document
  const outputPath = path.join(projectDir, 'documents', 'test_cases.md');
  fs.writeFileSync(outputPath, template);

  console.log(`  Test cases generated: ${outputPath}`);
  console.log(`  Total: ${TEST_CASES.length} test cases`);
  console.log(`  High: ${counts.high}, Medium: ${counts.medium}, Low: ${counts.low}`);

  return outputPath;
}

if (require.main === module) {
  generateTestCases();
}

module.exports = { generateTestCases };
