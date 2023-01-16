import { expect, test } from '@playwright/test';
import { assertPageSnapshot } from '@/utils/specs/asserts/snapshot';

test.describe('404', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/non-exist-page/', { waitUntil: 'domcontentloaded' });
  });

  test('Page works', async ({ page }) => {
    const backLink = page.getByTestId('page404-backlink');

    await Promise.all([
      expect(backLink).toBeVisible(),
      expect(backLink).toHaveAttribute('href', '/'),
    ]);

    const header = expect(page.locator('h1'));

    await Promise.all([
      header.toHaveCount(1),
      header.toBeVisible(),
      header.toHaveText('Uh-Oh!'),
    ]);

    await assertPageSnapshot(page, 'initial.png');

    await Promise.all([page.waitForNavigation({ url: '/' }), backLink.click()]);
  });
});
