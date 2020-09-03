import React, {useCallback, useState} from 'react'
import {useTranslation} from 'react-i18next'

import FadingLink, {useFadeInFadeOut} from 'hooks/fade'
import {useProjectUpdater} from 'store/selections'
import {Page} from 'store/url'

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
  lineHeight: 24,
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
  const {t} = useTranslation()
  const title = t('Pour quel métier souhaitez-vous retrouver un poste\u00A0?')
  const projectUpdater = useProjectUpdater()
  const [job, setJob] = useState<bayes.maVoie.Job|null>(null)
  const {fadeTo, style} = useFadeInFadeOut()

  const validateButtonStyle: React.CSSProperties = {
    marginTop: 20,
    opacity: job ? 1 : 0.75,
  }

  const onValidate = useCallback((): void => {
    if (!job) {
      return
    }
    projectUpdater({job})
    fadeTo(['DEFINITION', 'EXPERIENCE'])
  }, [fadeTo, job, projectUpdater])

  return <Layout header={t('Définition')} title={title} style={style}>
    <JobSuggest
      placeholder={t('entrez votre métier')} style={inputStyle}
      onChange={setJob} value={job || undefined} />
    <Button style={validateButtonStyle} type="variable" onClick={onValidate}>{t('Valider')}</Button>
    <FadingLink fadeTo={fadeTo} to={lostPage} style={linkStyle}>
      <Button style={buttonContainerStyle} type="discreet">
        {t('Je ne sais pas')}
      </Button>
    </FadingLink>
  </Layout>
}

export default React.memo(JobPage)
