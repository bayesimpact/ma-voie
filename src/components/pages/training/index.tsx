import React from 'react'
import {useTranslation} from 'react-i18next'
import {Switch, Redirect, Route} from 'react-router-dom'

import {useCertifiedSteps} from 'store/selections'
import {getPath, useSubPathDefiner} from 'store/url'

import WhichPage from './which'

const TrainingPage = (): React.ReactElement => {
  const defineAndGetPath = useSubPathDefiner()
  const {t} = useTranslation()
  const {training: {completed = false, selectedPartnerId = null} = {}} = useCertifiedSteps()
  // i18next-extract-mark-ns-start url
  return <Switch>
    {selectedPartnerId && completed ? <Redirect to={getPath(['STEPS'], t)} /> : null}
    <Route path={defineAndGetPath('WHICH')} component={WhichPage} />
    <Redirect to={defineAndGetPath('WHICH')} />
  </Switch>
  // i18next-extract-mark-ns-stop url
}

export default React.memo(TrainingPage)
