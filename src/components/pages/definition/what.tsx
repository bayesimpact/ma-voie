import React from 'react'

import {LocalizableOption, prepareT} from 'store/i18n'
import {PageSegment} from 'store/url'

import Step from './step'

const OBJECTIVE_OPTIONS: readonly LocalizableOption<bayes.maVoie.ProjectObjective>[] = [
  {name: prepareT('Retrouver un poste'), value: 'job'},
  {name: prepareT('Me former'), value: 'training'},
]

const redirect = (objective: bayes.maVoie.ProjectObjective): PageSegment =>
  objective === 'job' ? 'JOB' : 'LOST'


// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const WhatPage = (): React.ReactElement => <Step
  projectKey="objective" options={OBJECTIVE_OPTIONS} redirect={redirect}
  title={prepareT(('Quel est votre projet\u00A0?'))} bigTitle={prepareT('Super\u00A0!')} />

export default React.memo(WhatPage)
