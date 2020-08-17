import React from 'react'

import {LocalizableOption, prepareT} from 'store/i18n'
import {PageSegment} from 'store/url'

import Step from './step'

const DEFINED_PROJECT_OPTIONS: readonly LocalizableOption<boolean>[] = [
  {name: prepareT('Je sais ce que je veux faire'), value: true},
  {name: prepareT('Je ne sais pas / Je suis perdu·e'), value: false},
]

const redirect = (hasDefinedProject: boolean): PageSegment => hasDefinedProject ? 'WHAT' : 'LOST'

// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const WherePage = (): React.ReactElement => <Step
  title={prepareT('Où en êtes-vous de votre projet professionnel\u00A0?')}
  options={DEFINED_PROJECT_OPTIONS} redirect={redirect} projectKey="hasDefinedProject" />

export default React.memo(WherePage)
