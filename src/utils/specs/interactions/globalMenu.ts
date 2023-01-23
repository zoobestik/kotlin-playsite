import { expect, Page } from '@playwright/test';
import { getHeader } from '@/utils/specs/selectors/header';
import { getMobileMenuButton } from '@/utils/specs/selectors/globalMenu';

export async function openSubItemMenu(
  page: Page,
  topMenuItemTitle: string,
  endUrl: string,
) {
  const subItemXPath = `a[@href='${endUrl}']`;
  const mobileMenu = await getMobileMenuButton(page);

  const playMenuItem = getHeader(page)
    .locator('span', { hasText: topMenuItemTitle })
    .first();

  if (mobileMenu) {
    await mobileMenu.click();

    await expect(mobileMenu, 'Mobile menu should be opened').toHaveAttribute(
      'aria-haspopup',
      'true',
    );

    return playMenuItem.locator(`xpath=./following-sibling::${subItemXPath}`);
  }

  await playMenuItem.click();

  return playMenuItem.locator(`xpath=..//${subItemXPath}`);
}

export async function clickMenuSubItem(
  page: Page,
  submenuName: string,
  endUrl: string,
) {
  const currentUrl = new URL(page.url());
  const subItemNode = await openSubItemMenu(page, submenuName, endUrl);

  const [response] = await Promise.all([
    page.waitForNavigation({
      url: (url) =>
        currentUrl.hostname === url.hostname &&
        (url.pathname === endUrl || url.pathname === endUrl + '/'),
    }),
    subItemNode.first().click(),
  ]);

  return response;
}
