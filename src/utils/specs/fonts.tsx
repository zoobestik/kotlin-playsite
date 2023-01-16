import { Page } from '@playwright/test';

const COMMON_FONTS_LIST = ['JetBrains Sans', 'Inter'];

export async function waitFontsReady(page: Page, fonts?: string[]) {
  await page.evaluateHandle('document.fonts.ready');

  await Promise.all(
    fonts ||
      COMMON_FONTS_LIST.map((name) => `document.fonts.check("1em ${name}")`),
  );
}
