import { useEffect } from 'react'

/*
  Focus input onStartTyping
  credits https://github.com/streamich/react-use/blob/master/src/useFormEnter.ts
 */

export const useFormEnter = (
  onStartTyping: (event: KeyboardEvent) => void,
): void => {
  useEffect(() => {
    const keydown = (event: KeyboardEvent): void => {
      if (
        event.target instanceof Element &&
        !isEditableElement(event.target) &&
        isTypedCharGood(event)
      ) {
        onStartTyping(event)
      }
    }

    document.addEventListener('keydown', keydown)

    return () => {
      document.removeEventListener('keydown', keydown)
    }
  }, [])
}

const isEditableElement = (element: Element): boolean => {
  if (element.hasAttribute('contenteditable')) {
    return true
  }

  if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
    return true
  }

  return false
}

const isTypedCharGood = ({
  keyCode,
  metaKey,
  ctrlKey,
  altKey,
}: KeyboardEvent): boolean => {
  if (metaKey || ctrlKey || altKey) {
    return false
  }

  if (keyCode >= 48 && keyCode <= 57) {
    return true
  }

  if (keyCode >= 65 && keyCode <= 90) {
    return true
  }

  return false
}

/*
  Tell user a form has been 'abandoned'
  
  interface FocusEvent<T = Element> extends SyntheticEvent<T> {
  relatedTarget: EventTarget | null
  target: EventTarget & T
}
 */

export const useFormLeave = (id: string, onOut: () => void) => {
  useEffect(() => {
    const formElement = document.querySelector(`#${id}`)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onFocusOut = (event: any): void => {
      if (formElement != null) {
        if (!formElement.contains(event.relatedTarget as Node)) {
          onOut()
        }
      }
    }
    if (formElement != null) {
      formElement.addEventListener('focusout', onFocusOut)
    }
    return () => {
      if (formElement != null) {
        formElement.removeEventListener('focusout', onFocusOut)
      }
    }
  }, [id, onOut])
}
