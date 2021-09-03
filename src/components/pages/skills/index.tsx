import React from 'react'
import {useTranslation} from 'react-i18next'
import {Switch, Redirect, Route} from 'react-router-dom'

import {useCertifiedSteps} from 'store/selections'
import {getPath, useSubPathDefiner} from 'store/url'

import GoPage from './go'
import ListPage from './list'
import TrainingPage from './training'

const SkillsPage = (): React.ReactElement => {
  const defineAndGetPath = useSubPathDefiner()
  const {t} = useTranslation()
  const {skills: {completed = false, selectedPartnerId = null} = {}} = useCertifiedSteps()
  // i18next-extract-mark-ns-start url
  return <Switch>
    {selectedPartnerId && completed ? <Redirect to={getPath(['STEPS'], t)} /> : null}
    <Route path={defineAndGetPath('GO')} component={GoPage} />
    <Route path={defineAndGetPath('LIST')} component={ListPage} />
    <Route path={defineAndGetPath('TRAINING')} component={TrainingPage} />
    <Redirect to={defineAndGetPath('JOB')} />
  </Switch>
  // i18next-extract-mark-ns-stop url
}

export default React.memo(SkillsPage)
