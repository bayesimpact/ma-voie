import {ConnectedRouter, connectRouter, routerMiddleware, RouterState} from 'connected-react-router'
import {History, createBrowserHistory} from 'history'
import React, {Suspense, useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {Provider} from 'react-redux'
import {useLocation} from 'react-router'
import {Switch, Redirect, Route} from 'react-router-dom'
import {Store, createStore, applyMiddleware, combineReducers} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import {logPage} from 'analytics/amplitude'
import {AllActions, RootState} from 'store/actions'
import {user} from 'store/app_reducer'
import {init as i18nInit} from 'store/i18n'
import {getPath as defineAndGetPath} from 'store/url'

import AccountPage from 'components/pages/account'
import ComponentsPage from 'components/pages/components'
import SplashPage from 'components/pages/splash'
import StepsPage from 'components/pages/steps'
import TermsPage from 'components/pages/terms'
import ExperiencePage from 'components/pages/definition/experience'
import GoPage from 'components/pages/definition/go'
import InterestPage from 'components/pages/definition/interest'
import JobPage from 'components/pages/definition/job'
import LostPage from 'components/pages/definition/lost'
import DefinitionPartnersExternalPage from 'components/pages/definition/partners_external'
import DefinitionPartnersInternalPage from 'components/pages/definition/partners_internal'
import RedefinePage from 'components/pages/definition/redefine'
import WhatPage from 'components/pages/definition/what'
import WherePage from 'components/pages/definition/where'
import SkillsGoPage from 'components/pages/skills/go'
import SkillsListPage from 'components/pages/skills/list'
import SkillsTrainingPage from 'components/pages/skills/training'

import 'styles/fonts/Lato/font.css'
import 'styles/fonts/ProximaSoft/font.css'


require('styles/app.css')

i18nInit()

const App = (): React.ReactElement => {
  const {t} = useTranslation('url')
  const {pathname} = useLocation()
  useEffect((): void => logPage(pathname), [pathname])
  // i18next-extract-mark-ns-start url
  // TODO(émilie): create a subrouter for definition / skills
  return <Switch>
    <Route path={defineAndGetPath('ACCOUNT', t)} component={AccountPage} />
    <Route path={defineAndGetPath('DEFINITION_EXPERIENCE', t)} component={ExperiencePage} />
    <Route path={defineAndGetPath('DEFINITION_GO', t)} component={GoPage} />
    <Route path={defineAndGetPath('DEFINITION_INTEREST', t)} component={InterestPage} />
    <Route path={defineAndGetPath('DEFINITION_JOB', t)} component={JobPage} />
    <Route path={defineAndGetPath('DEFINITION_LOST', t)} component={LostPage} />
    <Route
      path={defineAndGetPath('DEFINITION_PARTNERS_EXTERNAL', t)}
      component={DefinitionPartnersExternalPage} />
    <Route
      path={defineAndGetPath('DEFINITION_PARTNERS_INTERNAL', t)}
      component={DefinitionPartnersInternalPage} />
    <Route path={defineAndGetPath('DEFINITION_REDEFINE', t)} component={RedefinePage} />
    <Route path={defineAndGetPath('DEFINITION_WHAT', t)} component={WhatPage} />
    <Route path={defineAndGetPath('DEFINITION_WHERE', t)} component={WherePage} />
    <Route path={defineAndGetPath('SPLASH', t)} component={SplashPage} />
    <Route path={defineAndGetPath('STEPS', t)} component={StepsPage} />
    <Route path={defineAndGetPath('TERMS', t)} component={TermsPage} />
    <Route path={defineAndGetPath('COMPONENTS', t)} component={ComponentsPage} />
    <Route path={defineAndGetPath('SKILLS_GO', t)} component={SkillsGoPage} />
    <Route path={defineAndGetPath('SKILLS_LIST', t)} component={SkillsListPage} />
    <Route path={defineAndGetPath('SKILLS_TRAINING', t)} component={SkillsTrainingPage} />
    <Route path={defineAndGetPath('ROOT', t)}>
      <Redirect to={defineAndGetPath('SPLASH', t)} />
    </Route>
  </Switch>
  // i18next-extract-mark-ns-stop url
}
const MemoApp = React.memo(App)

interface AppState {
  history: History
  store: Store<RootState, AllActions>
}

type ReduxState = RootState & {router: RouterState<Record<string, undefined>|null|undefined>}

function createHistoryAndStore(): AppState {
  const history = createBrowserHistory()

  const finalCreateStore = composeWithDevTools(applyMiddleware(
    thunk,
    routerMiddleware(history),
  ))(createStore)

  // Create the store that will be provided to connected components via Context.
  const store = finalCreateStore<ReduxState, AllActions>(
    combineReducers({
      router: connectRouter(history),
      user,
    }),
  )
  if (module.hot) {
    module.hot.accept(['store/app_reducer'], (): void => {
      const {user: newUser} =
        require('store/app_reducer')
      store.replaceReducer(combineReducers({
        router: connectRouter(history),
        user: newUser as typeof user,
      }))
    })
  }
  return {history, store}
}
// The app that will be augmented by top level wrappers.
const WrappedApp = (): React.ReactElement => {
  const [{history, store}] = useState(createHistoryAndStore)
  // TODO(pascal): Add a scroll-up on page change.
  return <Provider store={store}>
    <ConnectedRouter history={history}>
      {/* TODO(cyrille): Add a nice waiting page. */}
      <Suspense fallback={<div />}>
        <MemoApp />
      </Suspense>
    </ConnectedRouter>
  </Provider>
}
const MemoWrappedApp = React.memo(WrappedApp)

export {MemoWrappedApp as App}
