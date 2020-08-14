import React, {useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import {useHistory} from 'react-router'

import {updateProject, useDispatch} from 'store/actions'
import {LocalizableOption, localizeOptions, prepareT} from 'store/i18n'
import {useProjectId} from 'store/selections'
import {getPath} from 'store/url'

import Select from 'components/select'
import Layout from 'components/layout'

const DEFINED_PROJECT_OPTIONS: readonly LocalizableOption<boolean>[] = [
  {
    name: prepareT('Je sais ce que je veux faire'),
    value: true,
  },
  {
    name: prepareT('Je ne sais pas / Je suis perdu·e'),
    value: false,
  },
]

// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const WherePage = (): React.ReactElement => {
  const {t} = useTranslation()
  const title = t('Où en êtes-vous de votre projet professionnel\u00A0?')

  const dispatch = useDispatch()
  const projectId = useProjectId()
  const history = useHistory()

  const onClick = useCallback((hasDefinedProject: boolean): void => {
    dispatch(updateProject({hasDefinedProject, projectId}))
    history.push((getPath(['DEFINITION', hasDefinedProject ? 'WHAT' : 'LOST'], t)))
  }, [dispatch, projectId, history, t])

  // TODO(cyrille): Make a `DefinitionStep` component to DRY most of the behavior.
  return <Layout header={t('Définition')} title={title}>
    <Select options={localizeOptions(t, DEFINED_PROJECT_OPTIONS)} onChange={onClick} />
  </Layout>
}

export default React.memo(WherePage)
