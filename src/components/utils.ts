export const clsx = (...params: unknown[]): string =>
  params.filter(Boolean).join(' ')
