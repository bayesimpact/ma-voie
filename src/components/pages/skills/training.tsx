import React from 'react'
import {useTranslation, Trans} from 'react-i18next'

import Button from 'components/button'
import Layout from 'components/layout'

const paragraphStyle: React.CSSProperties = {
  color: colors.DARK_FOREST_GREEN,
  fontSize: 22,
  lineHeight: 1.15,
  textAlign: 'center',
}
const buttonContainerStyle: React.CSSProperties = {
  marginBottom: 20,
  paddingTop: 20,
}
// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const SkillsTrainingPage = (): React.ReactElement => {
  const {t} = useTranslation()
  // FIXME(émilie): Sets the job and the skills
  const bigTitle = t('Le métier de XXX requiert d\'avoir les compétences XXX')
  // FIXME(émilie): Go to prepare the interview
  return <Layout header={t('Compétences')} bigTitle={bigTitle}>
    <Trans>
      <p style={paragraphStyle}>
        Nous allons faire tout en sorte pour que vous puissiez acquérir ces compétences
        avec les meilleurs&nbsp;!&nbsp;:)
      </p>
      <p style={paragraphStyle}>
        Une formation va donc être nécessaire.
      </p>
    </Trans>
    <div style={buttonContainerStyle}>
      <Button type="secondLevel">
        {t('C\'est parti\u00A0!')}
      </Button>
    </div>
  </Layout>
}

export default React.memo(SkillsTrainingPage)
