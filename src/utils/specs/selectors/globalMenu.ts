import { Page } from '@playwright/test';
import { getHeader } from '@/utils/specs/selectors/header';

export async function getMobileMenuButton(page: Page) {
  const mobileMenu = getHeader(page).locator(
    '[aria-label="Open the navigation"]',
  );
  return (await mobileMenu.isVisible()) ? mobileMenu : null;
}
