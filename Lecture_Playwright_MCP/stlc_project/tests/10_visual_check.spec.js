const { test, expect } = require('@playwright/test');

test.describe('TC-010: Visual Elements', () => {
  test('should have all key visual elements on homepage', async ({ page }) => {
    await page.goto('/');

    // Verify main heading exists
    const heading = page.locator('h1.heading');
    await expect(heading).toBeVisible();

    // Verify sub-heading exists
    const subHeading = page.locator('h2');
    await expect(subHeading).toBeVisible();
    await expect(subHeading).toHaveText('Available Examples');

    // Verify the link list container exists
    const linkList = page.locator('#content ul');
    await expect(linkList).toBeVisible();

    // Verify there are multiple links
    const links = page.locator('#content ul li a');
    const count = await links.count();
    expect(count).toBeGreaterThan(10);

    // Verify the page footer exists
    const footer = page.locator('#page-footer');
    await expect(footer).toBeVisible();

    console.log(`TC-010: All visual elements present (${count} links found)`);
  });
});
