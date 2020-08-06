import React from 'react'
import {useTranslation, Trans} from 'react-i18next'
import {Link} from 'react-router-dom'

import {getPath} from 'store/url'

import Button from 'components/button'
import Layout from 'components/layout'

const linkStyle: React.CSSProperties = {
  textDecoration: 'none',
}
const contentStyle: React.CSSProperties = {
  color: colors.DARK_FOREST_GREEN,
  fontSize: 25,
  lineHeight: 1.15,
  margin: '0 10px 20px',
  textAlign: 'center',
}
const buttonContainerStyle: React.CSSProperties = {
  paddingTop: 20,
}

// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const LostPage = (): React.ReactElement => {
  const {t} = useTranslation()

  // FIXME(émilie): Steps : save project state first
  return <Layout header={t('Définition')} bigTitle={t('Ne vous inquiétez pas, on est là\u00A0!')}>
    <Trans parent="p" style={contentStyle}>
      Même si vous êtes perdu·e pour le moment,
      nous allons vous aider à trouver le métier parfait pour vous.
    </Trans>
    <Trans parent="p" style={contentStyle}>
      Première étape, définir ensemble un projet qui vous plaît.
    </Trans>
    <Trans parent="p" style={contentStyle}>
      On y va&nbsp;?
    </Trans>
    <div style={buttonContainerStyle}>
      <Link to={getPath('STEPS', t)} style={linkStyle}>
        <Button type="secondLevel">{t('C\'est parti\u00A0!')}</Button>
      </Link>
    </div>
  </Layout>
}

export default React.memo(LostPage)
