import {ConnectedRouter, connectRouter, routerMiddleware, RouterState} from 'connected-react-router'
import {History, createBrowserHistory} from 'history'
import React, {Suspense, useEffect, useState} from 'react'
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
import {useSubPathDefiner} from 'store/url'

import AccountPage from 'components/pages/account'
import ComponentsPage from 'components/pages/components'
import DefinitionPage from 'components/pages/definition'
import SplashPage from 'components/pages/splash'
import StepsPage from 'components/pages/steps'
import TermsPage from 'components/pages/terms'
import MenuPage from 'components/pages/menu'
import SkillsGoPage from 'components/pages/skills/go'
import SkillsListPage from 'components/pages/skills/list'
import SkillsTrainingPage from 'components/pages/skills/training'
import TrainingWhichPage from 'components/pages/training/which'
import TrainingPartnersExternalPage from 'components/pages/training/partners_external'
import TrainingPartnersInternalPage from 'components/pages/training/partners_internal'

import 'styles/fonts/Lato/font.css'
import 'styles/fonts/ProximaSoft/font.css'


require('styles/app.css')

i18nInit()

const App = (): React.ReactElement => {
  const {pathname} = useLocation()
  const defineAndGetPath = useSubPathDefiner()
  useEffect((): void => logPage(pathname), [pathname])
  // i18next-extract-mark-ns-start url
  // TODO(émilie): create a subrouter for skills.
  return <Switch>
    <Route path={defineAndGetPath('ACCOUNT')} component={AccountPage} />
    <Route path={defineAndGetPath('DEFINITION')} component={DefinitionPage} />
    <Route path={defineAndGetPath('MENU')} component={MenuPage} />
    <Route path={defineAndGetPath('SPLASH')} component={SplashPage} />
    <Route path={defineAndGetPath('STEPS')} component={StepsPage} />
    <Route path={defineAndGetPath('TERMS')} component={TermsPage} />
    <Route path={defineAndGetPath('COMPONENTS')} component={ComponentsPage} />
    <Route path={defineAndGetPath('SKILLS_GO')} component={SkillsGoPage} />
    <Route path={defineAndGetPath('SKILLS_LIST')} component={SkillsListPage} />
    <Route path={defineAndGetPath('SKILLS_TRAINING')} component={SkillsTrainingPage} />
    <Route path={defineAndGetPath('TRAINING_WHAT')} component={TrainingWhichPage} />
    <Route
      path={defineAndGetPath('TRAINING_PARTNERS_EXTERNAL')}
      component={TrainingPartnersExternalPage} />
    <Route
      path={defineAndGetPath('TRAINING_PARTNERS_INTERNAL')}
      component={TrainingPartnersInternalPage} />
    <Redirect to={defineAndGetPath('SPLASH')} />
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
