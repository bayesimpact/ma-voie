import React from 'react'

import Header from 'components/header'
import Menu from 'components/menu'

const isMobileVersion = window.innerWidth <= 800
const isMenuAlwaysShown = window.innerWidth > 1300

const withMenuStyle: React.CSSProperties = {
  display: 'flex',
  minHeight: '100vh',
}
const mainContentStyle: React.CSSProperties = {
  flex: 1,
}

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
  const mainContent = <React.Fragment>
    <Header title={header} menu={isMenuAlwaysShown ? 'none' : menu} />
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
  if (isMenuAlwaysShown) {
    return <div style={withMenuStyle}>
      <div style={mainContentStyle}>
        {mainContent}
      </div>
      <Menu style={{width: 270}} />
    </div>
  }
  return mainContent
}

export default React.memo(Layout)
