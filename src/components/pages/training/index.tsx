import React from 'react'
import {Switch, Redirect, Route} from 'react-router-dom'

import {useCertifiedSteps} from 'store/selections'
import {useSubPathDefiner} from 'store/url'

import WhichPage from './which'

const TrainingPage = (): React.ReactElement => {
  const defineAndGetPath = useSubPathDefiner()
  const steps = useCertifiedSteps()
  // i18next-extract-mark-ns-start url
  return <Switch>
    <Route path={defineAndGetPath('WHICH')} component={WhichPage} />
    {steps?.training?.selectedPartnerId && !steps?.training?.completed &&
      <Redirect to={defineAndGetPath('PARTNERS_INTERNAL')} />}
    {steps?.training?.selectedPartnerId && steps?.training?.completed &&
      <Redirect to={defineAndGetPath('STEPS')} />}
    <Redirect to={defineAndGetPath('WHICH')} />
  </Switch>
  // i18next-extract-mark-ns-stop url
}

export default React.memo(TrainingPage)
