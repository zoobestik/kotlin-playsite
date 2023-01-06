import { env } from 'process';
import { config as dotenv } from 'dotenv';
import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

dotenv({ path: `.env.local`, override: true });

const NORMAL_PROJECTS_LIST = [
  'iPhone SE', // MS
  'iPhone 8 Plus', // MM
  'Galaxy Tab S4', // TS
  'iPad Pro 11', // TM
  'iPad (gen 7) landscape', // TM
  'Desktop Chrome', // TM
];

const PROJECTS_LIST = {
  SHORT: [
    'iPhone SE', // Mobile
    'Desktop Chrome', // Desktop
  ],

  NORMAL: NORMAL_PROJECTS_LIST,

  LONG: [...NORMAL_PROJECTS_LIST, 'Desktop Firefox', 'Desktop Safari'],
};

const isDevMode = Boolean(env.E2E === 'dev');
const isLowResMode = Boolean(env.E2E_LOWRES_AGENT === 'true');

export function isKeyOfObject<T extends object>(
  key: string | number | symbol,
  obj: T,
): key is keyof T {
  return key in obj;
}

function getProjects() {
  const { E2E_PROJECT_LIST } = env;

  if (E2E_PROJECT_LIST) {
    const key = E2E_PROJECT_LIST.toUpperCase();

    if (isKeyOfObject(key, PROJECTS_LIST)) return PROJECTS_LIST[key];

    const list = Object.keys(PROJECTS_LIST)
      .map((s) => `'${s.toLowerCase()}'`)
      .join(' or ');
    throw Error(`E2E_PROJECT_LIST should be ${list}`);
  }

  // @TODO: Variable `E2E_LOWRES_AGENT` should disable specific test
  if (isDevMode || isLowResMode) return PROJECTS_LIST.SHORT;

  return PROJECTS_LIST.NORMAL;
}

function getHeadlessMode() {
  const { E2E_HEADLESS_MODE } = env;

  if (E2E_HEADLESS_MODE) {
    return E2E_HEADLESS_MODE === 'true';
  }

  return !isDevMode;
}

const config: PlaywrightTestConfig = {
  timeout: isLowResMode ? 120000 : 60000,
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
