import { Page, Route } from '@playwright/test';

import FAKE_SEARCH_RESPONSE from './mainMenuSearch.mock.json';

export async function inputTextToSearch(page: Page, val: string) {
  await page.getByTestId('header-search-button').click();

  const quickSearchInput = page
    .getByTestId('quick-search-input')
    .getByTestId('input__inner');

  return quickSearchInput.fill(val);
}

export function mockSearchRequest(page: Page) {
  const { query } = FAKE_SEARCH_RESPONSE;

  return Promise.all([
    page.route(
      /^https:\/\/[^.]+\.algolia\.net\/1\/indexes\/[^/]+\/query.+$/,
      async (route: Route) => {
        const data = await route.request().postData();

        if (data) {
          let requestQuery = null;

          try {
            requestQuery = JSON.parse(data).query;
          } catch (e) {
            // not parsed it's ok.
          }

          if (requestQuery && query === requestQuery) {
            await route.fulfill({ json: FAKE_SEARCH_RESPONSE });
            return;
          }
        }

        route.continue();
      },
    ),
    inputTextToSearch(page, query),
  ]);
}
