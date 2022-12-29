import { expect, Locator } from '@playwright/test';

export async function checkExternalLink(locator: Locator) {
  const link = expect(locator);

  await Promise.all([
    link.toHaveAttribute('target', '_blank'),
    link.toHaveAttribute('rel', 'noreferrer noopener'),
    link.toHaveAttribute('href', /.+/),
  ]);
}
