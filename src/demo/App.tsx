import { useEffect } from 'react'
import Collection from '../components/Collection'
import Group from '../components/Group'
import Font from '../components/Font'
import Paper from '../components/Paper'
import useLeader from '../hooks/useLeader'
import useLine from '../hooks/useLine'
import useMap from '../hooks/useMap'
import useSet from '../hooks/useSet'
import Shape from './Shape'
import Button from './Button'
import Card from './Card'
import Emoji from './Emoji'
import { Badges, Ingredients, Selection } from './Interfaces'
import useBrowserTab from './useBrowserTab'
import './index.css'

function App() {
  const { state, toggleEntry, addEntriesFromArray } = useSet({
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

      <Group
        as="section"
        variant="grid"
        className="intrinsic-grid md equal"
        gap="var(--gap-3)"
      >
        <Card title="UseLeader">
          <Shape.Circle fill="var(--salmon)" size={170} />
          <fieldset>
            <Group.Row as="div" className="lead-checkbox " gap="var(--gap-3)">
              <Group as="label" variant="grid" htmlFor="all">
                <Font as="span">{all ? 'All' : mixed ? 'Some' : 'None'}</Font>
              </Group>
              <input type="checkbox" id="all" onChange={() => onLeadChange()} />
              {all && <Shape className="dead" sides={4} size={36} />}
            </Group.Row>
            <Group
              as="label"
              variant="grid"
              gridTemplateColumns="1fr calc(var(--hit-area-width) / 3)"
              htmlFor="mayo"
              alignItems="center"
            >
              <Font as="span"> MAYO</Font>
              <input
                type="checkbox"
                name="mayo"
                checked={output['mayo']}
                onChange={event => onFollowerChange(event)}
              />
              {output['mayo'] && <Shape className="dead" sides={4} size={36} />}
            </Group>
            <Group
              as="label"
              variant="grid"
              gridTemplateColumns="1fr calc(var(--hit-area-width) / 3)"
              htmlFor="mustard"
              alignItems="center"
            >
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
            </Group>
            <Group
              as="label"
              variant="grid"
              gridTemplateColumns="1fr calc(var(--hit-area-width) / 3)"
              htmlFor="ketchup"
              alignItems="center"
            >
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
            </Group>
          </fieldset>
        </Card>

        <Card title="use">
          <Group.Row as="div" gap="var(--gap-3)" className="lead-checkbox">
            <Group as="label" variant="grid" htmlFor="all-2">
              <Font as="span">{all ? 'All' : mixed ? 'Some' : 'None'}</Font>
            </Group>
            <input type="checkbox" id="all-2" onChange={() => onLeadChange()} />
            {all && <Shape.Dead sides={4} size={36} />}
          </Group.Row>

          <div className="overflow x">
            <Group.Table>
              <Group.TableCaption>Sauces for meals </Group.TableCaption>
              <Group.TableHead>
                <Group.TableRow>
                  <Group.TableHeadCell scope="col">
                    Ingredient
                  </Group.TableHeadCell>
                  <Group.TableHeadCell scope="col">Method</Group.TableHeadCell>
                </Group.TableRow>
              </Group.TableHead>
              <Group.TableBody>
                <Group.TableRow>
                  <Group.TableCell scope="row">MUSTARD</Group.TableCell>{' '}
                  <Group.TableCell>Bla bla</Group.TableCell>
                </Group.TableRow>
                <Group.TableRow>
                  <Group.TableCell scope="row">MAYO</Group.TableCell>{' '}
                  <Group.TableCell>Blaa bla</Group.TableCell>
                </Group.TableRow>
                <Group.TableRow>
                  <Group.TableCell scope="row">
                    <label htmlFor="ketchup">
                      <input
                        type="checkbox"
                        name="ketchup"
                        onChange={event => onFollowerChange(event)}
                        checked={output['ketchup']}
                      />
                      {output['ketchup'] && (
                        <Shape className="dead" sides={4} size={36} />
                      )}
                      KETCHUP
                    </label>
                  </Group.TableCell>
                  <Group.TableCell>bLA BLA</Group.TableCell>
                </Group.TableRow>
              </Group.TableBody>
            </Group.Table>
          </div>
        </Card>

        <Card title="useMap">
          <Group.Row as="ul" flexWrap="wrap" gap="var(--gap-1)">
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
          </Group.Row>
          <Group.Row as="div" gap="var(--gap-1)">
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
          </Group.Row>
        </Card>

        <Card title="useSet">
          <Group.Col as="ul">
            <Collection<string>
              items={Array.from(state.values() as IterableIterator<string>)}
              item={item => {
                return (
                  <Collection.Item
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
                  </Collection.Item>
                )
              }}
            />
          </Group.Col>

          <Group.Row as="aside" gap="var(--gap-3)">
            <Card.Mini title="Adri + Marius">
              <Button onClick={() => addEntriesFromArray(['Adri', 'Marius'])}>
                Add
              </Button>
            </Card.Mini>
            <Card.Mini title="Clara">
              <Button onClick={() => addEntriesFromArray(['Clara'])}>
                Add
              </Button>
            </Card.Mini>
            <Card.Mini title="Audrey + Pol">
              <Button onClick={() => addEntriesFromArray(['Audrey', 'Pol'])}>
                Add
              </Button>
            </Card.Mini>
          </Group.Row>
        </Card>
        <Card title="useLine">
          <fieldset>
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
                onChange={event =>
                  console.log({ isAlpha: event.target.checked })
                }
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
                onChange={event =>
                  console.log({ isBeta: event.target.checked })
                }
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
                onChange={event =>
                  console.log({ isDelta: event.target.checked })
                }
              />
            </Group>
            <input type="text" placeholder="type sososo" />
          </fieldset>

          {badges === 'allIngredients' && (
            <Font.Poppins size="lg">EXCELENT CHOICE</Font.Poppins>
          )}
          {badges === 'none' && (
            <Font.Poppins size="lg">BORING... </Font.Poppins>
          )}
        </Card>
      </Group>

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

      <Group.ArtDirection as="div">
        <Group.ArtDirectionItem as="div" span={6}>
          <Shape size={200} />
        </Group.ArtDirectionItem>
        <Group.ArtDirectionItem as="div" span={6}>
          <Shape size={200} />
        </Group.ArtDirectionItem>
        <Group.ArtDirectionItem as="div">
          <Shape size={200} />
        </Group.ArtDirectionItem>
        <Group.ArtDirectionItem as="div">
          <Shape size={200} />
        </Group.ArtDirectionItem>
        <Group.ArtDirectionItem as="div">
          <Shape size={200} />
        </Group.ArtDirectionItem>
        <Group.ArtDirectionItem as="div" span={3}>
          <Shape size={200} />
        </Group.ArtDirectionItem>
        <Group.ArtDirectionItem as="div" span={3}>
          <Shape size={200} />
        </Group.ArtDirectionItem>
        <Group.ArtDirectionItem as="div" span={3}>
          <Shape size={200} />
        </Group.ArtDirectionItem>
        <Group.ArtDirectionItem as="div" span={3}>
          <Shape size={200} />
        </Group.ArtDirectionItem>
        <Group.ArtDirectionItem as="div" span={2}>
          <Shape size={120} />
        </Group.ArtDirectionItem>
        <Group.ArtDirectionItem as="div" span={2}>
          <Shape size={120} />
        </Group.ArtDirectionItem>
        <Group.ArtDirectionItem as="div" span={2}>
          <Shape size={120} />
        </Group.ArtDirectionItem>
        <Group.ArtDirectionItem as="div" span={2}>
          <Shape size={120} />
        </Group.ArtDirectionItem>
        <Group.ArtDirectionItem as="div" span={2}>
          <Shape size={120} />
        </Group.ArtDirectionItem>
        <Group.ArtDirectionItem as="div" span={2}>
          <Shape size={120} />
        </Group.ArtDirectionItem>
      </Group.ArtDirection>
    </main>
  )
}

export default App
