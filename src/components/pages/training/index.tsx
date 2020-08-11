import React from 'react'
import {Switch, Redirect, Route} from 'react-router-dom'

import {useSubPathDefiner} from 'store/url'

import WhichPage from './which'

const TrainingPage = (): React.ReactElement => {
  const defineAndGetPath = useSubPathDefiner()
  // i18next-extract-mark-ns-start url
  return <Switch>
    <Route path={defineAndGetPath('WHICH')} component={WhichPage} />
    <Redirect to={defineAndGetPath('WHICH')} />
  </Switch>
  // i18next-extract-mark-ns-stop url
}

export default React.memo(TrainingPage)
