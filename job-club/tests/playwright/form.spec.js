const { test, expect } = require('@playwright/test');

test.describe('Onboarding Form', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/join/');
  });
  
  test('should render form correctly', async ({ page }) => {
    // Check form exists
    const form = page.locator('#onboarding-form');
    await expect(form).toBeVisible();
    
    // Check required fields exist
    await expect(page.locator('#name')).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#major')).toBeVisible();
    await expect(page.locator('#graduation-year')).toBeVisible();
    await expect(page.locator('#career-goal')).toBeVisible();
  });
  
  test('should show validation errors for empty required fields', async ({ page }) => {
    // Submit empty form
    await page.click('button[type="submit"]');
    
    // Check for error messages
    const nameError = page.locator('#name-error');
    await expect(nameError).not.toBeEmpty();
  });
  
  test('should validate email format', async ({ page }) => {
    // Fill invalid email
    await page.fill('#email', 'invalid-email');
    await page.click('#name'); // Trigger blur
    
    // Check for error
    const emailError = page.locator('#email-error');
    await expect(emailError).toContainText('valid email');
  });
  
  test('should validate URL format', async ({ page }) => {
    // Fill invalid URL
    await page.fill('#linkedin', 'not-a-url');
    await page.click('#name'); // Trigger blur
    
    // Check for error
    const linkedinError = page.locator('#linkedin-error');
    await expect(linkedinError).toContainText('valid URL');
  });
  
  test('should accept form with valid data', async ({ page }) => {
    // Fill form with valid data
    await page.fill('#name', 'Test User');
    await page.fill('#email', 'test@example.com');
    await page.fill('#major', 'Computer Science');
    await page.selectOption('#graduation-year', '2025');
    await page.selectOption('#career-goal', 'swe');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Check success message appears
    const successMessage = page.locator('#success-message');
    await expect(successMessage).toBeVisible();
  });
  
});