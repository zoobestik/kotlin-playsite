import { Page } from '@playwright/test';

import { testByClassSelector } from '@/utils/specs/selectors';

export function getFooter(page: Page) {
  return page.locator(testByClassSelector('global-footer'));
}
