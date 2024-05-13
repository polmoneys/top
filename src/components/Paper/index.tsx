import { CSSProperties, ElementType, ReactNode } from 'react'
import styles from './index.module.css'
import { Unit, clsx } from '../utils'

const HTMLtag = [
  'main',
  'section',
  'article',
  'aside',
  'div',
  'form',
  'fieldset',
  'header',
  'footer',
] as const
type HTMLTags = (typeof HTMLtag)[number]

export interface PaperProps {
  as?: HTMLTags
  children: ReactNode
  className?: string
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

function Paper(props: PaperProps): JSX.Element {
  const {
    as,
    children,
    gap,
    border,
    span,
    fill,
    columns = '2 200px',
    orphans = 1,
    className,
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
    <Tag className={clsx(styles.root, className)} style={options}>
      {children}
    </Tag>
  )
}

export default Paper
