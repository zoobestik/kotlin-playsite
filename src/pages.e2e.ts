import { join } from 'path';
import { cwd } from 'process';

import { expect, Page, test } from '@playwright/test';

import { listPages } from '@/utils/specs/pages';
import { testByClassSelector } from '@/utils/specs/selectors';
import { inputTextToSearch } from '@/utils/specs/interactions/search';
import { assertLinksAvailable } from '@/utils/specs/asserts/links/available';
import { singletonExists } from '@/utils/specs/asserts/common';

test.describe('All pages layout', () => {
  for (const url of listPages(join(cwd(), 'src', 'pages'))) {
    test.describe(url, () => {
      test.beforeEach(async ({ page }) => {
        await page.goto(url);
      });

      test.describe('Header', () => {
        test('exists', async ({ page }) => {
          await singletonExists(
            page.getByTestId('header'),
            'should have Header',
          );
        });

        test('test search environment', async ({ page }) => {
          await inputTextToSearch(page, 'ranges');

          const quickSearchResults = expect(
            page.getByTestId('quick-search-results'),
            'should show quick search result',
          );

          await quickSearchResults.toBeVisible();

          const RESULT_TITLES = [
            'Basic syntax: Ranges',
            'Ranges and progressions: Range',
          ];

          await Promise.all(
            RESULT_TITLES.map((text) => quickSearchResults.toContainText(text)),
          );
        });
      });

      test.describe('Footer', () => {
        function getHeader(page: Page) {
          return page.locator(testByClassSelector('global-footer'));
        }

        test('exists', async ({ page }) => {
          await singletonExists(getHeader(page), 'should have Footer');
        });

        test('links work @slow', async ({ page }) => {
          await assertLinksAvailable(page, getHeader(page).locator('a[href]'));
        });
      });
    });
  }
});
