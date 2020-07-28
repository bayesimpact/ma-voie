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
  marginTop: 20,
}

// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const InterestPage = (): React.ReactElement => {
  const [t] = useTranslation()
  const title = prepareT('Pour vous ce métier est\u00A0:')

  // FIXME(émilie): Change link to redirect where it is needed
  return <Layout header={t('Définition')} title={title}>
    <Link to={getPath('DEFINITION_GO', t)} style={linkStyle}>
      <Button color={colors.DARK_FOREST_GREEN} style={buttonStyle}>{t('Passionnant')}</Button>
    </Link>
    <Link to={getPath('DEFINITION_GO', t)} style={linkStyle}>
      <Button color={colors.DARK_FOREST_GREEN} style={buttonStyle}>{t('Intéressant')}</Button>
    </Link>
    <Link to={getPath('DEFINITION_REDEFINE', t)} style={linkStyle}>
      <Button color={colors.DARK_FOREST_GREEN} style={buttonStyle}>
        {t('Un métier comme un autre')}
      </Button>
    </Link>
  </Layout>
}

export default React.memo(InterestPage)
