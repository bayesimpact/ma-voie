import React, {useEffect} from 'react'

import {updateSource, useDispatch} from 'store/actions'
import {useSource} from 'store/selections'

import BeneficiariesSection from 'components/beneficiaries_section'
import Footer from 'components/footer'
import GoalSection from 'components/goal_section'
import HeaderSection from 'components/header_section'
import JoinSection from 'components/join_section'
import PartnersSection from 'components/partners_section'


// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const SplashPage = (): React.ReactElement => {

  const dispatch = useDispatch()
  const source = useSource()

  useEffect((): void => {
    if (source) {
      return
    }
    const urlParams = new URLSearchParams(window.location.search)
    const utmSource = urlParams.get('utm_source')
    if (!utmSource) {
      return
    }
    dispatch(updateSource(utmSource))
  }, [dispatch, source])

  return <div style={{fontFamily: 'Lato, Helvetica'}}>
    <HeaderSection />
    <GoalSection />
    <BeneficiariesSection />
    <PartnersSection />
    <JoinSection />
    <Footer />
  </div>
}


export default React.memo(SplashPage)
