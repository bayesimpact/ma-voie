import React from 'react'

import Button from 'components/button'
import Header from 'components/header'
import Layout from 'components/layout'
import PartnerCard from 'components/partner_card'
import Tip from 'components/tip'

import logoChance from 'images/logo-chance.svg'

const onClick = (): void => window.alert('Bientôt disponible...')

// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const ComponentsPage = (): React.ReactElement => {

  return <React.Fragment>
    <Header title="title" />
    <Layout>
      <br />
      <Button bgColor={colors.REDDISH_ORANGE} onClick={onClick} >Button REDDISH_ORANGE</Button>
      <br />
      <Button bgColor={colors.TEAL_BLUE} onClick={onClick} >Button TEAL_BLUE</Button>
      <br />
      <Button color={colors.DARK_FOREST_GREEN} onClick={onClick} >Button #fff</Button>
      <br />
      <Button color={colors.TURQUOISE_BLUE} onClick={onClick} >Button TURQUOISE_BLUE</Button>
      <br />
      <PartnerCard
        logo={logoChance}
        title="300€"
        details="Finançable CPF"
        info="37 personnes ont choisi Chance"
        onClick={onClick}
      >
        <ul>
          <li>Durée : 6 semaines</li>
          <li>Faisable en ligne</li>
          <li>Coach dédié pour vous accompagner</li>
          <li>Suivi quotidien de votre avancement</li>
          <li>Disponible 24h/24</li>
          <li>Ils sont sympas</li>
        </ul>
      </PartnerCard>
      <br />
      <Tip title="Astuce">
        Vous pouvez utiliser votre crédit CPF pour financer votre formation.
      </Tip>
    </Layout>
  </React.Fragment>
}

export default React.memo(ComponentsPage)
