import React, {useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import {useHistory} from 'react-router'

import {updateProject, useDispatch} from 'store/actions'
import {LocalizableOption, localizeOptions, prepareT} from 'store/i18n'
import {useProjectId} from 'store/selections'
import {getPath} from 'store/url'

import Select from 'components/select'
import Layout from 'components/layout'

const EXPERIENCE_OPTIONS: readonly LocalizableOption<bayes.maVoie.ProjectExperience>[] = [
  {
    name: prepareT('Je suis novice'),
    value: 'new',
  },
  {
    name: prepareT('Entre 1-3 ans'),
    value: '1-3',
  },
  {
    name: prepareT('Entre 3-5 ans'),
    value: '3-5',
  },
  {
    name: prepareT('Plus de 5 ans'),
    value: '5',
  },
]

// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const ExperiencePage = (): React.ReactElement => {
  const {t} = useTranslation()
  const title = t('Quelle est votre expérience pour ce métier\u00A0?')

  const dispatch = useDispatch()
  const projectId = useProjectId()
  const history = useHistory()

  const onClick = useCallback((value: bayes.maVoie.ProjectExperience): void => {
    dispatch(updateProject({experience: value, projectId}))
    history.push(getPath(['DEFINITION', 'INTEREST'], t))
  }, [dispatch, history, projectId, t])

  return <Layout header={t('Définition')} title={title}>
    <Select<bayes.maVoie.ProjectExperience>
      onChange={onClick} options={localizeOptions(t, EXPERIENCE_OPTIONS)} />
  </Layout>
}

export default React.memo(ExperiencePage)
