import React from 'react'
import {useTranslation} from 'react-i18next'
import {Link} from 'react-router-dom'

import {getPath} from 'store/url'

import ButtonWithIcon from 'components/button_with_icon'
import Layout from 'components/layout'

const linkStyle: React.CSSProperties = {
  textDecoration: 'none',
}

const buttonStyle: React.CSSProperties = {
  marginBottom: 15,
}
const divStyle: React.CSSProperties = {
  color: colors.DARK_FOREST_GREEN,
  fontSize: 16,
  marginTop: 20,
  textAlign: 'center',
}
const linkConnectStyle: React.CSSProperties = {
  color: colors.TURQUOISE_BLUE,
}

const soonAvailable = (): void => window.alert('Bientôt disponible...')

// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
// TODO(émilie): Link the buttons.
const SignupPage = (): React.ReactElement => {
  const {t} = useTranslation()

  return <Layout bigTitle={t('Inscription')} menu="out">
    <Link to={getPath(['ACCOUNT'], t)} style={linkStyle}>
      <ButtonWithIcon type="email" style={buttonStyle} onClick={soonAvailable}>
        {t('S\'inscrire avec un email')}
      </ButtonWithIcon>
    </Link>
    <ButtonWithIcon type="facebook" style={buttonStyle} onClick={soonAvailable}>
      {t('Continuer avec Facebook')}
    </ButtonWithIcon>
    <ButtonWithIcon type="google" style={buttonStyle} onClick={soonAvailable}>
      {t('Continuer avec Google')}
    </ButtonWithIcon>
    <div style={divStyle}>
      {t('Déjà un compte\u00A0?')}&nbsp;
      <Link to={getPath(['LOGIN'], t)} style={linkConnectStyle}>{t('Se connecter')}</Link>
    </div>
  </Layout>
}

export default React.memo(SignupPage)
