import { expect, Locator, Page, Response } from '@playwright/test';

type AvailableOptions = {
  strict?: boolean;
};

type ExternalLink = Locator;

const OK_CODES = [200];
const REDIRECT_CODES = [301, 302, 307, 308];
const SOFT_CODES_CHECK = [...OK_CODES, ...REDIRECT_CODES];

async function assertAvailable<T extends Page, K extends ExternalLink>(
  page: T,
  link: K,
  options: AvailableOptions,
  getResponse: (
    originalUrl: string,
  ) => Promise<[Response, () => Promise<void> | null | undefined]>,
) {
  const linkUrl = await link.getAttribute('href');
  if (!linkUrl) throw Error('Link is empty');
  const normalizeUrl = new URL(linkUrl).toString();

  const [response, finalize] = await getResponse(normalizeUrl);

  await expect(response.url()).toBe(normalizeUrl);

  await expect(
    options.strict ? OK_CODES : SOFT_CODES_CHECK,
    `http code for ${normalizeUrl} - ${response.status()}`,
  ).toContain(response.status());

  if (finalize) await finalize();
}

export function assertAvailableBlank(
  page: Page,
  link: ExternalLink,
  options: AvailableOptions,
) {
  return assertAvailable(page, link, options, async (originalUrl) => {
    const newPagePromise = page.context().waitForEvent('page');

    try {
      const [newPage, response] = await Promise.all([
        newPagePromise,
        page.context().waitForEvent('response', {
          predicate: (response: Response) => originalUrl === response.url(),
        }),
        link.click(),
      ]);

      return [response, () => newPage.close()];
    } catch (e) {
      // Close page if error in response
      const newPage = await newPagePromise.catch((e) => Promise.resolve(e));
      if (newPage && newPage.close) await newPage.close();
      throw e;
    }
  });
}

export function assertAvailableInline(
  page: Page,
  link: ExternalLink,
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
        await page.goto(currentUrl);
      },
    ];
  });
}

export async function assertLinkAvailable(
  page: Page,
  link: ExternalLink,
  options?: AvailableOptions,
) {
  const isBlank = (await link.getAttribute('target')) === '_blank';
  const asserTester = isBlank ? assertAvailableBlank : assertAvailableInline;
  return asserTester(page, link, options || {});
}

export async function assertLinksAvailable(page: Page, links: Locator) {
  for (const link of await links.all()) {
    await assertLinkAvailable(page, link);
  }
}
