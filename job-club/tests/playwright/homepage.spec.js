const { test, expect } = require('@playwright/test');

test.describe('Homepage', () => {
  
  test('should load successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check page title
    await expect(page).toHaveTitle(/Job Club/);
    
    // Check main heading
    const h1 = page.locator('h1');
    await expect(h1).toContainText('AI Professionals');
  });
  
  test('should have working navigation', async ({ page }) => {
    await page.goto('/');
    
    // Click Events link
    await page.click('text=Events');
    await expect(page).toHaveURL(/events/);
    
    // Click Resources link
    await page.click('text=Resources');
    await expect(page).toHaveURL(/resources/);
    
    // Click Join link
    await page.click('text=Join');
    await expect(page).toHaveURL(/join/);
  });
  
  test('should display event cards', async ({ page }) => {
    await page.goto('/');
    
    // Check for event cards
    const eventCards = page.locator('.event-card');
    await expect(eventCards.first()).toBeVisible();
  });
  
  test('should have accessible navigation', async ({ page }) => {
    await page.goto('/');
    
    // Check ARIA label on nav
    const nav = page.locator('nav[aria-label="Main navigation"]');
    await expect(nav).toBeVisible();
  });
  
});