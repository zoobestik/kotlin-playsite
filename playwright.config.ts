import { env } from 'process';
import type { PlaywrightTestConfig, Project } from '@playwright/test';
import { devices } from '@playwright/test';

const isDevMode = Boolean(env.E2E === 'dev');

const DEV_PROJECTS: Project[] = [
  {
    name: 'Desktop',
    use: { ...devices['Desktop Chrome'] },
  },
  {
    name: 'Mobile',
    use: { ...devices['iPhone SE'] },
  },
];

const CI_PROJECTS_LIST = [
  'Desktop Chrome',
  'iPhone SE',
  'iPhone 12',
  'Nexus 10',
];

const CI_PROJECTS: Project[] = CI_PROJECTS_LIST.map((name) => ({
  name,
  use: { ...devices[name] },
}));

const projects = isDevMode ? DEV_PROJECTS : CI_PROJECTS;

const config: PlaywrightTestConfig = {
  forbidOnly: !isDevMode,
  reporter: 'list',
  retries: isDevMode ? 0 : 2,
  fullyParallel: !isDevMode,
  webServer: {
    command: 'npm run start',
    port: 3000,
    reuseExistingServer: isDevMode,
  },
  use: {
    testIdAttribute: 'data-test',
    headless: !isDevMode,
    ignoreHTTPSErrors: true,
    trace: isDevMode ? 'on-first-retry' : 'on',
    video: isDevMode ? 'on-first-retry' : 'on',
  },
  projects,
};

export default config;
