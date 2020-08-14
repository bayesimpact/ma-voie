import React, {useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import {useHistory} from 'react-router'

import {updateProject, useDispatch} from 'store/actions'
import {LocalizableOption, localizeOptions, prepareT} from 'store/i18n'
import {useProjectId} from 'store/selections'
import {getPath} from 'store/url'

import Select from 'components/select'
import Layout from 'components/layout'

const OBJECTIVE_OPTIONS: readonly LocalizableOption<bayes.maVoie.ProjectObjective>[] = [
  {
    name: prepareT('Retrouver un poste'),
    value: 'job',
  },
  {
    name: prepareT('Me former'),
    value: 'training',
  },
]

// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const WhatPage = (): React.ReactElement => {
  const {t} = useTranslation()
  const bigTitle = t('Super\u00A0!')
  const title = t('Quel est votre projet\u00A0?')

  const dispatch = useDispatch()
  const projectId = useProjectId()
  const history = useHistory()

  const onClick = useCallback((objective: bayes.maVoie.ProjectObjective): void => {
    dispatch(updateProject({objective, projectId}))
    history.push(getPath(['DEFINITION', objective === 'job' ? 'JOB' : 'LOST'], t))
  }, [dispatch, history, projectId, t])


  return <Layout header={t('Définition')} bigTitle={bigTitle} title={title}>
    <Select options={localizeOptions(t, OBJECTIVE_OPTIONS)} onChange={onClick} />
  </Layout>
}

export default React.memo(WhatPage)
