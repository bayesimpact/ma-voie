import React, {useCallback, useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useHistory} from 'react-router'

import {updateProject, useDispatch} from 'store/actions'
import {useProjectId} from 'store/selections'
import {getPath} from 'store/url'

import Button from 'components/button'
import JobSuggest from 'components/job_suggest'
import Layout from 'components/layout'

const inputStyle: React.CSSProperties = {
  borderColor: colors.SILVER_THREE,
  borderRadius: 15,
  borderStyle: 'solid',
  borderWidth: 1,
  fontFamily: 'ProximaSoft',
  fontSize: 16,
  height: 24,
  lineHeight: 24,
  padding: '18px 25px',
  width: 'calc(100% - 50px)',
}
const buttonContainerStyle: React.CSSProperties = {
  fontSize: 16,
  marginTop: 20,
}


// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const JobPage = (): React.ReactElement => {
  const {t} = useTranslation()
  const title = t('Pour quel métier souhaitez-vous retrouver un poste\u00A0?')
  const projectId = useProjectId()
  const dispatch = useDispatch()
  const history = useHistory()
  const [job, setJob] = useState<bayes.maVoie.Job|null>(null)
  const [isVisible, setIsVisible] = useState(false)

  const validateButtonStyle: React.CSSProperties = {
    marginTop: 20,
    opacity: job ? 1 : 0.75,
  }

  useEffect(() => {
    setIsVisible(true)
  }, [setIsVisible])

  const onValidate = useCallback((): void => {
    if (!job) {
      return
    }
    dispatch(updateProject({job, projectId}))
    setIsVisible(false)
    setTimeout(() => history.push(getPath(['DEFINITION', 'EXPERIENCE'], t)), 350)
  }, [dispatch, history, job, projectId, setIsVisible, t])

  const onLostClick = useCallback((): void => {
    setIsVisible(false)
    setTimeout(() => history.push(getPath(['DEFINITION', 'LOST'], t)), 350)
  }, [history, setIsVisible, t])

  const layoutStyle: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transition: 'opacity 300ms',
  }

  // FIXME(émilie): Change link to redirect where it is needed.
  return <Layout header={t('Définition')} title={title} style={layoutStyle}>
    <JobSuggest
      placeholder={t('entrez votre métier')} style={inputStyle}
      onChange={setJob} value={job || undefined} />
    <Button style={validateButtonStyle} type="variable" onClick={onValidate}>{t('Valider')}</Button>
    <Button style={buttonContainerStyle} type="discret" onClick={onLostClick}>
      {t('Je ne sais pas')}
    </Button>
  </Layout>
}

export default React.memo(JobPage)
