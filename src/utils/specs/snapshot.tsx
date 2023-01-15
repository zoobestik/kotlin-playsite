import { expect, Locator } from '@playwright/test';
import { waitFontsReady } from '@/utils/specs/fonts';

export async function checkComponentSnapshot(
  component: Locator,
  filename: string | string[],
) {
  await waitFontsReady(component.page());
  await expect(await component.screenshot()).toMatchSnapshot(filename, {
    // @ts-expect-error Expect 'Argument to type' for experimental api
    // https://github.com/microsoft/playwright/issues/20097#issuecomment-1382672908
    _comparator: 'ssim-cie94',
  });
}
