import React, {useCallback} from 'react'
import {useTranslation} from 'react-i18next'

import {updateProject, useDispatch} from 'store/actions'
import {prepareT} from 'store/i18n'
import {useProjectId} from 'store/selections'
import {Page} from 'store/url'

import SelectButton from 'components/select_button'
import Layout from 'components/layout'

interface ButtonProps {
  hasDefinedProject: boolean
  name: string
  page: Page
}
// TODO(cyrille): Make a <select> component with button options.
const BUTTONS: readonly ButtonProps[] = [
  {
    hasDefinedProject: true,
    name: prepareT('Je sais ce que je veux faire'),
    page: ['DEFINITION', 'WHAT'],
  },
  {
    hasDefinedProject: false,
    name: prepareT('Je ne sais pas / Je suis perdu·e'),
    page: ['DEFINITION', 'LOST'],
  },
]

// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const WherePage = (): React.ReactElement => {
  const {t} = useTranslation()
  const title = t('Où en êtes-vous de votre projet professionnel\u00A0?')

  const dispatch = useDispatch()
  const projectId = useProjectId()

  const onClick = useCallback((hasDefinedProject: boolean): void => {
    dispatch(updateProject({hasDefinedProject, projectId}))
  }, [dispatch, projectId])

  // FIXME(émilie): Delete links and change them by the good handler
  return <Layout header={t('Définition')} title={title}>
    {BUTTONS.map((props: ButtonProps, index) => <SelectButton<boolean>
      onClick={onClick} key={index}
      name={props.name} page={props.page} value={props.hasDefinedProject} />,
    )}
  </Layout>
}

export default React.memo(WherePage)
