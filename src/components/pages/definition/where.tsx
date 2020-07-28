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
const WherePage = (): React.ReactElement => {
  const [t] = useTranslation()
  const title = prepareT('Où en êtes-vous de votre projet professionnel\u00A0?')

  // FIXME(émilie): Delete links and change them by the good handler
  return <Layout header={t('Définition')} title={title}>
    <Link to={getPath('DEFINITION_WHAT', t)} style={linkStyle}>
      <Button color={colors.DARK_FOREST_GREEN} style={buttonStyle}>
        {t('Je sais ce que je veux faire')}
      </Button>
    </Link>
    <Link to={getPath('DEFINITION_LOST', t)} style={linkStyle}>
      <Button color={colors.DARK_FOREST_GREEN} style={buttonStyle}>
        {t('Je ne sais pas / Je suis perdu·e')}
      </Button>
    </Link>
  </Layout>
}

export default React.memo(WherePage)
