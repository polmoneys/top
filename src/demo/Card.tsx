import { ReactNode } from 'react'
import Font from '../components/Font'
import Group from '../components/Group'

interface Props {
  title: string
  children: ReactNode
}

const Card = (props: Props) => {
  const { children, title } = props
  return (
    <Group
      as="article"
      flexDirection="column"
      gap="var(--gap-2)"
      className="card"
    >
      <Font>{title}</Font>
      {children}
    </Group>
  )
}

Card.Mini = (props: Props) => {
  const { children, title } = props

  return (
    <li className="mini-card">
      <Font>{title}</Font>
      {children}
    </li>
  )
}
export default Card
