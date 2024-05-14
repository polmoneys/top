import { type AriaAttributes, type ReactNode, type KeyboardEvent } from 'react'
import { Unit } from '../utils'

const HTMLtag = [
  'main',
  'section',
  'article',
  'nav',
  'aside',
  'header',
  'footer',
  'label',
  'fieldset',
  'p',
  'h1',
  'h2',
  'h3',
  'ul',
  'ol',
  'li',
  'div',
  'form',
] as const
type HTMLTags = (typeof HTMLtag)[number]

const VariantOptions = ['flex', 'grid'] as const
type Variants = (typeof VariantOptions)[number]

export default interface GroupProps extends AriaAttributes {
  children: ReactNode
  className?: string
  as: HTMLTags
  variant?: Variants
  gap?: Unit
  size?: Unit
  id?: string
  htmlFor?: string
  onSubmit?: (event: unknown) => void
  onKeyDown?: (event: KeyboardEvent<HTMLElement>) => void
  stretch?: boolean
  alignItems?: string
  justifyContent?: string
  flexWrap?: string
  flexDirection?: string
  placeItems?: string
  DANGEROUS?: Record<string, string | number>
  role?: string
  hidden?: boolean
  gridTemplateColumns?: string
}
