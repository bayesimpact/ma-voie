import {prepareT} from 'store/i18n'
import {Page} from 'store/url'

import competencesIcon from 'images/competences-ico.svg'
import definitionIcon from 'images/definition-ico.svg'
import entretienIcon from 'images/entretien-ico.svg'
import formationIcon from 'images/formation-ico.svg'

export interface StepInfo {
  readonly color: string
  readonly icon: string
  readonly page: Page
  readonly shortTitle?: string
  readonly stepId: bayes.maVoie.StepId
  readonly title: string
}

const Steps: readonly StepInfo[] = [
  {
    color: colors.LIGHT_TAN,
    icon: definitionIcon,
    page: ['DEFINITION'],
    shortTitle: prepareT('Définition'),
    stepId: 'definition',
    title: prepareT('Définition de votre projet'),
  },
  {
    color: colors.SILVER,
    icon: competencesIcon,
    page: ['SKILLS'],
    stepId: 'skills',
    title: prepareT('Compétences nécessaires pour votre projet'),
  },
  {
    color: colors.LIGHT_SKY_BLUE,
    icon: formationIcon,
    page: ['TRAINING'],
    shortTitle: prepareT('Formations liées à votre projet'),
    stepId: 'training',
    title: prepareT('Formations'),
  },
  {
    color: colors.LIGHT_SKY_BLUE,
    icon: entretienIcon,
    page: ['INTERVIEW'],
    shortTitle: prepareT('Entretiens'),
    stepId: 'interview',
    title: prepareT('Préparer vos entretiens'),
  },
]

export default Steps
