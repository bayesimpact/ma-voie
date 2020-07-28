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
const ExperiencePage = (): React.ReactElement => {
  const [t] = useTranslation()
  const title = prepareT('Quelle est votre expérience pour ce métier\u00A0?')

  // FIXME(émilie): Change link to save data and then redirect to interest
  return <Layout header={t('Définition')} title={title}>
    <Link to={getPath('DEFINITION_INTEREST', t)} style={linkStyle}>
      <Button color={colors.DARK_FOREST_GREEN} style={buttonStyle}>{t('Je suis novice')}</Button>
    </Link>
    <Link to={getPath('DEFINITION_INTEREST', t)} style={linkStyle}>
      <Button color={colors.DARK_FOREST_GREEN} style={buttonStyle}>{t('Entre 1-3 ans')}</Button>
    </Link>
    <Link to={getPath('DEFINITION_INTEREST', t)} style={linkStyle}>
      <Button color={colors.DARK_FOREST_GREEN} style={buttonStyle}>{t('Entre 3-5 ans')}</Button>
    </Link>
    <Link to={getPath('DEFINITION_INTEREST', t)} style={linkStyle}>
      <Button color={colors.DARK_FOREST_GREEN} style={buttonStyle}>{t('Plus de 5 ans')}</Button>
    </Link>
  </Layout>
}

export default React.memo(ExperiencePage)
