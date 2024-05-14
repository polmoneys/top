import { expect } from '@playwright/test'
import { default as test } from './setup'

test.describe('UseSet', () => {
  test('Quick crud', async ({ page }) => {
    const card = await page.locator('article').nth(2)
    const miniCards = card.locator('.mini-card')
    const listItems = card.locator('ul li')
    const initialListItem = listItems.getByText('Pol', { exact: true })

    await expect(listItems).toHaveCount(2)
    listItems.filter({ hasText: 'Pol' }).getByRole('button').click()

    await expect(listItems).toHaveCount(1)
    await expect(initialListItem).not.toBeVisible()

    miniCards.nth(0).getByRole('button').click()
    await expect(listItems).toHaveCount(3)

    miniCards.nth(1).getByRole('button').click()
    await expect(listItems).toHaveCount(4)

    miniCards.nth(2).getByRole('button').click()
    await expect(listItems).toHaveCount(5)

    await expect(initialListItem).toBeVisible()
  })
})
