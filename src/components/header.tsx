import ArrowLeftIcon from 'mdi-react/ArrowLeftIcon'
import MenuIcon from 'mdi-react/MenuIcon'
import React, {useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import {useHistory} from 'react-router'
import {Link} from 'react-router-dom'

import {getPath} from 'store/url'

import logoImage from 'images/logo-black.svg'


const headerContainerStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  width: '100%',
}
const headerStyle: React.CSSProperties = {
  alignItems: 'center',
  boxShadow: `0 1px 0 0 ${colors.SILVER_TWO}`,
  display: 'flex',
  fontSize: 15,
  fontWeight: 'bold',
  padding: '15px 20px',
}
const buttonStyle: React.CSSProperties = {
  color: colors.DARK_FOREST_GREEN,
  left: 20,
  position: 'absolute',
  top: 20,
}
const titleStyle: React.CSSProperties = {
  fontFamily: 'ProximaSoft',
  margin: 'auto',
}
const linkStyle: React.CSSProperties = {
  color: colors.GREYISH_TEAL,
  textDecoration: 'none',
}
const logoStyle: React.CSSProperties = {
  height: 30,
  width: 49,
}
const linkLogoStyle: React.CSSProperties = {
  height: 30,
  margin: 'auto',
  width: 49,
}
interface Props {
  menu?: 'project'|'site'
  title?: string
}

// Default menu used is the project one.
const Header = ({menu = 'project', title}: Props): React.ReactElement => {
  const {t} = useTranslation()
  const history = useHistory()
  const goBackClick = useCallback((): void => {
    history.goBack()
  }, [history])
  return <div style={headerContainerStyle}>
    <div style={headerStyle}>
      {title ?
        <React.Fragment>
          <div style={buttonStyle} onClick={goBackClick}><ArrowLeftIcon /></div>
          <div style={titleStyle}>{title}</div>
        </React.Fragment>
        : <React.Fragment>
          <Link to={getPath([menu === 'project' ? 'MENU' : 'MENU_SITE'], t)} style={linkStyle}>
            <MenuIcon />
          </Link>
          <Link to={getPath([], t)} style={linkLogoStyle}>
            <img src={logoImage} alt={t('productName')} style={logoStyle} />
          </Link>
        </React.Fragment>
      }
    </div>
  </div>
}


export default React.memo(Header)
