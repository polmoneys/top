import { useMemo, memo, ComponentProps } from 'react'

interface Props extends ComponentProps<'div'> {
  sides?: number
  size?: number
  fill?: string
  stroke?: string
  strokeWidth?: number
  transforms?: string
}

const Shape = (props: Props): JSX.Element => {
  const {
    sides = 3,
    size = 69,
    fill = 'currentColor',
    transforms,
    className,
    stroke = 'currentColor',
    strokeWidth,
  } = props

  const shapePathD = useMemo(() => {
    const clamped = sides < 3 ? 3 : sides > 30 ? 30 : sides
    const center = size / 2
    return polygon(center, center, clamped, center)
  }, [sides, size])

  const viewbox = `0 0 ${size} ${size}`
  return (
    <svg
      aria-hidden="true"
      viewBox={viewbox}
      width={size}
      height={size}
      fill={fill}
      focusable="false"
      {...(className !== undefined && { className })}
      {...(transforms !== undefined && { style: { transform: transforms } })}
    >
      <g strokeLinecap="round" stroke={stroke} strokeWidth={strokeWidth}>
        <path d={shapePathD} />
      </g>
    </svg>
  )
}

Shape.Triangle = (props: Props) => <Shape {...props} sides={3} />
Shape.Square = (props: Props) => <Shape {...props} sides={4} />
Shape.Circle = (props: Props) => <Shape {...props} sides={25} />

const avoidRerenderIf = (prevProps: Props, nextProps: Props): boolean => {
  return prevProps.sides === nextProps.sides
}

Shape.Freeze = memo((props: Props) => <Shape {...props} />, avoidRerenderIf)

export default Shape

function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number,
): {
  x: number
  y: number
} {
  // Transform so that always points center/up
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  }
}

function polygon(
  centerX: number,
  centerY: number,
  points: number,
  radius: number,
): string {
  const degreeIncrement = 360 / points
  const d = new Array(points).fill('#').map((_, i) => {
    const point = polarToCartesian(
      centerX,
      centerY,
      radius,
      degreeIncrement * i,
    )
    return `${point.x},${point.y}`
  })
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  return `M${d}Z`
}
