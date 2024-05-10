import { ComponentProps } from 'react'

interface Props extends ComponentProps<'button'> {}

const Button = (props: Props) => {
  const { children, ...rest } = props
  return (
    <button type="button" {...rest}>
      {children}
    </button>
  )
}

export default Button
