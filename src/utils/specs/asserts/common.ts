import { expect, Locator } from '@playwright/test';

export async function singletonExists(el: Locator, text: string | undefined) {
  const expected = expect(el, text);
  await Promise.all([expected.toHaveCount(1), expected.toBeVisible()]);
}

export async function assertClassContains(
  received: Locator,
  className: string,
) {
  const classes = (await received.getAttribute('class')) || '';
  return classes.split(' ').includes(className);
}
