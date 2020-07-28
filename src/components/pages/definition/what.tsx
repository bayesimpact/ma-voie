import React from 'react'
import {useTranslation} from 'react-i18next'
import {Link} from 'react-router-dom'

import {prepareT} from 'store/i18n'
import {getPath} from 'store/url'

import Button from 'components/button'
import Layout from 'components/layout'

const linkStyle: React.CSSProperties = {
  textDecoration: 'none',
}
const buttonStyle: React.CSSProperties = {
  fontSize: 16,
  marginBottom: 20,
}

// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const WhatPage = (): React.ReactElement => {
  const [t] = useTranslation()
  const bigTitle = prepareT('Super\u00A0!')
  const title = prepareT('Quel est votre projet\u00A0?')

  return <Layout header={t('Définition')} bigTitle={bigTitle} title={title}>
    <Link to={getPath('DEFINITION_JOB', t)} style={linkStyle}>
      <Button color={colors.DARK_FOREST_GREEN} style={buttonStyle}>
        {t('Retrouver un poste')}
      </Button>
    </Link>
    <Button color={colors.DARK_FOREST_GREEN} style={buttonStyle}>{t('Me former')}</Button>
  </Layout>
}

export default React.memo(WhatPage)
