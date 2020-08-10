import React from 'react'
import {Switch, Redirect, Route} from 'react-router-dom'

import {useSubPathDefiner} from 'store/url'

import ExperiencePage from './experience'
import GoPage from './go'
import InterestPage from './interest'
import JobPage from './job'
import LostPage from './lost'
import DefinitionPartnersExternalPage from './partners_external'
import DefinitionPartnersInternalPage from './partners_internal'
import RedefinePage from './redefine'
import WhatPage from './what'
import WherePage from './where'

const DefinitionPage = (): React.ReactElement => {
  const defineAndGetPath = useSubPathDefiner()
  // i18next-extract-mark-ns-start url
  return <Switch>
    <Route path={defineAndGetPath('EXPERIENCE')} component={ExperiencePage} />
    <Route path={defineAndGetPath('GO')} component={GoPage} />
    <Route path={defineAndGetPath('INTEREST')} component={InterestPage} />
    <Route path={defineAndGetPath('JOB')} component={JobPage} />
    <Route path={defineAndGetPath('LOST')} component={LostPage} />
    <Route
      path={defineAndGetPath('PARTNERS_EXTERNAL')}
      component={DefinitionPartnersExternalPage} />
    <Route
      path={defineAndGetPath('PARTNERS_INTERNAL')}
      component={DefinitionPartnersInternalPage} />
    <Route path={defineAndGetPath('REDEFINE')} component={RedefinePage} />
    <Route path={defineAndGetPath('WHAT')} component={WhatPage} />
    <Route path={defineAndGetPath('WHERE')} component={WherePage} />
    <Redirect to={defineAndGetPath('WHAT')} />
  </Switch>
  // i18next-extract-mark-ns-stop url
}

export default React.memo(DefinitionPage)
