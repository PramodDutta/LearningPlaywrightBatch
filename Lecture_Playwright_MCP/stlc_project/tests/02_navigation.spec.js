const { test, expect } = require('@playwright/test');

test.describe('TC-002: Navigation', () => {
  test('should navigate to Form Authentication page via link', async ({ page }) => {
    await page.goto('/');

    // Verify the link exists
    const loginLink = page.locator('a[href="/login"]');
    await expect(loginLink).toBeVisible();

    // Click the link
    await loginLink.click();

    // Verify we navigated to the login page
    await expect(page).toHaveURL(/\/login/);
    const heading = page.locator('h2');
    await expect(heading).toHaveText('Login Page');

    console.log('TC-002: Navigation to login page successful');
  });
});
