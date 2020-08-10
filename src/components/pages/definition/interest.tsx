import React, {useCallback} from 'react'
import {useTranslation} from 'react-i18next'

import {updateProject, useDispatch} from 'store/actions'
import {prepareT} from 'store/i18n'
import {useProjectId} from 'store/selections'
import {Page} from 'store/url'

import SelectButton from 'components/select_button'
import Layout from 'components/layout'

interface ButtonProps {
  interest: bayes.maVoie.ProjectInterest
  name: string
  page: Page
}
// TODO(cyrille): Make a <select> component with button options.
const BUTTONS: readonly ButtonProps[] = [
  {
    interest: 'exciting',
    name: prepareT('Passionnant'),
    page: 'DEFINITION_GO',
  },
  {
    interest: 'interesting',
    name: prepareT('Intéressant'),
    page: 'DEFINITION_GO',
  },
  {
    interest: 'indifferent',
    name: prepareT('Un métier comme un autre'),
    page: 'DEFINITION_REDEFINE',
  },
]

// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const InterestPage = (): React.ReactElement => {
  const {t} = useTranslation()
  const title = t('Pour vous ce métier est\u00A0:')

  const dispatch = useDispatch()
  const projectId = useProjectId()

  const onClick = useCallback((value: bayes.maVoie.ProjectInterest): void => {
    dispatch(updateProject({interest: value, projectId}))
  }, [dispatch, projectId])

  return <Layout header={t('Définition')} title={title}>
    {BUTTONS.map((props: ButtonProps) => <SelectButton<bayes.maVoie.ProjectInterest>
      onClick={onClick} value={props.interest} key={props.interest}
      name={props.name} page={props.page} />,
    )}
  </Layout>
}

export default React.memo(InterestPage)
