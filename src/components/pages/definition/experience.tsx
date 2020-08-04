import React from 'react'
import {useTranslation} from 'react-i18next'
import {Link} from 'react-router-dom'

import {getPath} from 'store/url'

import Button from 'components/button'
import Layout from 'components/layout'

const buttonContainerStyle: React.CSSProperties = {
  display: 'block',
  paddingTop: 20,
}
const linkStyle: React.CSSProperties = {
  textDecoration: 'none',
}

// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const ExperiencePage = (): React.ReactElement => {
  const {t} = useTranslation()
  const title = t('Quelle est votre expérience pour ce métier\u00A0?')

  // FIXME(émilie): Change link to save data and then redirect to interest
  return <Layout header={t('Définition')} title={title}>
    <div style={buttonContainerStyle}>
      <Link to={getPath('DEFINITION_INTEREST', t)} style={linkStyle}>
        <Button color={colors.DARK_FOREST_GREEN}>{t('Je suis novice')}</Button>
      </Link>
    </div>
    <div style={buttonContainerStyle}>
      <Link to={getPath('DEFINITION_INTEREST', t)} style={linkStyle}>
        <Button color={colors.DARK_FOREST_GREEN}>{t('Entre 1-3 ans')}</Button>
      </Link>
    </div>
    <div style={buttonContainerStyle}>
      <Link to={getPath('DEFINITION_INTEREST', t)} style={linkStyle}>
        <Button color={colors.DARK_FOREST_GREEN}>{t('Entre 3-5 ans')}</Button>
      </Link>
    </div>
    <div style={buttonContainerStyle}>
      <Link to={getPath('DEFINITION_INTEREST', t)} style={linkStyle}>
        <Button color={colors.DARK_FOREST_GREEN}>{t('Plus de 5 ans')}</Button>
      </Link>
    </div>
  </Layout>
}

export default React.memo(ExperiencePage)
