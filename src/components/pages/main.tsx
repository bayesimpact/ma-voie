import {User} from '@firebase/auth-types'
import {ConnectedRouter, connectRouter, routerMiddleware} from 'connected-react-router'
import firebase from 'firebase/app'
import {History, createBrowserHistory} from 'history'
import React, {Suspense, useEffect, useState} from 'react'
import TagManager from 'react-gtm-module'
import {Provider} from 'react-redux'
import {FirebaseReducer, ReactReduxFirebaseProvider, firebaseReducer} from 'react-redux-firebase'
import {actionTypes, createFirestoreInstance, firestoreReducer} from 'redux-firestore'
import {useLocation, RouteProps} from 'react-router'
import {Switch, Redirect, Route} from 'react-router-dom'
import {Reducer, Store, createStore, applyMiddleware, combineReducers} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import {logPage} from 'analytics/amplitude'
import {AllActions, ClearDataType, RootState} from 'store/actions'
import {localStorageMiddleware, user} from 'store/app_reducer'
import {init as i18nInit} from 'store/i18n'
import {useUserId} from 'store/selections'
import {useSubPathDefiner} from 'store/url'

import AccountPage from 'components/pages/account'
import CongratulationsPage from 'components/pages/congratulations'
import ComponentsPage from 'components/pages/components'
import DefinitionPage from 'components/pages/definition'
import ForgotPasswordPage from 'components/pages/forgot_password'
import LoginPage from 'components/pages/login'
import MenuPage from 'components/pages/menu'
import MenuSitePage from 'components/pages/menu_site'
import MissionPage from 'components/pages/mission'
import PartnersPage from 'components/pages/partners'
import PasswordPage from 'components/pages/password'
import JobPage from 'components/pages/job'
import SignupPage from 'components/pages/signup'
import SkillsPage from 'components/pages/skills'
import SplashPage from 'components/pages/splash'
import StepsPage from 'components/pages/steps'
import TeamPage from 'components/pages/team'
import TermsPage from 'components/pages/terms'
import TrainingPage from 'components/pages/training'

import 'styles/fonts/Lato/font.css'
import 'styles/fonts/ProximaSoft/font.css'

require('styles/app.css')

i18nInit()

const ConnectedRoute = (props: Readonly<RouteProps>): React.ReactElement => {
  const isConnected = useUserId() !== undefined
  const defineAndGetPath = useSubPathDefiner()
  if (isConnected) {
    return <Route {...props} />
  }
  return <Route path={defineAndGetPath('SPLASH')} component={SplashPage} />
}

const App = (): React.ReactElement => {
  const {hash, pathname, search} = useLocation()
  const userId = useUserId()
  const isConnected = userId !== undefined
  const defineAndGetPath = useSubPathDefiner()
  useEffect((): void => logPage(pathname), [pathname])
  useEffect((): void => {
    const urlParams = new URLSearchParams(window.location.search)
    const utmSource = urlParams.get('utm_source')
    if (!utmSource) {
      return
    }
    localStorage.setItem('utm_source', utmSource)
  }, [])
  // i18next-extract-mark-ns-start url
  return <Switch>
    <ConnectedRoute
      path={`/:step${defineAndGetPath('PARTNERS_INTERNAL')}`} component={PartnersPage} />
    <ConnectedRoute
      path={`/:step${defineAndGetPath('PARTNERS_EXTERNAL')}`} component={PartnersPage} />
    <ConnectedRoute path={`/:step${defineAndGetPath('JOB')}`} component={JobPage} />
    <Route path={defineAndGetPath('ACCOUNT')} component={AccountPage} />
    <Route path={defineAndGetPath('CONGRATULATIONS')} component={CongratulationsPage} />
    {isConnected ? null : <Route path={defineAndGetPath('LOGIN')} component={LoginPage} />}
    <ConnectedRoute path={defineAndGetPath('DEFINITION')} component={DefinitionPage} />
    <ConnectedRoute path={defineAndGetPath('SKILLS')} component={SkillsPage} />
    <ConnectedRoute path={defineAndGetPath('TRAINING')} component={TrainingPage} />
    <ConnectedRoute path={defineAndGetPath('INTERVIEW')}>
      <Redirect
        to={`${defineAndGetPath('INTERVIEW')}${defineAndGetPath('PARTNERS_INTERNAL')}`} />
    </ConnectedRoute>
    <Route path={defineAndGetPath('FORGOT_PASSWORD')} component={ForgotPasswordPage} />
    <Route path={defineAndGetPath('MENU')} component={MenuPage} />
    <Route path={defineAndGetPath('MENU_SITE')} component={MenuSitePage} />
    <Route path={defineAndGetPath('MISSION')} component={MissionPage} />
    <Route path={defineAndGetPath('PASSWORD')} component={PasswordPage} />
    {isConnected ? null : <Route path={defineAndGetPath('SIGNUP')} component={SignupPage} />}
    <Route path={defineAndGetPath('SPLASH')} component={SplashPage} />
    <Route path={defineAndGetPath('STEPS')} component={StepsPage} />
    <Route path={defineAndGetPath('TEAM')} component={TeamPage} />
    <Route path={defineAndGetPath('TERMS')} component={TermsPage} />
    <Route path={defineAndGetPath('COMPONENTS')} component={ComponentsPage} />
    <Redirect to={defineAndGetPath('SPLASH') + search + hash} />
  </Switch>
  // i18next-extract-mark-ns-stop url
}
const MemoApp = React.memo(App)
const tagManagerArgs = {gtmId: 'GTM-N9SWSWB'}
TagManager.initialize(tagManagerArgs)

interface AppState {
  history: History
  store: Store<RootState, AllActions>
}

function createHistoryAndStore(): AppState {
  const history = createBrowserHistory()

  const finalCreateStore = composeWithDevTools(applyMiddleware(
    thunk,
    localStorageMiddleware,
    routerMiddleware(history),
  ))(createStore)

  // Create the store that will be provided to connected components via Context.
  const store = finalCreateStore<RootState, AllActions>(
    combineReducers({
      firebase: firebaseReducer as Reducer<FirebaseReducer.Reducer<bayes.maVoie.User>>,
      firestore: firestoreReducer,
      router: connectRouter(history),
      user,
    }),
  )
  if (module.hot) {
    module.hot.accept(['store/app_reducer'], (): void => {
      const {user: newUser} =
        require('store/app_reducer')
      store.replaceReducer(combineReducers({
        firebase: firebaseReducer as Reducer<FirebaseReducer.Reducer<bayes.maVoie.User>>,
        firestore: firestoreReducer,
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
  const rrfConfig = {
    onAuthStateChanged: (user: User|null): void => {
      if (user) {
        return
      }
      store.dispatch({type: actionTypes.CLEAR_DATA as ClearDataType})
    },
    useFirestoreForProfile: true,
    userProfile: 'users',
  }
  const rrfProps = {
    config: rrfConfig,
    createFirestoreInstance,
    dispatch: store.dispatch,
    firebase,
  }
  // TODO(pascal): Add a scroll-up on page change.
  return <Provider store={store}>
    <ConnectedRouter history={history}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        {/* TODO(cyrille): Add a nice waiting page. */}
        <Suspense fallback={<div />}>
          <MemoApp />
        </Suspense>
      </ReactReduxFirebaseProvider>
    </ConnectedRouter>
  </Provider>
}
const MemoWrappedApp = React.memo(WrappedApp)

export {MemoWrappedApp as App}
