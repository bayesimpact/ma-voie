import React from 'react'
import {useTranslation} from 'react-i18next'

import logoImage from 'images/logo-black.svg'


const headerContainerStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  position: 'fixed',
  width: '100%',
}
const headerStyle: React.CSSProperties = {
  boxShadow: '0 1px 0 0 #e5e6e6',
  display: 'flex',
  padding: '15px 20px',
}
const logoStyle: React.CSSProperties = {
  fill: 'black',
  height: '30',
  margin: 'auto',
  width: '49',
}

const Header = (): React.ReactElement => {
  const {t} = useTranslation()
  return <div style={headerContainerStyle}>
    <div style={headerStyle}>
      <img src={logoImage} alt={t('productName')} style={logoStyle} />
    </div>
  </div>
}


export default React.memo(Header)
