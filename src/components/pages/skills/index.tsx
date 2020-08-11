import React from 'react'
import {Switch, Redirect, Route} from 'react-router-dom'

import {useSubPathDefiner} from 'store/url'

import GoPage from './go'
import ListPage from './list'
import TrainingPage from './training'

const SkillsPage = (): React.ReactElement => {
  const defineAndGetPath = useSubPathDefiner()
  // i18next-extract-mark-ns-start url
  return <Switch>
    <Route path={defineAndGetPath('GO')} component={GoPage} />
    <Route path={defineAndGetPath('LIST')} component={ListPage} />
    <Route path={defineAndGetPath('TRAINING')} component={TrainingPage} />
    <Redirect to={defineAndGetPath('LIST')} />
  </Switch>
  // i18next-extract-mark-ns-stop url
}

export default React.memo(SkillsPage)
