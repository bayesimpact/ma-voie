import React from 'react'
import {useTranslation} from 'react-i18next'
import {useLocation} from 'react-router'
import {Link} from 'react-router-dom'

import {getPath} from 'store/url'

import logoGoogleOrgImage from 'images/logo-google-org.png'

const isMobileVersion = window.outerWidth < 800

const footerStyle: React.CSSProperties = {
  backgroundColor: colors.DARK_FOREST_GREEN,
  color: colors.GREY,
  padding: isMobileVersion ? '60px 35px 45px' : '50px 20px 20px',
}
const footerLogoStyle: React.CSSProperties = {
  display: 'block',
  height: 51,
  marginBottom: isMobileVersion ? 30 : 50,
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
  fontSize: isMobileVersion ? 16 : 13,
  justifyContent: 'space-between',
  marginTop: isMobileVersion ? 30 : 0,
  paddingTop: isMobileVersion ? 28 : 14,
}
const footerLinkStyle: React.CSSProperties = {
  color: colors.GREY,
  display: isMobileVersion ? 'block' : 'initial',
  fontSize: isMobileVersion ? 16 : 13,
  fontWeight: 'bold',
  padding: isMobileVersion ? '20px 0' : '14px 0 0 30px',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
}
const footerLinkSelectedStyle: React.CSSProperties = {
  ...footerLinkStyle,
  color: '#fff',
}

const Footer = (): React.ReactElement => {
  const {t} = useTranslation()
  const {pathname} = useLocation()
  const splashPath = getPath(['SPLASH'], t)
  const teamPath = getPath(['TEAM'], t)
  const termsPath = getPath(['TERMS'], t)
  const missionPath = getPath(['MISSION'], t)
  const isSplash = pathname === splashPath
  const isTeam = pathname === teamPath
  const isTerms = pathname === termsPath
  const isMission = pathname === missionPath

  // TODO(émilie): scroll up to the top of the page when clicked on a link here.
  const nav = <div>
    <Link
      to={splashPath}
      style={isSplash ? footerLinkSelectedStyle : footerLinkStyle}>
      {t('Accueil')}
    </Link>
    <Link
      to={missionPath}
      style={isMission ? footerLinkSelectedStyle : footerLinkStyle}>
      {t('Notre mission')}
    </Link>
    <Link
      to={teamPath}
      style={isTeam ? footerLinkSelectedStyle : footerLinkStyle}>
      {t("L'équipe")}
    </Link>
    <Link
      to={termsPath}
      style={isTerms ? footerLinkSelectedStyle : footerLinkStyle}>
      {t('Mentions légales')}
    </Link>
  </div>

  return <footer style={footerStyle}>
    <div style={contentStyle}>
      <div>
        {t('Un projet soutenu par')}
        <a href="https://www.google.org" target="_blank" rel="noopener noreferrer">
          <img src={logoGoogleOrgImage} alt="Google.org" style={footerLogoStyle} />
        </a>
      </div>
      {isMobileVersion ? nav : null}
      <div style={finalFooterStyle}>
        <div>
          © {(new Date().getFullYear())} by MaVoie.org
        </div>
        {isMobileVersion ? null : nav}
      </div>
    </div>
  </footer>
}


export default React.memo(Footer)
