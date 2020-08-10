import React from 'react'
import {Switch, Redirect, Route} from 'react-router-dom'

import {useSubPathDefiner} from 'store/url'

import PartnersInternalPage from './partners_internal'
import PartnersExternalPage from './partners_external'
import WhichPage from './which'

const DefinitionPage = (): React.ReactElement => {
  const defineAndGetPath = useSubPathDefiner()
  // i18next-extract-mark-ns-start url
  return <Switch>
    <Route path={defineAndGetPath('WHICH')} component={WhichPage} />
    <Route
      path={defineAndGetPath('PARTNERS_EXTERNAL')}
      component={PartnersExternalPage} />
    <Route
      path={defineAndGetPath('PARTNERS_INTERNAL')}
      component={PartnersInternalPage} />
    <Redirect to={defineAndGetPath('WHICH')} />
  </Switch>
  // i18next-extract-mark-ns-stop url
}

export default React.memo(DefinitionPage)
