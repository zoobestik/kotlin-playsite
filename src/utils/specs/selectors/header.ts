import { Page } from '@playwright/test';

export function getHeader(page: Page) {
  return page.getByTestId('header');
}
