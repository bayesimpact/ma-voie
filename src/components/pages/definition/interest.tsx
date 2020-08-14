import React, {useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import {useHistory} from 'react-router'

import {updateProject, useDispatch} from 'store/actions'
import {LocalizableOption, localizeOptions, prepareT} from 'store/i18n'
import {useProjectId} from 'store/selections'
import {getPath} from 'store/url'

import Select from 'components/select'
import Layout from 'components/layout'

const INTEREST_OPTIONS: readonly LocalizableOption<bayes.maVoie.ProjectInterest>[] = [
  {
    name: prepareT('Passionnant'),
    value: 'exciting',
  },
  {
    name: prepareT('Intéressant'),
    value: 'interesting',
  },
  {
    name: prepareT('Un métier comme un autre'),
    value: 'indifferent',
  },
]

// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const InterestPage = (): React.ReactElement => {
  const {t} = useTranslation()
  const title = t('Pour vous ce métier est\u00A0:')

  const dispatch = useDispatch()
  const projectId = useProjectId()
  const history = useHistory()

  const onClick = useCallback((value: bayes.maVoie.ProjectInterest): void => {
    dispatch(updateProject({interest: value, projectId}))
    // TODO(cyrille): Redirect to another page if experience is <2 and there's some interest.
    history.push(getPath(['DEFINITION', value === 'indifferent' ? 'REDEFINE' : 'GO'], t))
  }, [dispatch, history, projectId, t])

  return <Layout header={t('Définition')} title={title}>
    <Select options={localizeOptions(t, INTEREST_OPTIONS)} onChange={onClick} />
  </Layout>
}

export default React.memo(InterestPage)
