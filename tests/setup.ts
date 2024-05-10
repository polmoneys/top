import { expect, test as setup } from '@playwright/test'
// import * as path from 'path'

export const URL = 'http://localhost:5173'

export const STORY = {
  query: 'human',
  publishDate: '25/05/2025',
  compartment: 'PAMJ - Pictet human fund',
  chip: 'Pictet human fund',
}

setup.beforeEach(async ({ page }) => {
  await page.goto(URL)
  await expect(page.getByText(/Title/)).toHaveCount(2)
})

// setup.afterEach(async ({ page }) => {
//   await page.getByTitle('close-dialog-cross').click()
// })

export default setup
