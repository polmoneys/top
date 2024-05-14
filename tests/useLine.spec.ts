import { expect } from '@playwright/test'
import { default as test } from './setup'

test.describe('UseLine', () => {
  test('Shows right content after user choice', async ({ page }) => {
    const card = await page.locator('article').nth(0)
    const cardOutput = await page.locator('article').nth(4)
    const checkboxAll = card.locator('#all')
    const allSelectedMessage = cardOutput.getByText('EXCELENT CHOICE')
    const someSelectedMessage = cardOutput.getByText('Select ingredients on A')
    const noneSelectedMessage = cardOutput.getByText('BORING...')

    await expect(someSelectedMessage).toBeVisible()
    await expect(allSelectedMessage).not.toBeVisible()
    checkboxAll.check()
    await expect(allSelectedMessage).toBeVisible()
    checkboxAll.uncheck()
    await expect(allSelectedMessage).not.toBeVisible()
    await expect(noneSelectedMessage).toBeVisible()
  })
})
