import { expect, Locator } from '@playwright/test';
import { waitFontsReady } from '@/utils/specs/fonts';

export async function checkComponentSnapshot(
  component: Locator,
  filename: string | string[],
) {
  await waitFontsReady(component);
  await expect(await component.screenshot()).toMatchSnapshot(filename, {
    // @ts-expect-error Argument to type
    _comparator: 'ssim-cie94',
  });
}
