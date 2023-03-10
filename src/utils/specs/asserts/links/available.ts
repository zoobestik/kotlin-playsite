import { expect, Locator, Page, Response } from '@playwright/test';

type AvailableOptions = {
  strict?: boolean;
};

type ExternalLink = Locator;

const OK_CODES = [200];
const REDIRECT_CODES = [301, 302, 307, 308];
const SOFT_CODES_CHECK = [...OK_CODES, ...REDIRECT_CODES];

/* Domain should be replaced by target domain, check it in
 * playwright next versions. Cause, webkit on linux is not rise events:
 *   [ `request`, `response` ] or `.fetch()` in `route`.
 */
const HTTP_CODE_308_DOMAIN_LIST: { [domain: string]: string } = {
  'jetbrains.com': 'www.jetbrains.com',
};

function fixExceptionUrl(page: Page, uri: string) {
  const browser = page.context().browser();
  const isWebkit = browser && browser.browserType().name() === 'webkit';

  const url = new URL(uri, page.url());

  if (isWebkit && url.hostname in HTTP_CODE_308_DOMAIN_LIST) {
    url.hostname = HTTP_CODE_308_DOMAIN_LIST[url.hostname];
  }

  return url.toString();
}

type GetResponseOptions = {
  originalUrl: string;
  page: Page;
};

async function assertAvailable(
  link: ExternalLink,
  options: AvailableOptions,
  getResponse: (
    options: GetResponseOptions,
  ) => Promise<[Response, () => Promise<void> | null | undefined]>,
) {
  const linkUrl = await link.getAttribute('href');
  if (!linkUrl) throw new Error('Link is empty');

  const page = link.page();

  const originalUrl = fixExceptionUrl(page, linkUrl);

  const [response, finalize] = await getResponse({ originalUrl, page });

  await expect(response.url()).toBe(originalUrl);

  await expect(
    options.strict ? OK_CODES : SOFT_CODES_CHECK,
    `http code for ${originalUrl} - ${response.status()}`,
  ).toContain(response.status());

  if (finalize) await finalize();
}

export function assertAvailableBlank(
  link: ExternalLink,
  options: AvailableOptions,
) {
  return assertAvailable(link, options, async ({ originalUrl, page }) => {
    const [response, newPage] = await Promise.all([
      page.context().waitForEvent('response', {
        predicate: (page) => page.url() === originalUrl,
      }),
      page.context().waitForEvent('page'),
      link.click(),
    ]);

    return [response, () => newPage.close()];
  });
}

export function assertAvailableInline(
  link: ExternalLink,
  options: AvailableOptions,
) {
  return assertAvailable(link, options, async ({ originalUrl, page }) => {
    const currentUrl = page.url();

    const [response] = await Promise.all([
      page.waitForResponse((response) => response.url() === originalUrl),
      link.click(),
    ]);

    return [
      response,
      async () => {
        if (currentUrl !== page.url())
          await page.goto(currentUrl, { waitUntil: 'domcontentloaded' });
      },
    ];
  });
}

export async function assertLinkAvailable(
  link: ExternalLink,
  options?: AvailableOptions,
) {
  const attribute = await link.getAttribute('target');
  const isBlank = attribute === '_blank';
  const asserTester = isBlank ? assertAvailableBlank : assertAvailableInline;
  await asserTester(link, options || {});
  return;
}

export async function assertLinksAvailable(
  container: Locator,
  options?: AvailableOptions,
) {
  for (const link of await container.all()) {
    await assertLinkAvailable(link, options);
  }
}
