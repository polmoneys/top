import { useEffect } from 'react'
import Collection from '../components/Collection'
import Font from '../components/Font'
import Shape from '../components/Shape'
import Slot from '../components/Slot/Slot'
import useMap from '../hooks/useMap'
import useSet from '../hooks/useSet'
import useLeader from '../hooks/useLeader'
import useBrowserTab from './useBrowserTab'
import useLine from '../hooks/useLine'
import { Ingredients, Badges, Selection } from './Interfaces'
import Card from './Card'
import Button from './Button'
import Emoji from './Emoji'
import './index.css'
import Paper from '../components/Paper'

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
    url: 'https://github.com/polmoneys/top',
    title: 'Get code !',
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

      <Paper columns="2 500px">
        <Font>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          scelerisque mi ex, eu condimentum ligula sagittis at. Duis ultricies
          sit amet libero ac porttitor. Proin nibh lorem, iaculis sed pulvinar
          id, commodo eu erat. Aliquam at ante vel purus ornare ullamcorper sed
          in turpis. Curabitur laoreet varius tristique. Vestibulum ac aliquet
          felis, vitae pretium erat. Nunc mattis tincidunt sapien, ac
          sollicitudin dui laoreet ac. Nunc tempus ligula tellus, ac rutrum sem
          viverra interdum. Duis vitae aliquet elit. Aenean sed dui ut lorem
          scelerisque consectetur eget non turpis.
        </Font>
        <Font>
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
          posuere cubilia curae; Integer at porttitor odio. Integer fermentum
          magna sed tortor aliquam vulputate vel a lacus. Donec vel quam quis
          sem consequat consectetur vel et velit. Nullam ac augue in neque
          hendrerit ullamcorper ut et leo.
        </Font>
        <Font>
          Donec ut urna quis augue sollicitudin tempus sit amet ut urna. Vivamus
          et aliquam orci, in interdum urna. Cras ullamcorper nec justo quis
          feugiat. Curabitur nec nisi placerat, congue metus sed, viverra quam.
          Vivamus cursus, est ac eleifend ornare, elit est tincidunt purus, id
          auctor mauris ante ac urna. Quisque rutrum porttitor tortor. Curabitur
          eget sagittis massa, quis vulputate sapien.
        </Font>
      </Paper>
    </main>
  )
}

export default App
