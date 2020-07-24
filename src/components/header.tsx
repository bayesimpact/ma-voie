import ArrowLeftIcon from 'mdi-react/ArrowLeftIcon'
import React, {useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import {useHistory} from 'react-router'

import logoImage from 'images/logo-black.svg'


const headerContainerStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  width: '100%',
}
const headerStyle: React.CSSProperties = {
  alignItems: 'center',
  boxShadow: `0 1px 0 0 ${colors.SILVER_TWO}`,
  display: 'flex',
  padding: '15px 20px',
}
const buttonStyle: React.CSSProperties = {
  color: colors.DARK_FOREST_GREEN,
}
const titleStyle: React.CSSProperties = {
  fontFamily: 'ProximaSoft',
  margin: 'auto',
}
const logoStyle: React.CSSProperties = {
  height: 30,
  margin: 'auto',
  width: 49,
}
interface Props {
  title?: string
}


const Header = ({title}: Props): React.ReactElement => {
  // TODO(émilie) : add a menu burger when there is no title instead of the button
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
        : <img src={logoImage} alt={t('productName')} style={logoStyle} />}
    </div>
  </div>
}


export default React.memo(Header)
