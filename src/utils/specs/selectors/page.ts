import { Page } from '@playwright/test';

export function getPageContent(page: Page) {
  return page.getByTestId('page-content').first();
}
