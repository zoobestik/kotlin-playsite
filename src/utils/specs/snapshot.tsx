import { expect, Locator } from '@playwright/test';
import { waitFontsReady } from '@/utils/specs/fonts';

export async function checkComponentSnapshot(
  component: Locator,
  filename: string | string[],
) {
  await waitFontsReady(component);
  await expect.soft(await component.screenshot()).toMatchSnapshot(filename);
}
