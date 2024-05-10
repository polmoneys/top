import { expect } from '@playwright/test'
// import * as path from 'path'
import { default as test } from './setup'

test.describe('UseMap', () => {
  test('Adds 1', async ({ page }) => {
    const tag = page.locator(
      '[data-testid=autocomplete-countries] .MuiAutocomplete-tag',
    )
    await expect(tag).toHaveText('All')
  })
  test('Adds many', async ({ page }) => {
    const tag = page.locator(
      '[data-testid=autocomplete-countries] .MuiAutocomplete-tag',
    )
    await expect(tag).toHaveText('All')
  })
  test('Toggle', async ({ page }) => {
    const tag = page.locator(
      '[data-testid=autocomplete-countries] .MuiAutocomplete-tag',
    )
    await expect(tag).toHaveText('All')
  })
})
