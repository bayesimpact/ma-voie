import React from 'react'
import {useTranslation} from 'react-i18next'
import {useLocation} from 'react-router'
import {getPath} from 'store/url'

import logoGoogleOrgImage from 'images/logo-google-org.png'

const footerStyle: React.CSSProperties = {
  backgroundColor: colors.DARK_FOREST_GREEN,
  color: colors.GREY,
  padding: '50px 20px 20px',
}
const footerLogoStyle: React.CSSProperties = {
  display: 'block',
  height: 51,
  marginBottom: 50,
  marginTop: 14,
}
const contentStyle: React.CSSProperties = {
  margin: 'auto',
  maxWidth: 960,
  position: 'relative',
}
const finalFooterStyle: React.CSSProperties = {
  borderTop: 'solid 2px rgba(255, 255, 255, .1)',
  display: 'flex',
  fontSize: 13,
  justifyContent: 'space-between',
  paddingTop: 14,
}
const footerLinkStyle = (isSelected:boolean): React.CSSProperties => ({
  color: isSelected ? 'white' : colors.GREY,
  fontSize: 13,
  fontWeight: 'bold',
  paddingLeft: 30,
  paddingTop: 14,
  textDecoration: 'none',
})

const Footer = (): React.ReactElement => {
  const {t} = useTranslation()
  const {pathname} = useLocation()
  const isSplash = pathname === getPath('SPLASH', t)
  const isTerms = pathname === getPath('TERMS', t)
  return <footer style={footerStyle}>
    <div style={contentStyle}>
      <div>
        {t('Un projet soutenu par')}
        <a href="https://www.google.org" target="_blank" rel="noopener noreferrer">
          <img src={logoGoogleOrgImage} alt="Google.org" style={footerLogoStyle} />
        </a>
      </div>
      <div style={finalFooterStyle}>
        <div>
          © {(new Date().getFullYear())} by MaVoie.org
        </div>
        <div>
          <a
            href={getPath('SPLASH', t)} style={footerLinkStyle(isSplash)} target="_blank"
            rel="noopener noreferrer">
            {t('Accueil')}
          </a>
          <a
            href={getPath('TERMS', t)} style={footerLinkStyle(isTerms)} target="_blank"
            rel="noopener noreferrer">
            {t('Mentions légales')}
          </a>
        </div>
      </div>
    </div>
  </footer>
}

export default React.memo(Footer)
