import { expect } from '@playwright/test'
import { default as test } from './setup'

test.describe('UseMap', () => {
  test('Quick CRUD', async ({ page }) => {
    const card = await page.locator('article').nth(2)

    const singleOption = await page.getByText('Free Cow Burguer ❌')
    const multipleOption = [
      await page.getByText('Veggie Burguer❌'),
      await page.getByText('Toro Burguer❌'),
    ]

    await page.getByRole('button', { name: 'Single' }).click()
    await expect(singleOption).toBeVisible()
    await expect(card.locator('.mini-card')).toHaveCount(1)

    await page.getByRole('button', { name: 'Pack (2 for 1.5)' }).click()
    await expect(multipleOption[0]).toBeVisible()
    await expect(multipleOption[1]).toBeVisible()
    await expect(card.locator('.mini-card')).toHaveCount(3)

    singleOption.getByRole('button').click()
    await expect(singleOption).not.toBeVisible()
    await expect(card.locator('.mini-card')).toHaveCount(2)

    multipleOption[0].getByRole('button').click()
    await expect(multipleOption[0]).not.toBeVisible()
    await expect(multipleOption[1]).not.toBeVisible()
    await expect(card.locator('.mini-card')).toHaveCount(0)
  })
})
