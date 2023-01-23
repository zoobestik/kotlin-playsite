import { expect, test } from '@playwright/test';
import { getPageContent } from '@/utils/specs/selectors/page';
import { assertComponentSnapshot } from '@/utils/specs/asserts/snapshot';

test.describe('_app', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
  });

  test('SEO attributes', async ({ page }) => {
    await expect(page).toHaveTitle(
      'Kotlin Playground: Edit, Run, Share Kotlin Code Online',
    );
  });

  test('initial state elements', async ({ page }) => {
    await assertComponentSnapshot(getPageContent(page), 'initial.png');
  });
});
