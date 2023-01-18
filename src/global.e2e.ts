import { join } from 'path';
import { cwd } from 'process';

import { test } from '@playwright/test';

import { listPages } from '@/utils/specs/pages';
import { singletonExists } from '@/utils/specs/asserts/common';
import { getFooter } from '@/utils/specs/selectors/footer';
import { getHeader } from './utils/specs/selectors/header';

test.describe('All pages layout', () => {
  for (const url of listPages(join(cwd(), 'src', 'pages'))) {
    test.describe(url, () => {
      test.beforeEach(async ({ page }) => {
        await page.goto(url, { waitUntil: 'domcontentloaded' });
      });

      test('Header: exists', async ({ page }) => {
        await singletonExists(getHeader(page), 'should have Header');
      });

      test('Footer: exists', async ({ page }) => {
        await singletonExists(getFooter(page), 'should have Footer');
      });
    });
  }
});
