import React from 'react'
import {useTranslation} from 'react-i18next'

import Header from 'components/header'
import Step from 'components/step'
// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const StepsPage = (): React.ReactElement => {
  const {t} = useTranslation()
  // TODO(cyrille): Add step 4.
  return <div>
    <Header />
    <Step isOpen={true}>{t('Définition de votre projet')}</Step>
    <Step>{t('Compétences')}</Step>
    <Step>{t('Formations')}</Step>
  </div>
}

export default React.memo(StepsPage)
