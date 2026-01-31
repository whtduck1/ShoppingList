import { test, expect } from '@playwright/test';

test('should display shopping list', async ({ page }) => {
  await page.goto('http://localhost:4200');
  await expect(page.locator('h1')).toContainText(/shopping list/i);
});

test('should add item to shopping list', async ({ page }) => {
  await page.goto('http://localhost:4200');
  await page.getByPlaceholder(/nazwa produktu/i).fill('Milk');
  await page.getByRole('button', { name: /dodaj/i }).click();
  await expect(page.locator('li')).toContainText('Milk');
});

test('should mark item as bought', async ({ page }) => {
  await page.goto('http://localhost:4200');
  await page.getByPlaceholder(/nazwa produktu/i).fill('Bread');
  await page.getByRole('button', { name: /dodaj/i }).click();
  const item = page.locator('li', { hasText: 'Bread' });
  const checkbox = item.locator('input[type="checkbox"]');
  await checkbox.check();
  await expect(item).toHaveClass(/bought/);
});

test('should remove item from shopping list', async ({ page }) => {
  await page.goto('http://localhost:4200');
  await page.getByPlaceholder(/nazwa produktu/i).fill('Eggs');
  await page.getByRole('button', { name: /dodaj/i }).click();
  const item = page.locator('li', { hasText: 'Eggs' });
  await item.locator('button.remove-btn').click();
  await expect(page.locator('li')).not.toContainText('Eggs');
});

test('should handle error when adding empty item', async ({ page }) => {
  await page.goto('http://localhost:4200');
  await page.getByRole('button', { name: /dodaj/i }).click();
  const items = await page.locator('li').allTextContents();
  expect(items).not.toContain('');
});
