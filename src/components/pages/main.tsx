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
import {localStorageMiddleware, user} from 'store/app_reducer'
import {init as i18nInit} from 'store/i18n'
import {useSubPathDefiner} from 'store/url'

import AccountPage from 'components/pages/account'
import ComponentsPage from 'components/pages/components'
import DefinitionPage from 'components/pages/definition'
import LoginPage from 'components/pages/login'
import MenuPage from 'components/pages/menu'
import MenuOutPage from 'components/pages/menu_out'
import PartnersPage from 'components/pages/partners'
import SignupPage from 'components/pages/signup'
import SkillsPage from 'components/pages/skills'
import SplashPage from 'components/pages/splash'
import StepsPage from 'components/pages/steps'
import TermsPage from 'components/pages/terms'
import TrainingPage from 'components/pages/training'

import 'styles/fonts/Lato/font.css'
import 'styles/fonts/ProximaSoft/font.css'


require('styles/app.css')

i18nInit()

const App = (): React.ReactElement => {
  const {hash, pathname, search} = useLocation()
  const defineAndGetPath = useSubPathDefiner()
  useEffect((): void => logPage(pathname), [pathname])
  // i18next-extract-mark-ns-start url
  return <Switch>
    <Route path={`/:step${defineAndGetPath('PARTNERS_INTERNAL')}`} component={PartnersPage} />
    <Route path={`/:step${defineAndGetPath('PARTNERS_EXTERNAL')}`} component={PartnersPage} />
    <Route path={defineAndGetPath('ACCOUNT')} component={AccountPage} />
    <Route path={defineAndGetPath('LOGIN')} component={LoginPage} />
    <Route path={defineAndGetPath('DEFINITION')} component={DefinitionPage} />
    <Route path={defineAndGetPath('SKILLS')} component={SkillsPage} />
    <Route path={defineAndGetPath('TRAINING')} component={TrainingPage} />
    <Route path={defineAndGetPath('DEFINITION')} component={DefinitionPage} />
    <Route path={defineAndGetPath('MENU')} component={MenuPage} />
    <Route path={defineAndGetPath('MENU_OUT')} component={MenuOutPage} />
    <Route path={defineAndGetPath('SIGNUP')} component={SignupPage} />
    <Route path={defineAndGetPath('SPLASH')} component={SplashPage} />
    <Route path={defineAndGetPath('STEPS')} component={StepsPage} />
    <Route path={defineAndGetPath('TERMS')} component={TermsPage} />
    <Route path={defineAndGetPath('COMPONENTS')} component={ComponentsPage} />
    <Redirect to={defineAndGetPath('SPLASH') + search + hash} />
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
    localStorageMiddleware,
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
