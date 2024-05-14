import { expect } from '@playwright/test'
import { default as test } from './setup'

test.describe('UseLeader', () => {
  test('Unchecks initial and checks all with leading checkbox', async ({
    page,
  }) => {
    const card = await page.locator('article').nth(0)
    const checkboxAll = card.locator('#leader-checkbox')
    // await page.getByText('Some').click()
    // await page.getByLabel('None').check()
    // await page.getByLabel('All').uncheck()

    const checkboxMayo = card.locator('input[name="mayo"]')
    const checkboxMustard = card.locator('input[name="mustard"]')
    const checkboxKetchup = card.locator('input[name="ketchup"]')

    await expect(checkboxMustard).toBeChecked()
    checkboxMustard.uncheck()
    await expect(checkboxMustard).not.toBeChecked()

    checkboxAll.check()
    await expect(checkboxMayo).toBeChecked()
    await expect(checkboxMustard).toBeChecked()
    await expect(checkboxKetchup).toBeChecked()
    checkboxAll.uncheck()
    await expect(checkboxMayo).not.toBeChecked()
    await expect(checkboxMustard).not.toBeChecked()
    await expect(checkboxKetchup).not.toBeChecked()
  })
})
