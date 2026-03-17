/**
 * STLC Pipeline - Step 3: Run Tests
 *
 * Executes Playwright tests programmatically and captures results.
 * Uses child_process to run npx playwright test.
 */

const { execSync } = require('child_process');
const path = require('path');

const lectureDir = path.resolve(__dirname, '..', '..');

function runTests() {
  console.log('\n--- Step 3: Running Playwright Tests ---\n');
  console.log(`  Working directory: ${lectureDir}`);
  console.log('  Running: npx playwright test\n');

  try {
    // Run playwright tests - this will exit with code 1 if any tests fail
    const output = execSync('npx playwright test', {
      cwd: lectureDir,
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
      timeout: 120000, // 2 minute timeout
    });

    console.log(output);
    console.log('  All tests passed!');
    return { success: true, output };
  } catch (error) {
    // Playwright exits with code 1 when tests fail - this is expected
    const output = error.stdout || '';
    const stderr = error.stderr || '';

    console.log(output);
    if (stderr) {
      console.log(stderr);
    }

    console.log('  Some tests failed (expected - we have intentional failures)');
    return { success: false, output: output + stderr };
  }
}

if (require.main === module) {
  runTests();
}

module.exports = { runTests };
