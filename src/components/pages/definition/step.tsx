import React, {useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import {useSelector} from 'react-redux'
import {useFirestore} from 'react-redux-firebase'
import {useHistory} from 'react-router'

import {useFadeInFadeOut} from 'hooks/fade'
import {RootState} from 'store/actions'
import {LocalizableOption, LocalizableString, localizeOptions} from 'store/i18n'
import {useProjectDocRefConfig, useProject, useProjectId} from 'store/selections'
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
  const projectDocRefConfig = useProjectDocRefConfig()
  const project = useProject()
  const history = useHistory()
  const firestore = useFirestore()

  const {fadeOut, style} = useFadeInFadeOut()
  const uid = useSelector(({firebase: {auth: {uid}}}: RootState) => uid)

  const onClick = useCallback((value: bayes.maVoie.Project[K]): void => {
    if (!value) {
      return
    }

    firestore.update(projectDocRefConfig, {projectId, [projectKey]: value, uid}).
      catch(() => {
        firestore.set(projectDocRefConfig, {projectId, [projectKey]: value, uid})
      })
    fadeOut(() => history.push(
      getPath(['DEFINITION', redirect(value as NonNullable<bayes.maVoie.Project[K]>, project)], t)))
  }, [
    firestore, fadeOut, history, project,
    projectDocRefConfig, projectId, projectKey, redirect, t, uid,
  ])

  return <Layout
    header={t('Définition')} bigTitle={bigTitle && translate(bigTitle)}
    title={translate(title)} style={style}>
    <Select options={localizeOptions(t, options)} onChange={onClick} />
  </Layout>
}

const typedMemo: <T>(c: T) => T = React.memo

export default typedMemo(DefinitionStepBase)
