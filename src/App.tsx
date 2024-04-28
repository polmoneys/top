import './App.css'
import Collection from './components/Collection'
import Font from './components/Font'
import Shape from './components/Shape'
import { SlotItem } from './components/Slot'
import useMap from './hooks/useMap'
import useSet from './hooks/useSet'

interface Selection {
  id: string
  label: string
}
function App() {
  const { state, toggleEntry, appendEntriesFromArray } = useSet({
    initial: ['Pol', 'Jordi'],
  })
  const { selections, addObject, addObjectsFromArray } = useMap<Selection>()

  return (
    <main>
      <Font.Poppins>Title</Font.Poppins>
      <Font>SubTitle longer and longer and longer</Font>

      <ul>
        <Collection<Selection>
          items={Array.from(selections.values()) as Array<Selection>}
          item={item => (
            <button key={item.id} onClick={() => console.log({ item })}>
              {item.label}
            </button>
          )}
        />
      </ul>

      <br />
      <br />
      <button
        onClick={() => addObject('test-2', { id: 'test-2', label: 'yay' })}
      >
        Add 1
      </button>

      <button
        onClick={() =>
          addObjectsFromArray([
            { id: 'test-3', label: '3333' },
            { id: 'test-4', label: '4444' },
          ])
        }
      >
        Add many
      </button>

      <br />
      <ul>
        <Collection<string>
          items={Array.from(state.values()) as Array<string>}
          item={item => {
            return (
              <SlotItem
                key={item.toLocaleLowerCase()}
                endWidth="calc(var(--start) * 3)"
                end={
                  <button onClick={() => console.log({ item })}>Action</button>
                }
                start={<Shape.Triangle size={24} />}
                description="javdjfaldjfaldjflasdj laj fdja l"
              >
                {item}
              </SlotItem>
            )
          }}
        />
      </ul>
      <br />
      <br />
      <button onClick={() => appendEntriesFromArray(['Adri', 'Marius'])}>
        Add Adri + Marius
      </button>

      <button onClick={() => toggleEntry('Clara')}>Add Clara</button>

      <br />
      <br />
    </main>
  )
}

export default App
