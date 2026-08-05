// @ts-check
import { defineConfig, devices } from '@playwright/test';
/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  timeout: 40000,
  workers : 3, //this is for the number of workers to run the tests in parallel, if you want to run the tests in parallel then you can increase the number of workers
  //by default playwright will run the tests in 5 parallel available workers
  retries: 1, //this time is for the number of times to retry a test if it fails
  expect: {
    timeout: 5000,
  },

  projects: [
    {
      name: "Chrome",
      use: {
        browserName: 'chromium', 
        headless: false,
        trace: "on-first-retry", //this will generate the trace only when the test fails and is retried
        screenshot: "only-on-failure",
        ...devices['Galaxy A55 landscape'],
        ignoreHTTPSErrors: true, //this will ignore the HTTPS errors in the browser
        permissions: ['geolocation'], //this will allow the browser to access the geolocation of the device
        video: 'retain-on-failure', //this will record a video of the test only when it fails and is retried
      }
    },
    {
      name: "Safari",
      use: {
        browserName: 'webkit', 
        headless: false,
        trace: "off",
        screenshot: "only-on-failure",
        ...devices['Desktop Safari']
      }
    },
    {
      name: "Edge",
      use: {
        browserName: 'chromium', 
        channel: 'msedge',
        headless: false,
        trace: "off",
        screenshot: "only-on-failure"
      }
    }
  ]
});