import React from 'react'
import {Trans} from 'react-i18next'

import logoImage from 'images/logo.svg'
import screenshotImage from 'images/screenshot.svg'


const sectionStyle: React.CSSProperties = {
  backgroundColor: colors.REDDISH_ORANGE,
  color: '#fff',
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
  position: 'absolute',
  top: 30,
}
const tagLineStyle: React.CSSProperties = {
  fontWeight: 'bold',
  fontSize: 47,
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
  // TODO(pascal): Add arrows.
  return <section style={sectionStyle}>
    <img src={logoImage} style={logoStyle} alt={config.productName} />
    <div style={contentStyle}>
      <Trans style={tagLineStyle}>
        La période que nous vivons<br/>
        a mis un coup d'arrêt à votre<br />
        recherche d'emploi&nbsp;?
      </Trans>
      <Trans style={subTagLineStyle}>
        Face à la crise prenez le bon virage<br />
        vers l'emploi avec <strong style={productNameStyle}>
          {{productName: config.productName}}
        </strong>
      </Trans>
      <img src={screenshotImage} style={screenshotStyle} />
    </div>
    <div style={whiteTriangleStyle} />
  </section>
}


export default React.memo(HeaderSection)
