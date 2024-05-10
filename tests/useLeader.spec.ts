import { expect } from '@playwright/test'
// import * as path from 'path'
import { default as test } from './setup'

test.describe('UseLeader', () => {
  test('Leader toggles while empty', async ({ page }) => {
    const tag = page.locator(
      '[data-testid=autocomplete-countries] .MuiAutocomplete-tag',
    )
    await expect(tag).toHaveText('All')
  })
  test('Leader toggles while all', async ({ page }) => {
    const tag = page.locator(
      '[data-testid=autocomplete-countries] .MuiAutocomplete-tag',
    )
    await expect(tag).toHaveText('All')
  })
  test('Leader toggles while some', async ({ page }) => {
    const tag = page.locator(
      '[data-testid=autocomplete-countries] .MuiAutocomplete-tag',
    )
    await expect(tag).toHaveText('All')
  })
  test('Follower toggles', async ({ page }) => {
    const tag = page.locator(
      '[data-testid=autocomplete-countries] .MuiAutocomplete-tag',
    )
    await expect(tag).toHaveText('All')
  })
  test('All followers toggles', async ({ page }) => {
    const tag = page.locator(
      '[data-testid=autocomplete-countries] .MuiAutocomplete-tag',
    )
    await expect(tag).toHaveText('All')
  })
})
