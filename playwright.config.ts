import { env } from 'process';
import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

const isDevMode = Boolean(env.E2E_DEV === 'true');

const config: PlaywrightTestConfig = {
  forbidOnly: !isDevMode,
  reporter: isDevMode ? 'list' : 'dot',
  retries: isDevMode ? 0 : 2,
  fullyParallel: !isDevMode,
  use: {
    testIdAttribute: 'data-test',
    headless: !isDevMode,
    ignoreHTTPSErrors: true,
    trace: 'on-first-retry',
    video: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'webkit',
      use: { ...devices['iPhone SE'] },
    },
  ],
};

export default config;
