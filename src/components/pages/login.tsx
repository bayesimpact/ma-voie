import React from 'react'
import {useTranslation} from 'react-i18next'

import Layout from 'components/layout'

// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const LoginPage = (): React.ReactElement => {
  const {t} = useTranslation()

  return <Layout bigTitle={t('Connexion')}>
  </Layout>
}

export default React.memo(LoginPage)
