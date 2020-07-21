declare module '*.svg' {
  const content: string
  export default content
}

declare module '*.svg?stroke=#992f00' {
  const content: string
  export default content
}

declare module '*.svg?stroke=#cccece' {
  const content: string
  export default content
}

declare module '*.png' {
  const content: string
  export default content
}

declare module '*.jpg' {
  const content: string
  export default content
}

declare module '*.gif' {
  const content: string
  export default content
}

declare module '*.txt' {
  const content: string
  export default content
}

interface RadiumCSSProperties extends React.CSSProperties {
  ':active'?: React.CSSProperties
  ':hover'?: React.CSSProperties
  ':focus'?: React.CSSProperties
}

type ReactStylableElement = React.ReactElement<{style?: RadiumCSSProperties}>

declare const colors: typeof import('./cfg/colors.json')
declare const config: {
  amplitudeToken: string
  canonicalUrl: string
  contactEmail: string
  clientVersion: string
  environment: string
  sentryDsn: string
}

type GetProps<T> = T extends React.ComponentType<infer Props> ? Props : never

// TODO(cyrille): Find a way to statically restrict font families and weights.
