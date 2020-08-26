import {prepareT} from 'store/i18n'
import {Page} from 'store/url'

import competencesIcon from 'images/competences-ico.svg'
import definitionIcon from 'images/definition-ico.svg'
import formationIcon from 'images/formation-ico.svg'

export interface StepInfo {
  readonly color: string
  readonly icon: string
  readonly isOpen?: boolean
  readonly isLastStep?: boolean
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
    title: prepareT('Compétences'),
  },
  {
    color: colors.LIGHT_SKY_BLUE,
    icon: formationIcon,
    page: ['TRAINING'],
    shortTitle: prepareT('Formation'),
    stepId: 'training',
    title: prepareT('Formations'),
  },
  {
    color: colors.LIGHT_SKY_BLUE,
    icon: formationIcon, // TODO(émilie): Update when known
    isLastStep: true,
    page: ['TRAINING'], // TODO(émilie): Updated when done
    shortTitle: prepareT('Entretiens'),
    stepId: 'interview',
    title: prepareT('Préparer un entretien'),
  },
]

export default Steps
