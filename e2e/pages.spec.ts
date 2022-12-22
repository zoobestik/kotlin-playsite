import { test } from '@playwright/test';
import { footerExists, headerExists } from './scenarios/common';

// @ToDo: dynamic build pages list
export function listPages() {
  return ['/' /*'/404'*/];
}

for (const url of listPages()) {
  test.describe(`Common tests for '${url}'`, () => {
    test('should have global elements', async ({ page }) => {
      await page.goto(`http://localhost:3000${url}`);
      await Promise.all([headerExists(page), footerExists(page)]);
    });
  });
}
