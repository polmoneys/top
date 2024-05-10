import { expect } from '@playwright/test'
// import * as path from 'path'
import { default as test } from './setup'

test.describe('UseLine', () => {
  test('All selected', async ({ page }) => {
    const tag = page.locator(
      '[data-testid=autocomplete-countries] .MuiAutocomplete-tag',
    )
    await expect(tag).toHaveText('All')
  })
  test('None selected', async ({ page }) => {
    const tag = page.locator(
      '[data-testid=autocomplete-countries] .MuiAutocomplete-tag',
    )
    await expect(tag).toHaveText('All')
  })
  test('Some selected', async ({ page }) => {
    const tag = page.locator(
      '[data-testid=autocomplete-countries] .MuiAutocomplete-tag',
    )
    await expect(tag).toHaveText('All')
  })
})
