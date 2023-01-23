import { Page, Route } from '@playwright/test';
import { inputTextToSearch } from '@/utils/specs/interactions/search';

import MOCK from './searchMock.json';

export function mockSearchRequest(page: Page) {
  const query = MOCK.query;

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
            await route.fulfill({ json: MOCK });
            return;
          }
        }

        route.continue();
      },
    ),
    inputTextToSearch(page, query),
  ]);
}
