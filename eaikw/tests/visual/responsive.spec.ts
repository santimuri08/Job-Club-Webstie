import { test, expect } from "@playwright/test";

// Simplified: Test only key responsive breakpoints
test.describe("Responsive Layout Tests", () => {
  test("homepage renders correctly on desktop", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(300);

    // Check no horizontal scroll
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = page.viewportSize()?.width || 1280;
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth);
  });

  test("homepage renders correctly on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");
    await page.waitForTimeout(300);

    // Check no horizontal scroll
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(bodyWidth).toBeLessThanOrEqual(375);
  });

  test("blog page renders correctly", async ({ page }) => {
    await page.goto("/blog/");
    await page.waitForTimeout(300);

    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = page.viewportSize()?.width || 1280;
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth);
  });
});
