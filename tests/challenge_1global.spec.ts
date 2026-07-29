import { test, expect } from '@playwright/test';

test('Challenge 1global', async ({ page }) => {
  // -----------TEST DATA--------URLS-----DATASET--------
  const BASE_URL = 'https://www.betterroaming.com/';
  const THAILAND_URL = 'https://www.betterroaming.com/plans/esim-thailand/';
  const INSTALLATION_URL = 'https://www.betterroaming.com/esim-installation/';
  const PLAN_PRICE = '€10.59';
  const QR_MODAL_TITLE = 'Scan QR code to get your FREE eSIM now!';

  // -------ACTION LOCATORS-----CLICKS--------SELECTORS-----------
  const cookieAcceptButton = page.getByRole('button', { name: /accept|aceitar|permitir/i });
  const currencyHeader = page.locator('header').getByText(/USD|EUR|GBP/i).first();
  const eurOption = page.locator('body').getByText(/€/i).first();
  const countryOption = page.locator('body').getByText(/Thailand/i).first();
  const accessPlanButton = page.locator('div').filter({ hasText: PLAN_PRICE }).getByText('Access Plan').first();
  const modalManualOption = page.locator('div[role="dialog"]').getByText(/manual/i).first();
  const pageManualTabButton = page.getByText('Manual Installation').first();

  // ------------VALIDATION LOCATORS--------EXPECTS---------------
  const qrCodeModalHeading = page.getByRole('heading', { name: QR_MODAL_TITLE });
  const activeManualTab = page.getByText('Manual Installation').first();

  // ------------- ACTION FLOW ----------------
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto(BASE_URL);

  await cookieAcceptButton.click();
  await currencyHeader.dispatchEvent('click');
  await eurOption.click();

  await countryOption.click();
  await expect(page).toHaveURL(THAILAND_URL);

  await accessPlanButton.click({ delay: 300 });

  await expect(qrCodeModalHeading).toBeVisible();
  await modalManualOption.click();

  await expect(page).toHaveURL(INSTALLATION_URL);
  await pageManualTabButton.click();
  await expect(activeManualTab).toBeVisible();
});
