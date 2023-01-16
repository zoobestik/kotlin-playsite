import { expect, Page, test } from '@playwright/test';

import { checkExternalLink } from '@/utils/specs/asserts/links';
import { assertLinksAvailable } from '@/utils/specs/asserts/links/available';

function getListItems(page: Page) {
  return page.getByTestId('hands-on-list--link');
}

test.describe('HandsOn', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/hands-on/', { waitUntil: 'domcontentloaded' });
  });

  test('initial state elements', async ({ page }) => {
    await expect(page).toHaveTitle('Welcome to Kotlin hands-on');

    const header = expect(page.locator('h1'));

    await Promise.all([
      header.toHaveCount(1),
      header.toBeVisible(),
      header.toHaveText('Kotlin Hands-On'),
    ]);
  });

  test('list rendered correctly', async ({ page }) => {
    const handsOnList = getListItems(page);

    await expect(handsOnList).toHaveCount(12);

    const links = await handsOnList.all();

    await Promise.all(
      links.map(async (link) => {
        await checkExternalLink(link);

        const button = expect(link.getByTestId('button'));
        await Promise.all([
          button.toHaveClass(/alignIconRight/),
          button.toHaveText('Start'),
        ]);
      }),
    );
  });

  test('list links work @slow', async ({ page }) => {
    await assertLinksAvailable(getListItems(page));
  });
});
