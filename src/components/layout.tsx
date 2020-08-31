import React from 'react'

import Header from 'components/header'

const isMobileVersion = window.innerWidth <= 800

const containerStyle: React.CSSProperties = {
  fontFamily: 'ProximaSoft',
  margin: isMobileVersion ? '0 auto' : '100px auto',
  maxWidth: 400,
  padding: '0 30px',
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
  menu?: 'project'|'site'
  style?: React.CSSProperties
  title?: string
}

const Layout = ({bigTitle, children, header, menu, style, title}: Props): React.ReactElement => {
  const layoutStyle = {
    ...containerStyle,
    ...style,
  }
  return <React.Fragment>
    <Header title={header} menu={menu} />
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
