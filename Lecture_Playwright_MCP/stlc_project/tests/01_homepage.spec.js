const { test, expect } = require('@playwright/test');

test.describe('TC-001: Homepage', () => {
  test('should load homepage with correct title and heading', async ({ page }) => {
    await page.goto('/');

    // Verify the page title
    await expect(page).toHaveTitle('The Internet');

    // Verify the main heading
    const heading = page.locator('h1.heading');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('Welcome to the-internet');

    console.log('TC-001: Homepage loaded successfully');
  });
});
