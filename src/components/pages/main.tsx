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
import ExperiencePage from 'components/pages/definition/experience'
import GoPage from 'components/pages/definition/go'
import InterestPage from 'components/pages/definition/interest'
import JobPage from 'components/pages/definition/job'
import LostPage from 'components/pages/definition/lost'
import RedefinePage from 'components/pages/definition/redefine'
import WhatPage from 'components/pages/definition/what'
import WherePage from 'components/pages/definition/where'

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
    <Route path={defineAndGetPath('DEFINITION_EXPERIENCE', t)} component={ExperiencePage} />
    <Route path={defineAndGetPath('DEFINITION_GO', t)} component={GoPage} />
    <Route path={defineAndGetPath('DEFINITION_INTEREST', t)} component={InterestPage} />
    <Route path={defineAndGetPath('DEFINITION_JOB', t)} component={JobPage} />
    <Route path={defineAndGetPath('DEFINITION_LOST', t)} component={LostPage} />
    <Route path={defineAndGetPath('DEFINITION_REDEFINE', t)} component={RedefinePage} />
    <Route path={defineAndGetPath('DEFINITION_WHAT', t)} component={WhatPage} />
    <Route path={defineAndGetPath('DEFINITION_WHERE', t)} component={WherePage} />
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
