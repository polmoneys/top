import { Fragment } from 'react/jsx-runtime'
import Group from '../components/Group'

const Radio = () => {
  return (
    <Fragment>
      <Group
        as="label"
        variant="grid"
        gridTemplateColumns="1fr calc(var(--hit-area-width) / 3)"
        htmlFor="alpha"
      >
        ALPHA
        <input
          type="radio"
          name="alpha"
          onChange={event => console.log({ isAlpha: event.target.checked })}
        />
      </Group>

      <Group
        as="label"
        variant="grid"
        gridTemplateColumns="1fr calc(var(--hit-area-width) / 3)"
        htmlFor="beta"
      >
        BETA
        <input
          type="radio"
          name="beta"
          onChange={event => console.log({ isBeta: event.target.checked })}
        />
      </Group>
      <Group
        as="label"
        variant="grid"
        gridTemplateColumns="1fr calc(var(--hit-area-width) / 3)"
        htmlFor="delta"
      >
        DELTA
        <input
          type="radio"
          name="delta"
          onChange={event => console.log({ isDelta: event.target.checked })}
        />
      </Group>
    </Fragment>
  )
}

export default Radio
