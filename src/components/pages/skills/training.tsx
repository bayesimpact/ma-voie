import React from 'react'
import {useTranslation, Trans} from 'react-i18next'

import {prepareT} from 'store/i18n'

import Button from 'components/button'
import Layout from 'components/layout'

const paragraphStyle: React.CSSProperties = {
  color: colors.DARK_FOREST_GREEN,
  fontSize: 22,
  lineHeight: 1.15,
  textAlign: 'center',
}
const buttonStyle: React.CSSProperties = {
  marginTop: 20,
}
// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const SkillsTrainingPage = (): React.ReactElement => {
  const {t} = useTranslation()
  // FIXME(émilie): Sets the job and the skills
  const bigTitle = prepareT('Le métier de XXX requiert d\'avoir les compétences XXX')
  // FIXME(émilie): Go to prepare the interview
  return <Layout header={t('Compétences')} bigTitle={bigTitle}>
    <Trans parent="p" style={paragraphStyle}>
      Nous allons faire tout en sorte pour que vous puissiez acquérir ces compétences
      avec les meilleurs&nbsp;!&nbsp;:)
    </Trans>
    <Trans parent="p" style={paragraphStyle}>
      Une formation va donc être nécessaire.
    </Trans>
    <Button bgColor={colors.TEAL_BLUE} style={buttonStyle}>
      {t('C\'est parti\u00A0!')}
    </Button>
  </Layout>
}

export default React.memo(SkillsTrainingPage)
