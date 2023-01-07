import { Page } from '@playwright/test';

export async function inputTextToSearch(page: Page, val: string) {
  await page.getByTestId('header-search-button').click();

  const quickSearchInput = page
    .getByTestId('quick-search-input')
    .getByTestId('input__inner');

  return quickSearchInput.fill(val);
}
