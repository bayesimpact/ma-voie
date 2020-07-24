import React from 'react'
import {useTranslation} from 'react-i18next'

import Header from 'components/header'
import Step from 'components/step'
import competencesIcon from 'images/competences-ico.svg'
import definitionIcon from 'images/definition-ico.svg'
import formationIcon from 'images/formation-ico.svg'

// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const StepsPage = (): React.ReactElement => {
  const {t} = useTranslation()
  // TODO(cyrille): Add header.
  // TODO(cyrille): Add outer style to steps.
  // TODO(cyrille): Add step 4.
  return <div style={{fontFamily: 'ProximaSoft'}}>
    <Header />
    <Step color={colors.LIGHT_TAN} icon={definitionIcon} isOpen={true} index={1}>
      {t('Définition de votre projet')}
    </Step>
    <Step color={colors.SILVER} icon={competencesIcon} index={2}>{t('Compétences')}</Step>
    <Step color={colors.LIGHT_SKY_BLUE} icon={formationIcon} index={3}>{t('Formations')}</Step>
  </div>
}

export default React.memo(StepsPage)
