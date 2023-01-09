import { env } from 'process';
import type { PlaywrightTestConfig } from '@playwright/experimental-ct-react';
import DEFAULT_CONFIG from './playwright.config';

if (!env.TEST_CT) {
  env.TEST_CT = 'true';
}

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  ...DEFAULT_CONFIG,
  testMatch: /.+\.spec\.tsx?$/,
  use: {
    ...DEFAULT_CONFIG.use,
    ctViteConfig: {
      configFile: './vitest.config.ts',
    },
  },
};

export default config;
