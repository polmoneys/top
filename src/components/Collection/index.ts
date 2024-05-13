import { ReactElement, cloneElement, isValidElement } from 'react'
import Slot from '../Slot'

export interface CollectionProps<T> {
  items: Array<T>
  item: (item: T) => ReactElement
}

const Collection = <T>(props: CollectionProps<T>) => {
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

Collection.Item = Slot
