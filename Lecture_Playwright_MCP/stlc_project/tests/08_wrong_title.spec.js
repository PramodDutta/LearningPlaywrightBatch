const { test, expect } = require('@playwright/test');

/* ============================================================
 * INTENTIONAL FAILURE - TC-008
 *
 * This test is DESIGNED TO FAIL to demonstrate how the STLC
 * pipeline handles test failures and creates Jira tickets.
 *
 * It asserts the page title is "Wrong Title" when it's actually
 * "The Internet".
 * ============================================================ */

test.describe('TC-008: Page Title Verification [EXPECTED FAIL]', () => {
  test('should have correct page title', async ({ page }) => {
    await page.goto('/');

    // INTENTIONAL FAILURE: Asserting wrong title
    // The actual title is "The Internet", not "Wrong Title That Does Not Exist"
    await expect(page).toHaveTitle('Wrong Title That Does Not Exist');
  });
});
