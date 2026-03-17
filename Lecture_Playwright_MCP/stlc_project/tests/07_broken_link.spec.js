const { test, expect } = require('@playwright/test');

/* ============================================================
 * INTENTIONAL FAILURE - TC-007
 *
 * This test is DESIGNED TO FAIL to demonstrate how the STLC
 * pipeline handles test failures and creates Jira tickets.
 *
 * It asserts that a broken image returns HTTP 200, which it won't.
 * ============================================================ */

test.describe('TC-007: Broken Link Detection [EXPECTED FAIL]', () => {
  test('should verify broken image returns 200 status', async ({ page, request }) => {
    await page.goto('/broken_images');

    // Get a broken image src - this image intentionally doesn't load
    const brokenImg = page.locator('img').nth(1);
    const src = await brokenImg.getAttribute('src');

    // Make a request to the broken image URL
    const response = await request.get(`https://the-internet.herokuapp.com/${src}`);

    // INTENTIONAL FAILURE: Asserting broken image returns 200
    // A broken image will return 404, not 200
    expect(response.status()).toBe(200);
  });
});
