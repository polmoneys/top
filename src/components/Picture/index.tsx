import { useState, Fragment, type ReactNode } from 'react'
import styles from './index.module.css'

interface MediaProps {
  alt: string
  src: string
  height?: string
  sources?: Record<string, string>
  eager?: boolean
  objectPosition?: string
  priority?: 'low' | 'high'
}

function Media(props: MediaProps): JSX.Element {
  const {
    height,
    sources,
    src,
    alt = '',
    eager = false,
    objectPosition,
    // priority = 'low',
  } = props

  const [hasError, setError] = useState(false)
  const onErrorImage = (): void => {
    setError(true)
  }

  let sourcesTags: ReactNode = <Fragment />

  if (sources !== undefined) {
    sourcesTags = Object.keys(sources).map(key => {
      const hasSource = sources?.[key] !== undefined
      const type = `image/${key}`
      const srcSet = sources[key].toString()
      return hasSource ? (
        <source key={key} type={type} srcSet={srcSet} />
      ) : (
        <Fragment />
      )
    })
  }

  return (
    <picture
      className={styles.media}
      {...(height !== undefined && { style: { height } })}
      onError={onErrorImage}
    >
      {hasError && (
        <img
          src={fallback('600px', height ?? '200px', 'currentColor')}
          alt="Loading error"
        />
      )}

      {!hasError && (
        <Fragment>
          {sourcesTags}
          <img
            src={src}
            alt={alt}
            loading={eager ? 'eager' : 'lazy'}
            height={height}
            {...(objectPosition !== undefined && {
              style: { objectPosition },
            })}
            // fetchpriority={priority}
          />
        </Fragment>
      )}
    </picture>
  )
}

export default Media

const fallback = (
  width: number | string,
  height: number | string,
  fill: string,
): string =>
  `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"><rect  fill='%23${fill}' width="${width}" height="${height}"/></svg>`

export function isImgUrl(url: string) {
  return fetch(url, { method: 'HEAD' }).then(res => {
    return res?.headers?.get('Content-Type')?.startsWith('image')
  })
}
