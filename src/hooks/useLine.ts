import { type Dispatch, type Reducer, useReducer } from 'react'

/*

  interface SettingsMenu {
    account: string
    services: string
    contact: string
  }

  function Settings() {
    const [state, dispatch] = useLine<keyof SettingsMenu>()

    return (
      <Fragment>
        <button onClick={() => dispatch('account')}>Account</button>
        <button onClick={() => dispatch('services')}>Services</button>
        <button onClick={() => dispatch('contact')}>Contact</button>

        {state && (
          <Fragment>
            {state === 'account' && <Account/>}
            {state === 'services' && <Services/>}
            {state === 'contact' && <Contact/>}
          </Fragment>
        )}
      </Fragment>
    )
  }

*/

type Line<T extends string> = null | T

function lineReducer<T extends string>(
  state: Line<T> = null,
  action: Line<T>,
): Line<T> {
  if (action === state) {
    return null
  }

  return action
}

const useLine = <T extends string>(): [Line<T>, Dispatch<Line<T>>] =>
  useReducer<Reducer<Line<T>, Line<T>>>(lineReducer, null)

export default useLine
