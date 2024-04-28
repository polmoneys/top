import { useReducer } from 'react'

/*
    const {
        selections,
        selectionsArray,
        count,
        hasCount,
        addObject,
        addObjectsFromArray,
        toggleObject,
        deleteObject,
        resetState,
        getCount,
        hasSelection,
    } = useMap<Item>();
*/
type SelectionAction<T> =
  | { type: 'ADD'; id: string; object: T }
  | { type: 'DELETE'; id: string }
  | { type: 'TOGGLE'; id: string; object: T }
  | { type: 'ADD_FROM_ARRAY'; objectsArray: T[] }
  | { type: 'RESET' }

type SelectionState<T> = {
  selections: Map<string, T>
}

const selectionReducer = <T>(
  state: SelectionState<T>,
  action: SelectionAction<T>,
): SelectionState<T> => {
  switch (action.type) {
    case 'ADD': {
      const nextMap = new Map(state.selections).set(action.id, action.object)
      return { selections: nextMap }
    }
    case 'DELETE': {
      if (state.selections.has(action.id)) {
        const nextMap = new Map(state.selections)
        nextMap.delete(action.id)
        return { selections: nextMap }
      }
      return state
    }
    case 'TOGGLE': {
      const isObjectExist = state.selections.has(action.id)
      const nextMap = new Map(state.selections)

      if (isObjectExist) {
        nextMap.delete(action.id)
      } else {
        nextMap.set(action.id, action.object)
      }
      return { selections: nextMap }
    }
    case 'ADD_FROM_ARRAY': {
      const nextMapFromArray = new Map(state.selections)

      const updatedMap = action.objectsArray.reduce((map, object) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const id = (object as any).id
        map.set(id, object)
        return map
      }, nextMapFromArray)

      return { selections: updatedMap }
    }
    case 'RESET':
      return { selections: new Map() }
    default:
      return state
  }
}

const useMap = <T>() => {
  const [state, dispatch] = useReducer(selectionReducer, {
    selections: new Map<string, T>(),
  })

  const addObject = (id: string, object: T) => {
    dispatch({ type: 'ADD', id, object })
  }

  const deleteObject = (id: string) => {
    dispatch({ type: 'DELETE', id })
  }

  const toggleObject = (id: string, object: T) => {
    dispatch({ type: 'TOGGLE', id, object })
  }

  const addObjectsFromArray = (objectsArray: T[]) => {
    dispatch({ type: 'ADD_FROM_ARRAY', objectsArray })
  }

  const resetState = () => dispatch({ type: 'RESET' })

  const getCount = () => state.selections.size

  const hasSelection = (id: string) => state.selections.has(id)

  return {
    selections: state.selections,
    selectionsArray: Array.from(state.selections.values()),
    count: getCount(),
    hasCount: getCount() > 0,
    addObject,
    addObjectsFromArray,
    toggleObject,
    deleteObject,
    resetState,
    getCount,
    hasSelection,
  }
}

export default useMap
