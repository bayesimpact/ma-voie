import React from 'react'

import {LocalizableOption, prepareT} from 'store/i18n'

import Step from './step'

const EXPERIENCE_OPTIONS: readonly LocalizableOption<bayes.maVoie.ProjectExperience>[] = [
  {name: prepareT('Je suis novice'), value: 'new'},
  {name: prepareT('Entre 1-3 ans'), value: '1-3'},
  {name: prepareT('Entre 3-5 ans'), value: '3-5'},
  {name: prepareT('Plus de 5 ans'), value: '5'},
]

const redirect = (): 'INTEREST' => 'INTEREST'

// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const ExperiencePage = (): React.ReactElement =>
  <Step
    projectKey="experience" options={EXPERIENCE_OPTIONS} redirect={redirect}
    title={prepareT('Quelle est votre expérience pour ce métier\u00A0?')} />

export default React.memo(ExperiencePage)
