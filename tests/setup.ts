import { expect, test as setup } from '@playwright/test'

export const URL = 'http://127.0.0.1:5173/'
export const LOCALHOST = 'http://localhost:5173'

setup.beforeEach(async ({ page }) => {
  await page.goto(LOCALHOST)
  await expect(page.getByText(/Title/)).toHaveCount(2)
})

export default setup
