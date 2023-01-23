import { expect, test } from '@playwright/test';

test.describe('_app', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
  });

  test.describe('with js', () => {
    test.use({ javaScriptEnabled: true });
    test('', async ({ page }) => {
      const body = await page.locator('body').first();
      await expect(body).toHaveClass('js');
    });
  });

  test.describe('without js', () => {
    test.use({ javaScriptEnabled: false });
    test('', async ({ page }) => {
      const body = await page.locator('body').first();
      await expect(body).toHaveClass('no-js');
    });
  });
});
