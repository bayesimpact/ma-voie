import React, {useCallback, useEffect, useMemo, useState} from 'react'

import {useWindowWidth} from 'hooks/resize'

import Header from 'components/header'
import Menu from 'components/menu'

const isMobileVersion = window.innerWidth <= 800
const menuWidth = 270

const withMenuStyle: React.CSSProperties = {
  display: 'flex',
  minHeight: '100vh',
}
const mainContentStyle: React.CSSProperties = {
  flex: 1,
}

const containerStyle: React.CSSProperties = {
  fontFamily: 'ProximaSoft',
  margin: isMobileVersion ? '0 auto' : '50px auto',
  maxWidth: 400,
  padding: '0 30px 50px',
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
  const windowWidth = useWindowWidth()
  const isMenuAlwaysShown = windowWidth > 1300
  const [isMenuShown, setIsMenuShown] = useState(isMenuAlwaysShown)
  const showMenu = useCallback((): void => setIsMenuShown(true), [])
  const hideMenu = useCallback((): void => setIsMenuShown(false), [])
  const menuStyle = useMemo((): React.CSSProperties => ({
    minWidth: menuWidth,
    position: isMenuAlwaysShown ? 'fixed' : 'relative',
    transform: `translateX(${isMenuShown ? 0 : 100}%)`,
    transition: '450ms',
    width: menuWidth,
  }), [isMenuAlwaysShown, isMenuShown])
  useEffect((): void => {
    setIsMenuShown(isMenuAlwaysShown)
  }, [isMenuAlwaysShown])

  const layoutWithoutMenuStyle = isMenuAlwaysShown ? {
    paddingRight: 270,
    paddingTop: 53,
  } : {}
  const layoutStyle = {
    ...containerStyle,
    ...style,
  }

  const headerStyle: React.CSSProperties = isMenuAlwaysShown ? {
    position: 'fixed',
    width: 'calc(100vw - 270px)',
  } : {}
  const mainContent = <React.Fragment>
    <Header
      title={header}
      onMenuClick={isMobileVersion ? menu : isMenuAlwaysShown ? 'none' : showMenu}
      menuPosition={isMobileVersion ? 'left' : 'right'} style={headerStyle} />
    <div style={layoutWithoutMenuStyle}>
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
    </div>
  </React.Fragment>

  if (isMobileVersion) {
    return mainContent
  }

  const menuContainerStyle: React.CSSProperties = isMenuAlwaysShown ? {
    position: 'fixed',
    right: 0,
    width: menuWidth,
    zIndex: 2,
  } : {
    bottom: 0,
    overflow: 'hidden',
    pointerEvents: isMenuShown ? 'initial' : 'none',
    position: 'absolute',
    right: 0,
    top: 0,
    width: menuWidth,
  }

  return <div style={withMenuStyle}>
    <div style={mainContentStyle}>
      {mainContent}
    </div>
    <div style={menuContainerStyle}>
      <Menu onClose={isMenuAlwaysShown ? undefined : hideMenu} style={menuStyle} />
    </div>
  </div>
}

export default React.memo(Layout)
