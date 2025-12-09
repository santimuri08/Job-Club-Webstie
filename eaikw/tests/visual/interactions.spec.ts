import { test, expect } from "@playwright/test";

// Simplified: Test only critical interactive functionality
test.describe("Interactive Functionality", () => {
  test("mobile menu opens and closes", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    const menuButton = page.locator('[data-testid="mobile-menu-button"]');
    const mobileMenu = page.locator('[data-testid="mobile-menu"]');

    // Menu should be hidden initially
    await expect(mobileMenu).not.toBeVisible();

    // Click to open
    await menuButton.click();
    await expect(mobileMenu).toBeVisible();

    // Click to close
    await menuButton.click();
    await expect(mobileMenu).not.toBeVisible();
  });

  test("pages load correctly", async ({ page }) => {
    // Simple smoke test for key pages
    await page.goto("/");
    await expect(page.locator('h1')).toBeVisible();
    
    await page.goto("/blog/");
    await expect(page).toHaveURL(/\/blog\//);
  });
});
