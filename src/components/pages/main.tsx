import * as Sentry from '@sentry/browser'
import {ConnectedRouter, connectRouter, routerMiddleware, RouterState} from 'connected-react-router'
import {History, createBrowserHistory} from 'history'
import React, {Suspense, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {Provider} from 'react-redux'
import {Switch, Redirect, Route} from 'react-router-dom'
import {Store, createStore, applyMiddleware, combineReducers} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import createReduxSentryMiddleware from 'redux-sentry-middleware'
import thunk from 'redux-thunk'
import {polyfill as smoothscrollPolyfill} from 'smoothscroll-polyfill'

import {createAmplitudeMiddleware} from 'analytics/amplitude'
import Logger from 'analytics/logger'
import {alerts, contacts, people, user} from 'store/app_reducer'
import {ACTIONS_TO_LOG, AllActions} from 'store/actions'
import {init as i18nInit} from 'store/i18n'
import {getPath as defineAndGetPath} from 'store/url'


import SplashPage from 'components/pages/splash'
import TermsPage from 'components/pages/terms'

import 'styles/fonts/Lato/font.css'
import 'styles/fonts/Poppins/font.css'

// TODO(sil): Clean the store and everything else.
require('styles/app.css')

smoothscrollPolyfill()
i18nInit()

interface AppState {
  history: History
  store: Store<RootState, AllActions>
}

const App = (): React.ReactElement => {
  const {t} = useTranslation('url')
  // i18next-extract-mark-ns-start url
  return <Switch>
    <Route path={defineAndGetPath('SPLASH', t)} component={SplashPage} />
    <Route path={defineAndGetPath('TERMS', t)} component={TermsPage} />
    <Route path={defineAndGetPath('ROOT', t)}>
      <Redirect to={defineAndGetPath('SPLASH', t)} />
    </Route>
  </Switch>
  // i18next-extract-mark-ns-stop url
}
const MemoApp = React.memo(App)

type ReduxState = RootState & {router: RouterState<Record<string, undefined>|null|undefined>}

function createHistoryAndStore(): AppState {
  const history = createBrowserHistory()
  // TODO(cyrille): Add 3rd party analytics middlewares.

  Sentry.init({
    dsn: config.sentryDsn,
    environment: config.environment,
    release: config.clientVersion,
  })
  const reduxSentryMiddleware = createReduxSentryMiddleware(Sentry, {
    stateTransformer: (state: RootState) => ({
      ...state,
      // Don't send alerts, they might contain phone number and email addresses.
      alerts: 'REDACTED',
      // Don't send people, they might contain names.
      people: 'REDACTED',
    }),
  })

  const amplitudeMiddleware = createAmplitudeMiddleware(new Logger(ACTIONS_TO_LOG))

  const finalCreateStore = composeWithDevTools(applyMiddleware(
    // Sentry middleware needs to be first to correctly catch exception down the line.
    reduxSentryMiddleware,
    amplitudeMiddleware,
    thunk,
    routerMiddleware(history),
  ))(createStore)

  // Create the store that will be provided to connected components via Context.
  const store = finalCreateStore<ReduxState, AllActions>(
    combineReducers({
      alerts,
      contacts,
      people,
      router: connectRouter(history),
      user,
    }),
  )
  if (module.hot) {
    module.hot.accept(['store/app_reducer'], (): void => {
      const {alerts: newAlerts, contacts: newContacts, people: newPeople, user: newUser} =
        require('store/app_reducer')
      store.replaceReducer(combineReducers({
        alerts: newAlerts as typeof alerts,
        contacts: newContacts as typeof contacts,
        people: newPeople as typeof people,
        router: connectRouter(history),
        user: newUser as typeof user,
      }))
    })
  }
  return {history, store}
}


// The app augmented by top level wrappers.
const WrappedApp = (): React.ReactElement => {
  const [{history, store}] = useState(createHistoryAndStore)
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
