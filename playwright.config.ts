import { env } from 'process';
import { config as dotenv } from 'dotenv';

import { devices, PlaywrightTestConfig } from '@playwright/test';

import { isKeyOfObject } from '@/utils/common';

dotenv({ path: `.env.local`, override: true });

function isWebkit(name: string) {
  return (
    name.includes('iPhone') || name.includes('iPad') || name.includes('Safari')
  );
}

const RESOLUTIONS_COVER_DEVICES = [
  'iPhone SE', // MS
  'iPhone 8 Plus', // MM
  'Galaxy Tab S4', // TS
  'iPad Pro 11', // TM
  'iPad (gen 7) landscape', // TM
  'Desktop Chrome', // DM
  'Desktop Firefox',
  'Desktop Safari',
];

const PROJECTS_LIST = {
  ALL: RESOLUTIONS_COVER_DEVICES,
  DEV: [
    'iPhone 8 Plus', // Mobile
    'Desktop Safari', // Desktop
  ],
  WEBKIT: RESOLUTIONS_COVER_DEVICES.filter(isWebkit),
  NON_WEBKIT: RESOLUTIONS_COVER_DEVICES.filter((name) => !isWebkit(name)),
};

const isDevMode = Boolean(env.TEST_MODE === 'dev');

function getProjects() {
  const { TEST_PROJECT_LIST } = env;

  if (TEST_PROJECT_LIST) {
    const key = TEST_PROJECT_LIST.toUpperCase();

    if (isKeyOfObject(key, PROJECTS_LIST)) return PROJECTS_LIST[key];

    const list = Object.keys(PROJECTS_LIST)
      .map((s) => `'${s.toLowerCase()}'`)
      .join(' or ');

    throw Error(`TEST_PROJECT_LIST should be ${list}`);
  }

  if (isDevMode) return PROJECTS_LIST.DEV;

  return PROJECTS_LIST.ALL;
}

function getHeadlessMode() {
  const { TEST_HEADLESS_MODE } = env;

  if (TEST_HEADLESS_MODE) {
    return TEST_HEADLESS_MODE === 'true';
  }

  return !isDevMode;
}

const snapshotPathTemplate =
  '{testFileDir}/__screenshots__/{testFileName}/{platform}/{projectName}/{testName}-{arg}{ext}';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testMatch: /.*\.e2e\.tsx?$/,
  snapshotPathTemplate,

  timeout: 60000,
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
    headless: getHeadlessMode(),
    ignoreHTTPSErrors: true,
    screenshot: {
      fullPage: true,
      mode: isDevMode ? 'only-on-failure' : 'on',
    },
    trace: isDevMode ? 'on-first-retry' : 'on',
    video: isDevMode ? 'on-first-retry' : 'on',
  },

  projects: getProjects().map((name) => ({
    name,
    use: { ...devices[name] },
  })),
};

export default config;
