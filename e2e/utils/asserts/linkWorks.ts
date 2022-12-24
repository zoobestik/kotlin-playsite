import { expect, Locator, Page, Response } from '@playwright/test';

type LinkWorksOptions = {
  strict?: boolean;
};

async function createAssertionLinkWorks<T extends Page, K extends Locator>(
  page: T,
  link: K,
  options: LinkWorksOptions,
  getResponse: (
    page: T,
    Link: K,
    linkUrl: string,
  ) => Promise<[Response, () => Promise<void>]>,
) {
  const linkUrl = await link.getAttribute('href');
  if (!linkUrl) throw Error('Link is empty');

  const [response, finalize] = await getResponse(page, link, linkUrl);

  await expect(response.url()).toBe(new URL(linkUrl).toString());
  if (options.strict) await expect(response.status()).toBe(200);

  await finalize();
}

export function assertBlankLinkWorks(
  page: Page,
  link: Locator,
  options: LinkWorksOptions,
) {
  return createAssertionLinkWorks(page, link, options, async () => {
    const [newPage, response] = await Promise.all([
      page.context().waitForEvent('page'),
      page.context().waitForEvent('response'),
      await link.click(),
    ]);

    return [response, () => newPage.close()];
  });
}

export function assertInlineLinkWorks(
  page: Page,
  link: Locator,
  options: LinkWorksOptions,
) {
  return createAssertionLinkWorks(
    page,
    link,
    options,
    async (page, link, linkUrl: string) => {
      const currentUrl = page.url();

      const [response] = await Promise.all([
        page.waitForResponse(
          (response) => response.url() === linkUrl && response.status() === 200,
        ),
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
    },
  );
}

export async function assertLinkWorks(
  page: Page,
  link: Locator,
  options?: LinkWorksOptions,
) {
  const isBlank = (await link.getAttribute('target')) === '_blank';
  const asserTester = isBlank ? assertBlankLinkWorks : assertInlineLinkWorks;
  return asserTester(page, link, options || {});
}
