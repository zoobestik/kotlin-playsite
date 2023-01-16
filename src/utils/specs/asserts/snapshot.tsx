import { expect, Locator, Page } from '@playwright/test';
import { waitFontsReady } from '@/utils/specs/fonts';

export async function assertPageSnapshot(
  page: Page,
  filename: string | string[],
) {
  return assertComponentSnapshot(
    page.getByTestId('page-content').first(),
    filename,
  );
}

export async function assertComponentSnapshot(
  locator: Locator,
  filename: string | string[],
) {
  await waitFontsReady(locator.page());

  await expect(await locator.screenshot()).toMatchSnapshot(filename, {
    // @ts-expect-error Expect 'Argument to type' for experimental api
    // https://github.com/microsoft/playwright/issues/20097#issuecomment-1382672908
    _comparator: 'ssim-cie94',
  });
}
