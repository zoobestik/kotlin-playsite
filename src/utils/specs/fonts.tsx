import { Locator } from '@playwright/test';

const COMMON_FONTS_LIST = ['JetBrains Sans', 'Inter'];

export async function waitFontsReady(component: Locator, fonts?: string[]) {
  const page = component.page();

  await page.evaluateHandle('document.fonts.ready');

  await Promise.all(
    fonts ||
      COMMON_FONTS_LIST.map((name) => `document.fonts.check("1em ${name}")`),
  );
}
