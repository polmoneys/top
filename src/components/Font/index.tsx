import {
  type AriaAttributes,
  type ElementType,
  type ReactNode,
  useMemo,
} from 'react'
import styles from './index.module.css'
import { clsx, has, sizeUnits } from '../utils'

type FontKind =
  | 'helveticaNeue'
  | 'helveticaNeueMedium'
  | 'helveticaNeueBold'
  | 'helveticaNeueThin'
  | 'grotesk'
  | 'poppins'

const HTMLHnTag = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const
const HTMLtag = ['label', 'span', 'p', 'b', 'em', 'strong', 'time'] as const
type HTMLTags = (typeof HTMLtag)[number] | (typeof HTMLHnTag)[number]
type TextTransform = 'aa' | 'Aa' | 'AA'
type FontSize = (typeof sizeUnits)[number]

export interface FontProps extends AriaAttributes {
  as?: HTMLTags
  size?: FontSize
  children: string | ReactNode
  className?: string
  format?: TextTransform
  options?: Array<'number' | 'hyphenate' | 'breakWord'>
  dangerousColor?: string
  dangerousTransform?: string
  kind?: FontKind
}

function Font(props: FontProps): JSX.Element {
  const {
    as,
    dangerousColor,
    dangerousTransform,
    children,
    options = [],
    className,
    size = 'md',
    format = 'aa',
    kind = 'helveticaNeue',
    ...rest
  } = props

  const Tag = as ?? ('p' as ElementType)

  const css = useMemo(
    () =>
      clsx(
        className,
        styles[kind],
        styles[size],
        options.includes('breakWord') && styles.break,
        options.includes('hyphenate') && styles.hyphenate,
        options.includes('number') && styles.numeric,
        format === 'AA' && styles.uppercase,
        format === 'Aa' && styles.capitalize,
      ),
    [className, kind, size, options, format],
  )

  return (
    <Tag
      {...rest}
      style={{
        ...(has(dangerousColor) && { color: dangerousColor }),
        ...(has(dangerousTransform) && {
          transform: dangerousTransform,
        }),
      }}
      className={css}
    >
      {children}
    </Tag>
  )
}

Font.Poppins = (props: FontProps) => <Font {...props} kind="poppins" />
Font.Bold = (props: FontProps) => <Font {...props} kind="helveticaNeueBold" />

export default Font
