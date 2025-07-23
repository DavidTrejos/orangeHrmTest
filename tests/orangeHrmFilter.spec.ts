import { test, expect } from '@playwright/test';

test('Search and validate employee from PIM module', async ({ page }) => {

  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await page.fill('input[name="username"]', 'Admin');
  await page.fill('input[name="password"]', 'admin123');
  await page.click('button[type="submit"]');

  await expect(page).toHaveURL(/.*dashboard/);
  await expect(page.locator('.oxd-topbar-header-title')).toHaveText('Dashboard');

  await page.click('a[href="/web/index.php/pim/viewPimModule"]');
  await expect(page).toHaveURL(/.*viewEmployeeList/);

  await page.fill('input[placeholder="Type for hints..."]', 'Bahja13');

  await page.click('button[type="submit"]');

  await expect(page.getByRole('cell', { name: 'Bahja13' })).toBeVisible();
});
