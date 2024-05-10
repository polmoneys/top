import { useEffect } from 'react'
import Collection from './components/Collection'
import Font from './components/Font'
import Shape from './components/Shape'
import Slot from './components/Slot/Slot'
import useMap from './hooks/useMap'
import useSet from './hooks/useSet'
import useLeader from './hooks/useLeader'
import useBrowserTab from './hooks/useBrowserTab'
import useLine from './hooks/useLine'
import { Ingredients, Badges, Selection } from './Interfaces'
import Card from './Card'
import Button from './Button'
import Emoji from './Emoji'
import './App.css'

function App() {
  const { state, toggleEntry, appendEntriesFromArray } = useSet({
    initial: ['Pol', 'Audrey'],
  })

  const {
    selections,
    addObject,
    deleteObject,
    addObjectsFromArray,
    toggleObject,
  } = useMap<Selection>()

  const [{ output, all, mixed }, { onFollowerChange, onLeadChange }] =
    useLeader<Ingredients>({
      mayo: false,
      mustard: true,
      ketchup: false,
    })

  const [badges, dispatch] = useLine<keyof Badges>()

  useEffect(() => {
    if (all) {
      dispatch('allIngredients')
    }
    if (mixed) {
      dispatch(null)
    }
    if (!all && !mixed) {
      dispatch('none')
    }
  }, [all, dispatch, mixed])

  const openBrowser = useBrowserTab({
    url: 'https://polmoneys.com',
    title: 'author',
    left: 200,
    top: 200,
    width: 300,
    height: 450,
  })

  return (
    <main>
      <Font.Poppins as="h1">Title</Font.Poppins>
      <Font>SubTitle longer and longer and longer</Font>

      <section className="intrinsic-grid md" style={{ gap: 'var(--gap-3)' }}>
        <Card title="UseLeader">
          <Shape.Circle fill="var(--salmon)" size={170} />
          <fieldset>
            <div className="row lead-checkbox" style={{ gap: 'var(--gap-3)' }}>
              <label htmlFor="all">
                <Font as="span">{all ? 'All' : mixed ? 'Some' : 'None'}</Font>
              </label>
              <input type="checkbox" id="all" onChange={() => onLeadChange()} />
              {all && <Shape className="dead" sides={4} size={36} />}
            </div>

            <label htmlFor="mayo">
              <Font as="span"> MAYO</Font>
              <input
                type="checkbox"
                name="mayo"
                checked={output['mayo']}
                onChange={event => onFollowerChange(event)}
              />
              {output['mayo'] && <Shape className="dead" sides={4} size={36} />}
            </label>
            <label htmlFor="mustard">
              <Font as="span"> MUSTARD</Font>
              <input
                type="checkbox"
                name="mustard"
                checked={output['mustard']}
                onChange={event => onFollowerChange(event)}
              />
              {output['mustard'] && (
                <Shape className="dead" sides={4} size={36} />
              )}
            </label>

            <label htmlFor="ketchup">
              <Font as="span"> KETCHUP</Font>
              <input
                type="checkbox"
                name="ketchup"
                onChange={event => onFollowerChange(event)}
                checked={output['ketchup']}
              />
              {output['ketchup'] && (
                <Shape className="dead" sides={4} size={36} />
              )}
            </label>
          </fieldset>
        </Card>
        <Card title="useMap">
          <ul className="row flex-wrap" style={{ gap: 'var(--gap-1)' }}>
            <Collection<Selection>
              items={Array.from(
                selections.values() as IterableIterator<Selection>,
              )}
              item={item => (
                <Card.Mini key={item.id} title={item.label}>
                  <Button
                    className="invisible"
                    onClick={() => {
                      if (['test-3', 'test-4'].includes(item.id)) {
                        deleteObject('test-3')
                        deleteObject('test-4')
                      } else {
                        toggleObject(item.id, item)
                      }
                    }}
                  >
                    <Emoji name="close" />
                  </Button>
                </Card.Mini>
              )}
            />
          </ul>
          <div className="row " style={{ gap: 'var(--gap-1)' }}>
            <Button
              onClick={() =>
                addObject('test-2', {
                  id: 'test-2',
                  label: 'Free Cow Burguer ',
                  price: 10,
                })
              }
            >
              Single
            </Button>
            <Button
              onClick={() =>
                addObjectsFromArray([
                  { id: 'test-3', label: 'Veggie Burguer', price: 15 },
                  { id: 'test-4', label: 'Toro Burguer', price: 15 },
                ])
              }
            >
              Pack (2 for 1.5)
            </Button>
          </div>
        </Card>

        <Card title="useSet">
          <ul>
            <Collection<string>
              items={Array.from(state.values() as IterableIterator<string>)}
              item={item => {
                return (
                  <Slot
                    key={item.toLocaleLowerCase()}
                    endWidth="calc(var(--start) * 3)"
                    end={
                      <Button onClick={() => toggleEntry(item)}>
                        <Emoji name="close" />
                      </Button>
                    }
                    start={<Shape.Triangle size={24} />}
                    description="javdjfaldjfaldjflasdj laj fdja l"
                  >
                    {item}
                  </Slot>
                )
              }}
            />
          </ul>

          <aside className="row" style={{ gap: 'var(--gap-3)' }}>
            <Card.Mini title="Adri + Marius">
              <Button
                onClick={() => appendEntriesFromArray(['Adri', 'Marius'])}
              >
                Add
              </Button>
            </Card.Mini>
            <Card.Mini title="Clara">
              <Button onClick={() => appendEntriesFromArray(['Clara'])}>
                Add
              </Button>
            </Card.Mini>
            <Card.Mini title="Audrey + Pol">
              <Button onClick={() => appendEntriesFromArray(['Audrey', 'Pol'])}>
                Add
              </Button>
            </Card.Mini>
          </aside>
        </Card>

        <Card title="useLine">
          {badges === 'allIngredients' && (
            <Font.Poppins size="lg">EXCELENT CHOICE</Font.Poppins>
          )}
          {badges === 'none' && (
            <Font.Poppins size="lg">BORING... </Font.Poppins>
          )}
        </Card>
      </section>

      <Button onClick={() => openBrowser()}>github</Button>
    </main>
  )
}

export default App
