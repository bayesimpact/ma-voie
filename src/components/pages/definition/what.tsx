import React from 'react'
import {useTranslation} from 'react-i18next'

import {prepareT} from 'store/i18n'
import {Page} from 'store/url'

import {SelectButton} from 'components/button'
import Layout from 'components/layout'

interface ButtonProps {
  name: string
  objective: 'job' | 'training'
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

  return <Layout header={t('Définition')} bigTitle={bigTitle} title={title}>
    {BUTTONS.map((props: ButtonProps) =>
      <SelectButton {...props} key={props.objective} />)}
  </Layout>
}

export default React.memo(WhatPage)
