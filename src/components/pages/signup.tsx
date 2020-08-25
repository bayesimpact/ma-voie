import React from 'react'
import {useTranslation} from 'react-i18next'

import IcoButton from 'components/button_ico'
import Layout from 'components/layout'

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
    <IcoButton type="email" style={buttonStyle} onClick={soonAvailable}>
      {t('S\'inscrire avec un email')}
    </IcoButton>
    <IcoButton type="facebook" style={buttonStyle} onClick={soonAvailable}>
      {t('Continuer avec Facebook')}
    </IcoButton>
    <IcoButton type="google" style={buttonStyle} onClick={soonAvailable}>
      {t('Continuer avec Google')}
    </IcoButton>
  </Layout>
}

export default React.memo(SignupPage)
