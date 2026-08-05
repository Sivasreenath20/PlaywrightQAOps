// @ts-check
import { defineConfig, devices } from '@playwright/test';
/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  timeout: 400000, //this time is for the total time to execute each test
  expect:{
    timeout: 50000, //this time is for the time to wait for an element to appear in the page
  },
  //reporter: 'html', //this time is for the type of report to generate after the tests are executed
  //reporter: [["line"], ["allure-playwright"]],
  retries: 1, //this time is for the number of times to retry a test if it fails

  
  use: {
    browserName: 'chromium', //this time is for the browser to launch
    headless: process.env.CI ? true : false, //this time is for the browser to be visible or not
    trace: "off", //this time is for the trace to be generated only when the test fails
    screenshot: "only-on-failure"
  },
});