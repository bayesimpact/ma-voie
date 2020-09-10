import React from 'react'
import {Switch, Redirect, Route} from 'react-router-dom'

import {useCertifiedSteps} from 'store/selections'
import {useSubPathDefiner} from 'store/url'

import ExperiencePage from './experience'
import GoPage from './go'
import InterestPage from './interest'
import LostPage from './lost'
import RedefinePage from './redefine'
import WhatPage from './what'
import WherePage from './where'

const DefinitionPage = (): React.ReactElement => {
  const defineAndGetPath = useSubPathDefiner()
  const steps = useCertifiedSteps()
  // i18next-extract-mark-ns-start url
  return <Switch>
    <Route path={defineAndGetPath('EXPERIENCE')} component={ExperiencePage} />
    <Route path={defineAndGetPath('GO')} component={GoPage} />
    <Route path={defineAndGetPath('INTEREST')} component={InterestPage} />
    <Route path={defineAndGetPath('LOST')} component={LostPage} />
    <Route path={defineAndGetPath('REDEFINE')} component={RedefinePage} />
    <Route path={defineAndGetPath('WHAT')} component={WhatPage} />
    <Route path={defineAndGetPath('WHERE')} component={WherePage} />
    {steps?.definition?.selectedPartnerId && !steps?.definition?.completed &&
      <Redirect to={defineAndGetPath('PARTNERS_INTERNAL')} />}
    {steps?.definition?.selectedPartnerId && steps?.definition?.completed &&
      <Redirect to={defineAndGetPath('STEPS')} />}
    <Redirect to={defineAndGetPath('WHAT')} />
  </Switch>
  // i18next-extract-mark-ns-stop url
}

export default React.memo(DefinitionPage)
