import {
  useMemo,
  type ElementType,
  type CSSProperties,
  type ReactNode,
  ComponentProps,
} from 'react'
import { clsx, has } from '../utils'
import GroupProps from './Interfaces'

const Group = (props: GroupProps): JSX.Element => {
  const {
    children,
    as,
    gap = 'var(--gap-1)',
    size,
    variant = 'flex',
    alignItems,
    justifyContent,
    flexWrap,
    flexDirection,
    placeItems,
    DANGEROUS,
    stretch,
    gridTemplateColumns,
    ...rest
  } = props

  const options = useMemo(() => {
    const common = {
      gap,
      ...(has(alignItems) && {
        alignItems,
      }),
      ...(has(placeItems) && {
        placeItems,
      }),
    }
    if (variant === 'flex') {
      return {
        ...common,
        display: 'flex',
        ...(has(flexDirection) && {
          flexDirection,
        }),
        ...(has(justifyContent) && {
          justifyContent,
        }),
        ...(has(flexWrap) && { flexWrap }),
        ...(has(size) && { flex: `1 0 ${size}` }),
        ...(has(stretch) && {
          width: '100%',
          height: '100%',
        }),
      }
    }
    return {
      ...common,
      display: 'grid',
      ...(has(size) && {
        gridTemplateColumns: `repeat(auto-fit, minmax(min(100%,${size}), 1fr))`,
      }),
      ...(has(gridTemplateColumns) && {
        gridTemplateColumns,
      }),
      ...(has(stretch) && { width: '100%' }),
    }
  }, [
    alignItems,
    flexDirection,
    flexWrap,
    gap,
    gridTemplateColumns,
    justifyContent,
    placeItems,
    size,
    stretch,
    variant,
  ]) as CSSProperties

  const Tag = as ?? ('div' as ElementType)

  return (
    <Tag
      {...rest}
      style={{
        ...options,
        ...(has(DANGEROUS) && DANGEROUS),
      }}
    >
      {children}
    </Tag>
  )
}

export default Group

// Flex
Group.Row = (props: GroupProps) => {
  const { className, ...rest } = props
  return <Group className={clsx(className, 'row')} {...rest} />
}
Group.Col = (props: GroupProps) => {
  const { className, ...rest } = props
  return <Group className={clsx(className, 'column')} {...rest} />
}
Group.Unit = (props: GroupProps) => {
  const { className, ...rest } = props
  return <Group className={clsx(className, 'unit')} {...rest} />
}

// Aspect ratio
Group.Square = (props: GroupProps) => {
  const { className, ...rest } = props
  return <Group className={clsx(className, 'ratio', 'square')} {...rest} />
}
Group.Landscape = (props: GroupProps) => {
  const { className, ...rest } = props
  return <Group className={clsx(className, 'ratio', 'landscape')} {...rest} />
}
Group.Portrait = (props: GroupProps) => {
  const { className, ...rest } = props
  return <Group className={clsx(className, 'ratio', 'portrait')} {...rest} />
}

// Good ol' grid
Group.ArtDirection = (props: GroupProps) => {
  const { className, ...rest } = props
  return (
    <Group
      {...rest}
      variant="grid"
      className={clsx(className, 'art-direction')}
    />
  )
}
Group.ArtDirectionItem = (
  props: GroupProps & { span?: 2 | 3 | 4 | 6 | 12 },
) => {
  const { className, span = 4, ...rest } = props
  return (
    <Group
      {...rest}
      variant="grid"
      className={clsx(className, 'art-direction-item', `_${span}`)}
    />
  )
}

// Table
interface GroupTableProps extends ComponentProps<'table'> {
  children: ReactNode
}
Group.Table = (props: GroupTableProps) => <table>{props.children}</table>
interface GroupTableCaptionProps extends ComponentProps<'caption'> {
  children: ReactNode
}
Group.TableCaption = (props: GroupTableCaptionProps) => (
  <caption>{props.children}</caption>
)
interface GroupTableHeadProps extends ComponentProps<'thead'> {
  children: ReactNode
}
Group.TableHead = (props: GroupTableHeadProps) => (
  <thead>{props.children}</thead>
)
interface GroupTableBodyProps extends ComponentProps<'tbody'> {
  children: ReactNode
}
Group.TableBody = (props: GroupTableBodyProps) => (
  <tbody>{props.children}</tbody>
)
interface GroupTableRowProps extends ComponentProps<'tr'> {
  children: ReactNode
}
Group.TableRow = (props: GroupTableRowProps) => <tr>{props.children}</tr>
interface GroupTableCellProps extends ComponentProps<'td'> {
  children: ReactNode
}
Group.TableCell = (props: GroupTableCellProps) => <td>{props.children}</td>
interface GroupTableHeadCellProps extends ComponentProps<'th'> {
  children: ReactNode
}
Group.TableHeadCell = (props: GroupTableHeadCellProps) => (
  <th>{props.children}</th>
)
interface GroupTableFooterProps extends ComponentProps<'tfoot'> {
  children: ReactNode
}
Group.TableFooter = (props: GroupTableFooterProps) => (
  <tfoot>{props.children}</tfoot>
)
