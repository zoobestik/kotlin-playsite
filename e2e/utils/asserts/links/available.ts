import { expect, Locator, Page, Response } from '@playwright/test';

type AvailableOptions = {
  strict?: boolean;
};

async function assertAvailable<T extends Page, K extends Locator>(
  page: T,
  link: K,
  options: AvailableOptions,
  getResponse: (
    originalUrl: string,
  ) => Promise<[Response, () => Promise<void>]>,
) {
  const linkUrl = await link.getAttribute('href');
  if (!linkUrl) throw Error('Link is empty');
  const normalizeUrl = new URL(linkUrl).toString();

  const [response, finalize] = await getResponse(normalizeUrl);

  await expect(response.url()).toBe(normalizeUrl);

  // @FIXME: follow the link, check end url for 302-307 codes.
  if (options.strict)
    await expect(response.status(), `http code for ${normalizeUrl}`).toBe(200);

  await finalize();
}

export function assertAvailableBlank(
  page: Page,
  link: Locator,
  options: AvailableOptions,
) {
  return assertAvailable(page, link, options, async (originalUrl) => {
    const [newPage, response] = await Promise.all([
      page.context().waitForEvent('page'),
      page.context().waitForEvent('response', {
        predicate: (response: Response) => originalUrl === response.url(),
      }),
      await link.click(),
    ]);

    return [response, () => newPage.close()];
  });
}

export function assertAvailableInline(
  page: Page,
  link: Locator,
  options: AvailableOptions,
) {
  return assertAvailable(page, link, options, async (originalUrl) => {
    const currentUrl = page.url();

    const [response] = await Promise.all([
      page.waitForResponse((response) => response.url() === originalUrl),
      link.click(),
    ]);

    return [
      response,
      async () => {
        if (page.url() !== currentUrl) {
          await page.goto(currentUrl);
        }
      },
    ];
  });
}

export async function assertLinkAvailable(
  page: Page,
  link: Locator,
  options?: AvailableOptions,
) {
  const isBlank = (await link.getAttribute('target')) === '_blank';
  const asserTester = isBlank ? assertAvailableBlank : assertAvailableInline;
  return asserTester(page, link, options || {});
}
