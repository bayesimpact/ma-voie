import React from 'react'

import {LocalizableOption, prepareT} from 'store/i18n'
import {PageSegment} from 'store/url'

import Step from './step'

const INTEREST_OPTIONS: readonly LocalizableOption<bayes.maVoie.ProjectInterest>[] = [
  {name: prepareT('Passionnant'), value: 'exciting'},
  {name: prepareT('Intéressant'), value: 'interesting'},
  {name: prepareT('Un métier comme un autre'), value: 'indifferent'},
]

const redirect = (value: bayes.maVoie.ProjectInterest): PageSegment =>
  value === 'indifferent' ? 'REDEFINE' : 'GO'

// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const InterestPage = (): React.ReactElement => <Step
  title={prepareT('Pour vous ce métier est\u00A0:')}
  projectKey="interest" redirect={redirect} options={INTEREST_OPTIONS} />

export default React.memo(InterestPage)
