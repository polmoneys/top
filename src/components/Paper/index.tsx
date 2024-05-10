import { CSSProperties, ElementType, ReactNode } from 'react'
import styles from './index.module.css'

type Unit =
  | `var(--${string})`
  | `${string}em`
  | `${string}rem`
  | `${string}px`
  | `${string}%`
  | `${string}fr`
  | `${string}vh`
  | `${string}vw`
  | `calc(${string})`

interface Paper {
  as?:
    | 'div'
    | 'section'
    | 'main'
    | 'article'
    | 'aside'
    | 'form'
    | 'fieldset'
    | 'header'
    | 'footer'
  children: ReactNode
  // intrinsic grid (if not enough space, falls to 1)
  columns: string
  // column-gap
  gap?: Unit
  // column-rule: like border
  border?: string
  // column-span:all
  span?: boolean
  // column-fill:balance
  fill?: {
    height: Unit
  }
  // orphans property to control the number of lines left at the bottom of a column
  orphans?: number
  // coming soon: more responsive control
  mq?: Unit
}

function Paper(props: Paper): JSX.Element {
  const {
    as,
    children,
    gap,
    border,
    span,
    fill,
    columns = '2 200px',
    orphans = 1,
  } = props

  const options = {
    columns,
    ...(border && { columnRule: border }),
    ...(span && { columnSpan: 'all' }),
    ...(gap && { columnGap: gap }),
    ...(orphans && { orphans }),
    ...(fill !== undefined && {
      height: fill.height,
    }),
  } as CSSProperties

  const Tag = as ?? ('div' as ElementType)

  return (
    <Tag className={styles.root} style={options}>
      {children}
    </Tag>
  )
}

export default Paper
