import React from 'react'

import Header from 'components/header'

const containerStyle: React.CSSProperties = {
  fontFamily: 'ProximaSoft',
  margin: '0 30px',
  transition: 'opacity 450ms',
}
const h1Style: React.CSSProperties = {
  color: colors.DARK_FOREST_GREEN,
  fontSize: 25,
  fontWeight: 'normal',
  lineHeight: 1.15,
  margin: '33px 14px',
  textAlign: 'center',
}
const h1BigStyle: React.CSSProperties = {
  display: 'block',
  fontWeight: 'bold',
}

interface Props {
  bigTitle?: string
  children: React.ReactNode
  header?: string
  style?: React.CSSProperties
  title?: string
}

const Layout = ({bigTitle, children, header, style, title}: Props): React.ReactElement => {
  const layoutStyle = {
    ...containerStyle,
    ...style,
  }
  return <React.Fragment>
    <Header title={header} />
    <div style={layoutStyle}>
      {title || bigTitle ?
        <h1 style={h1Style}>
          <span style={h1BigStyle}>{bigTitle}</span>
          {title}
        </h1>
        : ''
      }
      {children}
    </div>
  </React.Fragment>
}

export default React.memo(Layout)
