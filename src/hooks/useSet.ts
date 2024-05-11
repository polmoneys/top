import { type Dispatch, useReducer } from 'react'

type Value = string
type SetState = Set<Value>
const initialState: SetState = new Set()

type SetAction =
  | {
      type: 'APPEND_FROM_ARRAY'
      names: Array<Value>
    }
  | {
      type: 'DELETE'
      name: Value
    }
  | {
      type: 'TOGGLE'
      name: Value
    }
  | {
      type: 'CLEAR'
    }

const setReducer = (state: SetState, action: SetAction): SetState => {
  const { type } = action

  switch (type) {
    case 'APPEND_FROM_ARRAY': {
      const nextState = [...state.values(), ...action.names]
      return new Set(nextState)
    }
    case 'TOGGLE': {
      if (state.has(action.name)) {
        const nextState = new Set(state)
        nextState.delete(action.name)
        return nextState
      }
      return new Set(state).add(action.name)
    }
    case 'DELETE': {
      const nextState = new Set(state)
      nextState.delete(action.name)
      return nextState
    }
    case 'CLEAR': {
      return new Set()
    }
    default:
      return state
  }
}

interface Props {
  initial?: Array<Value>
}

export const useSet = (props?: Props) => {
  const [state, dispatch] = useReducer(
    setReducer,
    new Set(props?.initial ?? initialState),
  )

  const deleteEntry = (name: Value) => {
    dispatch({ type: 'DELETE', name })
  }

  const toggleEntry = (name: Value) => {
    dispatch({ type: 'TOGGLE', name })
  }

  const appendEntriesFromArray = (names: Array<Value>) => {
    dispatch({ type: 'APPEND_FROM_ARRAY', names })
  }

  const resetState = () => dispatch({ type: 'CLEAR' })

  const getCount = () => state.size

  const hasSelection = (name: Value) => state.has(name)

  const hasSelections = (needles: Array<Value>, haystack: Array<Value>) => {
    let matches = 0
    for (let i = 0; i < haystack.length; i++) {
      if (new Set(needles).has(haystack?.[i] ?? '')) {
        matches += 1
      }
    }
    return matches > 0
  }

  return {
    state,
    selectionsArray: Array.from(state.values()),
    count: getCount(),
    hasCount: getCount() > 0,
    appendEntriesFromArray,
    toggleEntry,
    deleteEntry,
    resetState,
    getCount,
    hasSelection,
    hasSelections,
  }
}

/*
const [selectedNames, dispatchName] = useSetRaw({ initial: [1,2,3] })
*/
export const useSetRaw = (props?: Props): [SetState, Dispatch<SetAction>] =>
  useReducer(setReducer, new Set(props?.initial ?? initialState))

export default useSet
