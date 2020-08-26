import CloseIcon from 'mdi-react/CloseIcon'
import React, {useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import {useHistory} from 'react-router'
import {Link} from 'react-router-dom'

import {getPath} from 'store/url'

import Button from 'components/button'
import {colorToAlpha} from 'components/colors'

const pageStyle: React.CSSProperties = {
  backgroundColor: colors.DARK_TEAL,
  minHeight: '100vh',
}
const closeStyle: React.CSSProperties = {
  color: '#fff',
  height: 110,
  paddingLeft: 24,
  paddingTop: 24,
}
const menuElementStyle: React.CSSProperties = {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
  paddingBottom: 19,
  paddingLeft: 23,
  paddingTop: 17,
}
const menuElementSelectedStyle: React.CSSProperties = {
  ...menuElementStyle,
  backgroundColor: colorToAlpha(colors.DARK_FOREST_GREEN, .5),
  borderLeft: 'solid 3px #fff',
  paddingLeft: 20,
}
const menuElementLinkStyle: React.CSSProperties = {
  color: '#fff',
  textDecoration: 'none',
}
const buttonStyle: React.CSSProperties = {
  margin: '20px 30px 0',
  paddingLeft: 47,
  paddingRight: 44,
}
const linkStyle: React.CSSProperties = {
  textDecoration: 'none',
}
const buttonContainerStyle: React.CSSProperties = {
  bottom: 90,
  position: 'absolute',
  width: '100%',
}

// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
// TODO(émilie): Set menuElementSelectedStyle on elements when on the right page.
// TODO(émilie): Refactor one menu used by both menus.
// This menu is displayed from the landing page and shows the outer pages only
// ... such as home and legals.
const MenuSitePage = (): React.ReactElement => {
  const {t} = useTranslation()
  const history = useHistory()
  const goBackClick = useCallback((): void => {
    history.goBack()
  }, [history])

  return <div style={pageStyle}>
    <div style={closeStyle}>
      <CloseIcon onClick={goBackClick} />
    </div>
    <div style={menuElementSelectedStyle}>
      <Link to={getPath(['ACCOUNT'], t)} style={menuElementLinkStyle}>
        {t('Accueil')}
      </Link>
    </div>
    <div style={menuElementStyle}>
      <Link to={getPath(['TERMS'], t)} style={menuElementLinkStyle}>
        {t('Mentions légales')}
      </Link>
    </div>
    <div style={buttonContainerStyle}>
      <Link to={getPath(['LOGIN'], t)} style={linkStyle}>
        <Button type="firstLevel" style={buttonStyle}>{t('Se connecter')}</Button>
      </Link>
    </div>
  </div>
}

export default React.memo(MenuSitePage)
