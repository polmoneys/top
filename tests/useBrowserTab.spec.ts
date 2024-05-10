import { expect } from '@playwright/test'
import { default as test } from './setup'

test.describe('UseBrowserTab', () => {
  test('Opens new tab', async ({ page }) => {
    await page.getByText('Poljavdjfaldjfaldjflasdj laj fdja lAction').click()
    await page
      .locator('li')
      .filter({ hasText: 'Poljavdjfaldjfaldjflasdj laj' })
      .getByRole('button')
      .click()
    await page.getByRole('button', { name: 'Add 1' }).click()

    const tag = page.locator(
      '[data-testid=autocomplete-countries] .MuiAutocomplete-tag',
    )
    await expect(tag).toHaveText('All')
    await page.getByLabel('all').uncheck()

    // const picker = await page.getByPlaceholder('Attach to')
    // const dialog = page.locator('#dialog-upload-fund-files')
    // await dialog.screenshot({
    //   path: path.join(__dirname, '/file-ready-to-upload.png'),
    // })
  })
})
