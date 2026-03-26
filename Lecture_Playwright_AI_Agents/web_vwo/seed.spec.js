import { test, expect } from '@playwright/test';

test('seed', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/.+/);
});