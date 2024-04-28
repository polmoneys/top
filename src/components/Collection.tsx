import { ReactElement, cloneElement, isValidElement } from 'react'

interface Props<T> {
  items: Array<T>
  item: (item: T) => ReactElement
}

function Collection<T>(props: Props<T>) {
  const { items, item } = props

  return items.map(t => {
    const element = item(t)
    const slot = isValidElement(element)

    if (slot) {
      return cloneElement(element)
    }

    return null
  })
}

export default Collection
