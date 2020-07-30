import React from 'react'
import {useTranslation} from 'react-i18next'
import {Link} from 'react-router-dom'

import {getPath} from 'store/url'

import Button from 'components/button'
import Layout from 'components/layout'

const linkStyle: React.CSSProperties = {
  textDecoration: 'none',
}
const buttonContainerStyle: React.CSSProperties = {
  fontSize: 16,
  paddingBottom: 20,
}

// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const WhatPage = (): React.ReactElement => {
  const [t] = useTranslation()
  const bigTitle = t('Super\u00A0!')
  const title = t('Quel est votre projet\u00A0?')

  return <Layout header={t('Définition')} bigTitle={bigTitle} title={title}>
    <div style={buttonContainerStyle}>
      <Link to={getPath('DEFINITION_JOB', t)} style={linkStyle}>
        <Button color={colors.DARK_FOREST_GREEN}>
          {t('Retrouver un poste')}
        </Button>
      </Link>
    </div>
    <div style={buttonContainerStyle}>
      <Button color={colors.DARK_FOREST_GREEN}>{t('Me former')}</Button>
    </div>
  </Layout>
}

export default React.memo(WhatPage)
