const { test, expect } = require('@playwright/test');

test.describe('TC-004: Form Authentication', () => {
  test('should display login form with all required fields', async ({ page }) => {
    await page.goto('/login');

    // Verify the login form heading
    const heading = page.locator('h2');
    await expect(heading).toHaveText('Login Page');

    // Verify username field exists
    const username = page.locator('#username');
    await expect(username).toBeVisible();

    // Verify password field exists
    const password = page.locator('#password');
    await expect(password).toBeVisible();

    // Verify login button exists
    const loginButton = page.locator('button[type="submit"]');
    await expect(loginButton).toBeVisible();
    await expect(loginButton).toContainText('Login');

    console.log('TC-004: Login form has all required fields');
  });
});
