import React, {Suspense} from 'react'
import {useTranslation} from 'react-i18next'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import {init as i18nInit} from 'store/i18n'
import {getPath as defineAndGetPath} from 'store/url'

import SplashPage from 'components/pages/splash'
import TermsPage from 'components/pages/terms'

import 'styles/fonts/Lato/font.css'
import 'styles/fonts/Poppins/font.css'

require('styles/app.css')

i18nInit()

const App = (): React.ReactElement => {
  const {t} = useTranslation('url')
  // i18next-extract-mark-ns-start url
  return <Switch>
    <Route path={defineAndGetPath('SPLASH', t)} component={SplashPage} />
    <Route path={defineAndGetPath('TERMS', t)} component={TermsPage} />
  </Switch>
  // i18next-extract-mark-ns-stop url
}
const MemoApp = React.memo(App)


// The app that will be augmented by top level wrappers.
const WrappedApp = (): React.ReactElement => {
  return <Suspense fallback={<div />}>
    <BrowserRouter>
      <MemoApp />
    </BrowserRouter>
  </Suspense>
}
const MemoWrappedApp = React.memo(WrappedApp)

export {MemoWrappedApp as App}
