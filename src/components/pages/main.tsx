import React, {Suspense, useEffect} from 'react'
import {useTranslation} from 'react-i18next'
import {useLocation} from 'react-router'
import {BrowserRouter, Switch, Redirect, Route} from 'react-router-dom'

import {logPage} from 'analytics/amplitude'
import {init as i18nInit} from 'store/i18n'
import {getPath as defineAndGetPath} from 'store/url'

import ComponentsPage from 'components/pages/components'
import SplashPage from 'components/pages/splash'
import StepsPage from 'components/pages/steps'
import TermsPage from 'components/pages/terms'

import 'styles/fonts/Lato/font.css'
import 'styles/fonts/ProximaSoft/font.css'


require('styles/app.css')

i18nInit()

const App = (): React.ReactElement => {
  const {t} = useTranslation('url')
  const {pathname} = useLocation()
  useEffect((): void => logPage(pathname), [pathname])
  // i18next-extract-mark-ns-start url
  return <Switch>
    <Route path={defineAndGetPath('SPLASH', t)} component={SplashPage} />
    <Route path={defineAndGetPath('STEPS', t)} component={StepsPage} />
    <Route path={defineAndGetPath('TERMS', t)} component={TermsPage} />
    <Route path={defineAndGetPath('COMPONENTS', t)} component={ComponentsPage} />
    <Route path={defineAndGetPath('ROOT', t)}>
      <Redirect to={defineAndGetPath('SPLASH', t)} />
    </Route>
  </Switch>
  // i18next-extract-mark-ns-stop url
}
const MemoApp = React.memo(App)


// The app that will be augmented by top level wrappers.
const WrappedApp = (): React.ReactElement => {
  // TODO(pascal): Add a scroll-up on page change.
  return <Suspense fallback={<div />}>
    <BrowserRouter>
      <MemoApp />
    </BrowserRouter>
  </Suspense>
}
const MemoWrappedApp = React.memo(WrappedApp)

export {MemoWrappedApp as App}
