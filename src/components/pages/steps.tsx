import ArrowDownIcon from 'mdi-react/ArrowDownIcon'
import React from 'react'
import {useTranslation} from 'react-i18next'

import {prepareT} from 'store/i18n'

import Header from 'components/header'
import Step from 'components/step'
import competencesIcon from 'images/competences-ico.svg'
import definitionIcon from 'images/definition-ico.svg'
import formationIcon from 'images/formation-ico.svg'

const STEPS = [
  {
    color: colors.LIGHT_TAN,
    icon: definitionIcon,
    isOpen: true,
    title: prepareT('Définition de votre projet'),
  },
  {
    color: colors.SILVER,
    icon: competencesIcon,
    title: prepareT('Compétences'),
  },
  {
    color: colors.LIGHT_SKY_BLUE,
    icon: formationIcon,
    title: prepareT('Formations'),
  },
] as const
const stepsStyle: React.CSSProperties = {
  fontFamily: 'ProximaSoft',
  padding: 30,
}
const arrowStyle: React.CSSProperties = {
  display: 'block',
  margin: '30px auto',
}
// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const StepsPage = (): React.ReactElement => {
  const [translate] = useTranslation()
  // TODO(cyrille): Add step 4.
  return <React.Fragment>
    <Header />
    <div style={stepsStyle}>
      {STEPS.map(({title, ...step}, index) => <React.Fragment key={index}>
        {index ? <ArrowDownIcon style={arrowStyle} color={colors.SILVER_THREE} /> : null}
        <Step index={index + 1} {...step}>{translate(title)}</Step>
      </React.Fragment>)}
    </div>
  </React.Fragment>
}

export default React.memo(StepsPage)
