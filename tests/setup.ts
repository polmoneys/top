import { expect, test as setup } from '@playwright/test'

export const URL = 'http://localhost:5173'

setup.beforeEach(async ({ page }) => {
  await page.goto(URL)
  await expect(page.getByText(/Title/)).toHaveCount(2)
})

export default setup
