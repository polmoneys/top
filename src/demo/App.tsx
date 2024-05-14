import { useEffect } from 'react'
import { Badges, Ingredients, Selection } from './Interfaces'
import Collection from '../components/Collection'
import Font from '../components/Font'
import Group from '../components/Group'
import useLeader from '../hooks/useLeader'
import useLine from '../hooks/useLine'
import useMap from '../hooks/useMap'
import useSet from '../hooks/useSet'
import useBrowserTab from './useBrowserTab'
import Button from './Button'
import Card from './Card'
import Emoji from './Emoji'
import Shape from './Shape'
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
    <Group
      as="main"
      variant="grid"
      gridTemplateColumns="1fr"
      className="padding-xy"
    >
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
          <Group.Col as="fieldset" gap="var(--gap-1)">
            <Group.Row as="div" gap="var(--gap-3)">
              <Group as="label" variant="grid" htmlFor="all">
                <Font as="span">{all ? 'All' : mixed ? 'Some' : 'None'}</Font>
              </Group>
              <input
                type="checkbox"
                id="all"
                onChange={() => onLeadChange()}
                {...(mixed && { className: 'indeterminate' })}
                {...(!mixed && !all && { className: 'none' })}
              />
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
            </Group>
          </Group.Col>
        </Card>

        <Card title="use">
          <Group.Row as="div" gap="var(--gap-3)">
            <Group as="label" variant="grid" htmlFor="all-2">
              <Font as="span">{all ? 'All' : mixed ? 'Some' : 'None'}</Font>
            </Group>
            <input type="checkbox" id="all-2" onChange={() => onLeadChange()} />
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
                  <Group.TableCell scope="row">
                    <Group as="label" variant="grid" htmlFor="mustard">
                      <input
                        type="checkbox"
                        name="mustard"
                        onChange={event => onFollowerChange(event)}
                        checked={output['mayo']}
                      />
                      MUSTARD
                    </Group>
                  </Group.TableCell>
                  <Group.TableCell>Bla bla</Group.TableCell>
                </Group.TableRow>
                <Group.TableRow>
                  <Group.TableCell scope="row">
                    <Group as="label" variant="grid" htmlFor="mayo">
                      <input
                        type="checkbox"
                        name="mayo"
                        onChange={event => onFollowerChange(event)}
                        checked={output['mayo']}
                      />
                      MAYO
                    </Group>
                  </Group.TableCell>
                  <Group.TableCell>Blaa bla</Group.TableCell>
                </Group.TableRow>
                <Group.TableRow>
                  <Group.TableCell scope="row">
                    <Group as="label" variant="grid" htmlFor="ketchup">
                      <input
                        type="checkbox"
                        name="ketchup"
                        onChange={event => onFollowerChange(event)}
                        checked={output['ketchup']}
                      />
                      KETCHUP
                    </Group>
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
          <Group.Col as="fieldset" gap="var(--gap-1)">
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
          </Group.Col>

          {badges === 'allIngredients' && (
            <Font.Poppins size="lg">EXCELENT CHOICE</Font.Poppins>
          )}
          {badges === 'none' && (
            <Font.Poppins size="lg">BORING... </Font.Poppins>
          )}
        </Card>
      </Group>

      <Button onClick={() => openBrowser()}>github</Button>

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
    </Group>
  )
}

export default App
