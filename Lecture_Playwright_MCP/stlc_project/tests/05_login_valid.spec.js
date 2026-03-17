const { test, expect } = require('@playwright/test');

test.describe('TC-005: Valid Login', () => {
  test('should login successfully with valid credentials', async ({ page }) => {
    await page.goto('/login');

    // Enter valid credentials
    await page.locator('#username').fill('tomsmith');
    await page.locator('#password').fill('SuperSecretPassword!');

    // Click login button
    await page.locator('button[type="submit"]').click();

    // Verify successful login
    await expect(page).toHaveURL(/\/secure/);

    // Verify success message
    const flash = page.locator('#flash');
    await expect(flash).toContainText('You logged into a secure area!');

    console.log('TC-005: Valid login successful');
  });
});
