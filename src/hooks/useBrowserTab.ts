/* 
  Open new browser tab. 
  Apple.com does it for chat support
*/

type BooleanAsString = 'yes' | 'no'

export interface Props {
  url: string
  title: string
  /** X axis */
  left?: number
  /** Y axis */
  top?: number
  /** width */
  width?: number
  /** height */
  height?: number
  config?: {
    menubar: BooleanAsString
    location: BooleanAsString
    resizable: BooleanAsString
    scrollbars: BooleanAsString
    status: BooleanAsString
  }
}

function useBrowserTab(props: Props): () => void {
  const {
    url,
    title,
    width = 200,
    height = 300,
    left = 100,
    top = 100,
    config,
  } = props

  let options = `left=${left},screenX=${left},top=${top},screenY=${top},width=${width},innerWidth=${width},innerHeight=${height},height=${height}`
  const defaultOptions = `menubar=no,location=no,resizable=no,scrollbars=no,status=no,`
  if (config !== undefined) {
    const userOptions = `menubar=${config?.menubar},location=${config?.location},resizable=${config?.resizable},scrollbars=${config?.scrollbars},status=${config?.status},`
    options = `${options}${userOptions}`
  } else {
    options = `${options}${defaultOptions}`
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const trigger = () => window.open(url, title, options)
  return trigger
}

export default useBrowserTab
