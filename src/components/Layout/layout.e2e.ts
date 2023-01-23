import { expect, test } from '@playwright/test';
import { mockSearchRequest } from '@/utils/specs/interactions/searchMock';

import { assertLinksAvailable } from '@/utils/specs/asserts/links/available';
import { getFooter } from '@/utils/specs/selectors/footer';
import { clickMenuSubItem } from '@/utils/specs/interactions/globalMenu';

test.describe('Global layout', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
  });

  test('Header: test internal navigation exist', async ({ page }) => {
    const response = await clickMenuSubItem(page, 'Play', '/hands-on');

    expect(response, 'navigate without page reload').toBeNull();
  });

  test('Header: test search environment', async ({ page }) => {
    await mockSearchRequest(page);

    const quickSearchResults = expect(
      page.getByTestId('quick-search-results'),
      'should show quick search result',
    );

    await quickSearchResults.toBeVisible();

    const RESULT_TITLES = [
      'Write your first test with Lincheck',
      'Write your first test with Othercheck',
    ];

    await Promise.all(
      RESULT_TITLES.map((text) => quickSearchResults.toContainText(text)),
    );
  });

  test('Footer: links work @slow', async ({ page }) => {
    await assertLinksAvailable(getFooter(page).locator('a[href]'));
  });
});
