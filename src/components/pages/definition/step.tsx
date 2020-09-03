import React, {useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import {useSelector} from 'react-redux'
import {useHistory} from 'react-router'

import {useFadeInFadeOut} from 'hooks/fade'
import {RootState} from 'store/actions'
import {LocalizableOption, LocalizableString, localizeOptions} from 'store/i18n'
import {useProject, useProjectId, useProjectUpdater} from 'store/selections'
import {PageSegment, getPath} from 'store/url'

import Select from 'components/select'
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
  const projectId = useProjectId()
  const projectUpdater = useProjectUpdater()
  const project = useProject()
  const history = useHistory()

  const {fadeOut, style} = useFadeInFadeOut()
  const uid = useSelector(({firebase: {auth: {uid}}}: RootState) => uid)

  const onClick = useCallback((value: bayes.maVoie.Project[K]): void => {
    if (!value) {
      return
    }
    projectUpdater({projectId, [projectKey]: value, uid})
    fadeOut(() => history.push(
      getPath(['DEFINITION', redirect(value as NonNullable<bayes.maVoie.Project[K]>, project)], t)))
  }, [fadeOut, history, project, projectUpdater, projectId, projectKey, redirect, t, uid])

  return <Layout
    header={t('Définition')} bigTitle={bigTitle && translate(bigTitle)}
    title={translate(title)} style={style}>
    <Select options={localizeOptions(t, options)} onChange={onClick} />
  </Layout>
}

const typedMemo: <T>(c: T) => T = React.memo

export default typedMemo(DefinitionStepBase)
