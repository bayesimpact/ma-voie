import React, {useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import {useHistory} from 'react-router'

import {useFadeInFadeOut} from 'hooks/fade'
import {useDispatch, updateProject} from 'store/actions'
import {LocalizableOption, LocalizableString, localizeOptions} from 'store/i18n'
import {useProject, useUserId} from 'store/selections'
import {PageSegment, getPath} from 'store/url'

import {Select} from 'components/select'
import Layout from 'components/layout'

interface StepProps<K extends keyof bayes.maVoie.Project> {
  bigTitle?: LocalizableString
  projectKey: K
  title: LocalizableString
  options: readonly LocalizableOption<bayes.maVoie.Project[K]>[]
  redirect: (
    value: NonNullable<bayes.maVoie.Project[K]>,
    project: bayes.maVoie.Project,
  ) => PageSegment
}

// TODO(cyrille): Use this directly in the router.
const DefinitionStepBase = <K extends keyof bayes.maVoie.Project>
({projectKey, bigTitle, title, options, redirect}: StepProps<K>): React.ReactElement => {
  const {t, t: translate} = useTranslation()
  const dispatch = useDispatch()
  const project = useProject()
  const history = useHistory()

  const {fadeOut, style} = useFadeInFadeOut()
  const userId = useUserId()

  const onClick = useCallback((value: bayes.maVoie.Project[K]): void => {
    if (!value) {
      return
    }
    dispatch(updateProject({[projectKey]: value, userId}))
    fadeOut(() => history.push(
      getPath(['DEFINITION', redirect(value as NonNullable<bayes.maVoie.Project[K]>, project)], t)))
  }, [dispatch, fadeOut, history, project, projectKey, redirect, t, userId])

  return <Layout
    header={t('Définition')} bigTitle={bigTitle && translate(bigTitle)}
    title={translate(title)} style={style}>
    <Select options={localizeOptions(t, options)} onChange={onClick} />
  </Layout>
}

const typedMemo: <T>(c: T) => T = React.memo

export default typedMemo(DefinitionStepBase)
