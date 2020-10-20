import React, {useCallback, useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useRouteMatch} from 'react-router'
import {Redirect} from 'react-router-dom'

import FadingLink, {useFadeInFadeOut} from 'hooks/fade'
import {updateProject, updateSteps, useDispatch} from 'store/actions'
import {useCertifiedSteps, useProject} from 'store/selections'
import Steps, {StepInfo} from 'store/steps'
import {Page, getPath} from 'store/url'

import Button from 'components/button'
import JobSuggest from 'components/job_suggest'
import Layout from 'components/layout'

const linkStyle: React.CSSProperties = {textDecoration: 'none'}

const inputStyle: React.CSSProperties = {
  borderColor: colors.SILVER_THREE,
  borderRadius: 15,
  borderStyle: 'solid',
  borderWidth: 1,
  fontFamily: 'ProximaSoft',
  fontSize: 16,
  height: 24,
  lineHeight: '24px',
  padding: '18px 25px',
  width: 'calc(100% - 50px)',
}
const buttonContainerStyle: React.CSSProperties = {
  fontSize: 16,
  marginTop: 20,
}

const lostPage: Page = ['DEFINITION', 'LOST']

// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const JobPage = (): React.ReactElement => {
  const {t, t: translate} = useTranslation()
  const {url} = useRouteMatch('/:step') || {}
  const step = Steps.find(({page}) => getPath(page, t) === url)
  const {page, title: stepTitle = '', shortTitle = stepTitle, stepId}: StepInfo = step || Steps[0]
  const {definition: {completed = undefined} = {}} = useCertifiedSteps() || {}
  const dispatch = useDispatch()
  const isSelfCertified = completed === 'self'
  const onLost = useCallback(() => {
    dispatch(updateSteps({definition: {}}))
  }, [dispatch])
  const {job: previousJob, objective} = useProject()
  const title = stepId === 'definition' ?
    objective === 'interview' ?
      t('Pour quel métier souhaitez-vous préparer vos entretiens\u00A0?') :
      t('Pour quel métier souhaitez-vous retrouver un poste\u00A0?') :
    previousJob ? t("Avez vous validé votre métier lors de l'étape précédente\u00A0?") :
      t("Vous n'avez pas encore choisi de métier, choisissez en un avant de continuer")
  const [job, setJob] = useState<bayes.maVoie.Job|null>(previousJob || null)
  useEffect(() => previousJob && setJob(previousJob), [previousJob])
  const {fadeTo, style} = useFadeInFadeOut()

  const validateButtonStyle: React.CSSProperties = {
    marginTop: 20,
    opacity: job ? 1 : 0.75,
  }

  const onValidate = useCallback((): void => {
    if (!job) {
      return
    }
    dispatch(updateProject({job}))
    fadeTo([
      ...page || [],
      ...(stepId === 'definition' ? ['EXPERIENCE'] : stepId === 'skills' ? ['LIST'] : []) as Page,
    ])
  }, [dispatch, fadeTo, job, page, stepId])

  if (!step) {
    return <Redirect to={getPath(['STEPS'], t)} />
  }
  return <Layout header={translate(shortTitle)} title={title} style={style}>
    <p>{stepId !== 'definition' && previousJob ?
      t("S'il a changé, il est encore temps de le modifier") : null}</p>
    <JobSuggest
      placeholder={t('entrez votre métier')} style={inputStyle}
      onChange={setJob} value={job || undefined} />
    <Button style={validateButtonStyle} type="variable" onClick={onValidate}>{t('Valider')}</Button>
    {stepId === 'definition' || isSelfCertified ?
      <FadingLink fadeTo={fadeTo} onClick={onLost} to={lostPage} style={linkStyle}>
        <Button style={buttonContainerStyle} type="discreet">
          {stepId === 'definition' ? t('Je ne sais pas') :
            t("Je ne sais vraiment pas, refaire l'étape précédente")}
        </Button>
      </FadingLink> : null}
  </Layout>
}

export default React.memo(JobPage)
