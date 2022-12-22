import { expect, Page } from '@playwright/test';
import { testSelector } from '../utils/selectors';

export async function headerExists(page: Page) {
  const header = expect(page.getByTestId('header'), 'should have Header');
  await Promise.all([header.toHaveCount(1), header.toBeVisible()]);
}

export async function footerExists(page: Page) {
  const footer = expect(
    page.locator(testSelector('global-footer')),
    'should have Footer',
  );
  await Promise.all([footer.toHaveCount(1), footer.toBeVisible()]);
}
