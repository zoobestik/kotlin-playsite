import { expect, Page, test } from '@playwright/test';

import { testByClassSelector } from '../utils/selectors';
import { inputTextToSearch } from '../utils/interactions/search';
import { assertLinkWorks } from '../utils/asserts/linkWorks';
import { singletonExists } from '../utils/asserts/common';

// @ToDo: dynamic build pages list
export function listPages() {
  return ['/' /*'/404'*/];
}

for (const url of listPages()) {
  test.describe(url, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(url);
    });

    test.describe('Header', () => {
      test('exists', async ({ page }) => {
        await singletonExists(page.getByTestId('header'), 'should have Header');
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

      test('links work @release', async ({ page }) => {
        const links = await getHeader(page).locator('a[href]').all();

        for (const link of links) {
          await assertLinkWorks(page, link);
        }
      });
    });
  });
}
