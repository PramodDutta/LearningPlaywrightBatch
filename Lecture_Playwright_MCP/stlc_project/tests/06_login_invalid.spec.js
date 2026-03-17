const { test, expect } = require('@playwright/test');

test.describe('TC-006: Invalid Login', () => {
  test('should show error message with invalid credentials', async ({ page }) => {
    await page.goto('/login');

    // Enter invalid credentials
    await page.locator('#username').fill('invaliduser');
    await page.locator('#password').fill('invalidpass');

    // Click login button
    await page.locator('button[type="submit"]').click();

    // Verify error message appears
    const flash = page.locator('#flash');
    await expect(flash).toBeVisible();
    await expect(flash).toContainText('Your username is invalid!');

    // Verify we're still on the login page
    await expect(page).toHaveURL(/\/login/);

    console.log('TC-006: Invalid login shows error correctly');
  });
});
