import { test, expect } from "@playwright/test";

// Only run visual regression on chromium to catch real CSS issues
test.describe("Component Visual Snapshots", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("header component", async ({ page }) => {
    const header = page.locator('[data-testid="main-header"]');
    await expect(header).toHaveScreenshot("header.png");
  });

  test("hero section", async ({ page }) => {
    const hero = page.locator('[data-component="hero"]');
    await expect(hero).toHaveScreenshot("hero.png");
  });

  test("featured projects section", async ({ page }) => {
    const projects = page.locator('[data-component="featured-projects"]');
    await expect(projects).toHaveScreenshot("featured-projects.png");
  });

  test("footer component", async ({ page }) => {
    const footer = page.locator('[data-testid="main-footer"]');
    await expect(footer).toHaveScreenshot("footer.png");
  });
});
