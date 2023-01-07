import { expect, Locator } from '@playwright/test';

export async function singletonExists(el: Locator, text: string | undefined) {
  const expected = expect(el, text);
  await Promise.all([expected.toHaveCount(1), expected.toBeVisible()]);
}
