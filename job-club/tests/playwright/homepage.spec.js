// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/home/');
    await expect(page).toHaveTitle(/Job Club/i);
  });

  test('should display header with logo', async ({ page }) => {
    await page.goto('/home/');
    const logo = page.locator('.logo');
    await expect(logo).toBeVisible();
  });

  test('should have working navigation', async ({ page }) => {
    await page.goto('/home/');
    
    // Open navigation menu
    const navToggle = page.locator('.cube-nav-toggle');
    await navToggle.click();
    
    // Wait for menu to be visible
    await page.waitForSelector('.cube-nav-menu', { state: 'visible' });
    
    // Check menu items using more specific selectors (nav menu only)
    await expect(page.locator('.nav-menu-item[href="/home/"]')).toBeVisible();
    await expect(page.locator('.nav-menu-item[href="/events/"]')).toBeVisible();
    await expect(page.locator('.nav-menu-item[href="/resources/"]')).toBeVisible();
    await expect(page.locator('.nav-menu-item[href="/join/"]')).toBeVisible();
  });

  test('should navigate to Join page', async ({ page }) => {
    await page.goto('/home/');
    
    // Open navigation menu
    const navToggle = page.locator('.cube-nav-toggle');
    await navToggle.click();
    
    // Wait for menu
    await page.waitForSelector('.cube-nav-menu', { state: 'visible' });
    
    // Click Join link in nav menu
    await page.locator('.nav-menu-item[href="/join/"]').click();
    
    // Wait for navigation
    await page.waitForURL('**/join/');
    await expect(page).toHaveURL(/\/join\//);
  });

  test('should have hero section', async ({ page }) => {
    await page.goto('/home/');
    const hero = page.locator('.hero');
    await expect(hero).toBeVisible();
  });

  test('should display footer', async ({ page }) => {
    await page.goto('/home/');
    const footer = page.locator('.footer');
    await expect(footer).toBeVisible();
  });

  test('should have skip link for accessibility', async ({ page }) => {
    await page.goto('/home/');
    const skipLink = page.locator('.skip-link');
    await expect(skipLink).toHaveAttribute('href', '#main-content');
  });
});

test.describe('Cookie Banner', () => {
  test('should show cookie banner on first visit', async ({ page, context }) => {
    // Use a fresh context to simulate first visit
    await context.clearCookies();
    
    await page.goto('/home/');
    
    // Wait for banner to appear (it has a 1 second delay)
    const banner = page.locator('#cookie-banner');
    await expect(banner).toBeVisible({ timeout: 3000 });
  });

  test('should hide banner after accepting', async ({ page, context }) => {
    await context.clearCookies();
    
    await page.goto('/home/');
    
    // Wait for banner
    const banner = page.locator('#cookie-banner');
    await expect(banner).toBeVisible({ timeout: 3000 });
    
    // Click accept
    const acceptBtn = page.locator('#accept-cookies');
    await acceptBtn.click();
    
    // Banner should be hidden
    await expect(banner).toBeHidden();
  });

  test('should hide banner after rejecting', async ({ page, context }) => {
    await context.clearCookies();
    
    await page.goto('/home/');
    
    // Wait for banner
    const banner = page.locator('#cookie-banner');
    await expect(banner).toBeVisible({ timeout: 3000 });
    
    // Click decline
    const declineBtn = page.locator('#decline-cookies');
    await declineBtn.click();
    
    // Banner should be hidden
    await expect(banner).toBeHidden();
  });

  test('should not show banner on return visit if choice made', async ({ page, context }) => {
    await context.clearCookies();
    
    // First visit - accept cookies
    await page.goto('/home/');
    const banner = page.locator('#cookie-banner');
    await expect(banner).toBeVisible({ timeout: 3000 });
    await page.locator('#accept-cookies').click();
    await expect(banner).toBeHidden();
    
    // Second visit - banner should not appear
    await page.goto('/home/');
    await page.waitForTimeout(1500); // Wait longer than the banner delay
    await expect(banner).toBeHidden();
  });
});

test.describe('Intro Page', () => {
  test('should load intro page at root', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Job Club/i);
  });

  test('should have 3D cube', async ({ page }) => {
    await page.goto('/');
    const cube = page.locator('.cube');
    await expect(cube).toBeVisible();
  });

  test('should have Get Started button', async ({ page }) => {
    await page.goto('/');
    const button = page.locator('.btn-glow, .btn-primary').first();
    await expect(button).toBeVisible();
  });

  test('should navigate to home from intro', async ({ page }) => {
    await page.goto('/');
    
    // Click the main CTA button
    const ctaButton = page.locator('a.btn-glow, a.btn-primary').first();
    await ctaButton.click();
    
    // Should navigate to home
    await page.waitForURL('**/home/');
    await expect(page).toHaveURL(/\/home\//);
  });
});

test.describe('Accessibility', () => {
  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/home/');
    
    // Press Tab to start keyboard navigation
    await page.keyboard.press('Tab');
    
    // Skip link should exist and be accessible
    const skipLink = page.locator('.skip-link');
    await expect(skipLink).toHaveAttribute('href', '#main-content');
    
    // Main content should exist and be targetable
    const main = page.locator('#main-content');
    await expect(main).toBeVisible();
  });
  
  test('should have proper ARIA labels on navigation', async ({ page }) => {
    await page.goto('/home/');
    
    // Check nav toggle has accessible attributes
    const navToggle = page.locator('.cube-nav-toggle');
    await expect(navToggle).toBeVisible();
  });
});
