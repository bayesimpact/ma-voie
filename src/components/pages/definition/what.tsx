import React from 'react'
import {useTranslation} from 'react-i18next'
import {Redirect} from 'react-router-dom'

import {LocalizableOption, prepareT} from 'store/i18n'
import {useCertifiedSteps} from 'store/selections'
import {PageSegment, getPath} from 'store/url'

import Step from './step'

const OBJECTIVE_OPTIONS: readonly LocalizableOption<bayes.maVoie.ProjectObjective>[] = [
  {name: prepareT('Retrouver un poste'), value: 'job'},
  {name: prepareT('Me former'), value: 'training'},
]

const redirect = (objective: bayes.maVoie.ProjectObjective): PageSegment =>
  objective === 'job' ? 'JOB' : 'LOST'


// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const WhatPage = (): React.ReactElement => {

  const {t} = useTranslation()
  const steps = useCertifiedSteps()
  if (steps?.definition?.selectedPartnerId && !steps?.definition?.completed) {
    return <Redirect to={getPath(['DEFINITION', 'PARTNERS_INTERNAL'], t)} />
  }

  return <Step
  projectKey="objective" options={OBJECTIVE_OPTIONS} redirect={redirect}
  title={prepareT(('Quel est votre projet\u00A0?'))} bigTitle={prepareT('Super\u00A0!')} />
}

export default React.memo(WhatPage)
