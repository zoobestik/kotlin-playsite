import { Page } from '@playwright/test';

export function inputTextToSearch(page: Page, val: string) {
  page.getByTestId('header-search-button').click();

  const quickSearchInput = page
    .getByTestId('quick-search-input')
    .getByTestId('input__inner');

  return quickSearchInput.fill(val);
}
