import React from 'react'
import {useTranslation} from 'react-i18next'

import Button from 'components/button'
import Layout from 'components/layout'

const buttonStyle: React.CSSProperties = {
  marginBottom: 15,
}

// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
// TODO(émilie): Link the buttons.
// TODO(émilie): Add the Sign in link.
const SignupPage = (): React.ReactElement => {
  const {t} = useTranslation()

  return <Layout bigTitle={t('Inscription')}>
    <Button type="email" style={buttonStyle}>
      {t('S\'inscrire avec un email')}
    </Button>
    <Button type="facebook" style={buttonStyle}>
      {t('Continuer avec Facebook')}
    </Button>
    <Button type="google" style={buttonStyle}>
      {t('Continuer avec Google')}
    </Button>
  </Layout>
}

export default React.memo(SignupPage)
