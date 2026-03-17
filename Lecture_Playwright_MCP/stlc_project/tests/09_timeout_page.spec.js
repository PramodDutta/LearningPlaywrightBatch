const { test, expect } = require('@playwright/test');

/* ============================================================
 * INTENTIONAL FAILURE - TC-009
 *
 * This test is DESIGNED TO FAIL to demonstrate how the STLC
 * pipeline handles test failures and creates Jira tickets.
 *
 * It waits for a non-existent element with an extremely short
 * timeout (1ms), which will always time out.
 * ============================================================ */

test.describe('TC-009: Timeout Handling [EXPECTED FAIL]', () => {
  test('should find element within timeout', async ({ page }) => {
    await page.goto('/dynamic_loading/1');

    // INTENTIONAL FAILURE: Waiting for non-existent element with 1ms timeout
    // This will always timeout because:
    // 1. The element is hidden and requires clicking "Start" first
    // 2. Even after clicking, the loading takes several seconds
    // 3. We set timeout to 1ms which is impossibly short
    const element = page.locator('#non-existent-element-that-will-never-appear');
    await expect(element).toBeVisible({ timeout: 1 });
  });
});
