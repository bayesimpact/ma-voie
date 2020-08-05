import React from 'react'
import {useTranslation} from 'react-i18next'

import {prepareT} from 'store/i18n'
import {Page} from 'store/url'

import {SelectButton} from 'components/button'
import Layout from 'components/layout'

interface ButtonProps {
  experience: 'new' | '1-3' | '3-5' | '5'
  name: string
  page: Page
}
// TODO(cyrille): Make a <select> component with button options.
const BUTTONS: readonly ButtonProps[] = [
  {
    experience: 'new',
    name: prepareT('Je suis novice'),
    page: 'DEFINITION_INTEREST',
  },
  {
    experience: '1-3',
    name: prepareT('Entre 1-3 ans'),
    page: 'DEFINITION_INTEREST',
  },
  {
    experience: '3-5',
    name: prepareT('Entre 3-5 ans'),
    page: 'DEFINITION_INTEREST',
  },
  {
    experience: '5',
    name: prepareT('Plus de 5 ans'),
    page: 'DEFINITION_INTEREST',
  },
]


// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const ExperiencePage = (): React.ReactElement => {
  const {t} = useTranslation()
  const title = t('Quelle est votre expérience pour ce métier\u00A0?')

  return <Layout header={t('Définition')} title={title}>
    {BUTTONS.map((props: ButtonProps) => <SelectButton {...props} key={props.experience} />)}
  </Layout>
}

export default React.memo(ExperiencePage)
