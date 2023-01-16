import { join } from 'path';
import { cwd } from 'process';

import { expect, Page, test } from '@playwright/test';

import { listPages } from '@/utils/specs/pages';
import { testByClassSelector } from '@/utils/specs/selectors';
import { inputTextToSearch } from '@/utils/specs/interactions/search';
import { assertLinksAvailable } from '@/utils/specs/asserts/links/available';
import { singletonExists } from '@/utils/specs/asserts/common';

function getFooter(page: Page) {
  return page.locator(testByClassSelector('global-footer'));
}

test.describe('All pages layout', () => {
  for (const url of listPages(join(cwd(), 'src', 'pages'))) {
    test.describe(url, () => {
      test.beforeEach(async ({ page }) => {
        await page.goto(url, { waitUntil: 'domcontentloaded' });
      });

      test('Header: exists', async ({ page }) => {
        await singletonExists(page.getByTestId('header'), 'should have Header');
      });

      test('Header: test search environment', async ({ page }) => {
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

      test('Footer: exists', async ({ page }) => {
        await singletonExists(getFooter(page), 'should have Footer');
      });

      test('Footer: links work @slow', async ({ page }) => {
        await assertLinksAvailable(getFooter(page).locator('a[href]'));
      });
    });
  }
});
