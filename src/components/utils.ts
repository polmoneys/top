export const clsx = (...params: unknown[]): string =>
  params.filter(Boolean).join(' ')

export const has = (value: unknown): boolean => value !== undefined

export const sizeUnits = ['xs', 'sm', 'md', 'lg', 'xl'] as const

export type Unit =
  | `var(--${string})`
  | `min(${string})`
  | `max(${string})`
  | `${string}em`
  | `${string}rem`
  | `${string}px`
  | `${string}%`
  | `${string}fr`
  | `${string}vh`
  | `${string}vw`
  | `calc(${string})`
