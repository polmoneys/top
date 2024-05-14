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

  const [badges, dispatch] = useLine<keyof Badges>('some')

  useEffect(() => {
    if (all) {
      dispatch('allIngredients')
    }
    if (mixed) {
      dispatch('some')
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
      variant="flex"
      flexDirection="column"
      gap="var(--gap-2)"
      className="padding-xy"
    >
      <Font.Poppins as="h1">Title</Font.Poppins>
      <Font>SubTitle longer and longer and longer</Font>

      <Group as="section" flexWrap="wrap" size="550px" gap="var(--gap-1)">
        <Card title="A">
          <Group.Row as="div" gap="var(--gap-3)">
            <Group as="label" variant="grid" htmlFor="leader-checkbox">
              <Font as="span">{all ? 'All' : mixed ? 'Some' : 'None'}</Font>
            </Group>
            <input
              type="checkbox"
              id="leader-checkbox"
              onChange={() => onLeadChange()}
              {...(mixed && { className: 'indeterminate' })}
              {...(!mixed && !all && { className: 'none' })}
            />
          </Group.Row>

          <div className="overflow x">
            <Group.Table>
              {/* <Group.TableCaption>Sauces for meals </Group.TableCaption> */}

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
                    <Group
                      as="label"
                      variant="grid"
                      htmlFor="mustard"
                      gridTemplateColumns="calc(var(--hit-area-width) / 3) 1fr"
                      alignItems="center"
                    >
                      <input
                        type="checkbox"
                        name="mustard"
                        onChange={event => onFollowerChange(event)}
                        checked={output['mustard']}
                      />
                      MUSTARD
                    </Group>
                  </Group.TableCell>
                  <Group.TableCell>
                    <Group
                      variant="grid"
                      as="div"
                      gridTemplateColumns="repeat(6,1fr)"
                      className="overflow x"
                    >
                      <Shape sides={3} size={48} />
                      <Shape sides={4} size={48} />
                      <Shape sides={5} size={48} />
                      <Shape sides={6} size={48} />
                      <Shape sides={7} size={48} />
                      <Shape sides={8} size={48} />
                    </Group>
                  </Group.TableCell>
                </Group.TableRow>
                <Group.TableRow>
                  <Group.TableCell scope="row">
                    <Group
                      as="label"
                      variant="grid"
                      htmlFor="mayo"
                      gridTemplateColumns="calc(var(--hit-area-width) / 3) 1fr"
                      alignItems="center"
                    >
                      <input
                        type="checkbox"
                        name="mayo"
                        onChange={event => onFollowerChange(event)}
                        checked={output['mayo']}
                      />
                      MAYO
                    </Group>
                  </Group.TableCell>
                  <Group.TableCell>
                    <Group
                      variant="grid"
                      as="div"
                      gridTemplateColumns="repeat(6,1fr)"
                      className="overflow x"
                    >
                      <Shape sides={3} size={48} />
                      <Shape sides={4} size={48} />
                      <Shape sides={5} size={48} />
                      <Shape sides={6} size={48} />
                      <Shape sides={7} size={48} />
                      <Shape sides={8} size={48} />
                    </Group>
                  </Group.TableCell>
                </Group.TableRow>
                <Group.TableRow>
                  <Group.TableCell scope="row">
                    <Group
                      as="label"
                      variant="grid"
                      htmlFor="ketchup"
                      gridTemplateColumns="calc(var(--hit-area-width) / 3) 1fr"
                      alignItems="center"
                    >
                      <input
                        type="checkbox"
                        name="ketchup"
                        onChange={event => onFollowerChange(event)}
                        checked={output['ketchup']}
                      />
                      KETCHUP
                    </Group>
                  </Group.TableCell>
                  <Group.TableCell>
                    <Group
                      variant="grid"
                      as="div"
                      gridTemplateColumns="repeat(6,1fr)"
                      className="overflow x"
                    >
                      <Shape sides={3} size={48} />
                      <Shape sides={4} size={48} />
                      <Shape sides={5} size={48} />
                      <Shape sides={6} size={48} />
                      <Shape sides={7} size={48} />
                      <Shape sides={8} size={48} />
                    </Group>
                  </Group.TableCell>
                </Group.TableRow>
              </Group.TableBody>
            </Group.Table>
          </div>
        </Card>

        <Card title="B">
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

        <Card title="C">
          <Group.Col as="ul">
            <Collection<string>
              items={Array.from(state.values() as IterableIterator<string>)}
              item={item => {
                return (
                  <Collection.Item
                    key={item.toLocaleLowerCase()}
                    endWidth="calc(var(--start) * 1.5)"
                    end={
                      <Button onClick={() => toggleEntry(item)}>
                        <Emoji name="close" />
                      </Button>
                    }
                    start={<Shape.Triangle size={24} viewBox="0 -3 24 25" />}
                  >
                    <Font> {item}</Font>
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
        <Card title="D">
          {badges === 'allIngredients' && (
            <Font.Poppins size="lg">EXCELENT CHOICE</Font.Poppins>
          )}
          {badges === 'none' && (
            <Font.Poppins size="lg">BORING... </Font.Poppins>
          )}
          {badges === 'some' && (
            <Font.Poppins size="lg">Select ingredients on A </Font.Poppins>
          )}
        </Card>
      </Group>

      <Button onClick={() => openBrowser()}>github</Button>
    </Group>
  )
}

export default App
