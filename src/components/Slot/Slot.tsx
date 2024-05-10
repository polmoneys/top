import { CSSProperties, ComponentProps, ReactNode } from 'react'
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

interface Slot extends ComponentProps<'li'> {
  children: string | ReactNode
  description?: string
  start?: ReactNode
  startWidth?: Unit
  end?: ReactNode
  endWidth?: Unit
}

const has = (value: unknown) => value !== undefined

function Slot(props: Slot): JSX.Element {
  const { children, description, start, end, startWidth, endWidth } = props
  const hasDescription = has(description)
  const hasStartAndEndWidth = has(startWidth) && has(endWidth)
  return (
    <li
      className={styles.slot}
      {...(has(startWidth) && {
        style: { '--start': startWidth } as CSSProperties,
      })}
      {...(has(endWidth) && {
        style: { '--end': endWidth } as CSSProperties,
      })}
      {...(hasStartAndEndWidth && {
        style: {
          '--start': startWidth,
          '--end': endWidth,
        } as CSSProperties,
      })}
    >
      {has(start) && <div className={styles.start}>{start}</div>}
      <div>
        {children}
        {hasDescription && <div>{description}</div>}
      </div>
      {has(end) && <div className={styles.end}>{end}</div>}
    </li>
  )
}

export default Slot
