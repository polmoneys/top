import Group from '../components/Group'

const InputText = () => {
  return (
    <Group.Col as="fieldset" gap="var(--gap-1)">
      <input type="text" placeholder="type sososo" />
    </Group.Col>
  )
}

export default InputText
