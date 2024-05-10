type Values = string | number | boolean | Array<unknown>

/*

  const files = [
    { id: 1, label: 'AAAA' },
    { id: 2, label: 'bbbb' },
  ]
  const { read, update } = useItem()


  {files.map(f => (
    <button
      type="button"
      onClick={() => {
        update(f, { niceLabel: f.id === 1 ? '1111' : '2222' })
        console.log({ r: read(f) })
      }}
    >
      Action
    </button>
  ))}

*/
const useItem = <T extends object>() => {
  const metadata = new WeakMap<T, Record<string, Values>>()

  const update = (item: T, content: Record<string, Values>) => {
    if (metadata.has(item)) {
      const next = metadata.get(item)
      metadata.set(item, { ...next, ...content })
    } else {
      metadata.set(item, content)
    }
  }

  const read = (item: T) => metadata.get(item)

  const remove = (item: T) => {
    if (metadata.has(item)) {
      metadata.delete(item)
    }
  }

  return {
    update,
    read,
    remove,
  }
}

export default useItem
