export const isApiSupported = (api: string) => api in window

export const formatDate = (date: Date, locale = 'es-ES') =>
  new Intl.DateTimeFormat(locale).format(new Date(date))

export const formatNumber = (num: number, locale?: string) =>
  new Intl.NumberFormat(locale, { minimumIntegerDigits: 2 }).format(num)

export const getProp = (prop: string) =>
  getComputedStyle(document.documentElement, null).getPropertyValue(prop)

export const setProp = (prop: string, replacement: string) =>
  document.documentElement.style.setProperty(prop, replacement)

// import ms from 'ms'

// export const timeAgo = (timestamp: Date, timeOnly?: boolean): string => {
//   if (!timestamp) return 'never'
//   return `${ms(Date.now() - new Date(timestamp).getTime())}${
//     timeOnly ? '' : ' ago'
//   }`
// }
