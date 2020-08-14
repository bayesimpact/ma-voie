import React, {useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import {useHistory} from 'react-router'

import {updateProject, useDispatch} from 'store/actions'
import {LocalizableOption, LocalizableString, localizeOptions} from 'store/i18n'
import {useProjectId} from 'store/selections'
import {PageSegment, getPath} from 'store/url'

import Select from 'components/select'
import Layout from 'components/layout'

interface StepProps<K extends keyof bayes.maVoie.Project> {
  projectKey: K
  title: LocalizableString
  options: readonly LocalizableOption<bayes.maVoie.Project[K]>[]
  redirect: (value: bayes.maVoie.Project[K]) => PageSegment
}

// TODO(cyrille): Use this directly in the router.
const DefinitionStepBase = <K extends keyof bayes.maVoie.Project>
({projectKey, title, options, redirect}: StepProps<K>): React.ReactElement => {
  const {t, t: translate} = useTranslation()
  const dispatch = useDispatch()
  const projectId = useProjectId()
  const history = useHistory()

  const onClick = useCallback((value: bayes.maVoie.Project[K]): void => {
    dispatch(updateProject({projectId, [projectKey]: value}))
    history.push((getPath(['DEFINITION', redirect(value)], t)))
  }, [dispatch, history, projectId, projectKey, redirect, t])

  return <Layout header={t('Définition')} title={translate(title)}>
    <Select options={localizeOptions(t, options)} onChange={onClick} />
  </Layout>
}

const typedMemo: <T>(c: T) => T = React.memo

export default typedMemo(DefinitionStepBase)
