import React, {useCallback} from 'react'
import {useTranslation} from 'react-i18next'

import {updateProject, useDispatch} from 'store/actions'
import {prepareT} from 'store/i18n'
import {useProjectId} from 'store/selections'
import {Page} from 'store/url'

import SelectButton from 'components/select_button'
import Layout from 'components/layout'

interface ButtonProps {
  name: string
  objective: bayes.maVoie.ProjectObjective
  page: Page
}
// TODO(cyrille): Make a <select> component with button options.
const BUTTONS: readonly ButtonProps[] = [
  {
    name: prepareT('Retrouver un poste'),
    objective: 'job',
    page: 'DEFINITION_JOB',
  },
  {
    name: prepareT('Me former'),
    objective: 'training',
    page: 'DEFINITION_LOST',
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

  const onClick = useCallback((objective: bayes.maVoie.ProjectObjective): void => {
    dispatch(updateProject({objective, projectId}))
  }, [dispatch, projectId])


  return <Layout header={t('Définition')} bigTitle={bigTitle} title={title}>
    {BUTTONS.map((props: ButtonProps) => <SelectButton
      onClick={onClick} key={props.objective}
      name={props.name} page={props.page} value={props.objective} />,
    )}
  </Layout>
}

export default React.memo(WhatPage)
