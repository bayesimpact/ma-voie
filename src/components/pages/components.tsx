import React from 'react'

import Button from 'components/button'
import Layout from 'components/layout'
import PartnerCard from 'components/partner_card'
import Tip from 'components/tip'

import logoChance from 'images/logo-chance.svg'

const onClick = (): void => window.alert('Bientôt disponible...')

const listItems = [
  'Durée : 6 semaines',
  'Faisable en ligne',
  'Coach dédié pour vous accompagner',
  'Suivi quotidien de votre avancement',
  'Disponible 24h/24',
  'Ils sont sympas',
]

// This is a top level page and should never be nested in another one.
// TOP LEVEL PAGE
const ComponentsPage = (): React.ReactElement => {
  return <Layout header="Header title" title="Layout title" bigTitle="Layout big title">
    <br />
    <Button type="firstLevel" onClick={onClick} >Button firstLevel</Button>
    <br />
    <Button type="secondLevel" onClick={onClick} >Button secondLevel</Button>
    <br />
    <Button type="variable" onClick={onClick} >Button variable</Button>
    <br />
    <Button type="discret" onClick={onClick} >Button discret</Button>
    <br />
    <Button type="specific" onClick={onClick} >Button specific</Button>
    <br />
    <Button type="menu" onClick={onClick} >Button menu</Button>
    <br />
    <PartnerCard
      logo={logoChance}
      title="300€"
      details="Finançable CPF"
      info="37 personnes ont choisi Chance"
      onClick={onClick}
      list={listItems}
    />
    <br />
    <Tip title="Astuce">
      Vous pouvez utiliser votre crédit CPF pour financer votre formation.
    </Tip>
  </Layout>
}

export default React.memo(ComponentsPage)
