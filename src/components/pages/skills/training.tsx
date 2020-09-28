import React from 'react'
import {useTranslation, Trans} from 'react-i18next'

import {useProject, useSkillsList} from 'store/selections'

import Layout from 'components/layout'
import StepValidationButton from 'components/step_validation_button'

const lowerFirstLetter = (phrase: string): string => phrase &&
  phrase[0].toLowerCase() + phrase.slice(1)

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
  const {job: {name: jobName = ''} = {}, skills = []} = useProject()
  const neededSkills = useSkillsList()
  const firstNeededSkill = neededSkills.find(({codeOgr, isPriority}) =>
    isPriority && !skills.includes(codeOgr))?.name || ''
  // FIXME(cyrille): Set skills by job.
  // i18next-extract-mark-context-next-line ["","job","skill","jobskill"]
  const bigTitle = t("Être {{jobName}} requiert d'avoir des compétences comme {{skill}}",
    {
      context: `${jobName ? 'job' : ''}${firstNeededSkill ? 'skill' : ''}`,
      jobName: lowerFirstLetter(jobName),
      skill: lowerFirstLetter(firstNeededSkill),
    },
  )
  return <Layout header={t('Compétences')} bigTitle={bigTitle}>
    <Trans>
      <p style={paragraphStyle}>
        Nous allons tout faire en sorte pour que vous puissiez acquérir ces compétences
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
