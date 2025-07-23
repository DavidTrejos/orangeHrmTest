import { test, expect } from '@playwright/test';

test('Login and update personal info in OrangeHRM', async ({ page }) => {
  // Paso 1: Ir al login
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  // Paso 2: Llenar credenciales
  await page.fill('input[name="username"]', 'Admin');
  await page.fill('input[name="password"]', 'admin123');
  await page.click('button[type="submit"]');

  // Paso 3: Validar redirección al Dashboard
  await expect(page).toHaveURL(/.*dashboard/);
  await expect(page.locator('.oxd-topbar-header-title')).toHaveText('Dashboard');

  // Paso 4: Ir a "My Info"
  await page.click('a[href*="/web/index.php/pim/viewMyDetails"]');
  await expect(page).toHaveURL(/.*viewPersonalDetails/);

  // Paso 5: Editar nombre y apellido
  await page.fill('input[name="firstName"]', 'Marcela');
  await page.fill('input[name="lastName"]', 'Maya');

  // Paso 6: Guardar cambios
  await page.click('button[type="submit"]');

  // Paso 7: Validar mensaje de éxito (toast)
  await expect(page.locator('.oxd-toast')).toBeVisible();
  await expect(page.locator('.oxd-toast-content')).toContainText('Success');
});
