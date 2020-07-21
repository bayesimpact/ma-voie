import React from 'react'
import {useTranslation} from 'react-i18next'
import ReactMarkdown from 'react-markdown'
import {Link} from 'react-router-dom'

import {STATIC_NAMESPACE} from 'store/i18n'
import {getPath} from 'store/url'

import Footer from 'components/footer'
import logoImage from 'images/logo.svg'


const h2Style: React.CSSProperties = {
  color: colors.DARK_FOREST_GREEN,
  fontFamily: 'ProximaSoft',
  fontSize: 32,
  lineHeight: 1.25,
  marginBottom: 20,
}


interface HeadingProps {
  children: React.ReactNode
  level: number
}


const CustomHeading = (props: HeadingProps): React.ReactElement => {
  const {children, level} = props
  if (level === 2) {
    return <h2 style={h2Style}>{children}</h2>
  }
  return React.createElement(`h${level}`, {}, children)
}


const strongStyle: React.CSSProperties = {
  color: colors.REDDISH_ORANGE,
}


const CustomStrong = ({children}: {children: React.ReactNode}): React.ReactElement => {
  return <strong style={strongStyle}>{children}</strong>
}


const linkStyle: React.CSSProperties = {
  color: colors.NEON_BLUE,
}


const CustomLink = <T extends Record<string, unknown>>(props: T): React.ReactElement => {
  return <a {...props} rel="noopener noreferer" blank="_target" style={linkStyle} />
}


const titleSectionStyle: React.CSSProperties = {
  backgroundColor: colors.TURQUOISE_BLUE,
  color: '#fff',
  overflow: 'hidden',
  padding: '150px 20px 190px',
  position: 'relative',
}
const titleStyle: React.CSSProperties = {
  fontFamily: 'ProximaSoft',
  fontSize: 47,
  fontWeight: 'bold',
  margin: '0 auto',
  maxWidth: 700,
  textTransform: 'uppercase',
}
const logoStyle: React.CSSProperties = {
  left: 30,
  margin: 0,
  position: 'absolute',
  top: 30,
}
const contentStyle: React.CSSProperties = {
  color: colors.BATTLESHIP_GREY,
  fontSize: 18,
  lineHeight: 1.44,
  margin: 'auto',
  maxWidth: 700,
}
const whiteTriangleStyle: React.CSSProperties = {
  borderBottom: 'solid #fff 10vw',
  borderLeft: 'solid transparent 100vw',
  bottom: 0,
  left: 0,
  position: 'absolute',
  zIndex: 1,
}


const renderers = {
  heading: CustomHeading,
  link: CustomLink,
  strong: CustomStrong,
}


// This is a top level page and should be nested only with caution.
// TOP LEVEL PAGE
const TermsPage = (): React.ReactElement => {
  const {t} = useTranslation()
  const [translate] = useTranslation(STATIC_NAMESPACE)
  const email = config.contactEmail
  return <React.Fragment>
    <section style={titleSectionStyle}>
      <Link style={logoStyle} to={getPath('SPLASH', t)}>
        <img src={logoImage} alt={t('productName')} />
      </Link>
      <h1 style={titleStyle}>
        {t('Mentions légales')}
      </h1>
      <div style={whiteTriangleStyle} />
    </section>
    <div style={{padding: '55px 20px 100px'}}>
      <div style={contentStyle}>
        <ReactMarkdown source={translate('termsOfService', {
          canonicalUrl: t('canonicalUrl'),
          host: 'gandi – 63-65 Boulevard Masséna 75013 Paris 01 70 37 76 61',
          owner: 'Chance / MaVoie.org',
          productName: t('productName').toLocaleUpperCase(),
          publisher: `MaVoie.org – ${email} Le responsable publication ` +
          'est une personne physique ou une personne morale.',
          webmaster: `John Métois – ${email}`,
        })} renderers={renderers} />
      </div>
    </div>
    <Footer />
  </React.Fragment>
}


export default React.memo(TermsPage)
