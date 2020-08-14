import React from 'react'
import {useTranslation, Trans} from 'react-i18next'

import {useProjectId, useSelector} from 'store/selections'

import Layout from 'components/layout'
import StepValidationButton from 'components/step_validation_button'

const lowerFirstLetter = (phrase: string): string => phrase[0].toLowerCase() + phrase.slice(1)

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
  const currentProjectId = useProjectId()
  const jobName = useSelector(({user: {projects = []}}) => {
    const project = projects.find(({projectId}) => currentProjectId === projectId)
    if (!project) {
      return ''
    }
    return project?.job?.name || ''
  })
  // FIXME(cyrille): Set skills by job.
  const bigTitle = jobName ? t(
    "Être {{jobName}} requiert d'avoir les compétences XXX",
    {jobName: lowerFirstLetter(jobName)},
  ) : t("Faire ce métier requiert d'avoir les compétences XXX")
  // FIXME(émilie): button : save project state (unlock training)
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
      <StepValidationButton stepId="skills" stepValue="notRequired">
        {t('C\'est parti\u00A0!')}
      </StepValidationButton>
    </div>
  </Layout>
}

export default React.memo(SkillsTrainingPage)
