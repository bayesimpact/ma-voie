import React from 'react'

import BeneficiariesSection from 'components/beneficiaries_section'
import Footer from 'components/footer'
import GoalSection from 'components/goal_section'
import HeaderSection from 'components/header_section'
import JoinSection from 'components/join_section'
import PartnersSection from 'components/partners_section'


// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const SplashPage = (): React.ReactElement => {
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
