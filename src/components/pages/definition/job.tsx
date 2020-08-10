import React, {useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import {useHistory} from 'react-router'
import {Link} from 'react-router-dom'

import {updateProject, useDispatch} from 'store/actions'
import {useProjectId} from 'store/selections'
import {getPath} from 'store/url'

import Button from 'components/button'
import JobSuggest from 'components/job_suggest'
import Layout from 'components/layout'

const linkStyle: React.CSSProperties = {
  textDecoration: 'none',
}
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
  paddingTop: 20,
}


// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const JobPage = (): React.ReactElement => {
  const {t} = useTranslation()
  const title = t('Pour quel métier souhaitez-vous retrouver un poste\u00A0?')
  const projectId = useProjectId()
  const dispatch = useDispatch()
  const history = useHistory()
  const onSelect = useCallback((job: bayes.maVoie.Job|null): void => {
    if (!job) {
      return
    }
    dispatch(updateProject({job, projectId}))
    history.push(getPath(['DEFINITION', 'EXPERIENCE'], t))
  }, [dispatch, history, projectId, t])

  // FIXME(émilie): Change link to redirect where it is needed.
  return <Layout header={t('Définition')} title={title}>
    <JobSuggest
      placeholder={t('entrez votre métier')} style={inputStyle}
      onChange={onSelect} />
    <div style={buttonContainerStyle}>
      <Link to={getPath(['DEFINITION', 'LOST'], t)} style={linkStyle}>
        <Button type="discret">{t('Je ne sais pas')}</Button>
      </Link>
    </div>
  </Layout>
}

export default React.memo(JobPage)
