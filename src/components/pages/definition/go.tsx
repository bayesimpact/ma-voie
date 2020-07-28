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
const buttonStyle: React.CSSProperties = {
  marginTop: 20,
}
const layoutStyle: React.CSSProperties = {
  height: '100vh',
}
const textContainerStyle: React.CSSProperties = {

}
const layoutContentStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}
// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const GoPage = (): React.ReactElement => {
  const [t] = useTranslation()

  // FIXME(émilie): Change link to redirect where it is needed
  return <Layout header={t('Définition')} bigTitle={t('Félicitations\u00A0!')} style={layoutStyle}>
    <div style={layoutContentStyle}>
      <div style={textContainerStyle}>
        <Trans parent="p" style={contentStyle}>
          Votre projet semble clair et cohérent.
        </Trans>
        <Trans parent="p" style={contentStyle}>
          Il est temps maintenant de vérifier ensemble vos compétences.
        </Trans>
        <Trans parent="p" style={contentStyle}>
          Vous êtes prêt·e&nbsp;?
        </Trans>
      </div>
      <Link to={getPath('DEFINITION_WHAT', t)} style={linkStyle}>
        <Button bgColor={colors.TEAL_BLUE} style={buttonStyle}>{t('C\'est parti\u00A0!')}</Button>
      </Link>
    </div>
  </Layout>
}

export default React.memo(GoPage)
