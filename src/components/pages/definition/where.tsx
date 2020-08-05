import React from 'react'
import {useTranslation} from 'react-i18next'

import {prepareT} from 'store/i18n'
import {Page} from 'store/url'

import {SelectButton} from 'components/button'
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
    page: 'DEFINITION_WHAT',
  },
  {
    hasDefinedProject: false,
    name: prepareT('Je ne sais pas / Je suis perdu·e'),
    page: 'DEFINITION_LOST',
  },
]

// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const WherePage = (): React.ReactElement => {
  const {t} = useTranslation()
  const title = t('Où en êtes-vous de votre projet professionnel\u00A0?')

  // FIXME(émilie): Delete links and change them by the good handler
  return <Layout header={t('Définition')} title={title}>
    {BUTTONS.map((props: ButtonProps) =>
      <SelectButton {...props} key={props.page} />)}
  </Layout>
}

export default React.memo(WherePage)
