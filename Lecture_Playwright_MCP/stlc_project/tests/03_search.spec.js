const { test, expect } = require('@playwright/test');

test.describe('TC-003: Input Fields', () => {
  test('should accept text input in number field', async ({ page }) => {
    await page.goto('/inputs');

    // Verify the input page heading
    const heading = page.locator('h3');
    await expect(heading).toHaveText('Inputs');

    // Find the input field and type a value
    const input = page.locator('input[type="number"]');
    await expect(input).toBeVisible();
    await input.fill('42');

    // Verify the value was entered
    await expect(input).toHaveValue('42');

    console.log('TC-003: Input field accepted text successfully');
  });
});
