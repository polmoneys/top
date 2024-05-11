import { ReactNode } from 'react'
import Font from '../components/Font'

interface Props {
  title: string
  children: ReactNode
}

const Card = (props: Props) => {
  const { children, title } = props
  return (
    <article className="card">
      <Font>{title}</Font>
      {children}
    </article>
  )
}

Card.Mini = (props: Props) => {
  const { children, title } = props

  return (
    <div className="mini-card">
      <Font>{title}</Font>
      {children}
    </div>
  )
}
export default Card
