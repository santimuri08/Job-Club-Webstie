const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/playwright',
  timeout: 30000,
  retries: 1,
  use: {
    baseURL: 'http://localhost:8080',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure'
  },
  webServer: {
    command: 'npm run build && npx serve _site -p 8080',
    port: 8080,
    reuseExistingServer: !process.env.CI
  }
});