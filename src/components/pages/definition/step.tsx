import React, {useCallback, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useHistory} from 'react-router'

import {updateProject, useDispatch} from 'store/actions'
import {LocalizableOption, LocalizableString, localizeOptions} from 'store/i18n'
import {useProjectId} from 'store/selections'
import {PageSegment, getPath} from 'store/url'

import Select from 'components/select'
import Layout from 'components/layout'

interface StepProps<K extends keyof bayes.maVoie.Project> {
  bigTitle?: LocalizableString
  projectKey: K
  title: LocalizableString
  options: readonly LocalizableOption<bayes.maVoie.Project[K]>[]
  redirect: (value: NonNullable<bayes.maVoie.Project[K]>) => PageSegment
}

// TODO(cyrille): Use this directly in the router.
const DefinitionStepBase = <K extends keyof bayes.maVoie.Project>
({projectKey, bigTitle, title, options, redirect}: StepProps<K>): React.ReactElement => {
  const {t, t: translate} = useTranslation()
  const dispatch = useDispatch()
  const projectId = useProjectId()
  const history = useHistory()

  const [opacity, setOpacity] = useState<boolean>(true)

  const onClick = useCallback((value: bayes.maVoie.Project[K]): void => {
    if (!value) {
      return
    }
    dispatch(updateProject({projectId, [projectKey]: value}))
    setOpacity(false)
    setTimeout(() => history.push(
      getPath(['DEFINITION', redirect(value as NonNullable<bayes.maVoie.Project[K]>)], t)), 500)
  }, [dispatch, history, projectId, projectKey, redirect, t])

  const layoutStyle: React.CSSProperties = {
    opacity: opacity ? 1 : 0,
  }

  return <Layout
    header={t('Définition')} bigTitle={bigTitle && translate(bigTitle)}
    title={translate(title)} style={layoutStyle}>
    <Select options={localizeOptions(t, options)} onChange={onClick} />
  </Layout>
}

const typedMemo: <T>(c: T) => T = React.memo

export default typedMemo(DefinitionStepBase)
