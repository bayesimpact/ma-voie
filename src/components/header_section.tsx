import MenuIcon from 'mdi-react/MenuIcon'
import React, {useCallback} from 'react'
import {Trans, useTranslation} from 'react-i18next'
import {useFirestore} from 'react-redux-firebase'
import {Link} from 'react-router-dom'

import {useCalendlyCount} from 'store/selections'
import {getPath} from 'store/url'

import Button from 'components/button'
import {colorToAlpha} from 'components/colors'
// TODO(pascal): Add a name for the color below then comment those lines with the new name.
import orange6ArrowsImage from 'images/arrows-6.svg?stroke=#992f00'
import orange13ArrowsImage from 'images/arrows-13.svg?stroke=#992f00'
import logoImage from 'images/logo.svg'
import screenshotImage from 'images/screenshot.svg'

const isMobileVersion = window.innerWidth <= 800

const sectionStyle: React.CSSProperties = {
  backgroundColor: colors.REDDISH_ORANGE,
  color: '#fff',
  fontFamily: 'ProximaSoft',
  overflow: 'hidden',
  padding: isMobileVersion ? '10px 50px 300px' : '150px 20px 280px',
  position: 'relative',
}
const contentStyle: React.CSSProperties = {
  margin: 'auto',
  maxWidth: 960,
  position: 'relative',
}
const logoStyle: React.CSSProperties = isMobileVersion ? {
  margin: '30px auto',
  width: 'fit-content',
} : {
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
  fontFamily: isMobileVersion ? 'Lato' : 'inherit',
  fontSize: isMobileVersion ? 25 : 26,
  fontWeight: 'bold',
  marginTop: isMobileVersion ? 0 : 54,
  textAlign: isMobileVersion ? 'center' : 'left',
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
  bottom: isMobileVersion ? -120 : -280,
  boxShadow: '0 16px 17.5px rgba(0, 0, 0, .1)',
  position: 'absolute',
  right: isMobileVersion ? '50%' : 15,
  transform: isMobileVersion ? 'translateX(50%)' : 'initial',
  width: isMobileVersion ? 230 : 287,
}
// TODO(cyrille): Handle pixel-high line between triangle and next section.
const whiteTriangleStyle: React.CSSProperties = {
  borderBottom: 'solid #fff 10vw',
  borderLeft: 'solid transparent 100vw',
  bottom: 0,
  left: 0,
  position: 'absolute',
  zIndex: 1,
}

const menuLinkStyle: React.CSSProperties = {
  color: '#fff',
  left: 20,
  position: 'absolute',
  textDecoration: 'none',
  top: 22,
}
const startButtonStyle: React.CSSProperties = {
  backgroundColor: colors.DARK_FOREST_GREEN,
  margin: isMobileVersion ? '35px auto 0' : '35px 0 0',
  maxWidth: 270,
}
const helpButtonStyle: React.CSSProperties = {
  background: 'none',
  border: `1px solid ${colorToAlpha('#fff', .5)}`,
  color: 'white',
  fontSize: 15,
  fontWeight: 'normal',
  lineHeight: 1.2,
}
const ctasDivStyle: React.CSSProperties = {
  maxWidth: isMobileVersion ? '100%' : '270px',
}
const startLinkStyle: React.CSSProperties = {
  textDecoration: 'none',
}
const orStyle: React.CSSProperties = {
  borderBottom: `1px solid ${colorToAlpha('#fff', .5)}`,
  lineHeight: '0.1em',
  margin: '20px auto',
  textAlign: 'center',
  width: isMobileVersion ? '50%' : '100%',
}
const orTextStyle: React.CSSProperties = {
  backgroundColor: colors.REDDISH_ORANGE,
  padding: '0 10px',
}
const helpLinkStyle: React.CSSProperties = {
  color: '#fff',
  display: 'block',
  fontSize: 15,
  fontWeight: 'bold',
  margin: 'auto',
  textAlign: 'center',
  textDecoration: 'none',
}

const isLandingOnlyVersion =
  new Date() < new Date('2020-09-28T10:00:00Z') &&
  !window.location.href.includes('.bayes.org') &&
  !window.location.search.includes('launched')

const HeaderSection = (): React.ReactElement => {
  const {t} = useTranslation()
  const firestore = useFirestore()
  const calendlyCount = useCalendlyCount()

  // TODO(émilie): Move to actions.
  const handleCalendlyClick = useCallback((): void => {
    firestore.update({collection: 'analytics', doc: 'calendly'}, {value: calendlyCount + 1}).
      catch(() => {
        firestore.doc('analytics/calendly').
          set({value: firestore.FieldValue.increment(1)}, {merge: true})
      })
  }, [calendlyCount, firestore])

  return <section style={sectionStyle}>
    {isMobileVersion && !isLandingOnlyVersion ? // TODO(émilie): Allow to sign in on desktop too.
      <Link to={getPath(['MENU_SITE'], t)} style={menuLinkStyle}>
        <MenuIcon />
      </Link> :
      null}
    <h1 style={logoStyle}><img src={logoImage} alt={t('productName')} /></h1>
    <div style={contentStyle}>
      {isMobileVersion ? null : <Trans style={tagLineStyle}>
        Besoin d'aide pour construire <br />
        votre chemin vers l'emploi&nbsp;?
      </Trans>}
      <Trans style={subTagLineStyle}>
        <strong style={productNameStyle}>$t(productName)</strong> vous accompagne dans votre <br />
        recherche d'emploi en 4 étapes clés. <br />
        Simple. Personnalisé. Sans se déplacer.
      </Trans>
      {isLandingOnlyVersion ? null :
        <div style={ctasDivStyle}>
          <Link to={getPath(['STEPS'], t)} style={startLinkStyle}>
            <Button type="firstLevel" style={startButtonStyle}>
              {t('Commencer maintenant')}
            </Button>
          </Link>
          <div style={orStyle}><span style={orTextStyle}>{t('ou')}</span></div>
          <a href="https://calendly.com/mavoie/30min" onClick={handleCalendlyClick}
            target="_blank" rel="noopener noreferrer" style={helpLinkStyle}>
            <Button type="variable" style={helpButtonStyle}>
              <Trans parent="span">
                Demander l'aide<br />d'un conseiller <strong>$t(productName)</strong>
              </Trans>
            </Button>
          </a>
        </div>}
      {isMobileVersion ? null : <React.Fragment>
        <img src={orange13ArrowsImage} alt="" style={orange13ArrowsStyle} />
        <img src={orange6ArrowsImage} alt="" style={orange6ArrowsStyle} />
        <img src={screenshotImage} style={screenshotStyle} alt="" />
      </React.Fragment>}
    </div>
    {isMobileVersion ? <img src={screenshotImage} style={screenshotStyle} alt="" /> : null}
    <div style={whiteTriangleStyle} />
  </section>
}


export default React.memo(HeaderSection)
