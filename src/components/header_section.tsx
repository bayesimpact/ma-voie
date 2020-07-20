import React from 'react'
import {Trans, useTranslation} from 'react-i18next'

// TODO(pascal): Add a name for the color below then comment those lines with the new name.
import orange6ArrowsImage from 'images/arrows-6.svg?stroke=#992f00'
import orange13ArrowsImage from 'images/arrows-13.svg?stroke=#992f00'
import logoImage from 'images/logo.svg'
import screenshotImage from 'images/screenshot.svg'


const sectionStyle: React.CSSProperties = {
  backgroundColor: colors.REDDISH_ORANGE,
  color: '#fff',
  fontFamily: 'ProximaSoft',
  overflow: 'hidden',
  padding: '150px 20px 280px',
  position: 'relative',
}
const contentStyle: React.CSSProperties = {
  margin: 'auto',
  maxWidth: 960,
  position: 'relative',
}
const logoStyle: React.CSSProperties = {
  left: 30,
  margin: 0,
  position: 'absolute',
  top: 30,
}
const tagLineStyle: React.CSSProperties = {
  fontSize: 47,
  fontWeight: 'bold',
  lineHeight: 1.06,
}
const subTagLineStyle: React.CSSProperties = {
  color: colors.PALE_SALMON,
  fontSize: 26,
  fontWeight: 'bold',
  marginTop: 54,
}
const productNameStyle: React.CSSProperties = {
  color: '#fff',
}
const orange6ArrowsStyle: React.CSSProperties = {
  bottom: -180,
  left: -80,
  position: 'absolute',
}
const orange13ArrowsStyle: React.CSSProperties = {
  position: 'absolute',
  right: -80,
  top: 60,
}
const screenshotStyle: React.CSSProperties = {
  borderRadius: 31,
  bottom: -280,
  boxShadow: '0 16px 17.5px rgba(0, 0, 0, .1)',
  position: 'absolute',
  right: 15,
}
const whiteTriangleStyle: React.CSSProperties = {
  borderBottom: 'solid #fff 10vw',
  borderLeft: 'solid transparent 100vw',
  bottom: 0,
  left: 0,
  position: 'absolute',
  zIndex: 1,
}


const HeaderSection = (): React.ReactElement => {
  const {t} = useTranslation()
  return <section style={sectionStyle}>
    <h1 style={logoStyle}><img src={logoImage} alt={t('productName')} /></h1>
    <div style={contentStyle}>
      <Trans style={tagLineStyle}>
        La période que nous vivons<br />
        a mis un coup d'arrêt à votre<br />
        recherche d'emploi&nbsp;?
      </Trans>
      <Trans style={subTagLineStyle}>
        Face à la crise prenez le bon virage<br />
        vers l'emploi avec <strong style={productNameStyle}>
          $t(productName)
        </strong>
      </Trans>
      <img src={orange6ArrowsImage} alt="" style={orange6ArrowsStyle} />
      <img src={orange13ArrowsImage} alt="" style={orange13ArrowsStyle} />
      <img src={screenshotImage} style={screenshotStyle} alt="" />
    </div>
    <div style={whiteTriangleStyle} />
  </section>
}


export default React.memo(HeaderSection)
