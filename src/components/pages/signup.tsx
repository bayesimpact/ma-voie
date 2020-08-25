import React from 'react'
import {useTranslation} from 'react-i18next'
import {Link} from 'react-router-dom'

import {getPath} from 'store/url'

import IconButton from 'components/button_icon'
import Layout from 'components/layout'

const linkStyle: React.CSSProperties = {
  textDecoration: 'none',
}

const buttonStyle: React.CSSProperties = {
  marginBottom: 15,
}

const soonAvailable = (): void => window.alert('Bientôt disponible...')

// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
// TODO(émilie): Link the buttons.
// TODO(émilie): Add the Sign in link.
const SignupPage = (): React.ReactElement => {
  const {t} = useTranslation()

  return <Layout bigTitle={t('Inscription')}>
    <Link to={getPath(['ACCOUNT'], t)} style={linkStyle}>
      <IconButton type="email" style={buttonStyle} onClick={soonAvailable}>
        {t('S\'inscrire avec un email')}
      </IconButton>
    </Link>
    <IconButton type="facebook" style={buttonStyle} onClick={soonAvailable}>
      {t('Continuer avec Facebook')}
    </IconButton>
    <IconButton type="google" style={buttonStyle} onClick={soonAvailable}>
      {t('Continuer avec Google')}
    </IconButton>
  </Layout>
}

export default React.memo(SignupPage)
